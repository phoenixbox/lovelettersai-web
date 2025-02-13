import { Outlet } from 'react-router'
import { logLoader } from '~/lib/loader.server'

export function loader() {
  logLoader('_marketing (layout) ROOT')

  return { message: 'Marketing layout' }
}

export default function MarketingLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  )
}
