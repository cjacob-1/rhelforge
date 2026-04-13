'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, Download } from 'lucide-react';
import GuideCard from '@/components/GuideCard';

const SAMPLE_GUIDES = [
  {
    id: '1',
    title: 'System Monitoring & Logs',
    category: 'Daily Operations',
    difficulty: 'beginner' as const,
    description: 'Learn to monitor system performance and analyze logs using journalctl, dmesg, and top.',
    icon: '📊',
  },
  {
    id: '2',
    title: 'Patching & Package Management',
    category: 'Daily Operations',
    difficulty: 'intermediate' as const,
    description: 'Master dnf, yum, and rpm for secure and efficient package updates.',
    icon: '📦',
  },
  {
    id: '3',
    title: 'Network & DNS Troubleshooting',
    category: 'Daily Operations',
    difficulty: 'intermediate' as const,
    description: 'Fix network issues using nmcli, systemctl, and DNS configuration.',
    icon: '🌐',
  },
  {
    id: '4',
    title: 'Disk & Storage Management',
    category: 'Daily Operations',
    difficulty: 'intermediate' as const,
    description: 'Manage LVM, partitions, and storage with df, du, and mount commands.',
    icon: '💾',
  },
  {
    id: '5',
    title: 'Users, Permissions & SELinux',
    category: 'Daily Operations',
    difficulty: 'advanced' as const,
    description: 'Control access with useradd, chmod, and SELinux policies.',
    icon: '🔐',
  },
  {
    id: '6',
    title: 'Performance Troubleshooting',
    category: 'Daily Operations',
    difficulty: 'advanced' as const,
    description: 'Diagnose and fix performance issues using top, iostat, and vmstat.',
    icon: '⚡',
  },
  {
    id: '7',
    title: 'Service & Process Management',
    category: 'Daily Operations',
    difficulty: 'beginner' as const,
    description: 'Control services with systemctl and manage processes effectively.',
    icon: '🔧',
  },
  {
    id: '8',
    title: 'Backups & Recovery',
    category: 'Daily Operations',
    difficulty: 'advanced' as const,
    description: 'Implement reliable backups using rsync, tar, and restore procedures.',
    icon: '💾',
  },
  {
    id: '9',
    title: 'Hardware Issues on Physical Servers',
    category: 'Daily Operations',
    difficulty: 'advanced' as const,
    description: 'Diagnose hardware problems with lspci, dmidecode, and sensors.',
    icon: '🖥️',
  },
  {
    id: '10',
    title: 'AWS EC2 & SSM Patch Manager',
    category: 'AWS',
    difficulty: 'intermediate' as const,
    description: 'Manage RHEL instances on AWS with EC2, SSM, and patch automation.',
    icon: '☁️',
  },
  {
    id: '11',
    title: 'Fresh RHEL 9 Installation',
    category: 'Major Projects',
    difficulty: 'beginner' as const,
    description: 'Complete guide to installing RHEL 9 on physical servers and AWS EC2.',
    icon: '🚀',
  },
  {
    id: '12',
    title: 'RHEL 8 to 9 Major Upgrade',
    category: 'Major Projects',
    difficulty: 'advanced' as const,
    description: 'Safely upgrade from RHEL 8 to 9 using Leapp with zero downtime.',
    icon: '📈',
  },
];

const CATEGORIES = ['All', 'Daily Operations', 'AWS', 'Major Projects'];
const DIFFICULTIES = ['All', 'beginner', 'intermediate', 'advanced'];

export default function GuidesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const filteredGuides = useMemo(() => {
    return SAMPLE_GUIDES.filter(guide => {
      const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           guide.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || guide.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            RHEL Administration Guides
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {SAMPLE_GUIDES.length}+ step-by-step guides covering daily operations and major projects
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              <Filter className="w-4 h-4 inline mr-2" />
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-rhel-red text-white'
                      : 'bg-white dark:bg-dark-card text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-dark-border hover:border-rhel-red'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Difficulty
            </label>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                    selectedDifficulty === diff
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-dark-card text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-dark-border hover:border-blue-600'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredGuides.length} of {SAMPLE_GUIDES.length} guides
        </div>

        {/* Guides Grid */}
        {filteredGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map(guide => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No guides found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
