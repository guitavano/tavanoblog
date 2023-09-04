import { AppProps } from 'next/app';
import Header from '../components/Header';
import '../styles/globals.scss'
import Link from 'next/link'
import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import { linkResolver, repositoryName } from '../prismicio'
import Footer from '../components/Footer';
import { createContext } from 'react';
import Router from "next/router";
import { useEffect, useState } from 'react';
import Loading from './components/loading/loading';

export const SearchContext = createContext<string | null>(null)

function MyApp({ Component, pageProps }: AppProps) {

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("finished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

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
        <Header/>
        {
          loading ? <Loading />: <Component {...pageProps} />
        }
          
        <Footer />
      </PrismicPreview>
    </PrismicProvider>
  )
}

export default MyApp
