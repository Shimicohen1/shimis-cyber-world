#!/usr/bin/env python3
"""
SCW Vault Auto-Sync
Scans Google Drive folder, categorizes files, extracts Drive IDs,
regenerates _data/resources.yml, and commits/pushes to GitHub.

Run manually:  python3 ~/Documents/shimis-cyber-world-repo/scripts/sync_vault.py
Scheduled via: ~/Library/LaunchAgents/com.scw.vault-sync.plist (every 2 days)
"""

import os
import re
import subprocess
import json
import datetime

# === CONFIGURATION ===
DRIVE_ROOT = os.path.expanduser(
    "~/Library/CloudStorage/GoogleDrive-REDACTED_EMAIL/My Drive/"
)
REPO_DIR = os.path.expanduser("~/Documents/shimis-cyber-world-repo")
ICLOUD_DIR = os.path.expanduser(
    "~/Library/Mobile Documents/com~apple~CloudDocs/MY Startup/shimis-cyber-world/"
)
RESOURCES_YML = os.path.join(REPO_DIR, "_data", "resources.yml")
LOG_FILE = os.path.join(REPO_DIR, "scripts", "sync_vault.log")

# === FIND GOOGLE DRIVE FOLDER ===
def find_scw_folder():
    for d in os.listdir(DRIVE_ROOT):
        if d.lower().startswith("shimi"):
            return os.path.join(DRIVE_ROOT, d)
    raise FileNotFoundError("SCW folder not found in Google Drive")

