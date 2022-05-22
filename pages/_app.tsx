import { AppProps } from 'next/app';
import Header from '../components/Header';
import '../styles/globals.scss'
import Link from 'next/link'
import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import { linkResolver, repositoryName } from '../prismicio'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={({ href, children, ...props }) => (
        <Link href={href}>
          <a {...props}>
            {children}
          </a>
        </Link>
      )}
    >
      <PrismicPreview repositoryName={repositoryName}>
        <Header />
        <Component {...pageProps} />
      </PrismicPreview>
    </PrismicProvider>
  )
}

export default MyApp
