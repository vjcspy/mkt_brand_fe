import Head from "next/head";
import { MainContainer } from "../../styles";

export default function Layout({ children, seo }) {
  return (
    <MainContainer>
      <Head>
        {seo && (
          <>
            <title>{seo.metaTitle}</title>

            {seo.metaTitle && <meta property="og:title" content={seo.metaTitle} />}
            {seo.metaDescription && <meta property="og:description" content={seo.metaDescription} />}
            {seo.image?.url && <meta property="og:image" content={seo.image.url} />}

            {seo.metaTitle && <meta name="twitter:title" content={seo.metaTitle} />}
            {seo.metaDescription && <meta name="twitter:description" content={seo.metaDescription} />}
            {seo.image?.url && <meta name="twitter:image" content={seo.image.url} />}

            <meta name="twitter:card" content="summary_large_image" />
            {seo.metaDescription && <meta name="description" content={seo.metaDescription} />}
            {seo.image?.url && <meta name="image" content={seo.image.url} />}
          </>
        )}
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"
        ></meta>
        <link rel="preload" href="/fonts/subset-SFProDisplay-Medium.ttf" as="font" crossOrigin="" />
        <link ref="preload" href="/css/font.css" as="css" crossOrigin="" />
      </Head>
      {children}
    </MainContainer>
  );
}
