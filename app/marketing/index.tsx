import { logLoader } from '~/lib/loader.server'
import { type LoaderFunctionArgs } from 'react-router'
import { toast, Toaster } from 'sonner'
import copy from 'copy-to-clipboard'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '~/components/ui/accordion'
import * as AccordionPrimitive from '@radix-ui/react-accordion'

export async function loader({ context }: LoaderFunctionArgs) {
  logLoader('marketing.index')

  return {
    message: context.cloudflare.env.PUBLIC_ENV_VAR,
  }
}

import { Plus } from 'lucide-react'

const items = [
  {
    id: '7fe38374-6b60-4152-9537-e93cfa2c2ac8',
    title: 'We send a real letter in the mail?',
    content:
      'Yes, your letter will be printed on real paper and sent to your recipient via USPS First Class Mail. Mail is usually nothing but bad news, bills, taxes and spam. CeeCee makes this piece of mail more meaningful.',
  },
  {
    id: '90d1f359-1dd2-42c8-972e-374373381e94',
    title: 'How do I get started?',
    content:
      "CeeCee is our AI agent who will help you get started. Send a simple note like 'hi' to cupid@lovelettersai.com and she will respond with a few questions to help you get started. CeeCee can also prepare your order including settling payment and sending the physical letter.",
  },
  {
    id: 'fa9f51f7-6e83-473b-976d-e13c92eece56',
    title: 'How long does letter delivery take?',
    content:
      'USPS First Class Mail usually takes 3-5 business days to deliver.',
  },
  {
    id: '5e974788-91b0-4730-97b5-dcdd09716fc6',
    title: 'Can I track the piece of mail?',
    content:
      'No, we are not able to offer tracking numbers for your letters currently.',
  },
  {
    id: '925ad08a-dfef-4851-9f48-76970e734373',
    title: 'Can I send a letter internationally?',
    content:
      'Yes! We support all of the countries listed here: https://www.lob.com/global-address-coverage.',
  },
  {
    id: '1ab8f3b8-7cae-4726-9e49-75fbf03a3c89',
    title: 'How do payments work?',
    content:
      'Once you have confirmed your order with CeeCee over email she will send you a payment link to checkout using Stripe. Once the payment is confirmed, your order will be processed and your letter will be sent via USPS First Class Mail. All sales are final and we do not offer refunds.',
  },
  {
    id: '7cd48416-46c3-4f45-b26f-eb93bcb2ba42',
    title: 'Can I get a refund?',
    content: 'No all sales are final and we do not offer refunds.',
  },
  {
    id: 'e7140ae3-3918-4703-a0d8-8795a8e7000c',
    title: 'How do I contact customer support?',
    content: 'Send an email to support@lovelettersai.com.',
  },
]

function Section() {
  return (
    <div className="space-y-4 bg-white p-4 rounded-lg text-gray-800 shadow-md max-w-2xl w-full">
      <h2 className="text-xl font-bold">How it works</h2>
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
  const body = "Hi, I'd like to send a real letter, can you help me with that?"

  const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&to=${email}&su=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`

  const handleClick = () => {
    copy(email)
    toast('Email copied to clipboard')
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-pink-50 to-red-50 flex flex-col items-center">
      <Toaster />
      <div className="flex flex-col space-y-12 text-center pt-12">
        <div className="flex flex-col">
          <div className="text-6xl text-gray-800 font-medium">
            LoveLettersAI
          </div>
          <div className="text-4xl text-gray-600">
            Send a real letter to someone you love.
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-3xl text-gray-600">
            Send us an email to get started.
          </div>
          <a
            href={`mailto:${email}`}
            className="md:hidden text-3xl text-gray-500 hover:text-red-500"
          >
            {email}
          </a>
          <a
            href={gmailUrl}
            className="hidden md:inline-block text-3xl text-gray-500 hover:text-red-500"
          >
            {email}
          </a>
        </div>
      </div>

      {/* Mobile version - Copy to clipboard */}
      <button
        onClick={handleClick}
        className="md:hidden text-[10rem] animate-pulse transition hover:scale-105 focus:outline-none"
      >
        💌
      </button>

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
