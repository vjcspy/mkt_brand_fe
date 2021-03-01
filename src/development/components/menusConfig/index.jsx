import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { map } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_CONFIG } from "../../../constants";
import { DevSecondaryButton } from "../../../styles/developmentStyle";
import MenuConfig from "../menuConfig";
import { SectionHeader, SectionWrapper } from "../sectionConfig/styled";
import { SectionItem, SectionsBlock, SectionThumbnailWrapper } from "../sectionsConfig/styled";
import { ThemeItemTitle } from "../themesConfig/styled";
import { generate } from "shortid-36";
import { fromJS } from "immutable";
import AddMenuDialog from "./addMenuDialog";

const MenusConfig = ({ path, popStage, putStage }) => {
  const menus = useSelector((s) => s.getIn(path))?.toJS();
  const count = menus?.length ?? 0;
  const dispatch = useDispatch();
  const addMenu = (value, path) => dispatch({ type: UPDATE_CONFIG, value: fromJS(value), path });

  const [dialog, setDialog] = useState({});
  return (
    <SectionWrapper>
      <SectionHeader>
        <DevSecondaryButton icon onClick={popStage}>
          <FontAwesomeIcon icon="arrow-left" />
        </DevSecondaryButton>
        <h4>Menus Settings</h4>
      </SectionHeader>
      <SectionsBlock>
        {map(menus, (menuItem, index) => (
          <SectionItem
            key={index}
            onClick={() => {
              putStage({
                props: {
                  path: [...path, index],
                },
                Component: MenuConfig,
              });
            }}
          >
            <SectionThumbnailWrapper>
              <FontAwesomeIcon icon="project-diagram" />
            </SectionThumbnailWrapper>
            <ThemeItemTitle>{menuItem.title}</ThemeItemTitle>
          </SectionItem>
        ))}
        <SectionItem
          add
          onClick={() => {
            setDialog({ show: true });
          }}
        >
          <SectionThumbnailWrapper>
            <FontAwesomeIcon icon={["far", "plus-square"]} />
          </SectionThumbnailWrapper>
          Add Menu
        </SectionItem>
      </SectionsBlock>
      <AddMenuDialog
        dialog={dialog}
        onClose={() => setDialog({})}
        onAddMenu={(title) => {
          const code = generate();
          addMenu(
            {
              title: title,
              name: `menu-${code}`,
              code: code,
              children: [],
            },
            [...path, count]
          );
          setDialog({});
        }}
      />
    </SectionWrapper>
  );
};

export default MenusConfig;
