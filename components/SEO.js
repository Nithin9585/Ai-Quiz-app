// components/SEO.js
import Head from 'next/head'

export default function SEO({ title, description, url }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      
      {/* Google site verification meta tag */}
      <meta
        name="google-site-verification"
        content="9__SOhCWiYz4dCQT6b3a2jexCJPzu7oEFD8EhnB2J9A"
      />
    </Head>
  )
}
