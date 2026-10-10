import { useState } from 'react'
import {
  Calendar as CalendarIcon,
  Sparkles,
  Send,
  Clock,
  TrendingUp,
  MessageSquare,
  Users,
  BarChart3,
  Check,
  Copy,
  Zap,
  ArrowUpRight,
  ChevronRight,
} from 'lucide-react'

export function BentoFeatures() {
  const [activeTone, setActiveTone] = useState('Viral')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="features" className="relative w-full bg-white pt-72 pb-24 px-4 sm:px-6 lg:px-8 scroll-mt-10">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-600/20 bg-teal-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-teal-700">
            <Sparkles className="size-3.5" />
            Core Capabilities
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Built for creators and teams who mean business
          </h2>
          <p className="text-base sm:text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Eliminate content chaos. Plan, generate, and publish cross-platform content effortlessly with an intelligent, all-in-one workspace.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Card 1: Visual Content Calendar (Span 7) */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-black/[0.08] bg-slate-50/50 p-6 sm:p-8 transition-all hover:border-black/15 hover:shadow-xl lg:col-span-7">
            <div className="relative z-10 mb-6">
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-white border border-black/[0.08] text-teal-700 shadow-xs">
                <CalendarIcon className="size-5" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-neutral-900">
                Visual Content Calendar
              </h3>
              <p className="mt-2 text-sm sm:text-base text-neutral-500 leading-relaxed max-w-lg">
                Drag-and-drop posts across days and weeks. Reorganize your upcoming pipeline in seconds with an intuitive timeline overview.
              </p>
            </div>

            {/* Visual Calendar Mockup */}
            <div className="relative mt-2 overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-3 text-xs font-medium text-neutral-500">
                <div className="flex items-center gap-2 font-semibold text-neutral-800">
                  <span>October 2026</span>
                  <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] text-neutral-600">Week 42</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-medium text-emerald-600">3 Scheduled</span>
                </div>
              </div>

              {/* Day Columns */}
              <div className="grid grid-cols-4 gap-2.5 text-xs">
                {/* Mon */}
                <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-2.5 flex flex-col gap-2">
                  <span className="font-semibold text-neutral-400 text-[11px]">MON 12</span>
                  <div className="rounded-lg border border-black/[0.06] bg-white p-2 shadow-xs transition-transform group-hover:translate-y-[-2px]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-sky-600">X (Twitter)</span>
                      <span className="text-[9px] text-neutral-400">9:00 AM</span>
                    </div>
                    <p className="text-[11px] font-medium text-neutral-800 truncate">SaaS Growth Tips thread 🧵</p>
                    <div className="mt-1.5 flex items-center gap-1 text-[9px] text-emerald-600 font-medium">
                      <Check className="size-2.5" /> Published
                    </div>
                  </div>
                </div>

                {/* Tue */}
                <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-2.5 flex flex-col gap-2">
                  <span className="font-semibold text-neutral-400 text-[11px]">TUE 13</span>
                  <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 p-2 shadow-xs transition-transform group-hover:translate-y-[-2px]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-indigo-600">LinkedIn</span>
                      <span className="text-[9px] text-neutral-400">1:30 PM</span>
                    </div>
                    <p className="text-[11px] font-medium text-neutral-800 truncate">Hiring announcement 🚀</p>
                    <div className="mt-1.5 flex items-center gap-1 text-[9px] text-amber-600 font-medium">
                      <Clock className="size-2.5" /> Scheduled
                    </div>
                  </div>
                </div>

                {/* Wed */}
                <div className="rounded-xl border-2 border-dashed border-teal-200 bg-teal-50/20 p-2.5 flex flex-col gap-2 relative">
                  <span className="font-semibold text-teal-700 text-[11px]">WED 14 (Today)</span>
                  <div className="rounded-lg border border-pink-200 bg-white p-2 shadow-sm transition-transform group-hover:translate-y-[-2px]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-pink-600">Instagram</span>
                      <span className="text-[9px] text-neutral-400">6:45 PM</span>
                    </div>
                    <p className="text-[11px] font-medium text-neutral-800 truncate">Product feature reel 🎥</p>
                    <div className="mt-1.5 flex items-center gap-1 text-[9px] text-pink-600 font-medium">
                      <Zap className="size-2.5" /> Peak slot
                    </div>
                  </div>
                </div>

                {/* Thu */}
                <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-2.5 flex flex-col gap-2 hidden sm:flex">
                  <span className="font-semibold text-neutral-400 text-[11px]">THU 15</span>
                  <div className="flex h-20 items-center justify-center rounded-lg border border-dashed border-neutral-200 text-[10px] text-neutral-400 font-medium">
                    + Drop post
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: AI Caption & Hashtag Generator (Span 5) */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-black/[0.08] bg-slate-50/50 p-6 sm:p-8 transition-all hover:border-black/15 hover:shadow-xl lg:col-span-5">
            <div className="relative z-10 mb-6">
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-white border border-black/[0.08] text-teal-700 shadow-xs">
                <Sparkles className="size-5" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-neutral-900">
                AI Caption & Hashtags
              </h3>
              <p className="mt-2 text-sm sm:text-base text-neutral-500 leading-relaxed">
                Generate high-converting hooks, tailored captions, and trending hashtags in seconds.
              </p>
            </div>

            {/* AI Assistant Mini Mockup */}
            <div className="rounded-2xl border border-black/[0.07] bg-white p-4 shadow-sm space-y-3">
              {/* Tone selector */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400 font-medium text-[11px]">Tone of voice</span>
                <div className="flex gap-1.5">
                  {['Viral', 'Witty', 'Professional'].map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setActiveTone(tone)}
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-all ${
                        activeTone === tone
                          ? 'bg-teal-700 text-white shadow-xs'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generated Result Box */}
              <div className="rounded-xl bg-neutral-50 p-3 border border-neutral-100 text-xs text-neutral-800 leading-relaxed relative">
                <p className="pr-6 font-medium">
                  &ldquo;Stop spending 12 hours a week manually posting content. Automate your multi-platform distribution and focus on creating value.&rdquo;
                </p>
                <button
                  onClick={handleCopy}
                  title="Copy caption"
                  className="absolute top-2.5 right-2.5 text-neutral-400 hover:text-neutral-700 transition-colors"
                >
                  {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                </button>
              </div>

              {/* Hashtag Pills */}
              <div className="pt-1">
                <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                  Recommended Viral Hashtags
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-md border border-neutral-200 bg-white px-2 py-0.5 text-[10px] font-medium text-neutral-700">
                    #SocialMediaGrowth <span className="text-emerald-500 font-semibold">98%</span>
                  </span>
                  <span className="rounded-md border border-neutral-200 bg-white px-2 py-0.5 text-[10px] font-medium text-neutral-700">
                    #CreatorEconomy <span className="text-emerald-500 font-semibold">94%</span>
                  </span>
                  <span className="rounded-md border border-neutral-200 bg-white px-2 py-0.5 text-[10px] font-medium text-neutral-700">
                    #MarketingAutomation
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Multi-Platform Publishing (Span 5) */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-black/[0.08] bg-slate-50/50 p-6 sm:p-8 transition-all hover:border-black/15 hover:shadow-xl lg:col-span-5">
            <div className="relative z-10 mb-6">
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-white border border-black/[0.08] text-teal-700 shadow-xs">
                <Send className="size-5" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-neutral-900">
                1-Click Multi-Publishing
              </h3>
              <p className="mt-2 text-sm sm:text-base text-neutral-500 leading-relaxed">
                Compose once. Simultaneously broadcast formatted posts to X, LinkedIn, Instagram, TikTok, and YouTube.
              </p>
            </div>

            {/* Platform Sync Stack */}
            <div className="rounded-2xl border border-black/[0.07] bg-white p-4 shadow-sm space-y-2.5">
              {[
                { name: 'X / Twitter', desc: 'Character counter & thread splits', active: true, color: 'bg-black' },
                { name: 'LinkedIn', desc: 'Article format & carousel document support', active: true, color: 'bg-[#0A66C2]' },
                { name: 'Instagram', desc: 'Auto square cropping & carousel ordering', active: true, color: 'bg-[#E4405F]' },
                { name: 'YouTube Shorts', desc: 'Custom thumbnail & tags injection', active: true, color: 'bg-[#FF0000]' },
              ].map((platform) => (
                <div
                  key={platform.name}
                  className="flex items-center justify-between rounded-xl border border-neutral-100 p-2.5 transition-colors hover:bg-neutral-50"
                >
                  <div className="flex items-center gap-3">
                    <span className={`size-3 rounded-full ${platform.color}`} />
                    <div>
                      <h4 className="text-xs font-semibold text-neutral-900">{platform.name}</h4>
                      <p className="text-[11px] text-neutral-400">{platform.desc}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                    <Check className="size-3" /> Ready
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Smart Auto-Schedule (Span 7) */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-black/[0.08] bg-slate-50/50 p-6 sm:p-8 transition-all hover:border-black/15 hover:shadow-xl lg:col-span-7">
            <div className="relative z-10 mb-6">
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-white border border-black/[0.08] text-teal-700 shadow-xs">
                <Clock className="size-5" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-neutral-900">
                Smart Auto-Schedule
              </h3>
              <p className="mt-2 text-sm sm:text-base text-neutral-500 leading-relaxed max-w-lg">
                Audience activity intelligence automatically detects peak engagement hours for each channel to maximize impressions.
              </p>
            </div>

            {/* Peak Engagement Mockup */}
            <div className="rounded-2xl border border-black/[0.07] bg-white p-4 sm:p-5 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                <div>
                  <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    Audience Activity Heatmap
                  </span>
                  <h4 className="text-sm font-bold text-neutral-900 mt-0.5">
                    Today&apos;s High-Engagement Window
                  </h4>
                </div>
                <div className="rounded-lg bg-teal-50 border border-teal-200/60 px-2.5 py-1 text-xs font-bold text-teal-700">
                  +42% Potential Reach
                </div>
              </div>

              {/* Mini Timeline Bar Chart */}
              <div className="grid grid-cols-7 gap-2 items-end h-24 pt-2">
                {[
                  { hour: '9 AM', height: '40%', reach: 'Normal' },
                  { hour: '11 AM', height: '60%', reach: 'Good' },
                  { hour: '1 PM', height: '50%', reach: 'Normal' },
                  { hour: '3 PM', height: '95%', reach: 'Peak', highlight: true },
                  { hour: '5 PM', height: '70%', reach: 'High' },
                  { hour: '7 PM', height: '85%', reach: 'Optimal' },
                  { hour: '9 PM', height: '45%', reach: 'Normal' },
                ].map((slot) => (
                  <div key={slot.hour} className="flex flex-col items-center gap-1.5 h-full justify-end">
                    <div
                      className={`w-full rounded-t-lg transition-all ${
                        slot.highlight
                          ? 'bg-gradient-to-t from-teal-700 to-emerald-400 shadow-sm'
                          : 'bg-neutral-200 group-hover:bg-neutral-300'
                      }`}
                      style={{ height: slot.height }}
                    />
                    <span className={`text-[10px] font-medium ${slot.highlight ? 'font-bold text-teal-700' : 'text-neutral-400'}`}>
                      {slot.hour}
                    </span>
                  </div>
                ))}
              </div>

              {/* Best Slot Action */}
              <div className="flex items-center justify-between rounded-xl bg-neutral-50 border border-neutral-100 p-2.5 text-xs">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-medium text-neutral-700">Next Peak Queue: <strong>3:00 PM</strong></span>
                </div>
                <span className="text-[11px] font-semibold text-teal-700 flex items-center gap-0.5 hover:underline cursor-pointer">
                  Auto-fill Slot <ChevronRight className="size-3" />
                </span>
              </div>
            </div>
          </div>

          {/* Row 3: Secondary Capabilities (3 x 4 cols) */}
          <div className="group relative rounded-3xl border border-black/[0.08] bg-slate-50/50 p-6 transition-all hover:border-black/15 hover:shadow-lg lg:col-span-4">
            <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-white border border-black/[0.08] text-teal-700 shadow-xs">
              <MessageSquare className="size-4.5" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">Unified Social Inbox</h3>
            <p className="mt-1.5 text-sm text-neutral-500 leading-relaxed">
              Consolidate comments, mentions, and DMs across all networks into one unified response stream.
            </p>
          </div>

          <div className="group relative rounded-3xl border border-black/[0.08] bg-slate-50/50 p-6 transition-all hover:border-black/15 hover:shadow-lg lg:col-span-4">
            <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-white border border-black/[0.08] text-teal-700 shadow-xs">
              <BarChart3 className="size-4.5" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">Real-Time Analytics</h3>
            <p className="mt-1.5 text-sm text-neutral-500 leading-relaxed">
              Monitor impressions, follower velocity, and link click attribution across campaigns.
            </p>
          </div>

          <div className="group relative rounded-3xl border border-black/[0.08] bg-slate-50/50 p-6 transition-all hover:border-black/15 hover:shadow-lg lg:col-span-4">
            <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-white border border-black/[0.08] text-teal-700 shadow-xs">
              <Users className="size-4.5" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">Team Approval Workflows</h3>
            <p className="mt-1.5 text-sm text-neutral-500 leading-relaxed">
              Assign roles, request revisions, and review content before anything ever publishes live.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
