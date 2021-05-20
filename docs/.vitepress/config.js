module.exports = {
    title: 'Genji',
    description: 'A vue state management framewok by vue3 reactivity',
    head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
    themeConfig: {
      repo: 'xieyezi/genji',
      logo: '/img/genji.png',
      docsDir: 'docs',
      editLinks: true,
      editLinkText: 'Edit this page on GitHub',
      lastUpdated: true,
      sidebarDepth: 1,
      sidebar: {
        '/': [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Hooks', link: '/hook-authorize'},
          { text: 'Channels', link: '/channels'},
          { text: 'Cookbook', link: '/cookbook'},
          { text: 'Client side', link: '/client-side'},
          { text: 'Gotchas', link: '/gotchas'}
        ]
      }
    }
    }