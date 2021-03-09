import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { get, map } from "lodash";
import { useMemo } from "react";
import PropTypes from "prop-types";
import Head from "next/head";

const ImageMedia = ({ media, formats, preload = false, ...rest }) => {
  return useMemo(() => {
    let url = formats ? get(media, ["formats", formats, "url"], get(media, ["url"])) : get(media, ["url"]);
    const srcSet = url
      ? (map(media.formats, (i) => i) ?? [])
          .concat(media)
          .sort((a, b) => a.width - b.width)
          .map((i) => `${i.url} ${i.width}w`)
          .join(",")
      : null;
    return url ? (
      <>
        {preload && (
          <Head>
            <link rel="preload" href={url} as="image" />
          </Head>
        )}
        <img {...rest} srcSet={srcSet} src={url} alt={media.alternativeText} title={media.caption} />
      </>
    ) : (
      <FontAwesomeIcon {...rest} icon={["far", "image"]} />
    );
  }, [media?.hash]);
};

ImageMedia.proptypes = {
  media: PropTypes.object.isRequired,
  formats: PropTypes.arrayOf(["thumbnail", "small", "medium", "large"]),
};

export default ImageMedia;
