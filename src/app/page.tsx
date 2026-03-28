'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { useTheme } from '@/components/theme/theme-provider'

// Projects Data
const projects = [
  { id: 1, title: 'Meridian', type: 'Brand Film', year: '2024', image: '/images/meridian.png' },
  { id: 2, title: 'Void', type: 'Documentary', year: '2024', image: '/images/void.png' },
  { id: 3, title: 'Pulse', type: 'Commercial', year: '2024', image: '/images/pulse.png' },
  { id: 4, title: 'Echoes', type: 'Music Video', year: '2023', image: '/images/echoes.png' },
  { id: 5, title: 'Frame', type: 'Short Film', year: '2023', image: '/images/frame.png' },
  { id: 6, title: 'Shift', type: 'Brand Film', year: '2023', image: '/images/shift.png' },
]

// Services Data
const services = [
  { title: 'Editorial Cut', description: 'Feature films, documentaries, brand narratives. Every frame intentional.' },
  { title: 'Commercial', description: 'Television, digital campaigns, social content. Designed to stop the scroll.' },
  { title: 'Social Content', description: 'Short-form that captures. Every second counts.' },
  { title: 'Motion Design', description: 'Titles, graphics, visual effects. Movement that elevates meaning.' }
]

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const letterAnimation = {
  hidden: { opacity: 0, y: 100 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.05,
      ease: [0.16, 1, 0.3, 1]
    }
  })
}

// Animated Letter Component
function AnimatedLetter({ letter, index }: { letter: string; index: number }) {
  return (
    <motion.span
      custom={index}
      variants={letterAnimation}
      initial="hidden"
      animate="visible"
      className="inline-block"
      style={{ display: letter === ' ' ? 'inline' : 'inline-block' }}
    >
      {letter === ' ' ? '\u00A0' : letter}
    </motion.span>
  )
}

// Navigation
function Navigation() {
  const { scrollY } = useScroll()
  const { theme } = useTheme()

  // Theme-aware background colors
  const lightBg = useTransform(scrollY, [0, 100], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.9)'])
  const darkBg = useTransform(scrollY, [0, 100], ['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.9)'])
  const backgroundColor = theme === 'light' ? lightBg : darkBg

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor }}
    >
      <div className="flex items-center justify-between px-8 md:px-16 py-6">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className="text-sm font-medium tracking-tight">ZERO CUT</span>
        </motion.div>
        <motion.div
          className="flex items-center gap-8 md:gap-12"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a href="#work" className="link-smooth text-sm text-[#888888] hover:text-foreground hidden md:block">Work</a>
          <a href="#services" className="link-smooth text-sm text-[#888888] hover:text-foreground hidden md:block">Services</a>
          <a href="#about" className="link-smooth text-sm text-[#888888] hover:text-foreground hidden md:block">About</a>
          <a href="#contact" className="link-smooth text-sm text-[#888888] hover:text-foreground hidden md:block">Contact</a>
          <ThemeToggle />
        </motion.div>
      </div>
    </motion.nav>
  )
}

