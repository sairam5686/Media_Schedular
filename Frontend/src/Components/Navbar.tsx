import type { NavPropType } from '@/lib/Types'

const Navbar = ({ Title, Para }: NavPropType) => {
  return (
    <header className="border-b border-slate-200 bg-white px-5 py-5 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
          {Title}
        </h1>
        <p className="mt-1 text-sm text-slate-500">{Para}</p>
      </div>
    </header>
  )
}

export default Navbar