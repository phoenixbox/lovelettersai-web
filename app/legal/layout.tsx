import { Outlet } from 'react-router'
import { logLoader } from '~/lib/loader.server'
import { Footer } from '~/components/Marketing/footer'
import { Container } from '~/components/Marketing/container'
import { Navbar } from '~/components/Marketing/navbar'
import AnchorHandler from '~/components/Navigation/AnchorHandler'

export function loader() {
  logLoader('legal.layout')

  return null
}

export default function LegalLayout() {
  return (
    <>
      <AnchorHandler />
      <div className="overflow-hidden bg-white dark:bg-slate-50">
        <Container className="relative">
          <Navbar />
        </Container>
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}
