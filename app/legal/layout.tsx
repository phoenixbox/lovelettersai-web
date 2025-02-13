import { Outlet } from 'react-router'
import { logLoader } from '~/lib/loader.server'
import { Footer } from '~/components/Marketing/footer'
import { Container } from '~/components/Marketing/container'
import { Navbar } from '~/components/Marketing/navbar'
import { Link } from 'react-router'

export function loader() {
  logLoader('legal.layout')

  return null
}

export default function LegalLayout() {
  return (
    <div className="overflow-hidden bg-white dark:bg-slate-50">
      <Container className="relative">
        <Navbar
          banner={
            <Link
              to="#"
              className="flex items-center gap-1 rounded-full bg-orange-950/35 px-3 py-0.5 text-sm/6 font-medium text-white data-[hover]:bg-orange-950/30"
            >
              Alpha
            </Link>
          }
        />
      </Container>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
