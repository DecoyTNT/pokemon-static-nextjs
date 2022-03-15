import { FC } from 'react'
import Head from 'next/head'
import { Navbar } from '../ui';

interface Props {
  title?: string;
}

const origin = typeof window === 'undefined' ? '' : window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {

  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name="author" content="Jorge Madera" />
        <meta name="description" content={`Info sobre el pokemon ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />

        <meta property="og:title" content={`Info sobre ${title}`} />
        <meta property="og:description" content={`Esta es la página sobre ${title}`} />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      {/* Navbar */}
      <Navbar />

      <main
        style={{
          padding: '0 20px'
        }}
      >
        {children}
      </main>
    </>
  )
}