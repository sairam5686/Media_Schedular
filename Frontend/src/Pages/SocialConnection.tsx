import Navbar from '@/Components/Navbar'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, Check, Link2, Plus } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

const channels = [
    { name: 'LinkedIn', handle: 'Avinash Kumar', detail: 'Personal profile', icon: FaLinkedinIn, color: 'bg-sky-50 text-sky-700', connected: true },
    { name: 'Instagram', handle: '@avinash.creates', detail: 'Creator account', icon: FaInstagram, color: 'bg-rose-50 text-rose-700', connected: true },
    { name: 'Facebook', handle: 'Connect a page', detail: 'Pages and profiles', icon: FaFacebookF, color: 'bg-blue-50 text-blue-700', connected: false },
]

const SocialConnection = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar Title="Social accounts" Para="Manage the channels you publish to." />
            <main className="mx-auto max-w-7xl space-y-7 p-4 sm:p-6 lg:p-8">
                <section className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-sm font-medium text-teal-800">CHANNELS</p>
                        <h2 className="mt-1 text-xl font-semibold text-slate-950">Your connected accounts</h2>
                        <p className="mt-1 text-sm text-slate-500">Connect and manage your social profiles from one place.</p>
                    </div>
                    <Button className="gap-2 bg-teal-700 text-white hover:bg-teal-800">
                        <Plus className="size-4" /> Add account
                    </Button>
                </section>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {channels.map(({ name, handle, detail, icon: Icon, color, connected }) => (
                        <article key={name} className="flex min-h-56 flex-col rounded-lg border border-slate-200 bg-white p-5">
                            <div className="flex items-start justify-between gap-4">
                                <span className={`flex size-11 items-center justify-center rounded-md ${color}`}><Icon className="size-5" /></span>
                                {connected ? (
                                    <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800"><Check className="size-3.5" /> Connected</span>
                                ) : (
                                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">Not connected</span>
                                )}
                            </div>
                            <div className="mt-5">
                                <h3 className="font-semibold text-slate-950">{name}</h3>
                                <p className="mt-1 text-sm text-slate-700">{handle}</p>
                                <p className="mt-0.5 text-xs text-slate-500">{detail}</p>
                            </div>
                            <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500"><Link2 className="size-3.5" /> {connected ? 'Publishing enabled' : 'Publish to this channel'}</span>
                                {connected ? (
                                    <button type="button" aria-label={`Manage ${name} account`} className="inline-flex items-center gap-1 text-sm font-medium text-teal-800 hover:text-teal-950">Manage <ArrowUpRight className="size-4" /></button>
                                ) : (
                                    <Button variant="outline" size="sm" className="border-teal-200 text-teal-800 hover:bg-teal-50">Connect</Button>
                                )}
                            </div>
                        </article>
                    ))}
                </div>

                <aside className="flex items-start gap-3 rounded-lg border border-teal-100 bg-teal-50/70 p-4 text-sm text-teal-950">
                    <Link2 className="mt-0.5 size-4 shrink-0 text-teal-800" />
                    <p>Connected accounts are ready to receive scheduled posts. You can disconnect or update access from each account's manage menu.</p>
                </aside>
            </main>
        </div>
    )
}

export default SocialConnection