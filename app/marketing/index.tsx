import { logLoader } from '~/lib/loader.server'
import { type LoaderFunctionArgs } from 'react-router'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '~/components/ui/accordion'
import * as AccordionPrimitive from '@radix-ui/react-accordion'

function getGmailLink(email: string, subject: string, body: string) {
  return `https://mail.google.com/mail/u/0/?view=cm&to=${email}&su=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`
}

function getMailtoLink(email: string, subject: string, body: string) {
  return `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`
}

export async function loader({ context }: LoaderFunctionArgs) {
  logLoader('marketing.index')

  return {
    message: context.cloudflare.env.PUBLIC_ENV_VAR,
  }
}

export const meta: MetaFunction = () => {
  const title = 'Love Letters AI'
  const description = 'Send a real letter to someone you love.'
  const image = 'https://lovelettersai.com/og/og_image.png'

  return [
    { title },
    { name: 'description', content: description },

    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://lovelettersai.com' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },

    // Additional SEO tags
    { name: 'viewport', content: 'width=device-width,initial-scale=1' },
    { property: 'og:locale', content: 'en_US' },
  ]
}

import { Plus } from 'lucide-react'

const items = [
  {
    id: '7fe38374-6b60-4152-9537-e93cfa2c2ac8',
    title: 'Do you send a real letter in the mail?',
    content:
      'Yes, your letter will be printed on real paper and sent via USPS First Class Mail. Mail is usually nothing but bad news, bills, taxes, and spam, but our AI agent CeeCee makes this piece of mail fun and meaningful.',
  },
  {
    id: '90d1f359-1dd2-42c8-972e-374373381e94',
    title: 'How do I get started?',
    content:
      "CeeCee is our AI agent who can help you get started! Send a quick 'hi' to cupid@lovelettersai.com, and she will follow up with questions about your recipient and message. CeeCee can also handle payment and send the physical letter.",
    mailto: {
      email: 'cupid@lovelettersai.com',
      mobile: getMailtoLink(
        'cupid@lovelettersai.com',
        'I want to send a letter',
        'Hi, I’d like to send a letter, can you help me with that?'
      ),
      desktop: getGmailLink(
        'cupid@lovelettersai.com',
        'I want to send a letter',
        'Hi, I’d like to send a letter, can you help me with that?'
      ),
    },
  },
  {
    id: '75b605ca-cdff-4619-af47-4579ff729ef1',
    title: 'It only costs $5?',
    content:
      'Yes! We have a flat rate of $5 for both domestic and international mail, so start sending letters to friends and family, near or far! 💌',
  },
  {
    id: 'fa9f51f7-6e83-473b-976d-e13c92eece56',
    title: 'How long does letter delivery take?',
    content:
      'Letters are sent via USPS First Class Mail. Domestic mailings typically take 4-6 business days, and international mailings typically take an additional 5-7 business days to be delivered',
  },
  {
    id: '5e974788-91b0-4730-97b5-dcdd09716fc6',
    title: 'Can I track the piece of mail?',
    content:
      'No, we currently can’t provide tracking information for your letter. You can visit the USPS service standards map, which includes links to other sites showing expected delivery times based on your mailing day for both domestic and international mail.',
    link: {
      label: 'USPS service standards map',
      url: 'https://postalpro.usps.com/ppro-tools/service-standards-maps',
    },
  },
  {
    id: '925ad08a-dfef-4851-9f48-76970e734373',
    title: 'Can I send a letter internationally?',
    content: 'Yes! We support all of the countries listed here:',
    link: {
      label: 'Lob global address coverage',
      url: 'https://www.lob.com/global-address-coverage',
    },
  },
  {
    id: '1ab8f3b8-7cae-4726-9e49-75fbf03a3c89',
    title: 'How do payments work?',
    content:
      'Once you confirm your order with CeeCee via email, she’ll send you a Stripe payment link. After your payment is complete, we’ll process your order and send your letter via USPS First Class Mail. All sales are final, and we do not offer refunds.',
  },
  {
    id: '7cd48416-46c3-4f45-b26f-eb93bcb2ba42',
    title: 'Can I get a refund?',
    content: 'No all sales are final and we do not offer refunds.',
  },
  {
    id: '3dcb8eba-0578-4fca-b264-5ac27177bb23',
    title: 'What does the letter look like?',
    content:
      'The note you confirm with CeeCee over email will be inserted into our letter template which looks like this.',
    link: {
      label: 'Preview.',
      url: 'https://lob-assets.com/letters/ltr_70bb8e1b642e80f9.pdf?version=v1&expires=1742188938&signature=N0kSmPf2ADV3_JR71G6A16AJhUy8XraRbqzAdCwuS6rRxz38fHxMtEFblTMBUypslVUbFSD6g8AKr1TCWyV-CQ',
    },
  },
  {
    id: 'e7140ae3-3918-4703-a0d8-8795a8e7000c',
    title: 'How do I contact customer support?',
    content: 'Send an email to:',
    mailto: {
      email: 'support@lovelettersai.com',
      mobile: getMailtoLink(
        'support@lovelettersai.com',
        'Customer support',
        ''
      ),
      desktop: getGmailLink(
        'support@lovelettersai.com',
        'Customer support',
        ''
      ),
    },
  },
  {
    id: 'a2fc2d25-b601-4d5c-9d08-e957efc075bb',
    title: 'Notice a bug or issue?',
    content: 'Let us know! Send us an email',
    mailto: {
      email: 'support@lovelettersai.com',
      mobile: getMailtoLink(
        'support@lovelettersai.com',
        'Bug report or issue',
        ''
      ),
      desktop: getGmailLink(
        'support@lovelettersai.com',
        'Bug report or issue',
        ''
      ),
    },
  },
  {
    id: '32bb5b38-e125-4e8b-8b21-dc5f15ebb057',
    title: 'Have feedback or suggestions?',
    content: 'Send an email to:',
    mailto: {
      email: 'support@lovelettersai.com',
      mobile: getMailtoLink(
        'support@lovelettersai.com',
        'Feedback or suggestions',
        ''
      ),
      desktop: getGmailLink(
        'support@lovelettersai.com',
        'Feedback or suggestions',
        ''
      ),
    },
  },
  {
    id: '774764b3-1363-4161-a1fe-30b43af2ee38',
    title: 'Is this cool?',
    content: 'Yes, this is cool.',
  },
]

