import { Link } from 'react-router-dom'
import WorldMapDemo from '../Components/world-map-demo'

const Login = () => {
  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-2">
      <section className="order-2 flex items-center justify-center px-6 py-12 sm:px-12 lg:order-1 lg:px-16">
        <div className="w-full max-w-md">
          <Link to="/" className="text-xl font-bold tracking-tight text-gray-950">
            Social<span className="text-indigo-600">Flow</span>
          </Link>

          <div className="mt-12">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">
              Welcome back
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
              Sign in to your account
            </h1>
            <p className="mt-3 text-gray-600">
              Keep your social presence moving. Pick up right where you left off.
            </p>
          </div>

          <form className="mt-9 space-y-5" onSubmit={(event) => event.preventDefault()}>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-800">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                className="h-12 w-full rounded-md border border-gray-300 bg-white px-4 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/15"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-800">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                className="h-12 w-full rounded-md border border-gray-300 bg-white px-4 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/15"
              />
            </div>

            <button
              type="submit"
              className="h-12 w-full rounded-md bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
            >
              Sign in
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-gray-600">
            New here?{' '}
            <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700">
              Create an account
            </Link>
          </p>
        </div>
      </section>

      <aside className="order-1 overflow-hidden lg:order-2">
        <WorldMapDemo />
      </aside>
    </main>
  )
}

export default Login