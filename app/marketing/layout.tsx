import { Outlet } from 'react-router'
import { logLoader } from '~/lib/loader.server'
import { Footer } from '~/components/Marketing/footer'
import CallToAction from '~/components/Marketing/cta'
export function loader() {
  logLoader('marketing.layout')
  return null
}

export default function MarketingLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer>
        <CallToAction />
      </Footer>
    </>
  )
}
