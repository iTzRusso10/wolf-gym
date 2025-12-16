import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import Header from '../components/Header'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    scripts: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'HealthClub',
          name: 'Wolf Gym',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Via Marco Polo, 11',
            addressLocality: 'Rende',
            addressRegion: 'CS',
            postalCode: '87036',
            addressCountry: 'IT',
          },
          telephone: '+39 347 302 0924',
        }),
      },
    ],
    meta: [
      /* ===== META DESCRIPTION (conversion-oriented) ===== */
      {
        name: 'description',
        content:
          'Wolf Gym è una palestra a Rende con sala pesi, allenamenti personalizzati e ambiente professionale. Migliora forza, forma fisica e benessere.',
      },

      /* ===== SEO CORE ===== */
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'author', content: 'Wolf Gym' },
      { name: 'language', content: 'it' },

      /* ===== LOCAL SEO ===== */
      {
        name: 'geo.region',
        content: 'IT-CS',
      },
      {
        name: 'geo.placename',
        content: 'Rende',
      },

      /* ===== OPEN GRAPH ===== */
      {
        property: 'og:title',
        content: 'Wolf Gym Rende',
      },
      {
        property: 'og:description',
        content:
          'Allenati da Wolf Gym a Rende: palestra moderna con programmi su misura, sala pesi e supporto professionale.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:locale',
        content: 'it_IT',
      },
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Wolf Gym Rende',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