# === CATEGORIZATION RULES ===
# (regex_pattern, category_name, subcategory_name) — first match wins
RULES = [
    # OSINT
    (r'OSINT Attack Surface', 'OSINT & Intelligence', 'Platform Attack Surfaces'),
    (r'OSINT|osint', 'OSINT & Intelligence', 'OSINT Tools & Techniques'),
    (r'Handbook.*Social.Media', 'OSINT & Intelligence', 'OSINT Tools & Techniques'),

    # Incident Response & DFIR
    (r'Incident.Response|IR.playbook|IR01|Incident.*Play|Anatomy.*Incident|CYBER.SECURITY.INCIDENTS.MANAGEMENT|What.*To.*Do.*Hacked', 'Incident Response', 'Playbooks & Guides'),
    (r'Forensic|DFIR|Autopsy|Registry.*Forensic|SANS.*DFPS|Hitchhiker.*DFIR', 'Incident Response', 'Digital Forensics'),
    (r'Event.Log|Log.Analysis|Windows.*Detection|Windows.*Event|Log4Shell|Log4j', 'Incident Response', 'Log Analysis'),
    (r'Malware.*Analy|IoC|Practical_Malware|MalwareAnalysis|4-Malware', 'Incident Response', 'Malware Analysis'),

    # Penetration Testing
    (r'Pentest|Penetration.Testing|OSCP|Red.Team|Offensive|Exploit|Bug.Bounty|Hacking.*Golang|Drozer|SHODAN|Purple.Team', 'Penetration Testing', 'Offensive Security'),
    (r'Active.Directory.*Exploit|Active.Directory.*Pentest|AD.*Exploit|AD.*Privilege|Offensive.*AD|Offensive.*Windows|NTLM|Credential.*Dump|powerview', 'Penetration Testing', 'Active Directory Attacks'),
    (r'XSS|SQL|Injection|Server.Side|RCE.*Parameter|WAF.*bypass|XML.*External|PortSwigger|wordpress.*Pentest', 'Penetration Testing', 'Web Application Attacks'),
    (r'File.*Transfer.*Cheat|RDP', 'Penetration Testing', 'Offensive Security'),

    # Threat Intelligence
    (r'(?:Using.*)?MITRE.*ATT|ATT.CK|Decider.*MITRE|applied.*MITRE|GETTING.*STARTED.*ATT', 'Threat Intelligence', 'MITRE ATT&CK'),
    (r'Threat.*(Hunt|Endpoint)|Endgame.*Threat|Threat.*hunting.*checklist|Threat.*hunting.*playbook', 'Threat Intelligence', 'Threat Hunting'),
    (r'APT|Nation.State|Russia|North.Korea|Ukraine|DPRK|OpIsrael|OPISRAEL|Lapsus|LockBit|BeaverTail|Lumma|Information.Stealer|Winter.Shield|CERT.IL|TrendMicro.*IOC|Lithuania', 'Threat Intelligence', 'Threat Actors & Campaigns'),
    (r'Threat.*Report|Threat.*Trend|Threat.*Assessment|Global.*Threat|Cyber.*Threat|Threat.*Predict|Threat.*Landscape|Threat.*Horizon|ATA.*Unclassified|Intel471|5.*Key.*Cyber.*Threat', 'Threat Intelligence', 'Threat Reports'),
    (r'\bCTI\b|CTI_RG|Intelligence.Architecture|Threat.*Intelligence', 'Threat Intelligence', 'CTI Frameworks'),

    # Blue Team & SOC
    (r'SOC\b|Security.Operation|Blue.Team|blue.*team|SIEM|Sentinel|Qradar|Detection.*Engineering|SOCTOM|SOC.*Powered|Build.*SOC|Designing.*SOC', 'Blue Team & SOC', 'SOC Operations'),
    (r'Cheat.*Sheet|cheat.*shit|Field.Manual|Cheatsheet|Quick.*Ref', 'Blue Team & SOC', 'Cheat Sheets'),
    (r'EDR|Endpoint.*Security|EPR|Deploy.*EDR', 'Blue Team & SOC', 'Endpoint Detection'),
    (r'cyber.*security.*blueteam', 'Blue Team & SOC', 'SOC Operations'),

    # Ransomware & Malware
    (r'Ransomware|Ransom|\u05db\u05d5\u05e4\u05e8\u05d4', 'Ransomware & Malware', 'Ransomware'),
    (r'Malware(?!.*Analy)|Stealer|Infostealer', 'Ransomware & Malware', 'Malware'),
    (r'Phishing|Smishing|Vishing|BEC|Business.*Email', 'Ransomware & Malware', 'Phishing & Social Engineering'),

    # Cloud Security
    (r'AWS|Amazon.*Web', 'Cloud Security', 'AWS'),
    (r'Azure|Microsoft.*Cloud|Microsoft.*Sentinel', 'Cloud Security', 'Azure'),
    (r'Cloud.*Security|Cloud.*Pentest|Cloud.*Threat|CSI.Cloud|Cloud.*Computing|Modern.*Cloud|TX.RAMP', 'Cloud Security', 'Cloud Security'),
    (r'Kubernetes|K8s', 'Cloud Security', 'Containers'),
    (r'DevOps|DevSecOps|CI.CD|Git.*cheat', 'Cloud Security', 'DevSecOps'),

    # Compliance & Standards
    (r'CIS.*Benchmark|CIS.*Microsoft|CIS.*Amazon|CIS.*Linux|CIS.*GitHub|CIS.*Zoom|CIS.*Multi|CIS.*Software|CIS.*Edge|CIS.*IIS|CIS.*Intune|CIS.*Office|CIS.*Exchange', 'Compliance & Standards', 'CIS Benchmarks'),
    (r'ISO.*270|ISO.*22301|ISMS|27001', 'Compliance & Standards', 'ISO 27001'),
    (r'NIST|CSF.*2|SP\.800|C2M2', 'Compliance & Standards', 'NIST'),
    (r'PCI|PCI.DSS|Security.*Rules.*Merchant', 'Compliance & Standards', 'PCI DSS'),
    (r'HIPAA|HCR.*HIPAA', 'Compliance & Standards', 'HIPAA'),
    (r'GDPR|Data.*Protection.*Law|Draft.*Regulation.*EEA|PIPA|Notifiable.*Data|EU.*cyber.*regulation', 'Compliance & Standards', 'Privacy & Regulations'),
    (r'Zero.Trust|Federal.*Zero|Planning.*Zero', 'Compliance & Standards', 'Zero Trust'),
    (r'GRC|Compliance.*Handbook|Governance|Cyber.*Security.*Governance|Modular.*Security|Security.*Obligation|DFARS|ITGC|Cyber.*Readiness', 'Compliance & Standards', 'GRC'),
    (r'SOC.2|SOC.*Compliance', 'Compliance & Standards', 'SOC 2'),
    (r'Cybersecurity.*posture|Security.*Assessment.*Testing|Assessment.*Tool|Self.*Assessment', 'Compliance & Standards', 'Security Assessments'),

    # Risk Management
    (r'Risk.*Management|Risk.*Assessment|Risk.*Barometer|Risk.*Report|Business.*Impact|Cyber.*Risk|Risk.*Quanti|Global.*Risk|risk\.pdf|Effective.*Enterprise.*Risk|Vulnerability.*Assessment.*Mitigation', 'Risk Management', 'Risk Frameworks'),
    (r'Cyber.*Insurance|Insurance.*Model', 'Risk Management', 'Cyber Insurance'),
    (r'Supply.Chain|Software.*Supply', 'Risk Management', 'Supply Chain'),
    (r'Vulnerability.*Stats|Vulnerability.*Report|Microsoft.*Vulnerabilities|CVE', 'Risk Management', 'Vulnerability Management'),

    # AI & Emerging Tech
    (r'AI.*Pentest|AI.*Cyber|ChatGPT|DeepSeek|LLM|Generative.*AI|Hallucinated|Jailbreak|Reasoning.*AI|impact.*ai|AICM|Response.*AI.*Loss', 'AI & Emerging Tech', 'AI & Cybersecurity'),
    (r'AI.*Risk|Artificial.Intelligence', 'AI & Emerging Tech', 'AI Governance'),
    (r'Blockchain|Crypto', 'AI & Emerging Tech', 'Blockchain'),
    (r'IoT|Internet.of.Things', 'AI & Emerging Tech', 'IoT Security'),
    (r'Quantum|Post.Quantum', 'AI & Emerging Tech', 'Post-Quantum'),
    (r'Deepfake', 'AI & Emerging Tech', 'Deepfakes'),

    # Critical Infrastructure
    (r'OT.*Security|OT.*Cyber|Critical.*Infrastructure|ICS|SCADA|Manufacturing|Power.*Grid|Nuclear|CyberPhysical|mfg.*recovery|MES\b', 'Critical Infrastructure', 'OT & ICS'),
    (r'Healthcare|Medical|Health.*IoT', 'Critical Infrastructure', 'Healthcare'),
    (r'FinTech|Banking|\u05d1\u05e0\u05e7', 'Critical Infrastructure', 'Financial Sector'),

    # Network & Infrastructure
    (r'Network.*Security|Network.*Penetration|Network.*Infrastructure|DNS|Firewall|Human.*Firewall', 'Network & Infrastructure', 'Network Security'),
    (r'Active.Directory.*Security|Active.Directory.*Enum|AD.*Security|Securing.*Active|Integration.*Active', 'Network & Infrastructure', 'Active Directory'),
    (r'Windows.*Security|Windows.*11|Windows.*Harden|linux.*endpoint|Linux.*Harden|Windows.*power|Windows.*Cook|Apple.*Security|Servers\b', 'Network & Infrastructure', 'OS Hardening'),
    (r'Microsoft.*365|M365|Microsoft.*Office', 'Network & Infrastructure', 'Microsoft 365'),
    (r'Microsoft.*Security.*Best|Microsoft.*CISO|Secure.*Future', 'Network & Infrastructure', 'Microsoft Security'),

    # Application Security
    (r'OWASP|Secure.*Coding|Web.*Security|API.*Security|DotNet.*Security|Python.*security|wordpress|SSDF', 'Application Security', 'Web & API'),
    (r'2FA|Authentication|SSO|Access.*Control|Stopping.*Cookies', 'Application Security', 'Authentication'),
    (r'Product.*Security|Security.*by.*Design|Secure.*Software', 'Application Security', 'Secure Development'),
    (r'Browser.*Security', 'Application Security', 'Browser Security'),

    # Industry Reports
    (r'Cost.*Breach|Data.*Breach|Verizon.*DBIR|IC3.*Report|FBI', 'Industry Reports', 'Breach Reports'),
    (r'Microsoft.*Digital.*Defense|Mandiant.*Trends|M.Trends|CrowdStrike|Fortinet|Checkpoint|Kaspersky|CyberSecurity.*Gaint|RSecurity', 'Industry Reports', 'Vendor Reports'),
    (r'Global.*Cyber.*Outlook|State.*Cyber|Cybersecurity.*Outlook|WEF|World.*Economic|cybersecurity.*forecast', 'Industry Reports', 'Industry Outlook'),
    (r'Cyber.*Insight.*Magazine|CyberInsight', 'Industry Reports', 'Cyber Insight Magazine'),
    (r'SPECIAL.*REPORT|Year.*Review|Annual.*Report|End.*Year.*Report|Best.*Cyber.*Insights|Breaches.*Anticipated|Cyber.*Capabilities|INTERNET.*ORGANISED.*CRIME', 'Industry Reports', 'Annual & Special Reports'),
    (r'CISO|Chief.*Information.*Security', 'Industry Reports', 'CISO Resources'),
    (r'Cybersecurity.*Survey|Cyber.*Security.*Breaches.*Survey|Longitudinal.*Survey|skills.*UK|Cybersecurity.*Competitive', 'Industry Reports', 'Surveys & Research'),
    (r'Cybersecurity.*Trends|Cyber.*Security.*Trends|Hillel.*Kobrovski', 'Industry Reports', 'Trends & Forecasts'),

    # Career & Certifications
    (r'CISSP|CEH|Security.Plus|Interview|Career|Resume|\u05e8\u05d0\u05d9\u05d5\u05e0|\u05ea\u05e2\u05e1\u05d5\u05e7|ceh.notes|Burn.*Out.*Infosec', 'Career & Certifications', 'Certifications & Career'),
    (r'Basics|Introduction|Getting.*Started|Fundamentals|Beginner|Small.*Business|SMB|Startup|Toolkit.*Board|Building.*Learning', 'Career & Certifications', 'Getting Started'),
    (r'Infographic|Terms|Acronym|50.*Cybersecurity.*Question|Cybersecurity.*Resource.*Reference|IT.*vs.*IS', 'Career & Certifications', 'Quick References'),

    # Hebrew Resources
    (r'[\u0590-\u05FF]', 'Hebrew Resources (\u05e2\u05d1\u05e8\u05d9\u05ea)', 'General'),

    # Specific remaining
    (r'Jumping.*air.*gap', 'Penetration Testing', 'Offensive Security'),
    (r'potential.*risk.*indicator', 'Risk Management', 'Risk Frameworks'),

    # Catch-all
    (r'Mitigat|Strateg|Defense|Defender|Protect|Security.*Guidance|CERT', 'Defense Strategies', 'General Defense'),
    (r'SEC22|sec22|paper|Preview|Organizational', 'Industry Reports', 'Research Papers'),
    (r'Wireshark|Nmap|Burp|Tool|Resource|Guide|Checklist|Cookbook|Handbook|Book|Manual|Telegram.*Channel', 'Tools & Resources', 'Guides & Tools'),
    (r'Cyber|Security|Data|Privacy|Critical|20\d\d|Translated|Star.*Wars|DDS|PEACH|SURF|ploni|ordinal|original|day-2|LanDscAPe|UBTECH|Sludge', 'General Cybersecurity', 'Miscellaneous'),
    (r'^\d+|^__|^download|^file_', 'General Cybersecurity', 'Miscellaneous'),
]

