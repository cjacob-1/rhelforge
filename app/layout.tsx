import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'RHELForge - RHEL Administration Platform',
  description: 'The #1 platform for RHEL administrators with step-by-step guides, AI chatbot, and automation scripts.',
  keywords: 'RHEL, Red Hat, Linux, Administration, Guides, Automation, Scripts',
  authors: [{ name: 'Chidi Jacob' }],
  openGraph: {
    title: 'RHELForge - RHEL Administration Platform',
    description: 'Master RHEL administration with guides, AI assistance, and scripts',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
