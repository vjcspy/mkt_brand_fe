import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { map } from "lodash";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { DevPrimaryButton, DevSecondaryButton } from "../../../styles/developmentStyle";
import DevelopmentComponentType from "../developmentComponentType";
import { SectionHeader, SectionWrapper } from "../sectionConfig/styled";

const GroupConfig = ({ path, popStage, putStage, blog }) => {
  const config = useSelector((s) => s.getIn(path.slice(0, path.length - 2)))?.toJS();
  const c = useSelector((s) => s.getIn(path));
  const components = useMemo(() => {
    return map(c?.toJS(), (e, k) => ({ ...e, name: k }))
      .sort((a, b) => a.order - b.order)
      .map((config, index) => (
        <DevelopmentComponentType
          key={config.name}
          config={config}
          putStage={putStage}
          path={[...path, config.name, "value"]}
          blog={blog}
        />
      ));
  }, [path, popStage, putStage, c]);

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
      {components}
    </SectionWrapper>
  );
};

export default GroupConfig;