function Section() {
  return (
    <div className="space-y-4 bg-white p-4 rounded-lg text-gray-800 shadow-md max-w-2xl w-full font-sans">
      <h2 className="text-xl font-bold pt-2">How it works</h2>
      <Accordion type="single" collapsible className="w-full" defaultValue="3">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="py-2">
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 text-left text-[15px] font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                {item.title}
                <Plus
                  size={16}
                  strokeWidth={2}
                  className="shrink-0 opacity-60 transition-transform duration-200"
                  aria-hidden="true"
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className="pb-2 text-muted-foreground">
              {item.content}
              {item.link ? (
                <a
                  href={item.link.url}
                  target="_blank"
                  className="pl-1 noopener noreferrer !text-blue-500 !underline"
                >
                  {item.link.label}
                </a>
              ) : null}
              {item.mailto ? (
                <>
                  <a
                    href={item.mailto.mobile}
                    className="md:hidden pl-1 noopener noreferrer !text-blue-500 !underline"
                  >
                    {item.mailto.email}
                  </a>
                  <a
                    href={item.mailto.desktop}
                    className="hidden md:inline-block pl-1 noopener noreferrer !text-blue-500 !underline"
                  >
                    {item.mailto.email}
                  </a>
                </>
              ) : null}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default function MarketingIndex() {
  const email = 'cupid@lovelettersai.com'
  const subject = 'Send a Real Letter'
  const body =
    "Hi CeeCee, I'd like to send a real letter, can you help me with that?"

  const gmailUrl = getGmailLink(email, subject, body)
  const mailtoUrl = getMailtoLink(email, subject, body)
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-pink-50 to-red-50 flex flex-col items-center">
      <div
        className="flex flex-col space-y-12 text-center pt-12"
        style={{ fontFamily: 'Caveat' }}
      >
        <div className="flex flex-col">
          <div className="text-4xl md:text-6xl text-gray-800 font-medium">
            LoveLettersAI
          </div>
          <div className="text-2xl md:text-4xl text-gray-600">
            Send a real letter to someone you love.
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-2xl md:text-3xl text-gray-600">
            Send any email to our agent to get started.
          </div>
          <a
            href={mailtoUrl}
            className="md:hidden text-2xl md:text-3xl text-gray-500 hover:text-red-500"
          >
            {email}
          </a>
          <a
            href={gmailUrl}
            className="hidden md:inline-block text-2xl md:text-3xl text-gray-500 hover:text-red-500"
          >
            {email}
          </a>
        </div>
      </div>

      {/* Mobile version - Copy to clipboard */}
      <a
        href={mailtoUrl}
        className="md:hidden  text-[10rem] animate-pulse transition hover:scale-105"
        target="_blank"
        rel="noopener noreferrer"
      >
        💌
      </a>

      {/* Desktop version - Gmail link */}
      <a
        href={gmailUrl}
        className="hidden md:inline-block text-[10rem] animate-pulse transition hover:scale-105"
        target="_blank"
        rel="noopener noreferrer"
      >
        💌
      </a>
      <Section />
      <div className="h-12 w-full"></div>
    </div>
  )
}
