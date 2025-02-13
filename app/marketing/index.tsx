import type { Route } from './+types'
import { logLoader } from '~/lib/loader.server'
import { Container } from '~/components/Marketing/container'
import { Gradient } from '~/components/Marketing/gradient'
import { Link, type LoaderFunctionArgs } from 'react-router'
import { Navbar } from '~/components/Marketing/navbar'
import { buttonVariants } from '~/components/ui/button'
import {
  PRODUCT_DESCRIPTION,
  PRODUCT_TAGLINE,
  PRODUCT_VALUE,
} from '~/const/copy'

export async function loader({ context }: LoaderFunctionArgs) {
  logLoader('_marketing.index')

  return {
    message: context.cloudflare.env.PUBLIC_ENV_VAR,
  }
}

function Hero() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-3xl ring-1 ring-inset ring-black/5" />
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
        <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
          <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tighter text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            {PRODUCT_DESCRIPTION}
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            {PRODUCT_TAGLINE}
          </p>
          <div className="mt-6 text-gray-950">{PRODUCT_VALUE}</div>
        </div>
      </Container>
    </div>
  )
}

export default function MarketingIndex() {
  return (
    <div className="overflow-hidden bg-white dark:bg-slate-50">
      <Hero />
      <div className="h-96 w-full dark:bg-slate-950"></div>
    </div>
  )
}
