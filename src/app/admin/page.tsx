'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import {
  LayoutDashboard,
  Film,
  BarChart3,
  Mail,
  Settings,
  Plus,
  Link2,
  Upload,
  X,
  Pencil,
  Trash2,
  Play,
  Image as ImageIcon
} from 'lucide-react'

// Types
interface Project {
  id: number
  title: string
  type: string
  year: string
  status: 'published' | 'draft' | 'archived'
  views: number
  engagement: number
  thumbnail: string
  description: string
  client: string
}

interface Message {
  id: number
  name: string
  email: string
  subject: string
  message: string
  date: string
  read: boolean
  priority: 'low' | 'medium' | 'high'
}

// Demo Data
const initialProjects: Project[] = [
  {
    id: 1,
    title: 'Meridian',
    type: 'Brand Film',
    year: '2024',
    status: 'published',
    views: 12543,
    engagement: 78,
    thumbnail: '/images/meridian.png',
    description: 'A cinematic brand film showcasing the journey of Meridian through stunning visuals and narrative storytelling.',
    client: 'Meridian Co.'
  },
  {
    id: 2,
    title: 'Void',
    type: 'Documentary',
    year: '2024',
    status: 'published',
    views: 8762,
    engagement: 85,
    thumbnail: '/images/void.png',
    description: 'An intimate documentary exploring the concept of absence and presence in modern art.',
    client: 'Art Collective'
  },
  {
    id: 3,
    title: 'Pulse',
    type: 'Commercial',
    year: '2024',
    status: 'published',
    views: 23456,
    engagement: 72,
    thumbnail: '/images/pulse.png',
    description: 'High-energy commercial featuring dynamic cuts and motion graphics.',
    client: 'Pulse Fitness'
  },
  {
    id: 4,
    title: 'Echoes',
    type: 'Music Video',
    year: '2023',
    status: 'published',
    views: 45678,
    engagement: 91,
    thumbnail: '/images/echoes.png',
    description: 'Award-winning music video with experimental editing techniques.',
    client: 'Echo Band'
  },
  {
    id: 5,
    title: 'Frame',
    type: 'Short Film',
    year: '2023',
    status: 'draft',
    views: 0,
    engagement: 0,
    thumbnail: '/images/frame.png',
    description: 'A short film about perspective and perception.',
    client: 'Indie Studio'
  },
  {
    id: 6,
    title: 'Shift',
    type: 'Brand Film',
    year: '2023',
    status: 'published',
    views: 15234,
    engagement: 68,
    thumbnail: '/images/shift.png',
    description: 'Brand transformation story through visual evolution.',
    client: 'Shift Technologies'
  }
]

const initialMessages: Message[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@creativeagency.com',
    subject: 'Project Collaboration Inquiry',
    message: 'Hi there, I came across your portfolio and was incredibly impressed by the Meridian project. Our agency is working on a similar brand film and would love to discuss potential collaboration.',
    date: '2024-01-15T10:30:00',
    read: false,
    priority: 'high'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@techstart.io',
    subject: 'Video Production Services',
    message: 'Hello, I am reaching out on behalf of TechStart. We are looking for a video production partner for our upcoming product launch campaign.',
    date: '2024-01-14T15:45:00',
    read: false,
    priority: 'high'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@musiclabel.com',
    subject: 'Music Video Project',
    message: 'Hey! I love your editing style on the Echoes music video. Our label has an upcoming artist who needs a music video with similar aesthetic.',
    date: '2024-01-14T09:20:00',
    read: true,
    priority: 'medium'
  }
]

// Tab variants
const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

// Status Badge
function StatusBadge({ status }: { status: string }) {
  const styles = {
    published: 'bg-green-500/10 text-green-500 border-green-500/20',
    draft: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    archived: 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  }

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`px-2 py-1 text-xs border rounded-full ${styles[status as keyof typeof styles]}`}
    >
      {status}
    </motion.span>
  )
}

