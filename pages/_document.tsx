import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="./../TavanoBlogIcon.ico" type="image/x-icon" />
                    
                    <meta name="google-site-verification" content="xKxIrkDJaQqe7DOYQG4sDCw4P4y98BS8OgucZzL4CFs" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
