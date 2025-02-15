import { logLoader } from '~/lib/loader.server'
import { type LoaderFunctionArgs } from 'react-router'

export async function loader({ context }: LoaderFunctionArgs) {
  logLoader('marketing.index')

  return {
    message: context.cloudflare.env.PUBLIC_ENV_VAR,
  }
}

export default function MarketingIndex() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-950 flex flex-col items-center">
      <div className="flex flex-col space-y-12 text-center pt-12">
        <div className="flex flex-col">
          <div className="text-4xl md:text-6xl text-white-800 font-medium">
            RevCobe
          </div>
          <div className="text-2xl md:text-4xl text-white-600">
            Visualize your revenue.
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-2xl">Insert globe here</div>
        </div>
      </div>
    </div>
  )
}