# Category display order and icons
CAT_ORDER = [
    ('Threat Intelligence', '\U0001f50d'),
    ('Incident Response', '\U0001f6a8'),
    ('Penetration Testing', '\u2694\ufe0f'),
    ('Blue Team & SOC', '\U0001f6e1\ufe0f'),
    ('Ransomware & Malware', '\U0001f9a0'),
    ('OSINT & Intelligence', '\U0001f575\ufe0f'),
    ('Cloud Security', '\u2601\ufe0f'),
    ('Network & Infrastructure', '\U0001f310'),
    ('Application Security', '\U0001f512'),
    ('AI & Emerging Tech', '\U0001f916'),
    ('Critical Infrastructure', '\U0001f3ed'),
    ('Compliance & Standards', '\U0001f4cb'),
    ('Risk Management', '\u2696\ufe0f'),
    ('Industry Reports', '\U0001f4ca'),
    ('Defense Strategies', '\U0001f3f0'),
    ('Career & Certifications', '\U0001f393'),
    ('Tools & Resources', '\U0001f9f0'),
    ('Hebrew Resources (\u05e2\u05d1\u05e8\u05d9\u05ea)', '\U0001f1ee\U0001f1f1'),
    ('General Cybersecurity', '\U0001f4c1'),
]
CAT_ICONS = dict(CAT_ORDER)


