import type { Route } from './+types/tos'
import { parse } from '~/services/markdoc.server'
import { Container } from '~/components/Marketing/container'
import { Markdown } from '~/components/Markdown'

export async function loader() {
  const MARKDOWN = `---
title: What is Markdoc?
---

# What is REPL Labs?

Markdoc is a Markdown-based syntax and toolchain for creating custom documentation sites. Stripe created Markdoc to power [our public docs](http://stripe.com/docs).

{% callout type="check" %}
Markdoc is open-source—check out its [source](http://github.com/markdoc/markdoc) to see how it works.
{% /callout %}

## How is Markdoc different?

Markdoc uses a fully declarative approach to composition and flow control, where other solutions… [Read more](/docs/overview).

## Next steps
- [Install Markdoc](/docs/getting-started)
- [Explore the syntax](/docs/syntax)
`
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