// Priority Badge
function PriorityBadge({ priority }: { priority: string }) {
  const styles = {
    high: 'bg-red-500/10 text-red-500 border-red-500/20',
    medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    low: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
  }

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`px-2 py-1 text-xs border rounded-full ${styles[priority as keyof typeof styles]}`}
    >
      {priority}
    </motion.span>
  )
}

// Sidebar Navigation
function Sidebar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: Film },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'messages', label: 'Messages', icon: Mail },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col fixed left-0 top-0 bottom-0 z-40">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg font-medium tracking-tight"
          >
            Zero Cut
          </motion.span>
          <div className="w-px h-4 bg-border" />
          <span className="text-xs tracking-widest text-muted-foreground uppercase">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <motion.button
                onClick={() => setActiveTab(item.id)}
                className={`w-full px-4 py-3 text-sm text-left transition-all flex items-center gap-3 rounded-md ${
                  activeTab === item.id
                    ? 'text-foreground bg-muted'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon size={18} />
                {item.label}
              </motion.button>
            </li>
          ))}
        </ul>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-4 border-t border-border"
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <motion.div
            className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center text-sm font-medium text-black"
            whileHover={{ scale: 1.1 }}
          >
            ZC
          </motion.div>
          <div>
            <p className="text-sm">Studio Admin</p>
            <span className="text-xs text-muted-foreground">admin@zerocut.com</span>
          </div>
        </div>
      </motion.div>
    </aside>
  )
}

// Header
function Header({ activeTab }: { activeTab: string }) {
  const titles = {
    dashboard: 'Dashboard',
    projects: 'Projects',
    analytics: 'Analytics',
    messages: 'Messages',
    settings: 'Settings'
  }

  const subtitles = {
    dashboard: 'Welcome back, Studio Admin',
    projects: 'Manage your portfolio projects',
    analytics: 'Detailed traffic insights and metrics',
    messages: 'Manage your inbox and communications',
    settings: 'Configure your account and preferences'
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-16 bg-background border-b border-border flex items-center justify-between px-8"
    >
      <div>
        <motion.h1 className="text-lg font-medium" key={activeTab}>
          {titles[activeTab as keyof typeof titles]}
        </motion.h1>
        <motion.p className="text-xs text-muted-foreground" key={`subtitle-${activeTab}`}>
          {subtitles[activeTab as keyof typeof subtitles]}
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4"
      >
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
      </motion.div>
    </motion.header>
  )
}

// Modal Component
function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-card border border-border rounded-lg shadow-2xl z-50 max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-medium">{title}</h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-1 hover:bg-secondary rounded-md transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Dashboard Tab
function DashboardTab({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const stats = [
    { label: 'Total Views', value: '124,567', change: 12.5, positive: true },
    { label: 'Projects', value: '6', change: 0, positive: true },
    { label: 'Messages', value: '3', change: 0, positive: true },
    { label: 'Avg. Session', value: '3:24', change: 5.2, positive: true }
  ]

  return (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-card border border-border rounded-lg hover:border-[var(--accent)]/30 transition-all"
          >
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-3xl font-light tracking-tight">{stat.value}</span>
              {stat.change !== 0 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className={`text-sm ${stat.positive ? 'text-green-500' : 'text-red-500'}`}
                >
                  {stat.positive ? '+' : ''}{stat.change}%
                </motion.span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border p-6 rounded-lg"
      >
        <h3 className="font-medium mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Add Project', icon: Plus, action: () => setActiveTab('projects') },
            { label: 'View Messages', icon: Mail, action: () => setActiveTab('messages') },
            { label: 'Analytics', icon: BarChart3, action: () => setActiveTab('analytics') },
            { label: 'Settings', icon: Settings, action: () => setActiveTab('settings') }
          ].map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={action.action}
              className="p-4 border border-border rounded-lg hover:border-[var(--accent)]/50 transition-all text-left"
            >
              <action.icon size={32} className="mb-2 text-[var(--accent)]" />
              <span className="text-sm">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

// Projects Tab
function ProjectsTab({ projects, setProjects }: { projects: Project[]; setProjects: (projects: Project[]) => void }) {
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'archived'>('all')
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const [newProject, setNewProject] = useState({
    title: '',
    type: '',
    year: new Date().getFullYear().toString(),
    status: 'draft' as 'published' | 'draft' | 'archived',
    description: '',
    client: '',
    mediaType: 'image' as 'image' | 'video',
    mediaSource: 'upload' as 'upload' | 'link',
    mediaFile: null as File | null,
    mediaLink: ''
  })

  const filteredProjects = projects.filter(p =>
    filter === 'all' ? true : p.status === filter
  )

  const handleAddProject = () => {
    if (!newProject.title) {
      alert('Please enter a title')
      return
    }

    if (newProject.mediaSource === 'upload' && !newProject.mediaFile) {
      alert('Please select a media file')
      return
    }

    if (newProject.mediaSource === 'link' && !newProject.mediaLink) {
      alert('Please enter a media link')
      return
    }

    const project: Project = {
      id: Date.now(),
      title: newProject.title,
      type: newProject.type || 'Project',
      year: newProject.year,
      status: newProject.status,
      views: 0,
      engagement: 0,
      thumbnail: '/images/hero.png',
      description: newProject.description,
      client: newProject.client || 'Unknown'
    }

    setProjects([project, ...projects])
    setAddModalOpen(false)
    setNewProject({
      title: '',
      type: '',
      year: new Date().getFullYear().toString(),
      status: 'draft',
      description: '',
      client: '',
      mediaType: 'image',
      mediaSource: 'upload',
      mediaFile: null,
      mediaLink: ''
    })
  }

  const handleEditProject = () => {
    if (!editingProject) return

    setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p))
    setEditModalOpen(false)
    setEditingProject(null)
  }

  const handleDeleteProject = (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id))
    }
  }

  return (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          {(['all', 'published', 'draft', 'archived'] as const).map((f) => (
            <motion.button
              key={f}
              onClick={() => setFilter(f)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 text-sm rounded-md transition-all capitalize ${
                filter === f
                  ? 'bg-foreground text-background'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {f} ({f === 'all' ? projects.length : projects.filter(p => p.status === f).length})
            </motion.button>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setAddModalOpen(true)}
          className="px-4 py-2 bg-[var(--accent)] text-black rounded-md text-sm font-medium hover:bg-[var(--accent)]/90 transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          Add New Project
        </motion.button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -4 }}
              className="bg-card border border-border overflow-hidden hover:border-[var(--accent)]/30 transition-all duration-300 rounded-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3">
                  <StatusBadge status={project.status} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-1">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{project.type} · {project.year}</p>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Views</span>
                      <p className="font-medium">{project.views.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setEditingProject(project)
                        setEditModalOpen(true)
                      }}
                      className="p-2 text-[var(--accent)] hover:text-[var(--accent)]/80 transition-colors"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 text-red-500 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Project Modal */}
      <Modal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} title="Add New Project">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Title *</label>
            <input
              type="text"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              placeholder="Project title"
              className="w-full px-4 py-2 bg-secondary border border-border rounded-md focus:outline-none focus:border-[var(--accent)]/50"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Type</label>
            <input
              type="text"
              value={newProject.type}
              onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
              placeholder="Brand Film, Documentary, etc."
              className="w-full px-4 py-2 bg-secondary border border-border rounded-md focus:outline-none focus:border-[var(--accent)]/50"
            />
          </div>

          {/* Media Upload Section */}
          <div className="space-y-4 p-4 border border-border rounded-lg bg-secondary/20">
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon size={20} className="text-[var(--accent)]" />
              <span className="text-sm font-medium">Add Media</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setNewProject({ ...newProject, mediaType: 'image' })}
                className={`p-3 border rounded-md text-sm transition-all flex items-center justify-center gap-2 ${
                  newProject.mediaType === 'image'
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-border hover:border-[var(--accent)]/50'
                }`}
              >
                <ImageIcon size={18} />
                Image
              </button>
              <button
                type="button"
                onClick={() => setNewProject({ ...newProject, mediaType: 'video' })}
                className={`p-3 border rounded-md text-sm transition-all flex items-center justify-center gap-2 ${
                  newProject.mediaType === 'video'
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-border hover:border-[var(--accent)]/50'
                }`}
              >
                <Play size={18} />
                Video
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setNewProject({ ...newProject, mediaSource: 'upload' })}
                className={`p-3 border rounded-md text-sm transition-all flex items-center justify-center gap-2 ${
                  newProject.mediaSource === 'upload'
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-border hover:border-[var(--accent)]/50'
                }`}
              >
                <Upload size={18} />
                Upload
              </button>
              <button
                type="button"
                onClick={() => setNewProject({ ...newProject, mediaSource: 'link' })}
                className={`p-3 border rounded-md text-sm transition-all flex items-center justify-center gap-2 ${
                  newProject.mediaSource === 'link'
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-border hover:border-[var(--accent)]/50'
                }`}
              >
                <Link2 size={18} />
                Link
              </button>
            </div>

            {newProject.mediaSource === 'upload' ? (
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Upload {newProject.mediaType === 'video' ? 'Video' : 'Image'} File *
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-[var(--accent)]/50 transition-colors">
                  <input
                    type="file"
                    accept={newProject.mediaType === 'video' ? 'video/*' : 'image/*'}
                    onChange={(e) => setNewProject({ ...newProject, mediaFile: e.target.files?.[0] || null })}
                    className="hidden"
                    id="media-upload"
                  />
                  <label
                    htmlFor="media-upload"
                    className="cursor-pointer block"
                  >
                    <Upload size={32} className="mx-auto mb-2 text-[var(--accent)]" />
                    <p className="text-sm text-muted-foreground">
                      {newProject.mediaFile ? newProject.mediaFile.name : `Click to select ${newProject.mediaType} file`}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {newProject.mediaType === 'video' ? 'MP4, MOV, AVI (max 500MB)' : 'JPG, PNG, WEBP (max 10MB)'}
                    </p>
                  </label>
                </div>
              </div>
            ) : (
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  {newProject.mediaType === 'video' ? 'Video' : 'Image'} Link *
                </label>
                <input
                  type="url"
                  value={newProject.mediaLink}
                  onChange={(e) => setNewProject({ ...newProject, mediaLink: e.target.value })}
                  placeholder={newProject.mediaType === 'video' ? 'https://youtube.com/...' : 'https://...'}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-md focus:outline-none focus:border-[var(--accent)]/50"
                />
              </div>
            )}
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Description</label>
            <textarea
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              placeholder="Project description"
              rows={3}
              className="w-full px-4 py-2 bg-secondary border border-border rounded-md focus:outline-none focus:border-[var(--accent)]/50 resize-none"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Client</label>
            <input
              type="text"
              value={newProject.client}
              onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
              placeholder="Client name"
              className="w-full px-4 py-2 bg-secondary border border-border rounded-md focus:outline-none focus:border-[var(--accent)]/50"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Status</label>
            <select
              value={newProject.status}
              onChange={(e) => setNewProject({ ...newProject, status: e.target.value as any })}
              className="w-full px-4 py-2 bg-secondary border border-border rounded-md focus:outline-none focus:border-[var(--accent)]/50"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddProject}
            disabled={!newProject.title}
            className="w-full px-4 py-2 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Project
          </motion.button>
        </div>
      </Modal>

      {/* Edit Project Modal */}
      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Project">
        {editingProject && (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Title</label>
              <input
                type="text"
                value={editingProject.title}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                className="w-full px-4 py-2 bg-secondary border border-border rounded-md focus:outline-none focus:border-[var(--accent)]/50"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Type</label>
              <input
                type="text"
                value={editingProject.type}
                onChange={(e) => setEditingProject({ ...editingProject, type: e.target.value })}
                className="w-full px-4 py-2 bg-secondary border border-border rounded-md focus:outline-none focus:border-[var(--accent)]/50"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Description</label>
              <textarea
                value={editingProject.description}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-secondary border border-border rounded-md focus:outline-none focus:border-[var(--accent)]/50 resize-none"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Client</label>
              <input
                type="text"
                value={editingProject.client}
                onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                className="w-full px-4 py-2 bg-secondary border border-border rounded-md focus:outline-none focus:border-[var(--accent)]/50"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Status</label>
              <select
                value={editingProject.status}
                onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                className="w-full px-4 py-2 bg-secondary border border-border rounded-md focus:outline-none focus:border-[var(--accent)]/50"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleEditProject}
              className="w-full px-4 py-2 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              Save Changes
            </motion.button>
          </div>
        )}
      </Modal>

    </motion.div>
  )
}

// Analytics Tab
function AnalyticsTab() {
  const trafficData = [
    { day: 'Mon', views: 4200 },
    { day: 'Tue', views: 3800 },
    { day: 'Wed', views: 5100 },
    { day: 'Thu', views: 4600 },
    { day: 'Fri', views: 5200 },
    { day: 'Sat', views: 3900 },
    { day: 'Sun', views: 4400 }
  ]

  const maxViews = Math.max(...trafficData.map(d => d.views))

  return (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Traffic Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border p-6 rounded-lg"
      >
        <h3 className="font-medium mb-6">Weekly Traffic</h3>
        <div className="space-y-4">
          {trafficData.map((data, i) => (
            <motion.div
              key={data.day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4"
            >
              <span className="w-12 text-sm text-muted-foreground font-mono">{data.day}</span>
              <div className="flex-1 h-10 bg-secondary/50 relative overflow-hidden rounded-md">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(data.views / maxViews) * 100}%` }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-foreground/20 to-foreground/5"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {data.views.toLocaleString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Views', value: '31,200' },
          { label: 'Unique Visitors', value: '12,450' },
          { label: 'Avg. Duration', value: '3:24' },
          { label: 'Bounce Rate', value: '42%' }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="p-6 bg-card border border-border rounded-lg"
          >
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <p className="text-2xl font-light mt-2">{stat.value}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Messages Tab
function MessagesTab({ messages, setMessages }: { messages: Message[]; setMessages: (messages: Message[]) => void }) {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  const filteredMessages = messages.filter(m =>
    filter === 'all' ? true : filter === 'unread' ? !m.read : m.read
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const handleMarkAsRead = (id: number) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m))
  }

  const handleDeleteMessage = (id: number) => {
    if (confirm('Are you sure you want to delete this message?')) {
      setMessages(messages.filter(m => m.id !== id))
      if (selectedMessage?.id === id) setSelectedMessage(null)
    }
  }

  const handleReply = () => {
    alert('Reply functionality would open email client: ' + selectedMessage?.email)
  }

  return (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(['all', 'unread', 'read'] as const).map((f) => (
          <motion.button
            key={f}
            onClick={() => setFilter(f)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 text-sm rounded-md transition-all capitalize ${
              filter === f
                ? 'bg-foreground text-background'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {f} ({f === 'all' ? messages.length : messages.filter(m => (f === 'unread' ? !m.read : m.read)).length})
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredMessages.map((message) => (
              <motion.div
                key={message.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setSelectedMessage(message)
                  handleMarkAsRead(message.id)
                }}
                className={`p-4 bg-card border border-border cursor-pointer hover:border-[var(--accent)]/30 transition-all rounded-lg ${
                  selectedMessage?.id === message.id ? 'border-[var(--accent)]' : ''
                } ${!message.read ? 'bg-secondary/20' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {!message.read && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-[var(--accent)] rounded-full"
                      />
                    )}
                    <span className="font-medium text-sm">{message.name}</span>
                  </div>
                  <PriorityBadge priority={message.priority} />
                </div>
                <h4 className="text-sm font-medium mb-1">{message.subject}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{message.message}</p>
                <p className="text-xs text-muted-foreground mt-2">{formatDate(message.date)}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Message Detail */}
        <AnimatePresence mode="wait">
          {selectedMessage ? (
            <motion.div
              key={selectedMessage.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="lg:col-span-2"
            >
              <div className="bg-card border border-border p-6 rounded-lg h-full">
                <div className="mb-6 pb-6 border-b border-border">
                  <h2 className="text-xl font-medium mb-2">{selectedMessage.subject}</h2>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-lg font-medium">
                      {selectedMessage.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{selectedMessage.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                    </div>
                    <span className="text-sm text-muted-foreground ml-auto">
                      {formatDate(selectedMessage.date)}
                    </span>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-sm leading-relaxed">{selectedMessage.message}</p>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReply}
                    className="flex-1 px-4 py-2 bg-foreground text-background rounded-md text-sm font-medium"
                  >
                    Reply
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setMessages(messages.map(m => m.id === selectedMessage.id ? { ...m, read: !m.read } : m))
                    }}
                    className="px-4 py-2 border border-border rounded-md text-sm hover:border-[var(--accent)]/50"
                  >
                    {selectedMessage.read ? 'Mark Unread' : 'Mark Read'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                    className="px-4 py-2 border border-red-500/30 text-red-500 rounded-md text-sm hover:bg-red-500/10"
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:col-span-2 flex items-center justify-center bg-card border border-border p-12 rounded-lg"
            >
              <p className="text-muted-foreground">Select a message to view details</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// Settings Tab
function SettingsTab() {
  const [settings, setSettings] = useState({
    siteName: 'Zero Cut',
    tagline: 'Editing that defines attention',
    email: 'studio@zerocut.com',
    notifications: true,
    darkMode: false
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="max-w-2xl space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border p-6 rounded-lg"
      >
        <h3 className="font-medium mb-6">General Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-4 py-2 bg-secondary border border-border rounded-md focus:outline-none focus:border-[var(--accent)]/50"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Tagline</label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full px-4 py-2 bg-secondary border border-border rounded-md focus:outline-none focus:border-[var(--accent)]/50"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Contact Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-2 bg-secondary border border-border rounded-md focus:outline-none focus:border-[var(--accent)]/50"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border p-6 rounded-lg"
      >
        <h3 className="font-medium mb-6">Preferences</h3>
        <div className="space-y-4">
          {[
            { key: 'notifications', label: 'Email Notifications', desc: 'Receive email notifications for new messages' },
            { key: 'darkMode', label: 'Dark Mode', desc: 'Use dark theme by default' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <span className="text-sm font-medium">{item.label}</span>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings[item.key as keyof typeof settings] ? 'bg-[var(--accent)]' : 'bg-secondary'
                }`}
              >
                <motion.div
                  className="absolute top-1 w-4 h-4 bg-background rounded-full"
                  animate={{ left: settings[item.key as keyof typeof settings] ? '28px' : '4px' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSave}
        className="w-full px-6 py-3 bg-foreground text-background rounded-md text-sm font-medium"
      >
        {saved ? '✓ Saved!' : 'Save Changes'}
      </motion.button>
    </motion.div>
  )
}

// Main Admin Page
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="ml-64">
        <Header activeTab={activeTab} />
        <main className="p-8 bg-background min-h-[calc(100vh-4rem)]">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <DashboardTab key="dashboard" setActiveTab={setActiveTab} />
            )}
            {activeTab === 'projects' && (
              <ProjectsTab key="projects" projects={projects} setProjects={setProjects} />
            )}
            {activeTab === 'analytics' && (
              <AnalyticsTab key="analytics" />
            )}
            {activeTab === 'messages' && (
              <MessagesTab key="messages" messages={messages} setMessages={setMessages} />
            )}
            {activeTab === 'settings' && (
              <SettingsTab key="settings" />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
