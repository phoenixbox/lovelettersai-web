import { type RouteConfig, index, layout } from '@react-router/dev/routes'

export default [
  layout('./marketing/layout.tsx', [index('./marketing/index.tsx')]),
] satisfies RouteConfig
