import { RouteItem } from 'utils/get-route-context'

export const tutorialSidebar: { routes: RouteItem[] } = {
  routes: [
    {
      title: 'Tutorial',
      heading: true,
      routes: [
        {
          title: 'Hello World',
          path: '/tutorial/hello-world',
        },
        {
          title: 'Basics',
          path: '/tutorial/basics',
        },
        {
          title: 'Pseudo Props',
          path: '/tutorial/pseudo-props',
        },
        {
          title: 'Layout components',
          path: '/tutorial/layout-components',
        },
        {
          title: 'Interactive components',
          path: '/tutorial/interactive-components',
        },
        {
          title: 'Theming Basics',
          path: '/tutorial/theming-basics',
        },
        {
          title: 'Theming Advanced',
          path: '/tutorial/theming-advanced',
        },
      ],
    },
  ],
}
