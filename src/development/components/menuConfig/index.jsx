import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fromJS } from "immutable";
import { last, map } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_CONFIG, UPDATE_CONFIG } from "../../../constants";
import { DevSecondaryButton } from "../../../styles/developmentStyle";
import { ComponentWrapper, MultipleWrapper } from "../developmentComponentType/styled";
import TextComponent from "../developmentComponentType/textComponent";
import DropDown from "../dropdown";
import { SectionHeader, SectionWrapper } from "../sectionConfig/styled";
import { SectionThumbnailWrapper } from "../sectionsConfig/styled";
import { MenuItem, MenuItemLabel, MenuItemWrapper, SubMenuItemWrapper } from "./styled";
import AddMenuItemDialog from "./addMenuItemDialog";
import generate from "shortid-36";

const RenderMenuItem = ({ item, index, path, deleteMenu, setDialog }) => {
  return (
    <MenuItemWrapper>
      <MenuItem>
        <MenuItemLabel>{item.label}</MenuItemLabel>
        <DevSecondaryButton
          icon
          onClick={(e) => {
            e.stopPropagation();
            deleteMenu(index, [...path, "items"]);
          }}
        >
          <FontAwesomeIcon icon="trash-alt" />
        </DevSecondaryButton>
      </MenuItem>
      <SubMenuItemWrapper>
        {map(item.items, (subItem, subIndex) => (
          <RenderMenuItem item={subItem} index={subIndex} path={[...path, "items", index]} deleteMenu={deleteMenu} setDialog={setDialog} />
        ))}
        <MenuItem
          add
          onClick={() => {
            setDialog({ show: true, path: [...path, "items", index], count: item.items.length });
          }}
        >
          <SectionThumbnailWrapper>
            <FontAwesomeIcon icon={["far", "plus-square"]} />
          </SectionThumbnailWrapper>
          Add sub menu item
        </MenuItem>
      </SubMenuItemWrapper>
    </MenuItemWrapper>
  );
};

const MenuConfig = ({ path, popStage }) => {
  const config = useSelector((s) => s.getIn(path))?.toJS();
  const count = config?.items.length ?? 0;
  const dispatch = useDispatch();
  const addMenuItem = (value, path) => dispatch({ type: UPDATE_CONFIG, value: fromJS(value), path });
  const deleteMenu = (index, path) => dispatch({ type: REMOVE_CONFIG, value: index, path });

  const [dialog, setDialog] = useState({});

  return (
    <SectionWrapper>
      <SectionHeader>
        <DevSecondaryButton icon onClick={popStage}>
          <FontAwesomeIcon icon="arrow-left" />
        </DevSecondaryButton>
        <h4>{config?.title}</h4>
        <DropDown
          items={[
            {
              icon: "trash-alt",
              label: "Delete menu",
              onClick: () => {
                const rest = path.slice(0, path.length - 1);
                const index = last(path);
                deleteMenu(index, rest);
                popStage();
              },
            },
          ]}
        />
      </SectionHeader>
      <TextComponent config={{ title: "Menu title", value: config?.title }} path={[...path, "title"]} />

      <ComponentWrapper>
        <label>Items</label>
        <MultipleWrapper>
          {map(config?.items, (item, index) => (
            <RenderMenuItem key={index} item={item} index={index} path={path} deleteMenu={deleteMenu} setDialog={setDialog} />
          ))}
          <MenuItemWrapper>
            <MenuItem
              add
              onClick={() => {
                setDialog({ show: true, path, count });
              }}
            >
              <SectionThumbnailWrapper>
                <FontAwesomeIcon icon={["far", "plus-square"]} />
              </SectionThumbnailWrapper>
              Add menu item
            </MenuItem>
          </MenuItemWrapper>
        </MultipleWrapper>
      </ComponentWrapper>
      <AddMenuItemDialog
        dialog={dialog}
        onClose={() => setDialog({})}
        onAddMenuItem={(item, path, count) => {
          addMenuItem({ ...item, code: generate(), items: [] }, [...path, "items", count]);
        }}
      />
    </SectionWrapper>
  );
};

export default MenuConfig;
