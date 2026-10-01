import Navbar from '@/Components/Navbar'
import { Button } from '@/components/ui/button'
import { Check, Link2, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

const SocialConnection = () => {
    const navigate = useNavigate()
    const [connectionDetails, setConnectionDetails] = useState({
        Twitter: false,
        facebook: false,
        instagram: false,
        linkedin: false,
        username: '',
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const onLoadHandler = async () => {
        try {
            const res = await fetch('http://localhost:5000/connecteddetails', {
                method: 'GET',
                credentials: 'include',
            })

            if (res.status === 401) {
                navigate('/Login')
                return
            }

            const data = await res.json()
            setConnectionDetails(data)
        } catch (err) {
            console.log(err)
            setError('Could not load your connected accounts. Refresh to try again.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        onLoadHandler()
    }, [])

    // Keys always come from the backend; defaults above cover the loading/error state
    const { linkedin, instagram, facebook, Twitter: twitter, username } = connectionDetails

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar Title="Social accounts" Para="Manage the channels you publish to." />
            <main className="mx-auto max-w-7xl space-y-7 p-4 sm:p-6 lg:p-8">
                {error && (
                    <div className="rounded-lg border border-rose-100 bg-rose-50 p-4 text-sm text-rose-800">{error}</div>
                )}

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {/* LinkedIn */}
                    <article className="flex min-h-56 flex-col rounded-lg border border-slate-200 bg-white p-5">
                        <div className="flex items-start justify-between gap-4">
                            <span className="flex size-11 items-center justify-center rounded-md bg-sky-50 text-sky-700">
                                <FaLinkedinIn className="size-5" />
                            </span>
                            {loading ? (
                                <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                    <Loader2 className="size-3.5 animate-spin" /> Checking
                                </span>
                            ) : linkedin ? (
                                <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800">
                                    <Check className="size-3.5" /> Connected
                                </span>
                            ) : (
                                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                    Not connected
                                </span>
                            )}
                        </div>
                        <div className="mt-5">
                            <h3 className="font-semibold text-slate-950">LinkedIn</h3>
                            <p className="mt-1 text-sm text-slate-700">{linkedin ? username : 'Connect your profile'}</p>
                            <p className="mt-0.5 text-xs text-slate-500">Personal profile</p>
                        </div>
                        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                                <Link2 className="size-3.5" /> {linkedin ? 'Publishing enabled' : 'Publish to this channel'}
                            </span>
                            {loading ? (
                                <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                                    <Loader2 className="size-4 animate-spin" /> Loading
                                </span>
                            ) : linkedin ? (
                                <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-800">
                                    <Check className="size-4" /> Connected
                                </span>
                            ) : (
                                <Button variant="outline" size="sm" className="border-teal-200 text-teal-800 hover:bg-teal-50">
                                    Connect
                                </Button>
                            )}
                        </div>
                    </article>

                    {/* Instagram */}
                    <article className="flex min-h-56 flex-col rounded-lg border border-slate-200 bg-white p-5">
                        <div className="flex items-start justify-between gap-4">
                            <span className="flex size-11 items-center justify-center rounded-md bg-rose-50 text-rose-700">
                                <FaInstagram className="size-5" />
                            </span>
                            {loading ? (
                                <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                    <Loader2 className="size-3.5 animate-spin" /> Checking
                                </span>
                            ) : instagram ? (
                                <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800">
                                    <Check className="size-3.5" /> Connected
                                </span>
                            ) : (
                                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                    Not connected
                                </span>
                            )}
                        </div>
                        <div className="mt-5">
                            <h3 className="font-semibold text-slate-950">Instagram</h3>
                            <p className="mt-1 text-sm text-slate-700">{instagram ? username : 'Connect your account'}</p>
                            <p className="mt-0.5 text-xs text-slate-500">Creator account</p>
                        </div>
                        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                                <Link2 className="size-3.5" /> {instagram ? 'Publishing enabled' : 'Publish to this channel'}
                            </span>
                            {loading ? (
                                <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                                    <Loader2 className="size-4 animate-spin" /> Loading
                                </span>
                            ) : instagram ? (
                                <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-800">
                                    <Check className="size-4" /> Connected
                                </span>
                            ) : (
                                <Button variant="outline" size="sm" className="border-teal-200 text-teal-800 hover:bg-teal-50">
                                    Connect
                                </Button>
                            )}
                        </div>
                    </article>

                    {/* Facebook */}
                    <article className="flex min-h-56 flex-col rounded-lg border border-slate-200 bg-white p-5">
                        <div className="flex items-start justify-between gap-4">
                            <span className="flex size-11 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                                <FaFacebookF className="size-5" />
                            </span>
                            {loading ? (
                                <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                    <Loader2 className="size-3.5 animate-spin" /> Checking
                                </span>
                            ) : facebook ? (
                                <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800">
                                    <Check className="size-3.5" /> Connected
                                </span>
                            ) : (
                                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                    Not connected
                                </span>
                            )}
                        </div>
                        <div className="mt-5">
                            <h3 className="font-semibold text-slate-950">Facebook</h3>
                            <p className="mt-1 text-sm text-slate-700">{facebook ? username : 'Connect a page'}</p>
                            <p className="mt-0.5 text-xs text-slate-500">Pages and profiles</p>
                        </div>
                        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                                <Link2 className="size-3.5" /> {facebook ? 'Publishing enabled' : 'Publish to this channel'}
                            </span>
                            {loading ? (
                                <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                                    <Loader2 className="size-4 animate-spin" /> Loading
                                </span>
                            ) : facebook ? (
                                <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-800">
                                    <Check className="size-4" /> Connected
                                </span>
                            ) : (
                                <Button variant="outline" size="sm" className="border-teal-200 text-teal-800 hover:bg-teal-50">
                                    Connect
                                </Button>
                            )}
                        </div>
                    </article>

                    {/* Twitter */}
                    <article className="flex min-h-56 flex-col rounded-lg border border-slate-200 bg-white p-5">
                        <div className="flex items-start justify-between gap-4">
                            <span className="flex size-11 items-center justify-center rounded-md bg-slate-100 text-slate-800">
                                <FaTwitter className="size-5" />
                            </span>
                            {loading ? (
                                <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                    <Loader2 className="size-3.5 animate-spin" /> Checking
                                </span>
                            ) : twitter ? (
                                <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800">
                                    <Check className="size-3.5" /> Connected
                                </span>
                            ) : (
                                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                    Not connected
                                </span>
                            )}
                        </div>
                        <div className="mt-5">
                            <h3 className="font-semibold text-slate-950">Twitter</h3>
                            <p className="mt-1 text-sm text-slate-700">{twitter ? username : 'Connect your account'}</p>
                            <p className="mt-0.5 text-xs text-slate-500">Personal account</p>
                        </div>
                        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                                <Link2 className="size-3.5" /> {twitter ? 'Publishing enabled' : 'Publish to this channel'}
                            </span>
                            {loading ? (
                                <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                                    <Loader2 className="size-4 animate-spin" /> Loading
                                </span>
                            ) : twitter ? (
                                <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-800">
                                    <Check className="size-4" /> Connected
                                </span>
                            ) : (
                                <Button variant="outline" size="sm" className="border-teal-200 text-teal-800 hover:bg-teal-50">
                                    Connect
                                </Button>
                            )}
                        </div>
                    </article>
                </div>

                <aside className="flex items-start gap-3 rounded-lg border border-teal-100 bg-teal-50/70 p-4 text-sm text-teal-950">
                    <Link2 className="mt-0.5 size-4 shrink-0 text-teal-800" />
                    <p>Connected accounts are ready to receive scheduled posts. Accounts that aren't connected yet can be linked with the Connect button.</p>
                </aside>
            </main>
        </div>
    )
}

export default SocialConnection