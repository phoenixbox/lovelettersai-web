import { logLoader } from '~/lib/loader.server'
import { type LoaderFunctionArgs } from 'react-router'

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

  // Corrected Gmail URL structure to properly open composer
  const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&to=${email}&su=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-pink-50 to-red-50 flex flex-col items-center justify-center">
      <div className="flex flex-col space-y-2 text-center">
        <div className="text-2xl text-gray-500">LoveLettersAI</div>
        <div className="text-2xl text-gray-500">
          Send a real letter to someone you love.
        </div>
      </div>
      <div className="animate-pulse">
        <a
          href={gmailUrl}
          style={{
            fontSize: '10rem',
          }}
          className="inline-block rounded-full bg-transparent px-6 py-3 text-sm font-medium text-white transition hover:scale-105"
          target="_blank"
          rel="noopener noreferrer"
        >
          💌
        </a>
      </div>
    </div>
  )
}
