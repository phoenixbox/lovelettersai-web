import { logLoader } from '~/lib/loader.server'
import { type LoaderFunctionArgs } from 'react-router'
import { toast, Toaster } from 'sonner'
import copy from 'copy-to-clipboard'

export async function loader({ context }: LoaderFunctionArgs) {
  logLoader('marketing.index')

  return {
    message: context.cloudflare.env.PUBLIC_ENV_VAR,
  }
}

export default function MarketingIndex() {
  const email = 'cupid@lovelettersai.com'
  const subject = 'Send a Letter'
  const body = "Hi, I'd like to send a letter, can you help me with that"

  const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&to=${email}&su=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`

  const handleClick = () => {
    copy(email)
    toast('Email copied to clipboard')
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-pink-50 to-red-50 flex flex-col items-center justify-center">
      <Toaster />
      <div
        className="flex flex-col space-y-12 text-center"
        style={{ fontFamily: 'Caveat' }}
      >
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
    </div>
  )
}
