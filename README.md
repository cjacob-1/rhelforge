# RHELForge - The #1 Platform for RHEL Administrators

**Platform Owner & Publisher:** Chidi Jacob  
**Contact Email:** emailchidijacob@gmail.com  
**Platform Status:** Production Ready ✅

---

A production-ready web platform providing step-by-step guides, AI-powered troubleshooting, and automation scripts for Red Hat Enterprise Linux (RHEL) administrators.

## Features

✅ **Comprehensive Guide Library**
- 12+ step-by-step guides covering daily operations
- Major project guides (fresh install, upgrades, patching)
- Physical server and AWS EC2 variants
- Each guide includes Bash and Python scripts
- Copy & download functionality

✅ **AI Chatbot (ForgeBot)**
- Paste error messages, logs, or describe problems
- Get instant solutions with auto-generated scripts
- Ultra-simplified explanations for beginners
- Supports journalctl, dmesg, and system error analysis
- Production-ready code examples

✅ **Production-Ready Features**
- User authentication (email/password + OAuth)
- Progress tracking and checklists
- PDF export for guides and solutions
- Dark/light mode toggle
- Fully responsive mobile design
- Offline-friendly guide access

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui
- **Backend**: Next.js API Routes, Supabase
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-4
- **Hosting**: Vercel + Supabase
- **Storage**: Supabase Storage

## Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm
- Supabase account (free tier available)
- OpenAI API key
- Vercel account (for deployment)

### Local Development

1. **Clone and install dependencies**
```bash
cd rhelforge
npm install
# or
pnpm install
```

2. **Set up environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your credentials:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
# - OPENAI_API_KEY
```

3. **Run development server**
```bash
npm run dev
# or
pnpm dev
```

Visit `http://localhost:3000`

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/rhelforge.git
git push -u origin main
```

2. **Deploy to Vercel**
```bash
npm install -g vercel
vercel
```

3. **Configure environment variables in Vercel dashboard**
   - Add all variables from `.env.example`

4. **Your site is live!**

### Deploy to AWS Lightsail (Alternative)

1. **Create Lightsail instance**
```bash
aws lightsail create-instances \
  --instance-name rhelforge \
  --availability-zone us-east-1a \
  --blueprint-id nodejs_18
```

2. **SSH into instance and deploy**
```bash
ssh -i ~/.ssh/lightsail.pem ubuntu@your-instance-ip

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repo
git clone https://github.com/yourusername/rhelforge.git
cd rhelforge

# Install and build
npm install
npm run build

# Start with PM2
npm install -g pm2
pm2 start npm --name "rhelforge" -- start
pm2 startup
pm2 save
```

## Database Setup (Supabase)

### Create Tables

```sql
-- Guides table
CREATE TABLE guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  difficulty TEXT,
  content TEXT,
  bash_script TEXT,
  python_script TEXT,
  physical_steps TEXT,
  aws_steps TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Chat history table
CREATE TABLE chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  message TEXT,
  response TEXT,
  bash_script TEXT,
  python_script TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;
```

## API Endpoints

### Chat API
```
POST /api/chat
Content-Type: application/json

{
  "message": "error message or question",
  "conversationHistory": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}

