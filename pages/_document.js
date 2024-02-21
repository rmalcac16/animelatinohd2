import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="es">
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="theme-color" content="#000000" />
                    <link rel="manifest" href="/manifest.json" />
                    <meta name="robots" content="index, follow" />
                    <link
                        rel="preload"
                        href="/fonts/Roboto_Condensed/RobotoCondensed-Light.ttf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/Roboto_Condensed/RobotoCondensed-Regular.ttf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/Roboto_Condensed/RobotoCondensed-Bold.ttf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    {process.env.NODE_ENV !== 'development' && (
                        <>
                            <script src="/popAds.js"></script>
                            <script
                                id="chatBroEmbedCode"
                                src="/chat.js"
                            ></script>
                            <script src="/disableClick.js"></script>
                            <script
                                async
                                src="https://arc.io/widget.min.js#R2yjvhvV"
                            ></script>
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: `function c74a68dfbd15fcd6f23a6b26879bc82e() { console.clear(); var before = (new Date).getTime(); debugger; var after = (new Date).getTime(); if (after - before > 200) { document.write(""); self.location.replace(window.location.protocol + window.location.href.substring(window.location.protocol.length)) } else { before = null; after = null; delete before; delete after } setTimeout(c74a68dfbd15fcd6f23a6b26879bc82e, 100) }c74a68dfbd15fcd6f23a6b26879bc82e(); window.onload = function () { document.addEventListener("contextmenu", function (e) { e.preventDefault() }, false); document.addEventListener("keydown", function (e) { if (e.ctrlKey && e.shiftKey && e.keyCode == 73) { disabledEvent(e) } if (e.ctrlKey && e.shiftKey && e.keyCode == 74) { disabledEvent(e) } if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) { disabledEvent(e) } if (e.ctrlKey && e.keyCode == 85) { disabledEvent(e) } if (event.keyCode == 123) { disabledEvent(e) } }, false); function disabledEvent(e) { if (e.stopPropagation) { e.stopPropagation() } else if (window.event) { window.event.cancelBubble = true } e.preventDefault(); return false } };`,
                                }}
                            />
                        </>
                    )}
                </body>
            </Html>
        );
    }
}

export default MyDocument;