def log(msg):
    ts = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line)
    os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)
    with open(LOG_FILE, 'a') as f:
        f.write(line + '\n')


def scan_files(folder):
    """List all files in the Drive folder (non-recursive)."""
    files = []
    for f in os.listdir(folder):
        fpath = os.path.join(folder, f)
        if os.path.isfile(fpath) and not f.startswith('.'):
            files.append(f)
    return sorted(files)


def dedup_files(files):
    """Remove duplicates like 'file (1).pdf'."""
    seen = {}
    unique = []
    for f in files:
        base = re.sub(r'\s*\(\d+\)', '', f).strip()
        base = re.sub(r'\s+', ' ', base)
        if base not in seen:
            seen[base] = f
            unique.append(f)
    return unique


def categorize(files):
    """Categorize files using regex rules."""
    categorized = {}
    uncategorized = []
    for fname in files:
        matched = False
        for pattern, cat, subcat in RULES:
            if re.search(pattern, fname, re.IGNORECASE):
                categorized.setdefault(cat, {}).setdefault(subcat, [])
                title = fname
                title = re.sub(r'\.(pdf|xlsx?|pptx?|docx?|xlsm|yaml)$', '', title, flags=re.IGNORECASE)
                title = title.replace('_', ' ')
                title = re.sub(r'^[_\s]+', '', title)
                title = re.sub(r'\s*\d{10,}$', '', title)
                title = re.sub(r'\s+', ' ', title).strip()
                ext = fname.rsplit('.', 1)[-1].upper() if '.' in fname else 'FILE'
                categorized[cat][subcat].append({
                    'title': title, 'file': fname, 'type': ext
                })
                matched = True
                break
        if not matched:
            uncategorized.append(fname)
    return categorized, uncategorized


