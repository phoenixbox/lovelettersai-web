import type { Route } from './+types/data'
import { Container } from '~/components/Marketing/container'
import { logLoader } from '~/lib/loader.server'

export async function loader() {
  logLoader('app.data')

  return null
}

export default function PrivacyIndex({
  loaderData,
}: {
  loaderData: Route.ComponentProps
}) {
  return (
    <Container className="mt-24 sm:mt-32 md:mt-56 text-black">
      <div className="text-xl">Data</div>
    </Container>
  )
}