Response:
{
  "response": "solution text",
  "bashScript": "#!/bin/bash\n...",
  "pythonScript": "#!/usr/bin/env python3\n..."
}
```

## Guides Included

### Daily Operations (7 guides)
1. **System Monitoring & Logs** - Monitor performance, analyze logs with journalctl
2. **Patching & Package Management** - dnf, yum, rpm for secure updates
3. **Network & DNS Troubleshooting** - Fix connectivity with nmcli, systemctl
4. **Disk & Storage Management** - LVM, partitions, mount, storage optimization
5. **Users, Permissions & SELinux** - Access control and security policies
6. **Performance Troubleshooting** - Diagnose bottlenecks with top, iostat, vmstat
7. **Service & Process Management** - systemctl for service control

### AWS Integration (1 guide)
8. **AWS EC2 & SSM Patch Manager** - Deploy and manage RHEL on AWS

### Major Projects (2 guides)
9. **Fresh RHEL 9 Installation** - Complete installation guide
10. **RHEL 8 to 9 Major Upgrade** - In-place upgrade with Leapp

### Additional Guides (2+ guides)
11. **Hardware Issues on Physical Servers** - Diagnose hardware problems
12. **Backups & Recovery Strategies** - Implement reliable backups

Each guide includes:
- Detailed explanation with best practices
- Step-by-step instructions
- Production-ready Bash script
- Python automation script
- Copy & download functionality
- Difficulty level indicator

## ForgeBot System Prompt

ForgeBot is configured to:
1. Analyze RHEL errors, logs, and system output
2. Provide ultra-simplified, jargon-free explanations
3. Generate production-ready Bash and Python scripts
4. Include physical server and AWS-specific guidance
5. Explain why solutions work
6. Highlight common pitfalls and best practices

See `lib/openai.ts` for the complete system prompt.

## Project Structure

```
rhelforge/
├── app/
│   ├── page.tsx                 # Home page with owner info
│   ├── guides/
│   │   ├── page.tsx            # Guides library
│   │   └── [id]/page.tsx       # Guide detail with scripts
│   ├── chatbot/
│   │   └── page.tsx            # ForgeBot chat interface
│   ├── dashboard/
│   │   └── page.tsx            # User dashboard
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── api/
│   │   └── chat/route.ts       # Chat API endpoint
│   ├── layout.tsx              # Root layout with footer
│   └── globals.css             # Global styles
├── components/
│   ├── Navigation.tsx          # Top navigation bar
│   ├── Footer.tsx              # Footer with owner info
│   ├── GuideCard.tsx          # Guide card component
│   ├── ThemeProvider.tsx      # Dark mode provider
│   └── AIChatBox.tsx          # Chat interface
├── lib/
│   ├── supabase.ts            # Supabase client
│   └── openai.ts              # OpenAI integration
├── scripts/
│   └── seed-guides.json       # Guide seed data
├── public/                     # Static assets
├── .env.example               # Environment template
├── next.config.js             # Next.js config
├── tailwind.config.ts         # Tailwind config
├── tsconfig.json              # TypeScript config
└── README.md                  # This file
```

## Seed Database with Guides

Run the seed script to populate the database with 12+ guides:

```bash
npm run seed
# or
node scripts/seed.js
```

## Platform Owner & Publisher Information

**RHELForge** is owned and published by **Chidi Jacob**, a leading expert in enterprise Linux administration and system architecture.

### Contact Information
- **Email:** emailchidijacob@gmail.com
- **Platform:** RHELForge - The #1 Resource for RHEL Administrators
- **Website:** https://rhelforge.com (when deployed)

### About the Publisher
Chidi Jacob brings years of experience in:
- RHEL system administration
- Enterprise Linux infrastructure
- Cloud deployment (AWS, Azure, GCP)
- DevOps and automation
- System architecture and optimization

### Support & Inquiries
For issues, feature requests, partnerships, or general inquiries about RHELForge, please contact:
- **Email:** emailchidijacob@gmail.com
- **Subject:** RHELForge Inquiry

---

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

For major changes, please open an issue first to discuss proposed changes.

## License

MIT License - see LICENSE file for details

## Support

For issues, questions, or suggestions:
- Email: emailchidijacob@gmail.com
- Open an issue on GitHub (when published)

## Roadmap

- [ ] Advanced search with full-text indexing
- [ ] Community guide contributions
- [ ] Video tutorials
- [ ] Mobile app (React Native)
- [ ] Integration with RHEL Insights
- [ ] Slack bot integration
- [ ] Email notifications for new guides
- [ ] Certification tracking
- [ ] Performance benchmarking tools
- [ ] Custom script builder

---

## Acknowledgments

- Red Hat Enterprise Linux documentation
- OpenAI for GPT-4 API
- Vercel for hosting infrastructure
- Supabase for backend services
- shadcn/ui for component library
- Tailwind CSS for styling framework

---

**Last Updated:** April 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅

---

**RHELForge** - Empowering RHEL Administrators Worldwide  
*Published by Chidi Jacob | emailchidijacob@gmail.com*
