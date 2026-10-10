import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Integrations } from '../Components/Integrations'
import { BentoFeatures } from '../Components/BentoFeatures'
import { Footer } from '../Components/Footer'
import { ContactCTA } from '../Components/ContactCTA'
import FAQ from '../Components/shadcn-studio/blocks/faq-component-01/faq-component-01'

// ── Constants & Data ──────────────────────────────────────────

const NAV_LINKS = [
  { name: 'Features', href: '#features' },
  { name: 'Integrations', href: '#integrations' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
]

// ── Sub-components ────────────────────────────────────────────

const LogoIcon = () => (
  <div className="flex h-6 w-6 items-center justify-center text-emerald-500">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.1" />
      <path d="M12 2V6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 18V22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M2 12H6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18 12H22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  </div>
)

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['features', 'integrations', 'faq', 'contact']
      const scrollPosition = window.scrollY + 200

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId)
            return
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className="fixed top-5 left-1/2 z-50 flex w-[92%] max-w-[720px] -translate-x-1/2 items-center justify-between rounded-full bg-neutral-950/70 p-2 sm:p-2.5 backdrop-blur-2xl border border-white/15 shadow-[0_12px_40px_0_rgba(0,0,0,0.3)] ring-1 ring-white/10 transition-all">
        {/* Specular top highlight */}
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="flex items-center gap-2 pl-2 group cursor-pointer"
        >
          <LogoIcon />
          <span className="text-base font-bold tracking-tight text-white group-hover:text-white/90 transition-colors">
            Supermi
          </span>
        </a>

        {/* Section Links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '')
            return (
              <a
                key={link.name}
                href={link.href}
                className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all ${
                  isActive
                    ? 'bg-white/20 text-white shadow-xs'
                    : 'text-neutral-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </a>
            )
          })}
        </div>

        {/* Right side Actions */}
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="cursor-pointer rounded-full bg-white px-4.5 py-1.5 text-xs font-semibold text-neutral-950 shadow-sm transition-all hover:bg-neutral-100 hover:scale-105 active:scale-95"
          >
            Login
          </Link>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden size-8 items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-20 left-1/2 z-50 w-[92%] max-w-[720px] -translate-x-1/2 overflow-hidden rounded-2xl bg-neutral-950/85 p-4 backdrop-blur-2xl border border-white/15 shadow-2xl md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-200 hover:bg-white/10 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

const Badge = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-8">
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-white/90 backdrop-blur-sm px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-800 shadow-sm">
      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
      {children}
    </span>
  </div>
)

const HeroContent = () => (
  <div className="relative flex flex-col items-center px-4 pt-40 pb-16 text-center z-10">
    <Badge>Unlock Conversational Power</Badge>

    {/* Main heading */}
    <h1 className="max-w-[900px] mx-auto text-3xl font-bold tracking-[-0.03em] text-[#1a1a1a] sm:text-5xl md:text-6xl md:leading-[1.1]">
      Empower Your <br className="hidden sm:block" />
      Conversations with Next-Gen <br className="hidden sm:block" />
      Messaging Dashboard
    </h1>

    {/* Subtitle */}
    <p className="mt-8 max-w-xl mx-auto text-base text-gray-600 font-normal leading-relaxed md:text-lg">
      Unlock seamless communication and streamline your messaging{' '}
      <br className="hidden md:block" /> experience with our innovative dashboard
      solution
    </p>

    {/* CTA */}
    <div className="mt-10">
      <Link
        to="/signup"
        className="rounded-full bg-teal-700 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-700/25 transition-all hover:bg-teal-800 hover:-translate-y-0.5 hover:shadow-xl active:scale-98"
      >
        Get Started
      </Link>
    </div>
  </div>
)


const DashboardPreview = () => (
  <div className="relative z-10 mx-auto w-full px-4 lg:px-64 -mb-64">
    <div className="relative rounded-t-2xl bg-white/40 backdrop-blur-sm p-4 ring-1 ring-white/50">
      <img
        src="https://placehold.co/1200x750/fafafa/e5e5e5/png?text=Dashboard+Preview"
        alt="App Dashboard"
        className="w-full h-auto rounded-xl shadow-sm block"
      />
      <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-black/5" />
    </div>
  </div>
)

const BackgroundEffects = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[50px]">
    {/* Top fade — white */}
    <div className="absolute top-0 w-full h-[40%] bg-gradient-to-b from-white to-transparent z-10" />

    {/* Centre radiant emerald */}
    <div className="absolute top-[20%] left-[20%] w-[900px] h-[700px] bg-[#10b981] opacity-50 blur-[130px] rounded-full animate-blob mix-blend-multiply filter" />

    {/* Right deep forest teal */}
    <div className="absolute top-[30%] right-[-10%] w-[700px] h-[700px] bg-[#0f766e] opacity-45 blur-[120px] rounded-full animate-blob animation-delay-2000 mix-blend-multiply filter" />

    {/* Left luminous lime/mint */}
    <div className="absolute top-[40%] left-[-10%] w-[700px] h-[700px] bg-[#a3e635] opacity-40 blur-[120px] rounded-full animate-blob animation-delay-4000 mix-blend-multiply filter" />

    {/* Grid pattern on top of blobs */}
    <div className="absolute inset-0 bg-grid-refined opacity-[0.6] z-0" />
  </div>
)

// ── Landing Page ──────────────────────────────────────────────

const Landing = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="p-4 pb-0">
        <div className="relative w-full overflow-hidden rounded-[50px] bg-slate-50 border-t border-slate-200/80">
          <BackgroundEffects />
          <Navbar />
          <HeroContent />
          <DashboardPreview />
        </div>
      </div>

      {/* Core Features: Bento Grid */}
      <BentoFeatures />

      {/* Integrations Section */}
      <section id="integrations" className="bg-white py-20 px-4 scroll-mt-16">
        <Integrations />
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Contact / CTA Section */}
      <ContactCTA />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Landing