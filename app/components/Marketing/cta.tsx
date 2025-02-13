import { Subheading } from '~/components/Marketing/text'
import { PRODUCT_VALUE } from '~/const/copy'

export default function CallToAction() {
  return (
    <div className="relative pb-16 pt-20 text-center sm:py-24">
      <hgroup>
        <Subheading>Get started</Subheading>
        <p className="mt-6 text-3xl font-medium tracking-tight text-gray-950 sm:text-5xl">
          Ready to start?
        </p>
      </hgroup>
      <p className="mx-auto mt-6 max-w-xs text-sm/6 text-gray-500">
        {PRODUCT_VALUE}
      </p>
      {/* <div className="mt-6">
          <Link to="/login" className={buttonVariants({ variant: 'default' })}>
            Get started
          </Link>
        </div> */}
    </div>
  )
}
