import Link from 'next/link';
import { BookOpen, Bot, Zap, Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-bg dark:to-dark-card">
      {/* Hero Section */}
      <section className="px-4 py-20 sm:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <div className="bg-rhel-red/10 dark:bg-rhel-red/20 rounded-full p-3">
              <Zap className="w-8 h-8 text-rhel-red" />
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            RHELForge
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-4">
            The #1 Platform for RHEL Administrators
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Master Red Hat Enterprise Linux with step-by-step guides, AI-powered troubleshooting, and production-ready automation scripts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/guides"
              className="inline-flex items-center justify-center px-8 py-3 bg-rhel-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Browse Guides
            </Link>
            <Link
              href="/chatbot"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Bot className="w-5 h-5 mr-2" />
              Ask ForgeBot
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-white dark:bg-dark-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Everything You Need
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-lg border border-gray-200 dark:border-dark-border hover:shadow-lg transition-shadow">
              <BookOpen className="w-12 h-12 text-rhel-red mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                Comprehensive Guides
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                20+ step-by-step guides covering daily operations, troubleshooting, and major projects.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>✓ System monitoring & logs</li>
                <li>✓ Patching & package management</li>
                <li>✓ Network & DNS issues</li>
                <li>✓ Storage & disk management</li>
                <li>✓ AWS EC2 & SSM integration</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-lg border border-gray-200 dark:border-dark-border hover:shadow-lg transition-shadow">
              <Bot className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                AI Chatbot (ForgeBot)
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Paste error messages, logs, or describe your problem. Get instant solutions with scripts.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>✓ Error message analysis</li>
                <li>✓ Log interpretation</li>
                <li>✓ Auto-generated Bash scripts</li>
                <li>✓ Auto-generated Python scripts</li>
                <li>✓ Beginner-friendly explanations</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-lg border border-gray-200 dark:border-dark-border hover:shadow-lg transition-shadow">
              <Zap className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                Automation Scripts
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Production-ready Bash and Python scripts for every guide and solution.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>✓ One-click downloads</li>
                <li>✓ Parameterized & customizable</li>
                <li>✓ Error handling included</li>
                <li>✓ Heavily commented</li>
                <li>✓ Physical & AWS variants</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Publisher Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border p-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              About This Platform
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">
              <span className="font-semibold text-gray-900 dark:text-white">RHELForge</span> is published and maintained by <span className="font-semibold text-gray-900 dark:text-white">Chidi Jacob</span>, a leading expert in enterprise Linux administration and system architecture.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Platform Owner</h3>
                <p className="text-gray-600 dark:text-gray-400">Chidi Jacob</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Contact</h3>
                <a href="mailto:emailchidijacob@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                  emailchidijacob@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Master RHEL?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Start with our guides or ask ForgeBot for instant help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/guides"
              className="inline-flex items-center justify-center px-8 py-3 bg-rhel-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <Search className="w-5 h-5 mr-2" />
              Explore Guides
            </Link>
            <Link
              href="/chatbot"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-dark-card transition-colors"
            >
              <Bot className="w-5 h-5 mr-2" />
              Start Chatting
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
