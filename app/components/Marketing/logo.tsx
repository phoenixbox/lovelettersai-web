import { cn } from '~/lib/utils'

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      {...props}
      className={cn(props.className, 'text-black')}
    >
      <g clipPath="url(#a)">
        <path
          className="fill-current"
          fillRule="evenodd"
          d="M11.886 1.396 24.08 1.4 11.168 18.637a.667.667 0 0 0-.067.69l1.77 3.667a.333.333 0 0 0 .566.055L29.17 2.092l9.823 20.698a.833.833 0 0 1-.064.826l-9.865 14.5a.833.833 0 0 1-.69.365l-11.914-.017 12.5-16.684a.667.667 0 0 0 .069-.686l-1.716-3.618a.333.333 0 0 0-.568-.057L11.126 38.225a.834.834 0 0 1-.175-.244L1.01 17.124a.833.833 0 0 1 .069-.835L11.202 1.753a.834.834 0 0 1 .684-.357Z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h40v40H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}
