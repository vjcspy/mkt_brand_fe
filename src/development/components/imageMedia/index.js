import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { get } from "lodash";
import { useMemo } from "react";
import PropTypes from "prop-types";

const ImageMedia = ({ media, formats, ...rest }) => {
  return useMemo(() => {
    let url = formats ? get(media, ["formats", formats, "url"], get(media, ["url"])) : get(media, ["url"]);
    return url ? (
      <img {...rest} src={url} alt={media.alternativeText} title={media.caption} />
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
