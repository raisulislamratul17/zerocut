# Zero Cut

> A modern, feature-rich Next.js 16 application with TypeScript, Tailwind CSS, and shadcn/ui components.

![Zero Cut](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwind-css)

## 📖 About

Zero Cut is a comprehensive web application built with the latest technologies, featuring a stunning landing page, a powerful admin dashboard, and seamless dark/light mode support. The project showcases modern development practices with a focus on performance, accessibility, and user experience.

## ✨ Features

### 🎨 Landing Page
- **Responsive Design**: Mobile-first approach with beautiful layouts across all devices
- **Theme Support**: Seamless light/dark mode switching with smooth animations
- **Modern UI**: Built with shadcn/ui components for a polished look
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **Multiple Sections**: Hero, Services, About, Philosophy, and Contact

### 📊 Admin Dashboard
- **Real-time Analytics**: Visual data representation with charts
- **Project Management**: Full CRUD operations for projects
- **Message System**: View and manage incoming messages
- **Quick Actions**: Fast navigation to key features
- **Tab-based Navigation**: Instant switching between Dashboard, Projects, Analytics, Messages, and Settings
- **Modal Dialogs**: Beautiful modals for adding and editing projects
- **Responsive Layout**: Works perfectly on desktop and mobile

### 🛠️ Technical Features
- **Type-Safe**: Full TypeScript implementation
- **Database Integration**: Prisma ORM with SQLite
- **API Routes**: RESTful API endpoints
- **Form Validation**: React Hook Form with Zod schema
- **State Management**: Zustand for client state, TanStack Query for server state
- **Authentication**: NextAuth.js v4 ready
- **Real-time Support**: WebSocket/Socket.io integration ready

## 🚀 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **UI Components** | shadcn/ui (Radix UI primitives) |
| **Icons** | Lucide React |
| **Database** | Prisma ORM (SQLite) |
| **Animations** | Framer Motion |
| **Forms** | React Hook Form + Zod |
| **State Management** | Zustand, TanStack Query |
| **Authentication** | NextAuth.js v4 |
| **Charts** | Recharts |
| **Rich Text** | MDXEditor |

## 📦 Installation

### Prerequisites
- Node.js 18+ or Bun
- Git

### Clone the Repository

```bash
git clone https://github.com/raisulislamratul17/zerocut.git
cd zerocut
```

### Install Dependencies

Using Bun (recommended):
```bash
bun install
```

Using npm:
```bash
npm install
```

### Setup Database

```bash
# Push schema to database
bun run db:push

# Or run migrations
bun run db:migrate
```

## 🎬 Running the Project

### Development Mode

```bash
bun run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
bun run build
```

### Start Production Server

```bash
bun run start
```

### Lint Code

```bash
bun run lint
```

## 📂 Project Structure

```
zerocut/
├── src/
│   ├── app/                  # Next.js app router
│   │   ├── admin/           # Admin dashboard pages
│   │   ├── api/             # API routes
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/
│   │   ├── theme/           # Theme components
│   │   └── ui/              # shadcn/ui components
│   ├── hooks/               # Custom React hooks
│   └── lib/                 # Utility functions
├── prisma/
│   └── schema.prisma        # Database schema
├── public/                  # Static assets
├── examples/                # Example implementations
├── db/                      # Database files
└── mini-services/          # Additional services
```

## 🎨 Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run db:push` | Push schema to database |
| `bun run db:generate` | Generate Prisma Client |
| `bun run db:migrate` | Run database migrations |
| `bun run db:reset` | Reset database |

## 🌙 Theme Support

Zero Cut supports both light and dark themes. The theme preference is automatically persisted and follows system preferences by default.

### Theme Toggle

The application includes a beautiful animated theme toggle in the navigation bar. You can switch between light and dark modes with a smooth transition animation.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (< 640px)
- Tablets (640px - 1024px)
- Desktops (> 1024px)

## 🔒 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="file:./db/custom.db"

# NextAuth (if using authentication)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# API Keys (as needed)
# Add your API keys here
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Use TypeScript for all new code
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible UI primitives
- [Framer Motion](https://www.framer.com/motion/) - Production-ready animation library
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Lucide](https://lucide.dev/) - Beautiful & consistent icons

## 📞 Contact

For questions, suggestions, or feedback, please open an issue on GitHub or contact the maintainers.

---

Made with ❤️ by [Raisul Islam Ratul](https://github.com/raisulislamratul17)

**Zero Cut** - Where creativity meets technology.
