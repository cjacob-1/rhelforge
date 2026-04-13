'use client';

import { useState } from 'react';
import { Download, Copy, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
rpm -qa | wc -l`,
    pythonScript: `#!/usr/bin/env python3
import subprocess

def run_cmd(cmd):
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return result.stdout

print('Available updates:')
print(run_cmd('sudo dnf check-update'))`,
  },
  '3': {
    title: 'Network & DNS Troubleshooting',
    category: 'Daily Operations',
    difficulty: 'intermediate',
    icon: '🌐',
    description: 'Fix network issues using nmcli, systemctl, and DNS configuration.',
    content: `Diagnose and fix network problems using nmcli, systemctl, and DNS tools. Configure network interfaces and resolve connectivity issues.`,
    bashScript: `#!/bin/bash
echo '=== Network Interfaces ==='
nmcli device show
echo -e '\\n=== DNS Configuration ==='
cat /etc/resolv.conf
echo -e '\\n=== Network Connectivity ==='
ping -c 1 8.8.8.8
echo -e '\\n=== Route Table ==='
ip route`,
    pythonScript: `#!/usr/bin/env python3
import socket
import subprocess

print('DNS Resolution Test:')
try:
    ip = socket.gethostbyname('google.com')
    print(f'google.com -> {ip}')
except:
    print('DNS resolution failed')`,
  },
  '4': {
    title: 'Disk & Storage Management',
    category: 'Daily Operations',
    difficulty: 'intermediate',
    icon: '💾',
    description: 'Manage LVM, partitions, and storage with df, du, and mount commands.',
    content: `Master disk management including LVM, partitions, mounting, and storage optimization. Use df, du, and lvm tools effectively.`,
    bashScript: `#!/bin/bash
echo '=== Disk Usage ==='
df -h
echo -e '\\n=== Directory Sizes ==='
du -sh /*
echo -e '\\n=== LVM Volumes ==='
sudo lvs
echo -e '\\n=== Physical Volumes ==='
sudo pvs`,
    pythonScript: `#!/usr/bin/env python3
import os
import psutil

disk = psutil.disk_usage('/')
print(f'Total: {disk.total / (1024**3):.2f}GB')
print(f'Used: {disk.used / (1024**3):.2f}GB')
print(f'Free: {disk.free / (1024**3):.2f}GB')
print(f'Percent: {disk.percent}%')`,
  },
  '5': {
    title: 'Users, Permissions & SELinux',
    category: 'Daily Operations',
    difficulty: 'advanced',
    icon: '🔐',
    description: 'Control access with useradd, chmod, and SELinux policies.',
    content: `Manage user accounts, file permissions, and SELinux security policies. Implement least privilege access controls.`,
    bashScript: `#!/bin/bash
echo '=== Creating User ==='
sudo useradd -m -s /bin/bash newuser
echo -e '\\n=== Setting Permissions ==='
sudo chmod 755 /home/newuser
echo -e '\\n=== SELinux Status ==='
getenforce
echo -e '\\n=== User Groups ==='
groups newuser`,
    pythonScript: `#!/usr/bin/env python3
import subprocess
import pwd

print('System Users:')
try:
    for user in pwd.getwall():
        print(f'{user.pw_name} (UID: {user.pw_uid})')
except:
    print('Unable to list users')`,
  },
  '6': {
    title: 'Performance Troubleshooting',
    category: 'Daily Operations',
    difficulty: 'advanced',
    icon: '⚡',
    description: 'Diagnose and fix performance issues using top, iostat, and vmstat.',
    content: `Identify performance bottlenecks using system profiling tools. Analyze CPU, memory, disk I/O, and network performance.`,
    bashScript: `#!/bin/bash
echo '=== CPU Performance ==='
top -bn1 | head -15
echo -e '\\n=== Disk I/O ==='
iostat -x 1 3
echo -e '\\n=== Memory Stats ==='
vmstat 1 3`,
    pythonScript: `#!/usr/bin/env python3
import psutil
import time

print('Performance Metrics:')
print(f'CPU Percent: {psutil.cpu_percent(interval=1)}%')
print(f'Memory: {psutil.virtual_memory().percent}%')
print(f'Disk I/O: {psutil.disk_io_counters()}')`,
  },
  '7': {
    title: 'Service & Process Management',
    category: 'Daily Operations',
    difficulty: 'beginner',
    icon: '🔧',
    description: 'Control services with systemctl and manage processes effectively.',
    content: `Master systemctl for service management. Start, stop, enable, and manage system services and daemons.`,
    bashScript: `#!/bin/bash
echo '=== Service Status ==='
sudo systemctl status sshd
echo -e '\\n=== Enable Service ==='
sudo systemctl enable sshd
echo -e '\\n=== Restart Service ==='
sudo systemctl restart sshd
echo -e '\\n=== List All Services ==='
systemctl list-units --type=service`,
    pythonScript: `#!/usr/bin/env python3
import subprocess

def check_service(service):
    result = subprocess.run(['systemctl', 'is-active', service], capture_output=True, text=True)
    return result.stdout.strip()

print(f'SSH Status: {check_service("sshd")}')`,
  },
  '8': {
    title: 'Backups & Recovery',
    category: 'Daily Operations',
    difficulty: 'advanced',
    icon: '💾',
    description: 'Implement reliable backups using rsync, tar, and restore procedures.',
    content: `Create and manage system backups. Implement backup strategies, test recovery procedures, and automate backups.`,
    bashScript: `#!/bin/bash
echo '=== Creating Backup ==='
sudo tar -czf /backup/system-$(date +%Y%m%d).tar.gz /home /etc
echo -e '\\n=== Using rsync ==='
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
    title: 'Hardware Issues on Physical Servers',
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
    title: 'AWS EC2 & SSM Patch Manager',
    category: 'AWS',
    difficulty: 'intermediate',
    icon: '☁️',
    description: 'Manage RHEL instances on AWS with EC2, SSM, and patch automation.',
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

ec2 = boto3.client('ec2', region_name='us-east-1')
instances = ec2.describe_instances()
for reservation in instances['Reservations']:
    for instance in reservation['Instances']:
        print(f"Instance: {instance['InstanceId']}")`,
  },
  '11': {
    title: 'Fresh RHEL 9 Installation',
    category: 'Major Projects',
    difficulty: 'beginner',
    icon: '🚀',
    description: 'Complete guide to installing RHEL 9 on physical servers and AWS EC2.',
    content: `Step-by-step RHEL 9 installation guide. Covers physical servers, AWS EC2, and post-installation configuration.`,
    bashScript: `#!/bin/bash
echo '=== Post-Installation Setup ==='
sudo dnf update -y
sudo dnf install -y wget curl git vim
echo '=== Enable EPEL ==='
sudo dnf install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm
echo '=== System Ready ==='
uname -a`,
    pythonScript: `#!/usr/bin/env python3
import platform

print(f'OS: {platform.system()}')
print(f'Release: {platform.release()}')
print(f'Version: {platform.version()}')`,
  },
  '12': {
    title: 'RHEL 8 to 9 Major Upgrade',
    category: 'Major Projects',
    difficulty: 'advanced',
    icon: '📈',
    description: 'Safely upgrade from RHEL 8 to 9 using Leapp with zero downtime.',
    content: `In-place upgrade from RHEL 8 to RHEL 9 using Leapp. Includes pre-upgrade checks, migration, and post-upgrade validation.`,
    bashScript: `#!/bin/bash
echo '=== Pre-upgrade Check ==='
sudo leapp preupgrade
echo -e '\\n=== Upgrade System ==='
sudo leapp upgrade
echo -e '\\n=== Reboot ==='
sudo reboot`,
    pythonScript: `#!/usr/bin/env python3
import subprocess

result = subprocess.run(['cat', '/etc/os-release'], capture_output=True, text=True)
print('Current OS:')
print(result.stdout)`,
  }
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

export default function GuideDetailPage({ params }: { params: { id: string } }) {
  const guide = GUIDE_DETAILS[params.id];
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    bash: true,
    python: false,
  });

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
              Guide not found
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              The guide you're looking for doesn't exist.
            </p>
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
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {guide.content}
          </div>
        </div>

        {/* Bash Script */}
        <div className="bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border mb-8 overflow-hidden">
          <button
            onClick={() => setExpandedSections(prev => ({ ...prev, bash: !prev.bash }))}
            className="w-full px-8 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-dark-border transition-colors"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Bash Script</h3>
            {expandedSections.bash ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {expandedSections.bash && (
            <div className="border-t border-gray-200 dark:border-dark-border p-8">
              <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
                <code className="text-green-400 font-mono text-sm whitespace-pre-wrap break-words">
                  {guide.bashScript}
                </code>
              </div>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => copyToClipboard(guide.bashScript)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
                <button
                  onClick={() => downloadScript(`${guide.title.toLowerCase().replace(/\s+/g, '-')}.sh`, guide.bashScript)}
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
            onClick={() => setExpandedSections(prev => ({ ...prev, python: !prev.python }))}
            className="w-full px-8 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-dark-border transition-colors"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Python Script</h3>
            {expandedSections.python ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {expandedSections.python && (
            <div className="border-t border-gray-200 dark:border-dark-border p-8">
              <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
                <code className="text-blue-400 font-mono text-sm whitespace-pre-wrap break-words">
                  {guide.pythonScript}
                </code>
              </div>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => copyToClipboard(guide.pythonScript)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
                <button
                  onClick={() => downloadScript(`${guide.title.toLowerCase().replace(/\s+/g, '-')}.py`, guide.pythonScript)}
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
  );
}
