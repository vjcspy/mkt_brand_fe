import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { map } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { DevPrimaryButton, DevSecondaryButton } from "../../../styles/developmentStyle";
import DevelopmentComponentType from "../developmentComponentType";
import { SectionHeader, SectionWrapper } from "../sectionConfig/styled";

const GroupConfig = ({ path, popStage, blog }) => {
  const config = useSelector((s) => s.getIn(path.slice(0, path.length - 2)))?.toJS();
  const components = useSelector((s) => s.getIn(path))?.toJS();
  return (
    <SectionWrapper>
      <SectionHeader>
        <DevSecondaryButton icon onClick={popStage}>
          <FontAwesomeIcon icon="arrow-left" />
        </DevSecondaryButton>
        <h4>{config?.title}</h4>
        <DevPrimaryButton icon disabled>
          <FontAwesomeIcon icon="ellipsis-v" />
        </DevPrimaryButton>
      </SectionHeader>
      {map(components, (config, index) => (
        <React.Fragment key={config?.name + index}>
          <DevelopmentComponentType config={config} path={[...path, index, "value"]} blog={blog} />
        </React.Fragment>
      ))}
    </SectionWrapper>
  );
};

export default GroupConfig;
