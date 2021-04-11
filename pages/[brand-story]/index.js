import { chain } from "lodash";
import React from "react";
import { getWebsitesConfig, getWebsitesData, getBrandStoryBySlug } from "../../src/services/backend";

export async function getServerSideProps(ctx) {
  try {
    const pathname = ctx.req.headers.host;
    const webSiteConfig = await getWebsitesConfig(pathname);
    const slug = ctx.query["brand-story"];
    console.log("slug", slug);
    const webSites = await getWebsitesData();
    const webData = chain(webSites)
      .get(["data", "rows"])
      .find((e) => e.code === webSiteConfig.website_code)
      .value();
    const siteCode = webData?.code ?? process.env.SITE_CODE;
    const { data } = await getBrandStoryBySlug(slug, siteCode);
    const BrandStory = data.data.brandStories[0] ?? null;
    return {
      props: {
        contentHTML: BrandStory,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        contentHTML: null,
      },
    };
  }
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fonWeight: 400,
};
const index = ({ contentHTML }) => {
  return contentHTML ? (
    <div dangerouslySetInnerHTML={{ __html: contentHTML.content }} />
  ) : (
    <div style={style}>404-Page not found</div>
  );
};

export default index;
