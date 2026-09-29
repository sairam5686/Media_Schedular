import { ArrowRight, CalendarDays, ChartNoAxesCombined, Check, ChevronRight, Clock3, FileText, Layers3, Link2, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.svg'

const previewBars = [
  { day: 'Mon', height: 'h-10' },
  { day: 'Tue', height: 'h-16' },
  { day: 'Wed', height: 'h-12' },
  { day: 'Thu', height: 'h-20' },
  { day: 'Fri', height: 'h-14' },
  { day: 'Sat', height: 'h-24' },
  { day: 'Sun', height: 'h-16' },
]

const previewPosts = [
  { network: 'LinkedIn', color: 'bg-sky-100 text-sky-800', initials: 'in', time: 'Today, 2:30 PM', text: 'A few lessons from building in public this month.' },
  { network: 'Instagram', color: 'bg-rose-100 text-rose-800', initials: 'ig', time: 'Tomorrow, 10:00 AM', text: 'Behind the scenes from our latest launch.' },
]

const features = [
  { icon: CalendarDays, title: 'Plan in one view', text: 'See what is scheduled and keep every channel moving.' },
  { icon: Layers3, title: 'Publish together', text: 'Prepare your content once and organize it by platform.' },
  { icon: ChartNoAxesCombined, title: 'Learn as you grow', text: 'Understand what is resonating with your audience.' },
]

const Landing = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfdfb] text-slate-950">
      <header className="relative z-10 border-b border-emerald-950/10 bg-white/90 backdrop-blur">
        <nav aria-label="Main navigation" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Social Scheduler home">
            <span className="flex size-9 items-center justify-center rounded-md bg-gradient-to-br from-lime-100 to-teal-400 p-1.5">
              <img src={Logo} alt="" className="size-full object-contain" />
            </span>
            <span className="text-base font-bold text-slate-950">Social Scheduler</span>
          </Link>
          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#workspace" className="transition-colors hover:text-teal-800">Workspace</a>
            <a href="#features" className="transition-colors hover:text-teal-800">Features</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden px-2 py-2 text-sm font-semibold text-slate-700 transition-colors hover:text-teal-800 sm:inline-flex">Log in</Link>
            <Link to="/signup" className="inline-flex h-10 items-center gap-2 rounded-md bg-teal-800 px-4 text-sm font-semibold text-white transition-colors hover:bg-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2">
              Get started <ArrowRight className="size-4" />
            </Link>
          </div>
        </nav>
      </header>

      <section className="relative bg-[#eff7f1]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(#b9d0c0_0.8px,transparent_0.8px)] bg-[size:20px_20px] opacity-35" />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 sm:pb-14 sm:pt-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase text-teal-900">
              <span className="size-2 rounded-full bg-lime-600" /> Your social publishing workspace
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Social media, <span className="text-teal-800">on schedule.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Plan your posts, keep every channel in sync, and make room for the work behind the feed.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/signup" className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-teal-800 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2">
                Create your workspace <ArrowRight className="size-4" />
              </Link>
              <a href="#features" className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white/80 px-5 text-sm font-semibold text-slate-800 transition-colors hover:bg-white">
                Explore features <ChevronRight className="size-4" />
              </a>
            </div>
          </div>

          <div id="workspace" className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-lg border border-slate-200 bg-white text-left shadow-[0_24px_70px_-38px_rgba(15,75,57,0.45)] sm:mt-12">
            <div className="flex h-11 items-center justify-between border-b border-slate-200 bg-white px-3 sm:px-5">
              <div className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded bg-teal-50"><CalendarDays className="size-3.5 text-teal-800" /></span>
                <span className="text-xs font-semibold text-slate-800 sm:text-sm">Social Scheduler</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 sm:text-xs">
                <span className="size-1.5 rounded-full bg-emerald-500" /> Workspace preview
              </div>
            </div>

            <div className="grid min-h-72 md:grid-cols-[145px_1fr]">
              <aside className="hidden border-r border-slate-100 bg-[#f7faf8] p-3 md:block">
                <p className="px-2 pb-3 pt-1 text-[10px] font-bold uppercase text-slate-400">Workspace</p>
                <div className="space-y-1 text-xs font-medium">
                  <p className="flex items-center gap-2 rounded bg-teal-50 px-2 py-2 text-teal-900"><ChartNoAxesCombined className="size-3.5" /> Overview</p>
                  <p className="flex items-center gap-2 px-2 py-2 text-slate-500"><Link2 className="size-3.5" /> Accounts</p>
                  <p className="flex items-center gap-2 px-2 py-2 text-slate-500"><FileText className="size-3.5" /> Posts</p>
                </div>
                <div className="mt-8 border-t border-slate-200 pt-4">
                  <p className="px-2 text-[10px] font-bold uppercase text-slate-400">Connected</p>
                  <p className="mt-3 flex items-center gap-2 px-2 text-xs text-slate-600"><span className="flex size-5 items-center justify-center rounded bg-sky-100 text-[9px] font-bold text-sky-800">in</span> LinkedIn</p>
                  <p className="mt-2 flex items-center gap-2 px-2 text-xs text-slate-600"><span className="flex size-5 items-center justify-center rounded bg-rose-100 text-[9px] font-bold text-rose-800">ig</span> Instagram</p>
                </div>
              </aside>

              <div className="min-w-0 p-3 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-medium text-slate-400 sm:text-xs">TUESDAY, SEPTEMBER 29</p>
                    <h2 className="mt-1 text-sm font-semibold text-slate-950 sm:text-base">Your week at a glance</h2>
                  </div>
                  <span className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded bg-teal-800 px-2.5 text-[11px] font-semibold text-white sm:text-xs"><Send className="size-3" /> New post</span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="rounded border border-slate-100 p-2.5 sm:p-3"><p className="text-[10px] text-slate-500 sm:text-xs">Impressions</p><p className="mt-1 text-base font-semibold tabular-nums sm:text-lg">8,420</p><p className="text-[10px] font-medium text-teal-800">+18.2%</p></div>
                  <div className="rounded border border-slate-100 p-2.5 sm:p-3"><p className="text-[10px] text-slate-500 sm:text-xs">Engagement</p><p className="mt-1 text-base font-semibold tabular-nums sm:text-lg">1,284</p><p className="text-[10px] font-medium text-teal-800">+8.4%</p></div>
                  <div className="rounded border border-slate-100 p-2.5 sm:p-3"><p className="text-[10px] text-slate-500 sm:text-xs">Scheduled</p><p className="mt-1 text-base font-semibold tabular-nums sm:text-lg">03</p><p className="text-[10px] font-medium text-slate-400">This week</p></div>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded border border-slate-100 p-3">
                    <div className="flex items-center justify-between"><p className="text-xs font-semibold text-slate-800">Audience reach</p><span className="text-[10px] text-slate-400">Last 7 days</span></div>
                    <div className="mt-3 flex h-20 items-end justify-between gap-1.5 border-b border-slate-100 px-1">
                      {previewBars.map(({ day, height }, index) => <div key={day} className="flex h-full flex-1 flex-col items-center justify-end gap-1"><span className={`w-full max-w-6 rounded-t-sm ${height} ${index === 5 ? 'bg-teal-700' : 'bg-teal-100'}`} /><span className="pb-1 text-[9px] text-slate-400">{day}</span></div>)}
                    </div>
                  </div>
                  <div className="rounded border border-slate-100 p-3">
                    <p className="text-xs font-semibold text-slate-800">Coming up</p>
                    <div className="mt-2 divide-y divide-slate-100">
                      {previewPosts.map((post) => <div key={post.network} className="flex gap-2 py-2 first:pt-0 last:pb-0"><span className={`flex size-6 shrink-0 items-center justify-center rounded text-[9px] font-bold ${post.color}`}>{post.initials}</span><div className="min-w-0"><p className="text-[10px] font-medium text-slate-700">{post.network} <span className="font-normal text-slate-400">· {post.time}</span></p><p className="mt-0.5 line-clamp-1 text-[10px] text-slate-500">{post.text}</p></div></div>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-8 border-b border-slate-200 pb-10 md:grid-cols-3 md:gap-10">
          {features.map(({ icon: Icon, title, text }) => (
            <article key={title} className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-lime-100 text-teal-900"><Icon className="size-5" /></span>
              <div><h2 className="text-sm font-semibold text-slate-950">{title}</h2><p className="mt-1.5 text-sm leading-6 text-slate-600">{text}</p></div>
            </article>
          ))}
        </div>
        <div className="flex flex-col justify-between gap-4 pt-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-sm text-slate-500"><Check className="size-4 text-teal-800" /> A clearer rhythm for your social channels.</div>
          <Link to="/signup" className="inline-flex items-center gap-2 text-sm font-semibold text-teal-800 hover:text-teal-950">Start planning <ArrowRight className="size-4" /></Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>© 2026 Social Scheduler</span>
          <Link to="/login" className="inline-flex items-center gap-1 font-medium text-slate-600 hover:text-teal-800">Already have an account? Log in <ChevronRight className="size-3.5" /></Link>
        </div>
      </footer>
    </main>
  )
}

export default Landing