def extract_drive_ids(folder, files):
    """Extract Google Drive file IDs from macOS extended attributes."""
    ids = {}
    for fname in files:
        fpath = os.path.join(folder, fname)
        try:
            r = subprocess.run(
                ['xattr', '-p', 'com.google.drivefs.item-id#S', fpath],
                capture_output=True, text=True, timeout=5
            )
            if r.returncode == 0:
                ids[fname] = r.stdout.strip()
        except Exception:
            pass
    return ids


def yaml_escape(s):
    if any(c in s for c in ':{}[]&*?|>!%@`#,\'"\\'):
        return '"' + s.replace('\\', '\\\\').replace('"', '\\"') + '"'
    if s.startswith('-') or s.startswith(' '):
        return '"' + s.replace('"', '\\"') + '"'
    return s


def generate_yaml(categorized, drive_ids):
    """Generate the resources.yml content."""
    lines = [
        '# SCW Resource Vault - Auto-generated by sync_vault.py',
        f'# Last sync: {datetime.datetime.now().strftime("%Y-%m-%d %H:%M")}',
        ''
    ]
    total = sum(len(r) for subs in categorized.values() for r in subs.values())
    lines.append(f'# Total resources: {total}')
    lines.append('')
    lines.append('categories:')

    for cat_name, icon in CAT_ORDER:
        if cat_name not in categorized:
            continue
        cat_total = sum(len(items) for items in categorized[cat_name].values())
        lines.append(f'  - name: {yaml_escape(cat_name)}')
        lines.append(f'    icon: {yaml_escape(icon)}')
        lines.append(f'    count: {cat_total}')
        lines.append(f'    subcategories:')

        for subcat_name in sorted(categorized[cat_name].keys()):
            lines.append(f'      - name: {yaml_escape(subcat_name)}')
            lines.append(f'        resources:')
            for item in sorted(categorized[cat_name][subcat_name], key=lambda x: x['title'].lower()):
                lines.append(f'          - title: {yaml_escape(item["title"])}')
                lines.append(f'            file: {yaml_escape(item["file"])}')
                lines.append(f'            type: {item["type"]}')
                if item['file'] in drive_ids:
                    did = drive_ids[item['file']]
                    lines.append(f'            url: https://drive.google.com/file/d/{did}/view')

    return '\n'.join(lines) + '\n'


