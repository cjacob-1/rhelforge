'use client';

import { useState, useEffect } from 'react';
import { Download, Copy, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const GUIDE_DETAILS: Record<string, any> = {
  '1': {
    title: 'System Monitoring & Logs',
    category: 'Daily Operations',
    difficulty: 'beginner',
    icon: '📊',
    description: 'Learn to monitor system performance and analyze logs using journalctl, dmesg, and top.',
    content: `Monitor RHEL system health using journalctl, dmesg, and standard Linux tools. Track CPU, memory, disk usage and identify issues from logs.`,
    bashScript: `#!/bin/bash
echo '=== System Uptime ==='
uptime
echo -e '\\n=== Memory Usage ==='
free -h
echo -e '\\n=== Disk Usage ==='
df -h
echo -e '\\n=== Top 5 Processes ==='
ps aux --sort=-%cpu | head -6
echo -e '\\n=== Recent Errors ==='
journalctl -p err -n 10 --no-pager`,
    pythonScript: `#!/usr/bin/env python3
import subprocess
import psutil
from datetime import datetime

print(f'System Report - {datetime.now()}')
print(f'CPU: {psutil.cpu_percent()}%')
mem = psutil.virtual_memory()
print(f'Memory: {mem.percent}%')
disk = psutil.disk_usage('/')
print(f'Disk: {disk.percent}%')`,
  },
  '2': {
    title: 'Patching & Package Management',
    category: 'Daily Operations',
    difficulty: 'intermediate',
    icon: '📦',
    description: 'Master dnf, yum, and rpm for secure and efficient package updates.',
    content: `Use dnf (Dandified Yum) for package management on RHEL 8+. Understand security updates, kernel patches, and dependency resolution.`,
    bashScript: `#!/bin/bash
echo 'Checking for updates...'
sudo dnf check-update
echo 'Installing security updates...'
sudo dnf update -y --security
echo 'Listing installed packages...'
dnf list installed | wc -l`,
    pythonScript: `#!/usr/bin/env python3
import subprocess

result = subprocess.run(['dnf', 'check-update'], capture_output=True, text=True)
print('Available updates:')
print(result.stdout)`,
  },
  '3': {
    title: 'Network & DNS Troubleshooting',
    category: 'Daily Operations',
    difficulty: 'intermediate',
    icon: '🌐',
    description: 'Fix network connectivity issues and DNS resolution problems.',
    content: `Troubleshoot network issues using nmcli, ip, and dig. Configure DNS, test connectivity, and diagnose routing problems.`,
    bashScript: `#!/bin/bash
echo '=== Network Interfaces ==='
nmcli device show
echo -e '\\n=== DNS Configuration ==='
cat /etc/resolv.conf
echo -e '\\n=== DNS Test ==='
dig google.com
echo -e '\\n=== Routing Table ==='
ip route`,
    pythonScript: `#!/usr/bin/env python3
import socket
import subprocess

hostname = socket.gethostname()
ip = socket.gethostbyname(hostname)
print(f'Hostname: {hostname}')
print(f'IP: {ip}')`,
  },
  '4': {
    title: 'Disk & Storage Management',
    category: 'Daily Operations',
    difficulty: 'intermediate',
    icon: '💾',
    description: 'Manage LVM, partitions, and storage optimization.',
    content: `Learn LVM (Logical Volume Manager), partition management, and storage optimization techniques for RHEL systems.`,
    bashScript: `#!/bin/bash
echo '=== Disk Usage ==='
df -h
echo -e '\\n=== Partition Info ==='
fdisk -l
echo -e '\\n=== LVM Volumes ==='
lvs
echo -e '\\n=== Physical Volumes ==='
pvs`,
    pythonScript: `#!/usr/bin/env python3
import shutil

total, used, free = shutil.disk_usage('/')
print(f'Total: {total // (2**30)}GB')
print(f'Used: {used // (2**30)}GB')
print(f'Free: {free // (2**30)}GB')`,
  },
  '5': {
    title: 'Users, Permissions & SELinux',
    category: 'Daily Operations',
    difficulty: 'advanced',
    icon: '🔐',
    description: 'Manage users, file permissions, and SELinux policies.',
    content: `Master user management, file permissions, and SELinux security policies to maintain system security.`,
    bashScript: `#!/bin/bash
echo '=== User Accounts ==='
cat /etc/passwd
echo -e '\\n=== Current User ==='
whoami
echo -e '\\n=== File Permissions ==='
ls -la /home
echo -e '\\n=== SELinux Status ==='
getenforce`,
    pythonScript: `#!/usr/bin/env python3
import os
import pwd

print('Current UID:', os.getuid())
print('Current User:', pwd.getpwuid(os.getuid()).pw_name)`,
  },
  '6': {
    title: 'Performance Troubleshooting',
    category: 'Daily Operations',
    difficulty: 'advanced',
    icon: '⚡',
    description: 'Identify and resolve performance bottlenecks.',
    content: `Use tools like top, iostat, and vmstat to identify CPU, memory, and disk I/O bottlenecks.`,
    bashScript: `#!/bin/bash
echo '=== CPU Usage ==='
top -bn1 | head -20
echo -e '\\n=== Memory Usage ==='
free -h
echo -e '\\n=== Disk I/O ==='
iostat -x 1 3`,
    pythonScript: `#!/usr/bin/env python3
import psutil

print(f'CPU: {psutil.cpu_percent()}%')
print(f'Memory: {psutil.virtual_memory().percent}%')
print(f'Disk: {psutil.disk_usage("/").percent}%')`,
  },
  '7': {
    title: 'Services & Process Management',
    category: 'Daily Operations',
    difficulty: 'intermediate',
    icon: '⚙️',
    description: 'Control systemd services and manage processes.',
    content: `Manage services with systemctl, monitor processes, and configure auto-start services.`,
    bashScript: `#!/bin/bash
echo '=== Active Services ==='
systemctl list-units --type=service --state=running
echo -e '\\n=== Service Status ==='
systemctl status sshd
echo -e '\\n=== Process List ==='
ps aux`,
    pythonScript: `#!/usr/bin/env python3
import subprocess

result = subprocess.run(['systemctl', 'list-units', '--type=service'], capture_output=True, text=True)
print(result.stdout)`,
  },
  '8': {
    title: 'Backups & Recovery',
    category: 'Major Projects',
    difficulty: 'advanced',
    icon: '💾',
    description: 'Implement backup strategies and recovery procedures.',
    content: `Create reliable backup solutions and test recovery procedures for disaster recovery.`,
    bashScript: `#!/bin/bash
echo '=== Creating Backup ==='
sudo tar -czf /backup/system-backup-$(date +%Y%m%d).tar.gz /etc /home
echo -e '\\n=== Backup List ==='
ls -lh /backup/
echo -e '\\n=== Backup Size ==='
du -sh /backup/
echo -e '\\n=== Rsync Backup ==='
sudo rsync -av /home/ /backup/home-backup/
echo -e '\\n=== Listing Backups ==='
ls -lh /backup/`,
    pythonScript: `#!/usr/bin/env python3
import tarfile
import os
from datetime import datetime

backup_name = f'backup-{datetime.now().strftime("%Y%m%d")}.tar.gz'
with tarfile.open(backup_name, 'w:gz') as tar:
    tar.add('/home', arcname='home')
print(f'Backup created: {backup_name}')`,
  },
  '9': {
    title: 'Hardware Issues',
    category: 'Daily Operations',
    difficulty: 'advanced',
    icon: '🖥️',
    description: 'Diagnose hardware problems with lspci, dmidecode, and sensors.',
    content: `Identify and troubleshoot hardware issues. Use diagnostic tools to check CPU, memory, disks, and other hardware components.`,
    bashScript: `#!/bin/bash
echo '=== PCI Devices ==='
lspci
echo -e '\\n=== System Info ==='
dmidecode
echo -e '\\n=== Temperature Sensors ==='
sensors
echo -e '\\n=== Memory Info ==='
free -h`,
    pythonScript: `#!/usr/bin/env python3
import subprocess
import psutil

print(f'CPU Cores: {psutil.cpu_count()}')
print(f'Total Memory: {psutil.virtual_memory().total / (1024**3):.2f}GB')
print(f'Boot Time: {psutil.boot_time()}')`,
  },
  '10': {
    title: 'AWS EC2 & SSM',
    category: 'AWS',
    difficulty: 'intermediate',
    icon: '☁️',
    description: 'Manage RHEL instances on AWS with EC2 and Systems Manager.',
    content: `Deploy and manage RHEL on AWS EC2. Use Systems Manager for patching, configuration, and automation.`,
    bashScript: `#!/bin/bash
echo '=== EC2 Instance Info ==='
curl http://169.254.169.254/latest/meta-data/instance-id
echo -e '\\n=== SSM Agent Status ==='
sudo systemctl status amazon-ssm-agent
echo -e '\\n=== Check Patches ==='
sudo yum check-update`,
    pythonScript: `#!/usr/bin/env python3
import boto3

ec2 = boto3.client('ec2')
instances = ec2.describe_instances()
for reservation in instances['Reservations']:
    for instance in reservation['Instances']:
        print(f"Instance: {instance['InstanceId']}")`,
  },
  '11': {
    title: 'Fresh RHEL Installation',
    category: 'Major Projects',
    difficulty: 'beginner',
    icon: '📥',
    description: 'Set up a fresh RHEL 9 system from scratch.',
    content: `Complete guide to installing RHEL 9, initial configuration, and essential setup steps.`,
    bashScript: `#!/bin/bash
echo '=== System Update ==='
sudo dnf update -y
echo -e '\\n=== Install Essential Tools ==='
sudo dnf install -y git curl wget vim
echo -e '\\n=== Configure Firewall ==='
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --reload`,
    pythonScript: `#!/usr/bin/env python3
import subprocess
import sys

packages = ['git', 'curl', 'wget', 'vim']
for pkg in packages:
    subprocess.run(['sudo', 'dnf', 'install', '-y', pkg])
print('Installation complete!')`,
  },
  '12': {
    title: 'RHEL 8 to 9 Upgrade',
    category: 'Major Projects',
    difficulty: 'advanced',
    icon: '⬆️',
    description: 'Upgrade from RHEL 8 to RHEL 9 safely.',
    content: `Step-by-step guide for upgrading RHEL 8 systems to RHEL 9 with minimal downtime.`,
    bashScript: `#!/bin/bash
echo '=== Pre-upgrade Checks ==='
sudo dnf update -y
echo -e '\\n=== Install Leapp ==='
sudo dnf install -y leapp-upgrade
echo -e '\\n=== Run Leapp Precheck ==='
sudo leapp preupgrade
echo -e '\\n=== Start Upgrade ==='
sudo leapp upgrade`,
    pythonScript: `#!/usr/bin/env python3
import subprocess

print('RHEL Upgrade Script')
subprocess.run(['sudo', 'dnf', 'update', '-y'])
subprocess.run(['sudo', 'dnf', 'install', '-y', 'leapp-upgrade'])
print('Upgrade preparation complete!')`,
  },
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
    case 'intermediate':
      return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
    case 'advanced':
      return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
    default:
      return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200';
  }
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function GuideDetailPage({ params }: PageProps) {
  const [guide, setGuide] = useState<any>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    bash: true,
    python: false,
  });

  useEffect(() => {
    params.then((resolvedParams) => {
      const id = resolvedParams.id;
      if (id) {
        setGuide(GUIDE_DETAILS[id]);
      }
    });
  }, [params]);

  if (!guide) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Guides
          </Link>
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Loading guide...
            </h1>
          </div>
        </div>
      </div>
    );
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const downloadScript = (filename: string, content: string) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Guides
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-5xl">{guide.icon}</span>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {guide.title}
              </h1>
              <div className="flex gap-3 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 dark:bg-dark-border text-gray-800 dark:text-gray-300">
                  {guide.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getDifficultyColor(guide.difficulty)}`}>
                  {guide.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border p-8 mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            {guide.description}
          </p>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300">{guide.content}</p>
          </div>
        </div>

        {/* Scripts */}
        <div className="space-y-6">
          {/* Bash Script */}
          <div className="bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border overflow-hidden">
            <button
              onClick={() => setExpandedSections({ ...expandedSections, bash: !expandedSections.bash })}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 dark:bg-dark-border hover:bg-gray-100 dark:hover:bg-dark-border/80 transition-colors"
            >
              <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="text-lg">🐚</span> Bash Script
              </span>
              {expandedSections.bash ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {expandedSections.bash && (
              <div className="p-6 border-t border-gray-200 dark:border-dark-border">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
                  <code>{guide.bashScript}</code>
                </pre>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(guide.bashScript)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                  <button
                    onClick={() => downloadScript('script.sh', guide.bashScript)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Python Script */}
          <div className="bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border overflow-hidden">
            <button
              onClick={() => setExpandedSections({ ...expandedSections, python: !expandedSections.python })}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 dark:bg-dark-border hover:bg-gray-100 dark:hover:bg-dark-border/80 transition-colors"
            >
              <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="text-lg">🐍</span> Python Script
              </span>
              {expandedSections.python ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {expandedSections.python && (
              <div className="p-6 border-t border-gray-200 dark:border-dark-border">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
                  <code>{guide.pythonScript}</code>
                </pre>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(guide.pythonScript)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                  <button
                    onClick={() => downloadScript('script.py', guide.pythonScript)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
