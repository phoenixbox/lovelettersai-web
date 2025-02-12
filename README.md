# REPLabs Site

## Setup

### Init app
```
npx create-react-router@latest --template remix-run/react-router-templates/cloudflare .
```

### Config files
#### Wrangler
* Name for worker
* Routes patterns for custom domain
* Compat flags

### Scripts
```
"build": "react-router build",
"deploy": "npm run build && wrangler deploy && npm run tail",
"tail": "wrangler tail repllabs",
```

### Tailwind
- Vite config: https://tailwindcss.com/docs/installation/using-vite

### Components
- https://ui.shadcn.com/docs/installation/vite
- https://ui.shadcn.com/docs/tailwind-v4


### Hosting
- Add a domain: https://dash.cloudflare.com/09fa701545a4a89fac61393e76301e7c/home/domains
- Ensure DNS settings are set
- Update wrangler.toml to have routes with custom pattern
```
routes = [
  { pattern = "repllabs.com", custom_domain = true }
]
```
