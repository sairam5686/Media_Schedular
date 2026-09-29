import Navbar from '@/Components/Navbar'
import { Button } from '@/components/ui/button'
import { CalendarDays, Check, Clock3, ImagePlus, Send } from 'lucide-react'
import { useState } from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

const platforms = [
  { name: 'LinkedIn', icon: FaLinkedinIn, color: 'text-sky-700' },
  { name: 'Instagram', icon: FaInstagram, color: 'text-rose-700' },
  { name: 'Facebook', icon: FaFacebookF, color: 'text-blue-700' },
]

const publishedPosts = [
  { text: 'We are thrilled to announce the official launch of our new AI course!', date: 'Today · 6:07 PM', platforms: 'LinkedIn, Instagram' },
  { text: 'A little look at what we have been building this month.', date: 'Yesterday · 5:50 PM', platforms: 'Instagram' },
]

const Poster = () => {
  const [content, setContent] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState(['LinkedIn', 'Instagram'])
  const [fileName, setFileName] = useState('')

  const togglePlatform = (name: string) => {
    setSelectedPlatforms((current) => current.includes(name)
      ? current.filter((platform) => platform !== name)
      : [...current, name])
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar Title="Schedule & post" Para="Create content and plan when it goes live." />
      <main className="mx-auto grid max-w-7xl items-start gap-6 p-4 sm:p-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:p-8">
        <section className="rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
            <h2 className="font-semibold text-slate-950">Compose post</h2>
            <p className="mt-1 text-sm text-slate-500">Choose channels and write your message.</p>
          </div>
          <div className="space-y-6 p-5 sm:p-6">
            <fieldset>
              <legend className="mb-3 text-sm font-medium text-slate-800">Publish to</legend>
              <div className="flex flex-wrap gap-2">
                {platforms.map(({ name, icon: Icon, color }) => {
                  const selected = selectedPlatforms.includes(name)
                  return (
                    <button key={name} type="button" aria-pressed={selected} onClick={() => togglePlatform(name)} className={`inline-flex h-10 items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors ${selected ? 'border-teal-700 bg-teal-50 text-teal-900' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                      <Icon className={`size-4 ${selected ? color : 'text-slate-400'}`} /> {name}
                      {selected && <Check className="size-3.5 text-teal-700" />}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor="post-content" className="text-sm font-medium text-slate-800">Post content</label>
                <span className={`text-xs tabular-nums ${content.length > 280 ? 'text-rose-700' : 'text-slate-400'}`}>{content.length} / 280</span>
              </div>
              <textarea id="post-content" value={content} onChange={(event) => setContent(event.target.value)} placeholder="What would you like to share?" className="min-h-40 w-full resize-y rounded-md border border-slate-200 bg-white p-3.5 text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15" />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-slate-800">Media <span className="font-normal text-slate-400">Optional</span></p>
              <label className="flex min-h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-slate-300 bg-slate-50/70 px-4 py-5 text-center transition-colors hover:border-teal-600 hover:bg-teal-50/40">
                <ImagePlus className="size-5 text-teal-800" />
                <span className="text-sm font-medium text-slate-700">{fileName || 'Choose an image or video'}</span>
                <span className="text-xs text-slate-500">PNG, JPG or MP4</span>
                <input className="sr-only" type="file" accept="image/*,video/*" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')} />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-800">Date
                <span className="relative mt-2 block">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input type="date" className="h-11 w-full rounded-md border border-slate-200 bg-white pl-10 pr-3 text-sm font-normal text-slate-700 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15" />
                </span>
              </label>
              <label className="block text-sm font-medium text-slate-800">Time
                <span className="relative mt-2 block">
                  <Clock3 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input type="time" className="h-11 w-full rounded-md border border-slate-200 bg-white pl-10 pr-3 text-sm font-normal text-slate-700 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15" />
                </span>
              </label>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <Button variant="outline" className="border-slate-200 text-slate-700">Save draft</Button>
              <Button className="gap-2 bg-teal-700 text-white hover:bg-teal-800"><CalendarDays className="size-4" /> Schedule post</Button>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-lg border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="font-semibold text-slate-950">Upcoming</h2>
                <p className="mt-1 text-sm text-slate-500">Ready to go out</p>
              </div>
              <span className="rounded-md bg-teal-50 px-2.5 py-1 text-sm font-semibold tabular-nums text-teal-800">3</span>
            </div>
            <div className="divide-y divide-slate-100 px-5">
              <article className="py-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-teal-800">LinkedIn</span>
                  <span className="text-xs text-slate-500">Today, 2:30 PM</span>
                </div>
                <p className="mt-2 text-sm leading-5 text-slate-700">A few lessons from building in public this month.</p>
              </article>
              <article className="py-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-rose-800">Instagram</span>
                  <span className="text-xs text-slate-500">Tomorrow, 10:00 AM</span>
                </div>
                <p className="mt-2 text-sm leading-5 text-slate-700">Behind the scenes from our latest launch.</p>
              </article>
              <article className="py-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-blue-800">Facebook</span>
                  <span className="text-xs text-slate-500">Thu, 4:15 PM</span>
                </div>
                <p className="mt-2 text-sm leading-5 text-slate-700">What are you working on this week?</p>
              </article>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-slate-950">Recently published</h2>
              <p className="mt-1 text-sm text-slate-500">Your latest posts</p>
            </div>
            <div className="divide-y divide-slate-100 px-5">
              {publishedPosts.map((post) => (
                <article key={post.text} className="py-4">
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="font-medium text-slate-600">{post.platforms}</span>
                    <span className="shrink-0 text-slate-400">{post.date}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-700">{post.text}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700"><Check className="size-3.5" /> Published</span>
                </article>
              ))}
            </div>
          </section>
          <p className="flex items-start gap-2 px-1 text-xs leading-5 text-slate-500"><Send className="mt-0.5 size-3.5 shrink-0 text-teal-700" /> Posts will publish to the selected connected accounts at the scheduled time.</p>
        </aside>
      </main>
    </div>
  )
}

export default Poster