// Hero Section with Video Background
function HeroSection() {
  const title = 'ZERO CUT'
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40"
          poster="/images/hero.png"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-clouds-and-blue-sky-2408-large.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay" />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-8"
        style={{ y, opacity }}
      >
        {/* Animated Title */}
        <h1 className="text-hero text-foreground overflow-hidden">
          {title.split('').map((letter, index) => (
            <AnimatedLetter key={index} letter={letter} index={index} />
          ))}
        </h1>
        
        <motion.p 
          className="mt-8 text-subhead"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Editing that defines attention
        </motion.p>

        {/* CTAs */}
        <motion.div 
          className="mt-16 flex items-center justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <a 
            href="#work" 
            className="text-sm text-[#888888] hover:text-foreground transition-colors duration-300 link-smooth"
          >
            View Projects
          </a>
          <span className="text-[#333333]">/</span>
          <motion.button 
            className="flex items-center gap-3 text-sm text-[#888888] hover:text-foreground transition-colors duration-300 group"
            whileHover={{ scale: 1.02 }}
          >
            <motion.span 
              className="w-10 h-10 rounded-full border border-[#333333] flex items-center justify-center group-hover:border-[#8BA888] transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.span>
            <span>Watch Reel</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div 
          className="w-px h-16 bg-gradient-to-b from-transparent via-[#333333] to-transparent"
          animate={{ scaleY: [1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  )
}

// Project Card
function ProjectCard({ project, className = '' }: { project: typeof projects[0]; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className={`scene-block cursor-pointer group relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
        />
      </motion.div>
      
      <div className="absolute inset-0 flex items-end p-6 md:p-8 z-10">
        <div className="w-full">
          <motion.span 
            className="text-label text-[#8BA888]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            {project.type}
          </motion.span>
          <motion.h3 
            className="text-2xl md:text-4xl font-light mt-2 text-foreground group-hover:text-[#8BA888] transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            {project.title}
          </motion.h3>
          <motion.span 
            className="text-sm text-[#666666] mt-2 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            {project.year}
          </motion.span>
        </div>
      </div>

      {/* Hover Arrow */}
      <motion.div 
        className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ x: -10, opacity: 0 }}
        whileHover={{ x: 0, opacity: 1 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8BA888" strokeWidth="1">
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

// Work Section - Asymmetric Grid
function WorkSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="work" className="py-32 md:py-48 px-8 md:px-16">
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >
        <motion.span className="text-label" variants={fadeInUp}>Selected Work</motion.span>
        <motion.h2 className="text-headline mt-6 mb-16 md:mb-24" variants={fadeInUp}>
          Projects that hold attention
        </motion.h2>
      </motion.div>

      {/* Asymmetric Grid */}
      <div className="grid grid-cols-6 md:grid-cols-12 gap-4 md:gap-6">
        {/* Large Featured */}
        <div className="col-span-6 md:col-span-8 row-span-2">
          <ProjectCard project={projects[0]} className="h-[50vh] md:h-[70vh]" />
        </div>
        
        {/* Side Items */}
        <div className="col-span-3 md:col-span-4">
          <ProjectCard project={projects[1]} className="h-[35vh] md:h-[33vh]" />
        </div>
        <div className="col-span-3 md:col-span-4">
          <ProjectCard project={projects[2]} className="h-[35vh] md:h-[33vh]" />
        </div>

        {/* Wide Item */}
        <div className="col-span-6 md:col-span-7">
          <ProjectCard project={projects[3]} className="h-[40vh] md:h-[50vh]" />
        </div>
        
        {/* Tall Item */}
        <div className="col-span-3 md:col-span-5">
          <ProjectCard project={projects[4]} className="h-[40vh] md:h-[50vh]" />
        </div>

        {/* Small Items */}
        <div className="col-span-3 md:col-span-4">
          <ProjectCard project={projects[5]} className="h-[30vh] md:h-[35vh]" />
        </div>
        <div className="col-span-3 md:col-span-4">
          <ProjectCard project={projects[0]} className="h-[30vh] md:h-[35vh]" />
        </div>

        {/* View All */}
        <div className="col-span-6 md:col-span-4 flex items-center justify-center py-12">
          <motion.a 
            href="#" 
            className="link-smooth text-sm text-[#888888] hover:text-foreground"
            whileHover={{ x: 5 }}
          >
            View All Projects
          </motion.a>
        </div>
      </div>
    </section>
  )
}

// Services Section - Chapters
function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="py-32 md:py-48 px-8 md:px-16 border-t border-[#1A1A1A]">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >
        <motion.span className="text-label" variants={fadeInUp}>Services</motion.span>
        <motion.h2 className="text-headline mt-6 mb-16 md:mb-24" variants={fadeInUp}>
          What we do
        </motion.h2>

        <div className="max-w-4xl">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group py-12 md:py-16 border-b border-[#1A1A1A] last:border-0 cursor-pointer"
              variants={fadeInUp}
              whileHover={{ x: 10 }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-16">
                <span className="text-label text-[#444444]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="chapter-title text-[#CCCCCC] group-hover:text-[#8BA888] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-subhead mt-4 max-w-md">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// About Section
function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-32 md:py-48 px-8 md:px-16 bg-secondary/30">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="max-w-5xl mx-auto"
      >
        <motion.span className="text-label" variants={fadeInUp}>About</motion.span>
        <motion.h1 className="text-headline mt-6 mb-12" variants={fadeInUp}>
          About Zero Cut
        </motion.h1>

        <motion.div className="space-y-12" variants={fadeInUp}>
          <motion.p className="text-subhead leading-relaxed" variants={fadeInUp}>
            We don't just edit videos.
            <br />
            <span className="text-[var(--accent)]">We shape how they are experienced.</span>
          </motion.p>

          <motion.p className="text-body leading-relaxed" variants={fadeInUp}>
            Zero Cut is a video editing studio built on one idea —
            <br />
            every frame matters, and every cut defines attention.
          </motion.p>

          <motion.p className="text-body leading-relaxed" variants={fadeInUp}>
            In a world flooded with content, most videos are ignored.
            <br />
            Not because they lack quality, but because they lack precision.
            <br />
            That's where we come in.
          </motion.p>
        </motion.div>

        <motion.div className="mt-20" variants={fadeInUp}>
          <motion.h2 className="text-2xl md:text-3xl font-light mb-8" variants={fadeInUp}>
            Our Approach
          </motion.h2>
          <motion.p className="text-subhead mb-8 leading-relaxed" variants={fadeInUp}>
            Editing is not a technical step.
            <br />
            It's the moment where a story becomes clear.
          </motion.p>
          <motion.p className="text-body mb-6" variants={fadeInUp}>
            We focus on:
          </motion.p>

          <motion.div className="space-y-6 pl-6 border-l-2 border-[var(--accent)]/30" variants={fadeInUp}>
            {[
              { title: 'Rhythm', desc: 'keeping viewers engaged, second by second' },
              { title: 'Clarity', desc: 'removing everything that doesn\'t serve the message' },
              { title: 'Impact', desc: 'making every scene feel intentional' }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <h3 className="text-xl font-medium text-[var(--accent)] mb-2">{item.title}</h3>
                <p className="text-body text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="mt-8 space-y-2" variants={fadeInUp}>
            <p className="text-body">No unnecessary effects.</p>
            <p className="text-body">No over-editing.</p>
            <p className="text-body">Just clean, controlled, and purposeful work.</p>
          </motion.div>
        </motion.div>

        <motion.div className="mt-20" variants={fadeInUp}>
          <motion.h2 className="text-2xl md:text-3xl font-light mb-8" variants={fadeInUp}>
            What We Do
          </motion.h2>
          <motion.p className="text-body leading-relaxed mb-6" variants={fadeInUp}>
            We work with creators, brands, and teams who care about how their content feels — not just how it looks.
          </motion.p>
          <motion.p className="text-body leading-relaxed mb-6" variants={fadeInUp}>
            From long-form YouTube videos to short-form social content and commercial edits,
            our goal is always the same:
          </motion.p>
          <motion.p className="text-subhead text-[var(--accent)]" variants={fadeInUp}>
            Make people watch. And keep watching.
          </motion.p>
        </motion.div>

        <motion.div className="mt-20" variants={fadeInUp}>
          <motion.h2 className="text-2xl md:text-3xl font-light mb-8" variants={fadeInUp}>
            Why Zero Cut
          </motion.h2>
          <motion.p className="text-body leading-relaxed mb-6" variants={fadeInUp}>
            Because the difference between average and exceptional
            <br />
            is often just a few decisions —
            <br />
            a cut, a pause, a transition.
          </motion.p>
          <motion.p className="text-body leading-relaxed mb-12" variants={fadeInUp}>
            We focus on those decisions.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  )
}

// Philosophy Section
function PhilosophySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <motion.section 
      ref={ref} 
      className="py-48 md:py-64 px-8 md:px-16 overflow-hidden"
      style={{ y }}
    >
      <motion.div 
        className="max-w-5xl mx-auto text-center"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >
        <motion.p className="text-headline font-light" variants={fadeInUp}>
          Where raw footage
          <br />
          <span className="font-medium text-[var(--accent)]">becomes art</span>
        </motion.p>
        <motion.p className="text-subhead mt-12 max-w-2xl mx-auto" variants={fadeInUp}>
          Not as an afterthought. Not as a technical necessity.
          But as the moment where story becomes cinema.
        </motion.p>
      </motion.div>
    </motion.section>
  )
}

// Contact Section
function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="py-48 md:py-64 px-8 md:px-16 border-t border-[#1A1A1A]">
      <motion.div 
        ref={ref}
        className="max-w-5xl mx-auto"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >
        <motion.span className="text-label" variants={fadeInUp}>Contact</motion.span>
        <motion.h2 className="text-headline mt-6" variants={fadeInUp}>
          Let&apos;s create something
          <br />
          <span className="text-[#8BA888]">that holds attention</span>
        </motion.h2>

        <motion.div 
          className="mt-16 md:mt-24 flex flex-col md:flex-row gap-12 md:gap-24"
          variants={fadeInUp}
        >
          <div>
            <span className="text-label">Email</span>
            <a 
              href="mailto:studio@zerocut.com" 
              className="block mt-3 text-lg text-[#CCCCCC] hover:text-[#8BA888] link-smooth"
            >
              studio@zerocut.com
            </a>
          </div>
          <div>
            <span className="text-label">Location</span>
            <p className="mt-3 text-lg text-[#888888]">Los Angeles, CA</p>
          </div>
        </motion.div>

        <motion.div 
          className="mt-16 pt-16 border-t border-[#1A1A1A] flex gap-8"
          variants={fadeInUp}
        >
          <a href="#" className="link-smooth text-sm text-[#555555] hover:text-foreground">Instagram</a>
          <a href="#" className="link-smooth text-sm text-[#555555] hover:text-foreground">Vimeo</a>
          <a href="#" className="link-smooth text-sm text-[#555555] hover:text-foreground">LinkedIn</a>
        </motion.div>
      </motion.div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-12 px-8 md:px-16 border-t border-[#1A1A1A]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="text-sm text-[#444444]">ZERO CUT / Est. 2019</span>
        <div className="flex items-center gap-6">
          <a href="/admin" className="text-xs text-[#333333] hover:text-[#555555] transition-colors">Admin</a>
          <span className="text-xs text-[#333333]">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}

// Main Page
export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <WorkSection />
      <ServicesSection />
      <AboutSection />
      <PhilosophySection />
      <ContactSection />
      <Footer />
    </main>
  )
}
