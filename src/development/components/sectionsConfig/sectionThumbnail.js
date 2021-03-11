import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toArray, find, isArray } from "lodash";
import React, { useMemo } from "react";
import ImageMedia from "../imageMedia";
import { SectionThumbnailWrapper } from "./styled";

const SectionThumbnail = ({ components }) => {
  return useMemo(() => {
    let image = find(toArray(components), (e) => e?.type == "image");

    if (image) {
      if (isArray(image.value)) {
        return (
          <SectionThumbnailWrapper isGrid={true}>
            {image.value
              .slice(0, 4)
              .map((media) => (media ? <ImageMedia key={media.hash} media={media} formats="thumbnail" /> : null))}
          </SectionThumbnailWrapper>
        );
      }
      return (
        <SectionThumbnailWrapper>
          <ImageMedia media={image.value} formats="thumbnail" />
        </SectionThumbnailWrapper>
      );
    }
    return (
      <SectionThumbnailWrapper>
        <FontAwesomeIcon icon={["far", "file-alt"]} />
      </SectionThumbnailWrapper>
    );
  }, [components]);
};

export default SectionThumbnail;
