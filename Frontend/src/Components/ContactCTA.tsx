import { PhoneCall, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ShaderMeshClouds from './ShaderMeshClouds'

export function ContactCTA() {
  return (
    <section id="contact" className="relative w-full bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 scroll-mt-16">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[28px] border border-black/[0.08] px-6 py-10 text-center sm:px-14 sm:py-14 shadow-xl">
          {/* Animated Shader Mesh Clouds Background */}
          <div className="absolute inset-0 z-0">
            <ShaderMeshClouds
              speed={1.2}
              scale={1.1}
              cover={0.25}
              density={7.5}
              skyColorHigh="#064e3b"
              skyColorLow="#0f766e"
              cloudColor="#ecfdf5"
              cloudDarkness={0.55}
            />
            {/* Subtle contrast scrim */}
            <div className="absolute inset-0 bg-black/25 backdrop-blur-[0.5px]" />
          </div>

          {/* Foreground Content */}
          <div className="relative z-10">
            {/* Top Pill Badge */}
            <div className="mb-3.5 inline-flex items-center justify-center">
              <span className="rounded-full bg-emerald-500/25 backdrop-blur-md border border-emerald-300/40 px-3.5 py-0.5 text-xs font-semibold text-emerald-100 tracking-wide shadow-sm">
                Get started
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-3xl md:text-4xl">
              Try our platform today!
            </h2>

            {/* Subtitle */}
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/90 sm:text-base leading-relaxed font-normal drop-shadow-xs">
              Managing a small business today is already tough. Avoid further
              complications by ditching outdated, tedious trade methods. Our goal is to
              streamline SMB trade, making it easier and faster than ever.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3.5">
              {/* Jump on a call button */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/95 px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-lg backdrop-blur-sm transition-all hover:bg-emerald-50 hover:scale-102 active:scale-98"
              >
                <span>Jump on a call</span>
                <PhoneCall className="size-4 text-neutral-800" />
              </a>

              {/* Sign up here button */}
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-xl transition-all hover:bg-teal-800 hover:scale-102 active:scale-98 border border-teal-500/30"
              >
                <span>Sign up here</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
