import Link from 'next/link';
import { Download, ChevronRight } from 'lucide-react';

interface Guide {
  id: string;
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  icon: string;
}

export default function GuideCard({ guide }: { guide: Guide }) {
  const difficultyColors = {
    beginner: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    intermediate: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    advanced: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
  };

  return (
    <Link href={`/guides/${guide.id}`}>
      <div className="h-full p-6 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card hover:shadow-lg transition-all hover:border-rhel-red dark:hover:border-rhel-red cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <span className="text-4xl">{guide.icon}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${difficultyColors[guide.difficulty]}`}>
            {guide.difficulty}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {guide.title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          {guide.category}
        </p>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {guide.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-dark-border">
          <button
            onClick={(e) => {
              e.preventDefault();
              // Download functionality would go here
            }}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-rhel-red transition-colors"
          >
            <Download className="w-4 h-4" />
            Scripts
          </button>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-rhel-red transition-colors" />
        </div>
      </div>
    </Link>
  );
}
