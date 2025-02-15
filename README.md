# RevCobe Site

## Setup

### Init app

```
npx create-react-router@latest --template remix-run/react-router-templates/cloudflare .
```

### Config files

#### Prettier

- Add the prettier.js

#### Wrangler

- Name for worker
- Routes patterns for custom domain
- Compat flags

### Hosting

- Add a domain: https://dash.cloudflare.com/09fa701545a4a89fac61393e76301e7c/home/domains
- Ensure DNS settings are set
- Update wrangler.toml to have routes with custom pattern

```
routes = [
  { pattern = "revcobe.com", custom_domain = true }
]
```

### Scripts

```
"build": "react-router build",
"deploy": "npm run build && wrangler deploy && npm run tail",
"tail": "wrangler tail revcobe",
```

### Tailwind

- Vite config: https://tailwindcss.com/docs/installation/using-vite
  | Avoid color variables

### Components

```
npx shadcn@canary init
```

- https://ui.shadcn.com/docs/installation/vite
- https://ui.shadcn.com/docs/tailwind-v4

### Routes

- Wire up the marketing routes

```
import { type RouteConfig, index, layout } from '@react-router/dev/routes'

export default [
  layout('./marketing/layout.tsx', [index('./marketing/index.tsx')]),
] satisfies RouteConfig
```

| TODO: update the src over app
