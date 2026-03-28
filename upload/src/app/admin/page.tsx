'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from '@/components/theme/theme-toggle'

// Types
interface OverviewStats {
  totalViews: number
  viewsChange: number
  uniqueVisitors: number
  visitorsChange: number
  avgSessionDuration: string
  sessionChange: number
  bounceRate: number
  bounceChange: number
}

interface DailyTraffic {
  date: string
  visitors: number
  views: number
}

interface TrafficSource {
  name: string
  value: number
  color: string
}

interface Project {
  id: number
  title: string
  views: number
  engagement: number
  status: string
}

interface Activity {
  type: string
  project?: string
  message?: string
  time: string
  platform?: string
}

interface GeographicData {
  country: string
  visitors: number
  percentage: number
}

interface StatsData {
  overview: OverviewStats
  traffic: {
    daily: DailyTraffic[]
    sources: TrafficSource[]
  }
  projects: Project[]
  recentActivity: Activity[]
  geographic: GeographicData[]
}

// Format number with commas
function formatNumber(num: number): string {
  return num.toLocaleString()
}

// Stat Card Component
function StatCard({ 
  label, 
  value, 
  change
}: { 
  label: string
  value: string | number
  change?: number
}) {
  return (
    <div className="p-8 border-b border-[#1A1A1A] group hover:border-[var(--accent)]/30 transition-colors duration-500">
      <span className="text-label">{label}</span>
      <div className="mt-4 flex items-end justify-between">
        <span className="text-3xl md:text-4xl font-light tracking-tight">{value}</span>
        {change !== undefined && (
          <span className={`text-sm ${change >= 0 ? 'text-[var(--accent)]' : 'text-[#666666]'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
    </div>
  )
}

// Mini Chart Component
function MiniChart({ data }: { data: DailyTraffic[] }) {
  const maxVisitors = Math.max(...data.map(d => d.visitors))
  
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((day, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div 
            className="w-full bg-foreground/10 group-hover:bg-[var(--accent)]/20 transition-colors"
            style={{ 
              height: `${(day.visitors / maxVisitors) * 100}%`,
              minHeight: '4px'
            }}
          />
        </div>
      ))}
    </div>
  )
}

// Traffic Bar Chart
function TrafficBarChart({ data }: { data: DailyTraffic[] }) {
  const maxViews = Math.max(...data.map(d => d.views))
  
  return (
    <div className="space-y-4">
      {data.map((day, i) => (
        <div key={i} className="flex items-center gap-4">
          <span className="w-8 text-xs text-muted-foreground font-mono">{day.date}</span>
          <div className="flex-1 h-8 bg-secondary/50 relative overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-foreground/20 to-foreground/5 transition-all duration-500"
              style={{ width: `${(day.views / maxViews) * 100}%` }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {formatNumber(day.views)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Traffic Sources Donut (simplified as bars)
function TrafficSources({ sources }: { sources: TrafficSource[] }) {
  return (
    <div className="space-y-3">
      {sources.map((source, i) => (
        <div key={i} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{source.name}</span>
            <span className="font-mono">{source.value}%</span>
          </div>
          <div className="h-1 bg-secondary overflow-hidden">
            <div 
              className="h-full transition-all duration-500"
              style={{ 
                width: `${source.value}%`,
                backgroundColor: source.color 
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// Project Row
function ProjectRow({ project }: { project: Project }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0 hover:bg-secondary/30 px-2 -mx-2 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-secondary relative overflow-hidden">
          <Image
            src={`/images/${project.title.toLowerCase()}.png`}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium">{project.title}</h4>
          <span className={`text-xs ${project.status === 'featured' ? 'text-[var(--accent)]' : 'text-muted-foreground'}`}>
            {project.status}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="text-right">
          <span className="text-sm text-muted-foreground">Views</span>
          <p className="font-mono">{formatNumber(project.views)}</p>
        </div>
        <div className="text-right w-16">
          <span className="text-sm text-muted-foreground">Eng.</span>
          <p className="font-mono">{project.engagement}%</p>
        </div>
      </div>
    </div>
  )
}

// Activity Item
function ActivityItem({ activity }: { activity: Activity }) {
  const getIcon = () => {
    switch (activity.type) {
      case 'view':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )
      case 'contact':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        )
      case 'share':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex items-start gap-3 py-3 border-b border-border/50 last:border-0">
      <div className="text-muted-foreground mt-0.5">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm truncate">
          {activity.type === 'view' && `Viewed "${activity.project}"`}
          {activity.type === 'contact' && activity.message}
          {activity.type === 'share' && `Shared "${activity.project}" on ${activity.platform}`}
        </p>
        <span className="text-xs text-muted-foreground">{activity.time}</span>
      </div>
    </div>
  )
}

// Geographic Bar
function GeographicBar({ data }: { data: GeographicData }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{data.country}</span>
        <span className="font-mono">{formatNumber(data.visitors)}</span>
      </div>
      <div className="h-1.5 bg-secondary overflow-hidden">
        <div 
          className="h-full bg-foreground/30 hover:bg-[var(--accent)]/50 transition-colors"
          style={{ width: `${data.percentage}%` }}
        />
      </div>
    </div>
  )
}

// Sidebar Navigation
function Sidebar() {
  const menuItems = [
    { label: 'Dashboard', href: '/admin', active: true },
    { label: 'Projects', href: '/admin/projects' },
    { label: 'Analytics', href: '/admin/analytics' },
    { label: 'Messages', href: '/admin/messages' },
    { label: 'Settings', href: '/admin/settings' },
  ]

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col fixed left-0 top-0 bottom-0">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-lg font-medium tracking-tight">Zero Cut</span>
          <div className="w-px h-4 bg-border" />
          <span className="text-xs tracking-widest text-muted-foreground uppercase">Admin</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a 
                href={item.href}
                className={`block px-4 py-3 text-sm transition-colors ${
                  item.active 
                    ? 'text-foreground bg-muted' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* User */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center text-sm font-medium text-black">
            ZC
          </div>
          <div>
            <p className="text-sm">Studio Admin</p>
            <span className="text-xs text-muted-foreground">admin@zerocut.com</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

// Header
function Header() {
  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-8">
      <div>
        <h1 className="text-lg font-medium">Dashboard</h1>
        <p className="text-xs text-muted-foreground">Welcome back, Studio Admin</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
        <ThemeToggle />
        <Link 
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          View Site
        </Link>
      </div>
    </header>
  )
}

// Main Admin Page
export default function AdminPage() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats')
        const data = await res.json()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Failed to load stats</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-8 bg-background min-h-[calc(100vh-4rem)]">
          {/* Stats Overview */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="editorial-subhead">Overview</h2>
              <span className="text-xs text-muted-foreground">Last 7 days</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard 
                label="Total Views" 
                value={formatNumber(stats.overview.totalViews)}
                change={stats.overview.viewsChange}
              />
              <StatCard 
                label="Unique Visitors" 
                value={formatNumber(stats.overview.uniqueVisitors)}
                change={stats.overview.visitorsChange}
              />
              <StatCard 
                label="Avg. Session" 
                value={stats.overview.avgSessionDuration}
                change={stats.overview.sessionChange}
              />
              <StatCard 
                label="Bounce Rate" 
                value={`${stats.overview.bounceRate}%`}
                change={stats.overview.bounceChange}
              />
            </div>
          </section>

          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-8">
            {/* Traffic Chart - Larger */}
            <section className="col-span-12 lg:col-span-8">
              <div className="bg-background border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-medium">Weekly Traffic</h3>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-foreground/20" />
                      Views
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[var(--accent)]/50" />
                      Visitors
                    </span>
                  </div>
                </div>
                <TrafficBarChart data={stats.traffic.daily} />
              </div>
            </section>

            {/* Traffic Sources */}
            <section className="col-span-12 lg:col-span-4">
              <div className="bg-background border border-border p-6 h-full">
                <h3 className="font-medium mb-6">Traffic Sources</h3>
                <TrafficSources sources={stats.traffic.sources} />
              </div>
            </section>

            {/* Projects Performance */}
            <section className="col-span-12 lg:col-span-7">
              <div className="bg-background border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Project Performance</h3>
                  <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    View All
                  </a>
                </div>
                <div className="divide-y divide-border">
                  {stats.projects.map((project) => (
                    <ProjectRow key={project.id} project={project} />
                  ))}
                </div>
              </div>
            </section>

            {/* Recent Activity */}
            <section className="col-span-12 lg:col-span-5">
              <div className="bg-background border border-border p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Recent Activity</h3>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                <div>
                  {stats.recentActivity.map((activity, i) => (
                    <ActivityItem key={i} activity={activity} />
                  ))}
                </div>
              </div>
            </section>

            {/* Geographic Distribution */}
            <section className="col-span-12 lg:col-span-6">
              <div className="bg-background border border-border p-6">
                <h3 className="font-medium mb-6">Geographic Distribution</h3>
                <div className="space-y-4">
                  {stats.geographic.map((geo, i) => (
                    <GeographicBar key={i} data={geo} />
                  ))}
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="col-span-12 lg:col-span-6">
              <div className="bg-card border border-border p-6 h-full">
                <h3 className="font-medium mb-6 text-foreground/80">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 border border-border hover:border-[var(--accent)]/50 transition-colors text-left group">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3 text-muted-foreground group-hover:text-[var(--accent)] transition-colors">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <span className="text-sm text-foreground/80">Add Project</span>
                  </button>
                  <button className="p-4 border border-border hover:border-[var(--accent)]/50 transition-colors text-left group">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3 text-muted-foreground group-hover:text-[var(--accent)] transition-colors">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span className="text-sm text-foreground/80">Upload Media</span>
                  </button>
                  <button className="p-4 border border-border hover:border-[var(--accent)]/50 transition-colors text-left group">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3 text-muted-foreground group-hover:text-[var(--accent)] transition-colors">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span className="text-sm text-foreground/80">View Messages</span>
                  </button>
                  <button className="p-4 border border-border hover:border-[var(--accent)]/50 transition-colors text-left group">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3 text-muted-foreground group-hover:text-[var(--accent)] transition-colors">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                    <span className="text-sm text-foreground/80">Settings</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
