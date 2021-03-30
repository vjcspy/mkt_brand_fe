import React, { useCallback, useState } from "react";
import { LeftContentWrapper } from "./styled";
import SectionsConfig from "../../components/sectionsConfig";
import { last } from "lodash";
const DevelopmentLeftContent = ({ viewPreview }) => {
  const [stage, setStage] = useState([
    {
      props: {},
      Component: SectionsConfig,
    },
  ]);
  const putStage = useCallback(
    (newStage) => {
      setStage(stage.concat(newStage));
    },
    [stage]
  );

  const popStage = useCallback(() => {
    setStage(stage.slice(0, stage.length - 1));
  }, [stage]);

  const { props, Component } = last(stage);
  return (
    <LeftContentWrapper show={viewPreview}>
      <Component {...props} putStage={putStage} popStage={popStage} />
    </LeftContentWrapper>
  );
};

export default DevelopmentLeftContent;
