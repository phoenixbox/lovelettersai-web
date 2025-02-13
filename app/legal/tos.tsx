import type { Route } from './+types/tos'
import { parse } from '~/services/markdoc.server'
import { Container } from '~/components/Marketing/container'
import { Markdown } from '~/components/Markdown'
import { TOS } from './tos.server'

export async function loader() {
  const MARKDOWN = [
    `---
title: REPL Labs Terms of Service
---`,
    TOS,
  ].join('\n')

  return { content: parse(MARKDOWN) }
}

export default function TosIndex({
  loaderData,
}: {
  loaderData: Route.ComponentProps
}) {
  return (
    <Container className="mt-24 sm:mt-32 md:mt-56 text-black">
      <Markdown content={loaderData.content} />
    </Container>
  )
}
