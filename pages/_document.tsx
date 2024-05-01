import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang='pt-BR'>
                <Head>

                <script defer data-domain="tavanoblog.com.br" src="https://plausible.io/js/script.js"></script>
                <script
                    defer={true}
                    src='http://localhost:8000/config.js'
                >
                </script>

                <script async src="https://www.googletagmanager.com/gtag/js?id=G-1RWRJE2WYS"></script>
                <script dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-1RWRJE2WYS');
                    `
                }} />

                    <link rel="shortcut icon" href="./../TavanoBlogIcon.ico" type="image/x-icon" />
                    
                    <meta name="google-site-verification" content="xKxIrkDJaQqe7DOYQG4sDCw4P4y98BS8OgucZzL4CFs" />

                    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
