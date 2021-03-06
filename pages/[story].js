import React from "react";
import { getBrandStoryBySlug, getInitialData } from "../src/services/backend";

export async function getServerSideProps(ctx) {
  try {
    const { story } = ctx.query;
    const { siteCode } = await getInitialData(ctx);
    const { data } = await getBrandStoryBySlug(story, siteCode);
    const BrandStory = data.data?.brandStories?.[0] ?? null;
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
