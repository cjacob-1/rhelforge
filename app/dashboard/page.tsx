'use client';

import { BookOpen, CheckCircle, Clock, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your learning progress and completed tasks
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Guides Read</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">12</p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Tasks Completed</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">8</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Time Spent</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">24h</p>
              </div>
              <Clock className="w-12 h-12 text-purple-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Progress</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">67%</p>
              </div>
              <TrendingUp className="w-12 h-12 text-rhel-red opacity-20" />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              { title: 'Completed: System Monitoring & Logs', time: '2 hours ago' },
              { title: 'Started: Network & DNS Troubleshooting', time: '5 hours ago' },
              { title: 'Downloaded: Patching Script', time: '1 day ago' },
              { title: 'Completed: Disk Management Guide', time: '2 days ago' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-dark-border last:border-0">
                <p className="text-gray-900 dark:text-white">{activity.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Placeholder for logged-in features */}
        <div className="mt-8 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-blue-900 dark:text-blue-200">
            💡 <strong>Note:</strong> Dashboard features like progress tracking, task checklists, and personalized recommendations are available when you log in.
          </p>
        </div>
      </div>
    </div>
  );
}
