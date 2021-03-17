import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { last, map } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_SECTION } from "../../../constants";
import { DevPrimaryButton, DevSecondaryButton } from "../../../styles/developmentStyle";
import ConfirmDialog from "../../containers/developmentDialog/confirmDialog";
import DevelopmentComponentType from "../developmentComponentType";
import Dropdown from "../dropdown";
import { SectionHeader, SectionWrapper } from "./styled";

const SectionConfig = ({ path, putStage, popStage }) => {
  const config = useSelector((s) => s.getIn(path))?.toJS();
  /// dispatch
  const dispatch = useDispatch();
  const removeSection = (value) => dispatch({ type: REMOVE_SECTION, value });
  /// State
  const [confirmDialog, setConfirmDialog] = useState({});
  /// Functional
  const deleteSectionClick = () => {
    let dialog = {
      show: true,
      title: "Confirm Delete",
      body: "Are you sure delete this section?",
      buttons: [
        <DevSecondaryButton key="cancel" onClick={() => setConfirmDialog({ show: false })}>
          Cancel
        </DevSecondaryButton>,
        <DevPrimaryButton
          key="confirm"
          onClick={() => {
            setConfirmDialog({ show: false });
            removeSection(last(path));
          }}
        >
          Delete
        </DevPrimaryButton>,
      ],
    };
    setConfirmDialog(dialog);
  };

  return (
    <SectionWrapper>
      <SectionHeader>
        <DevSecondaryButton icon onClick={popStage}>
          <FontAwesomeIcon icon="arrow-left" />
        </DevSecondaryButton>
        <h4>{config?.title}</h4>
        <Dropdown
          icon
          items={[
            {
              label: "Hide Section",
              icon: "eye-slash",
              disabled: true,
            },
            {
              label: "Delete Section",
              icon: "trash-alt",
              onClick: deleteSectionClick,
            },
          ]}
        />
      </SectionHeader>
      {map(config?.components, (config, index) => (
        <DevelopmentComponentType
          key={index}
          config={config}
          popStage={popStage}
          putStage={putStage}
          path={[...path, "components", index, "value"]}
        />
      ))}
      <ConfirmDialog dialog={confirmDialog} onClose={() => setConfirmDialog({})} />
    </SectionWrapper>
  );
};

export default SectionConfig;
