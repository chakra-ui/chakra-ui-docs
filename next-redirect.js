async function redirect() {
  return [
    {
      source: '/discord',
      destination: 'https://discord.gg/chakra-ui',
      permanent: true,
    },
    // GENERAL
    {
      source: '/docs',
      destination: '/docs/getting-started',
      permanent: true,
    },
    {
      source: '/getting-started',
      destination: '/docs/getting-started',
      permanent: true,
    },
    {
      source: '/principles',
      destination: '/docs/principles',
      permanent: true,
    },
    {
      source: '/style-props',
      destination: '/docs/features/style-props',
      permanent: true,
    },
    {
      source: '/color-mode',
      destination: '/docs/features/color-mode',
      permanent: true,
    },
    {
      source: '/responsive-styles',
      destination: '/docs/features/responsive-styles',
      permanent: true,
    },
    {
      source: '/theme',
      destination: '/docs/theming/theme',
      permanent: true,
    },
    {
      source: '/recipes',
      destination: '/guides/integrations/with-cra',
      permanent: true,
    },
    // COMPONENTS
    {
      source: '/accordion',
      destination: '/docs/disclosure/accordion',
      permanent: true,
    },
    {
      source: '/alert',
      destination: '/docs/feedback/alert',
      permanent: true,
    },
    {
      source: '/alert-dialog',
      destination: '/docs/overlay/alert-dialog',
      permanent: true,
    },
    {
      source: '/aspectratiobox',
      destination: '/docs/layout/aspect-ratio',
      permanent: true,
    },
    {
      source: '/avatar',
      destination: '/docs/media-and-icons/avatar',
      permanent: true,
    },
    {
      source: '/badge',
      destination: '/docs/data-display/badge',
      permanent: true,
    },
    {
      source: '/box',
      destination: '/docs/layout/box',
      permanent: true,
    },
    {
      source: '/wrap',
      destination: '/docs/layout/wrap',
      permanent: true,
    },
    {
      source: '/breadcrumb',
      destination: '/docs/navigation/breadcrumb',
      permanent: true,
    },
    {
      source: '/button',
      destination: '/docs/form/button',
      permanent: true,
    },
    {
      source: '/checkbox',
      destination: '/docs/form/checkbox',
      permanent: true,
    },
    {
      source: '/circularprogress',
      destination: '/docs/feedback/circular-progress',
      permanent: true,
    },
    {
      source: '/closebutton',
      destination: '/docs/components/close-button',
      permanent: true,
    },
    {
      source: '/code',
      destination: '/docs/data-display/code',
      permanent: true,
    },
    {
      source: '/portal',
      destination: '/docs/components/portal',
      permanent: true,
    },
    {
      source: '/collapse',
      destination: '/docs/components/transition#collapse',
      permanent: true,
    },
    {
      source: '/center',
      destination: '/docs/layout/center',
      permanent: true,
    },
    {
      source: '/controlbox',
      // MISSING
      destination: '/docs/layout/box',
      permanent: true,
    },
    {
      source: '/divider',
      destination: '/docs/data-display/divider',
      permanent: true,
    },
    {
      source: '/drawer',
      destination: '/docs/overlay/drawer',
      permanent: true,
    },
    {
      source: '/editable',
      destination: '/docs/form/editable',
      permanent: true,
    },
    {
      source: '/flex',
      destination: '/docs/layout/flex',
      permanent: true,
    },
    {
      source: '/formcontrol',
      destination: '/docs/form/form-control',
      permanent: true,
    },
    {
      source: '/grid',
      destination: '/docs/layout/grid',
      permanent: true,
    },
    {
      source: '/heading',
      destination: '/docs/typography/heading',
      permanent: true,
    },
    {
      source: '/icon',
      destination: '/docs/media-and-icons/icon',
      permanent: true,
    },
    {
      source: '/iconbutton',
      destination: '/docs/form/icon-button',
      permanent: true,
    },
    {
      source: '/image',
      destination: '/docs/media-and-icons/image',
      permanent: true,
    },
    {
      source: '/input',
      destination: '/docs/form/input',
      permanent: true,
    },
    {
      source: '/link',
      destination: '/docs/navigation/link',
      permanent: true,
    },
    {
      source: '/kbd',
      destination: '/docs/data-display/kbd',
      permanent: true,
    },
    {
      source: '/list',
      destination: '/docs/data-display/list',
      permanent: true,
    },
    {
      source: '/menu',
      destination: '/docs/overlay/menu',
      permanent: true,
    },
    {
      source: '/modal',
      destination: '/docs/overlay/modal',
      permanent: true,
    },
    {
      source: '/numberinput',
      destination: '/docs/form/number-input',
      permanent: true,
    },
    {
      source: '/popover',
      destination: '/docs/overlay/popover',
      permanent: true,
    },
    {
      source: '/progress',
      destination: '/docs/feedback/progress',
      permanent: true,
    },
    {
      source: '/pseudobox',
      // deprecated, moved to box
      destination: '/docs/layout/box',
      permanent: true,
    },
    {
      source: '/radio',
      destination: '/docs/form/radio',
      permanent: true,
    },
    {
      source: '/simplegrid',
      destination: '/docs/layout/simple-grid',
      permanent: true,
    },
    {
      source: '/select',
      destination: '/docs/form/select',
      permanent: true,
    },
    {
      source: '/skeleton',
      destination: '/docs/feedback/skeleton',
      permanent: true,
    },
    {
      source: '/slider',
      destination: '/docs/form/slider',
      permanent: true,
    },
    {
      source: '/spinner',
      destination: '/docs/feedback/spinner',
      permanent: true,
    },
    {
      source: '/stat',
      destination: '/docs/data-display/stat',
      permanent: true,
    },
    {
      source: '/stack',
      destination: '/docs/layout/stack',
      permanent: true,
    },
    {
      source: '/switch',
      destination: '/docs/form/switch',
      permanent: true,
    },
    {
      source: '/tabs',
      destination: '/docs/disclosure/tabs',
      permanent: true,
    },
    {
      source: '/tag',
      destination: '/docs/data-display/tag',
      permanent: true,
    },
    {
      source: '/text',
      destination: '/docs/typography/text',
      permanent: true,
    },
    {
      source: '/textarea',
      destination: '/docs/form/textarea',
      permanent: true,
    },
    {
      source: '/toast',
      destination: '/docs/feedback/toast',
      permanent: true,
    },
    {
      source: '/tooltip',
      destination: '/docs/overlay/tooltip',
      permanent: true,
    },
    {
      source: '/docs/components/visually-hidden',
      destination: '/docs/disclosure/visually-hidden',
      permanent: true,
    },
    {
      source: '/guides/using-fonts',
      destination: '/guides/recipes/using-fonts',
      permanent: true,
    },
    // DOCS STRUCTURE REWORK REDIRECTS
    {
      source: '/docs/getting-started',
      destination: '/guides/first-steps',
      permanent: true,
    },
    {
      source: '/docs/migration',
      destination: '/guides/migration',
      permanent: true,
    },
    {
      source: '/docs/principles',
      destination: '/guides/principles',
      permanent: true,
    },
    {
      source: '/docs/comparison',
      destination: '/guides/comparison',
      permanent: true,
    },
    {
      source: '/docs/contributing',
      destination: '/guides/advanced/contributing',
      permanent: true,
    },
    {
      source: '/guides/how-to-create-a-guide',
      destination: '/guides/advanced/how-to-create-a-guide',
      permanent: true,
    },
    {
      source: '/guides/component-guide',
      destination: '/guides/advanced/component-guide',
      permanent: true,
    },
    {
      source: '/guides/z-index',
      destination: '/docs/components/recipes/z-index',
      permanent: true,
    },
    {
      source: '/guides/as-prop',
      destination: '/docs/components/recipes/as-prop',
      permanent: true,
    },
    {
      source: '/guides/integrations/with-cra',
      destination: '/guides/getting-started/cra-guide',
      permanent: true,
    },
    {
      source: '/guides/recipes/using-fonts',
      destination: '/docs/styled-system/recipes/using-fonts',
      permanent: true,
    },
    {
      source: '/guides/recipes/page-specific-color-mode',
      destination: '/docs/styled-system/recipes/page-specific-color-mode',
      permanent: true,
    },
    {
      source: '/guides/recipes/horizontal-collapse',
      destination: '/docs/components/recipes/horizontal-collapse',
      permanent: true,
    },
    {
      source: '/guides/recipes/floating-labels',
      destination: '/docs/components/recipes/floating-labels',
      permanent: true,
    },
    {
      source: '/docs/features/style-props',
      destination: '/docs/styled-system/features/style-props',
      permanent: true,
    },
    {
      source: '/docs/features/gradient',
      destination: '/docs/styled-system/features/gradient',
      permanent: true,
    },
    {
      source: '/docs/features/color-mode',
      destination: '/docs/styled-system/features/color-mode',
      permanent: true,
    },
    {
      source: '/docs/features/css-variables',
      destination: '/docs/styled-system/features/css-variables',
      permanent: true,
    },
    {
      source: '/docs/features/semantic-tokens',
      destination: '/docs/styled-system/features/semantic-tokens',
      permanent: true,
    },
    {
      source: '/docs/features/responsive-styles',
      destination: '/docs/styled-system/features/responsive-styles',
      permanent: true,
    },
    {
      source: '/docs/features/chakra-factory',
      destination: '/docs/styled-system/features/chakra-factory',
      permanent: true,
    },
    {
      source: '/docs/features/global-styles',
      destination: '/docs/styled-system/features/global-styles',
      permanent: true,
    },
    {
      source: '/docs/features/text-and-layer-styles',
      destination: '/docs/styled-system/features/text-and-layer-styles',
      permanent: true,
    },
    {
      source: '/docs/features/the-sx-prop',
      destination: '/docs/styled-system/features/the-sx-prop',
      permanent: true,
    },
    {
      source: '/docs/features/rtl-support',
      destination: '/docs/styled-system/features/rtl-support',
      permanent: true,
    },
    {
      source: '/docs/theming/theme',
      destination: '/docs/styled-system/theming/theme',
      permanent: true,
    },
    {
      source: '/docs/theming/customize-theme',
      destination: '/docs/styled-system/theming/customize-theme',
      permanent: true,
    },
    {
      source: '/docs/theming/component-style',
      destination: '/docs/styled-system/theming/component-style',
      permanent: true,
    },
    {
      source: '/docs/theming/advanced',
      destination: '/docs/styled-system/theming/advanced',
      permanent: true,
    },
    {
      source: '/docs/layout/aspect-ratio',
      destination: '/docs/components/layout/aspect-ratio',
      permanent: true,
    },
    {
      source: '/docs/layout/box',
      destination: '/docs/components/layout/box',
      permanent: true,
    },
    {
      source: '/docs/layout/center',
      destination: '/docs/components/layout/center',
      permanent: true,
    },
    {
      source: '/docs/layout/container',
      destination: '/docs/components/layout/container',
      permanent: true,
    },
    {
      source: '/docs/layout/flex',
      destination: '/docs/components/layout/flex',
      permanent: true,
    },
    {
      source: '/docs/layout/grid',
      destination: '/docs/components/layout/grid',
      permanent: true,
    },
    {
      source: '/docs/layout/simple-grid',
      destination: '/docs/components/layout/simple-grid',
      permanent: true,
    },
    {
      source: '/docs/layout/stack',
      destination: '/docs/components/layout/stack',
      permanent: true,
    },
    {
      source: '/docs/layout/wrap',
      destination: '/docs/components/layout/wrap',
      permanent: true,
    },
    {
      source: '/docs/form/button',
      destination: '/docs/components/form/button',
      permanent: true,
    },
    {
      source: '/docs/form/checkbox',
      destination: '/docs/components/form/checkbox',
      permanent: true,
    },
    {
      source: '/docs/form/editable',
      destination: '/docs/components/form/editable',
      permanent: true,
    },
    {
      source: '/docs/form/form-control',
      destination: '/docs/components/form/form-control',
      permanent: true,
    },
    {
      source: '/docs/form/icon-button',
      destination: '/docs/components/form/icon-button',
      permanent: true,
    },
    {
      source: '/docs/form/input',
      destination: '/docs/components/form/input',
      permanent: true,
    },
    {
      source: '/docs/form/number-input',
      destination: '/docs/components/form/number-input',
      permanent: true,
    },
    {
      source: '/docs/form/pin-input',
      destination: '/docs/components/form/pin-input',
      permanent: true,
    },
    {
      source: '/docs/form/radio',
      destination: '/docs/components/form/radio',
      permanent: true,
    },
    {
      source: '/docs/form/range-slider',
      destination: '/docs/components/form/range-slider',
      permanent: true,
    },
    {
      source: '/docs/form/select',
      destination: '/docs/components/form/select',
      permanent: true,
    },
    {
      source: '/docs/form/slider',
      destination: '/docs/components/form/slider',
      permanent: true,
    },
    {
      source: '/docs/form/switch',
      destination: '/docs/components/form/switch',
      permanent: true,
    },
    {
      source: '/docs/form/textarea',
      destination: '/docs/components/form/textarea',
      permanent: true,
    },
    {
      source: '/docs/data-display/badge',
      destination: '/docs/components/data-display/badge',
      permanent: true,
    },
    {
      source: '/docs/components/close-button',
      destination: '/docs/components/other/close-button',
      permanent: true,
    },
    {
      source: '/docs/data-display/code',
      destination: '/docs/components/data-display/code',
      permanent: true,
    },
    {
      source: '/docs/data-display/divider',
      destination: '/docs/components/data-display/divider',
      permanent: true,
    },
    {
      source: '/docs/data-display/kbd',
      destination: '/docs/components/data-display/kbd',
      permanent: true,
    },
    {
      source: '/docs/data-display/list',
      destination: '/docs/components/data-display/list',
      permanent: true,
    },
    {
      source: '/docs/data-display/stat',
      destination: '/docs/components/data-display/stat',
      permanent: true,
    },
    {
      source: '/docs/data-display/table',
      destination: '/docs/components/data-display/table',
      permanent: true,
    },
    {
      source: '/docs/data-display/tag',
      destination: '/docs/components/data-display/tag',
      permanent: true,
    },
    {
      source: '/docs/feedback/alert',
      destination: '/docs/components/feedback/alert',
      permanent: true,
    },
    {
      source: '/docs/feedback/circular-progress',
      destination: '/docs/components/feedback/circular-progress',
      permanent: true,
    },
    {
      source: '/docs/feedback/progress',
      destination: '/docs/components/feedback/progress',
      permanent: true,
    },
    {
      source: '/docs/feedback/skeleton',
      destination: '/docs/components/feedback/skeleton',
      permanent: true,
    },
    {
      source: '/docs/feedback/spinner',
      destination: '/docs/components/feedback/spinner',
      permanent: true,
    },
    {
      source: '/docs/feedback/toast',
      destination: '/docs/components/feedback/toast',
      permanent: true,
    },
    {
      source: '/docs/typography/text',
      destination: '/docs/components/typography/text',
      permanent: true,
    },
    {
      source: '/docs/typography/heading',
      destination: '/docs/components/typography/heading',
      permanent: true,
    },
    {
      source: '/docs/overlay/alert-dialog',
      destination: '/docs/components/overlay/alert-dialog',
      permanent: true,
    },
    {
      source: '/docs/overlay/drawer',
      destination: '/docs/components/overlay/drawer',
      permanent: true,
    },
    {
      source: '/docs/overlay/menu',
      destination: '/docs/components/overlay/menu',
      permanent: true,
    },
    {
      source: '/docs/overlay/modal',
      destination: '/docs/components/overlay/modal',
      permanent: true,
    },
    {
      source: '/docs/overlay/popover',
      destination: '/docs/components/overlay/popover',
      permanent: true,
    },
    {
      source: '/docs/overlay/tooltip',
      destination: '/docs/components/overlay/tooltip',
      permanent: true,
    },
    {
      source: '/docs/disclosure/accordion',
      destination: '/docs/components/disclosure/accordion',
      permanent: true,
    },
    {
      source: '/docs/disclosure/tabs',
      destination: '/docs/components/disclosure/tabs',
      permanent: true,
    },
    {
      source: '/docs/disclosure/visually-hidden',
      destination: '/docs/components/disclosure/visually-hidden',
      permanent: true,
    },
    {
      source: '/docs/navigation/breadcrumb',
      destination: '/docs/components/navigation/breadcrumb',
      permanent: true,
    },
    {
      source: '/docs/navigation/link',
      destination: '/docs/components/navigation/link',
      permanent: true,
    },
    {
      source: '/docs/navigation/link-overlay',
      destination: '/docs/components/navigation/link-overlay',
      permanent: true,
    },
    {
      source: '/docs/media-and-icons/avatar',
      destination: '/docs/components/media-and-icons/avatar',
      permanent: true,
    },
    {
      source: '/docs/media-and-icons/icon',
      destination: '/docs/components/media-and-icons/icon',
      permanent: true,
    },
    {
      source: '/docs/media-and-icons/image',
      destination: '/docs/components/media-and-icons/image',
      permanent: true,
    },
    {
      source: '/docs/components/transitions',
      destination: '/docs/components/other/transitions',
      permanent: true,
    },
    {
      source: '/docs/components/portal',
      destination: '/docs/components/other/portal',
      permanent: true,
    },
    {
      source: '/docs/hooks/use-boolean',
      destination: '/docs/styled-system/utility-hooks/use-boolean',
      permanent: true,
    },
    {
      source: '/docs/hooks/use-breakpoint-value',
      destination: '/docs/styled-system/utility-hooks/use-breakpoint-value',
      permanent: true,
    },
    {
      source: '/docs/hooks/use-checkbox',
      destination: '/docs/styled-system/component-hooks/use-checkbox',
      permanent: true,
    },
    {
      source: '/docs/hooks/use-checkbox-group',
      destination: '/docs/styled-system/component-hooks/use-checkbox-group',
      permanent: true,
    },
    {
      source: '/docs/hooks/use-clipboard',
      destination: '/docs/styled-system/utility-hooks/use-clipboard',
      permanent: true,
    },
    {
      source: '/docs/hooks/use-const',
      destination: '/docs/styled-system/utility-hooks/use-const',
      permanent: true,
    },
    {
      source: '/docs/hooks/use-controllable',
      destination: '/docs/styled-system/utility-hooks/use-controllable',
      permanent: true,
    },
    {
      source: '/docs/hooks/use-disclosure',
      destination: '/docs/styled-system/utility-hooks/use-disclosure',
      permanent: true,
    },
    {
      source: '/docs/hooks/use-media-query',
      destination: '/docs/styled-system/utility-hooks/use-media-query',
      permanent: true,
    },
    {
      source: '/docs/hooks/use-merge-refs',
      destination: '/docs/styled-system/utility-hooks/use-merge-refs',
      permanent: true,
    },
    {
      source: '/docs/hooks/use-outside-click',
      destination: '/docs/styled-system/utility-hooks/use-outside-click',
      permanent: true,
    },
    {
      source: '/docs/hooks/use-prefers-reduced-motion',
      destination:
        '/docs/styled-system/utility-hooks/use-prefers-reduced-motion',
      permanent: true,
    },
    {
      source: '/docs/hooks/use-theme',
      destination: '/docs/styled-system/utility-hooks/use-theme',
      permanent: true,
    },
    {
      source: '/docs/hooks/use-token',
      destination: '/docs/styled-system/utility-hooks/use-token',
      permanent: true,
    },
  ]
}

module.exports = redirect
