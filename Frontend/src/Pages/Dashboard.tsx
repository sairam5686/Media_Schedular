import Navbar from '@/Components/Navbar'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, CalendarDays, ChartNoAxesCombined, Clock3, Eye, Heart, Plus, Send } from 'lucide-react'
import { useNavigate } from 'react-router'

const metrics = [
  { label: 'Impressions', value: '8,420', change: '+18.2%', icon: Eye, tint: 'bg-teal-50 text-teal-700' },
  { label: 'Engagements', value: '1,284', change: '+8.4%', icon: Heart, tint: 'bg-rose-50 text-rose-700' },
  { label: 'Published posts', value: '24', change: '+4 this week', icon: Send, tint: 'bg-lime-50 text-lime-800' },
  { label: 'Connected channels', value: '3', change: 'All active', icon: ChartNoAxesCombined, tint: 'bg-sky-50 text-sky-700' },
]

const activity = [
  { day: 'Mon', height: 'h-16' },
  { day: 'Tue', height: 'h-24' },
  { day: 'Wed', height: 'h-20' },
  { day: 'Thu', height: 'h-32' },
  { day: 'Fri', height: 'h-24' },
  { day: 'Sat', height: 'h-40' },
  { day: 'Sun', height: 'h-28' },
]

const scheduledPosts = [
  { platform: 'LinkedIn', message: 'A few lessons from building in public this month.', time: 'Today, 2:30 PM', initials: 'in', tint: 'bg-sky-100 text-sky-800' },
  { platform: 'Instagram', message: 'Behind the scenes from our latest launch.', time: 'Tomorrow, 10:00 AM', initials: 'ig', tint: 'bg-rose-100 text-rose-800' },
  { platform: 'Facebook', message: 'What are you working on this week?', time: 'Thu, 4:15 PM', initials: 'f', tint: 'bg-blue-100 text-blue-800' },
]

const Dashboard = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar Title="Dashboard" Para="Your social performance, at a glance." />
      <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-slate-500">Tuesday, September 29</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950">Welcome back, Sai</h2>
          </div>
          <Button onClick={() => navigate('/poster')} className="gap-2 bg-teal-700 text-white hover:bg-teal-800">
            <Plus className="size-4" /> Create post
          </Button>
        </div>

        <section aria-label="Social performance summary" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map(({ label, value, change, icon: Icon, tint }) => (
            <article key={label} className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <span className={`flex size-9 items-center justify-center rounded-md ${tint}`}><Icon className="size-4" /></span>
              </div>
              <div className="mt-4 flex items-end justify-between gap-2">
                <p className="text-2xl font-semibold tabular-nums text-slate-950">{value}</p>
                <span className="mb-1 text-xs font-medium text-teal-700">{change}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-slate-950">Audience reach</h2>
                <p className="mt-1 text-sm text-slate-500">Impressions across your channels this week</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-md bg-teal-50 px-2.5 py-1.5 text-xs font-semibold text-teal-800">
                <ArrowUpRight className="size-3.5" /> 18.2%
              </span>
            </div>
            <div className="mt-7 flex h-48 items-end justify-between gap-2 border-b border-slate-100 px-1 sm:gap-4">
              {activity.map(({ day, height }, index) => (
                <div key={day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <div aria-label={`${day}: ${index + 1} units`} className={`w-full max-w-12 rounded-t-sm ${height} ${index === 5 ? 'bg-teal-700' : 'bg-teal-100'}`} />
                  <span className="pb-2 text-xs text-slate-400">{day}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <span className="size-2 rounded-full bg-teal-700" /> Daily impressions
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold text-slate-950">Up next</h2>
                <p className="mt-1 text-sm text-slate-500">Your scheduled posts</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/poster')} className="text-teal-800 hover:bg-teal-50">View all</Button>
            </div>
            <div className="mt-5 divide-y divide-slate-100">
              {scheduledPosts.map((post) => (
                <div key={post.platform} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                  <span className={`flex size-9 shrink-0 items-center justify-center rounded-md text-xs font-bold ${post.tint}`}>{post.initials}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                      <p className="text-sm font-medium text-slate-800">{post.platform}</p>
                      <p className="inline-flex items-center gap-1 text-xs text-slate-500"><Clock3 className="size-3.5" />{post.time}</p>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-500">{post.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <div className="flex items-center gap-2 border-t border-slate-200 pt-4 text-sm text-slate-500">
          <CalendarDays className="size-4 text-teal-700" /> Performance summary for the last 7 days
        </div>
      </main>
    </div>
  )
}

export default Dashboard