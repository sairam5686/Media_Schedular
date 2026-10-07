import Navbar from '@/Components/Navbar'
import { Button } from '@/components/ui/button'
import { CalendarDays, Check, Clock3, ImagePlus, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

// Icon/color lookup keyed by the platform name the backend returns
const platformMeta: Record<string, { icon: React.ElementType; color: string }> = {
  linkedin: { icon: FaLinkedinIn, color: 'text-sky-700' },
  instagram: { icon: FaInstagram, color: 'text-rose-700' },
  facebook: { icon: FaFacebookF, color: 'text-blue-700' },
  twitter: { icon: FaTwitter, color: 'text-blue-500' },
}

const publishedPosts = [
  { text: 'We are thrilled to announce the official launch of our new AI course!', date: 'Today · 6:07 PM', platforms: 'LinkedIn, Instagram' },
  { text: 'A little look at what we have been building this month.', date: 'Yesterday · 5:50 PM', platforms: 'Instagram' },
]

// Today's date as YYYY-MM-DD in the user's LOCAL time (toISOString would use UTC)
const getTodayString = () => {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

const Poster = () => {
  const [content, setContent] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([])
  const [platformsLoading, setPlatformsLoading] = useState(true)
  const [UserScheduledPostList, setUserScheduledPostList] = useState()
  const [UserPublisherPostList, setUserPublisherPostList] = useState()

  const [UserFile, setUserFile] = useState<File | null>(null)
  const [fileInputKey, setFileInputKey] = useState(0)
  const [UserDate, setUserDate] = useState('')
  const [UserTime, setUserTime] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)

  // ---------- Validation ----------
  const getError = (): string | null => {
    if (selectedPlatforms.length === 0) return 'Select at least one platform.'
    if (!content.trim()) return 'Write some post content.'
    if (!UserDate) return 'Pick a date.'
    if (!UserTime) return 'Pick a time.'

    const scheduled = new Date(`${UserDate}T${UserTime}`)
    if (Number.isNaN(scheduled.getTime())) return 'Date or time is invalid.'
    if (scheduled.getTime() <= Date.now()) return 'Date and time must be in the future.'

    return null
  }

  const validationError = getError()
  const isValid = validationError === null

  // ---------- Submit ----------
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Re-check on submit so the request never goes out with bad data
    const error = getError()
    if (error) {
      setMessage({ type: 'error', text: error })
      return
    }

    const Formdata = new FormData()
    if (UserFile) {
      Formdata.append('image', UserFile)
    }
    Formdata.append('User_content', content.trim())
    Formdata.append('Platform', JSON.stringify(selectedPlatforms))
    Formdata.append('Date', UserDate) // raw "YYYY-MM-DD"
    Formdata.append('Time', UserTime) // raw "HH:MM"

    setSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch('http://localhost:5000/poster', {
        method: 'POST',
        credentials: 'include',
        body: Formdata,
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage({ type: 'error', text: data.message ?? 'Something went wrong.' })
        return
      }

      setMessage({ type: 'success', text: data.message ?? 'Post scheduled.' })

      // Reset the form
      setContent('')
      setSelectedPlatforms([])
      setUserFile(null)
      setFileInputKey((k) => k + 1) // clears the file input
      setUserDate('')
      setUserTime('')
    } catch (error) {
      console.log(error)
      setMessage({ type: 'error', text: 'Could not reach the server.' })
    } finally {
      setSubmitting(false)
    }
  }

  const UserPlatformFetcher = async () => {
    try {
      const response = await fetch('http://localhost:5000/connected/platform', {
        method: 'GET',
        credentials: 'include',
      })
      const { connected_platform } = await response.json()
      // expects an array of names, e.g. ["linkedin", "instagram"]
      const names: string[] = Array.isArray(connected_platform) ? connected_platform.map((p: string) => p.toLowerCase()) : []
      setConnectedPlatforms(names)
      // drop any selected platform that is no longer connected
      setSelectedPlatforms((current) => current.filter((p) => names.includes(p)))
    } catch (error) {
      console.log(error)
    } finally {
      setPlatformsLoading(false)
    }
  }

  const PostListFetcher = async (type: string, limit: number) => {
    const response = await fetch(`http://localhost:5000/post/list/${type}/${limit}`, { method: 'GET', credentials: 'include' })
    const data = await response.json()
    return data
  }

  useEffect(() => {
    UserPlatformFetcher()
  }, [])

  const togglePlatform = (name: string) => {
    setSelectedPlatforms((current) =>
      current.includes(name) ? current.filter((platform) => platform !== name) : [...current, name]
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar Title="Schedule & post" Para="Create content and plan when it goes live." />
      <main className="mx-auto grid max-w-7xl items-start gap-6 p-4 sm:p-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:p-8">
        <form onSubmit={onSubmitHandler}>
          <section className="rounded-lg border border-slate-200 bg-white">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <h2 className="font-semibold text-slate-950">Compose post</h2>
              <p className="mt-1 text-sm text-slate-500">Choose channels and write your message.</p>
            </div>
            <div className="space-y-6 p-5 sm:p-6">
              <fieldset>
                <legend className="mb-3 text-sm font-medium text-slate-800">Publish to</legend>
                <div className="flex flex-wrap gap-2">
                  {platformsLoading && <p className="text-sm text-slate-500">Loading platforms...</p>}

                  {!platformsLoading && connectedPlatforms.length === 0 && (
                    <p className="text-sm text-slate-500">No connected platforms yet. Connect an account to start posting.</p>
                  )}

                  {connectedPlatforms.map((name) => {
                    const meta = platformMeta[name]
                    const Icon = meta?.icon
                    const color = meta?.color ?? 'text-slate-600'
                    const selected = selectedPlatforms.includes(name)
                    return (
                      <button
                        key={name}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => togglePlatform(name)}
                        className={`inline-flex h-10 items-center gap-2 rounded-md border px-3 text-sm font-medium capitalize transition-colors ${
                          selected ? 'border-teal-700 bg-teal-50 text-teal-900' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {Icon && <Icon className={`size-4 ${selected ? color : 'text-slate-400'}`} />} {name}
                        {selected && <Check className="size-3.5 text-teal-700" />}
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label htmlFor="post-content" className="text-sm font-medium text-slate-800">Post content</label>
                </div>
                <textarea
                  id="post-content"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  placeholder="What would you like to share?"
                  className="min-h-40 w-full resize-y rounded-md border border-slate-200 bg-white p-3.5 text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15"
                />
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-slate-800">Media <span className="font-normal text-slate-400">Optional</span></p>
                <label className="flex min-h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-slate-300 bg-slate-50/70 px-4 py-5 text-center transition-colors hover:border-teal-600 hover:bg-teal-50/40">
                  <ImagePlus className="size-5 text-teal-800" />
                  <span className="text-sm font-medium text-slate-700">{UserFile?.name ?? 'No file chosen'}</span>
                  <span className="text-xs text-slate-500">PNG or JPG</span>
                  <input
                    key={fileInputKey}
                    className="sr-only"
                    type="file"
                    accept="image/*"
                    onChange={(event) => setUserFile(event.target.files?.[0] ?? null)}
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-800">Date
                  <span className="relative mt-2 block">
                    <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="date"
                      value={UserDate}
                      min={getTodayString()}
                      onChange={(e) => setUserDate(e.target.value)}
                      className="h-11 w-full rounded-md border border-slate-200 bg-white pl-10 pr-3 text-sm font-normal text-slate-700 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15"
                    />
                  </span>
                </label>
                <label className="block text-sm font-medium text-slate-800">Time
                  <span className="relative mt-2 block">
                    <Clock3 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="time"
                      value={UserTime}
                      onChange={(e) => setUserTime(e.target.value)}
                      className="h-11 w-full rounded-md border border-slate-200 bg-white pl-10 pr-3 text-sm font-normal text-slate-700 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15"
                    />
                  </span>
                </label>
              </div>

              {/* Validation hint / server message */}
              {message ? (
                <p className={`text-sm ${message.type === 'error' ? 'text-red-600' : 'text-emerald-700'}`}>{message.text}</p>
              ) : (
                !isValid && <p className="text-sm text-slate-500">{validationError}</p>
              )}

              <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <Button
                  type="submit"
                  disabled={!isValid || submitting}
                  className="gap-2 bg-teal-700 text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CalendarDays className="size-4" /> {submitting ? 'Scheduling...' : 'Schedule post'}
                </Button>
              </div>
            </div>
          </section>
        </form>

        {/* aside section unchanged */}
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