def git_commit_push():
    """Commit and push if there are changes."""
    os.chdir(REPO_DIR)
    # Check for changes
    r = subprocess.run(['git', 'diff', '--name-only', '_data/resources.yml'],
                       capture_output=True, text=True)
    if not r.stdout.strip():
        log("No changes detected in resources.yml — skipping commit")
        return False

    subprocess.run(['git', 'add', '_data/resources.yml'], check=True)
    ts = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
    subprocess.run(['git', 'commit', '-m', f'Auto-sync Vault resources ({ts})'], check=True)
    subprocess.run(['git', 'push', 'origin', 'main'], check=True)
    return True


def icloud_backup():
    """rsync to iCloud."""
    subprocess.run([
        'rsync', '-av', '--delete',
        '--exclude=.git', '--exclude=_site', '--exclude=.jekyll-cache',
        REPO_DIR + '/', ICLOUD_DIR
    ], capture_output=True)


def main():
    log("=" * 50)
    log("SCW Vault Sync starting...")

    # 1. Find folder
    scw_folder = find_scw_folder()
    log(f"Drive folder: {scw_folder}")

    # 2. Scan
    all_files = scan_files(scw_folder)
    log(f"Files found: {len(all_files)}")

    # 3. Dedup
    unique_files = dedup_files(all_files)
    log(f"Unique files: {len(unique_files)} (removed {len(all_files) - len(unique_files)} dupes)")

    # 4. Categorize
    categorized, uncategorized = categorize(unique_files)
    cat_total = sum(len(r) for subs in categorized.values() for r in subs.values())
    log(f"Categorized: {cat_total}, Uncategorized: {len(uncategorized)}")
    if uncategorized:
        for f in uncategorized[:5]:
            log(f"  Uncategorized: {f}")

    # 5. Extract Drive IDs
    drive_ids = extract_drive_ids(scw_folder, unique_files)
    log(f"Drive IDs extracted: {len(drive_ids)}")

    # 6. Generate YAML
    yaml_content = generate_yaml(categorized, drive_ids)
    with open(RESOURCES_YML, 'w') as f:
        f.write(yaml_content)
    log(f"Written: {RESOURCES_YML}")

    # 7. Commit & push
    pushed = git_commit_push()
    if pushed:
        log("Committed and pushed to GitHub")
    
    # 8. iCloud backup
    icloud_backup()
    log("iCloud backup complete")

    log("Vault sync finished!")
    log("")


if __name__ == '__main__':
    main()
