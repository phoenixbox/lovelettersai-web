import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes'

export default [
  layout('./marketing/layout.tsx', [index('./marketing/index.tsx')]),
  layout('./legal/layout.tsx', [
    route('tos', './legal/tos.tsx'),
    route('privacy', './legal/privacy.tsx'),
  ]),
] satisfies RouteConfig
