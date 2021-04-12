import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fromJS } from "immutable";
import { last, map } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_MENU, REMOVE_CONFIG, UPDATE_CONFIG } from "../../../constants";
import { DevSecondaryButton } from "../../../styles/developmentStyle";
import { ComponentWrapper, MultipleWrapper } from "../developmentComponentType/styled";
import TextComponent from "../developmentComponentType/textComponent";
import DropDown from "../dropdown";
import { SectionHeader, SectionWrapper } from "../sectionConfig/styled";
import { SectionThumbnailWrapper } from "../sectionsConfig/styled";
import { MenuItem, MenuItemLabel, MenuItemWrapper, SubMenuItemWrapper } from "./styled";
import MenuDialog from "./menuDialog";
import generate from "shortid-36";
import useFromJS from "../../../hooks/useFromJS";

const RenderMenuItem = ({ item, index, path, deleteMenu, setDialog, locale, showApi }) => {
  const shouldShowAdd = item.apiKey !== "menu";
  return (
    <MenuItemWrapper>
      <MenuItem>
        <MenuItemLabel>{item.label?.[locale]}</MenuItemLabel>
        <DevSecondaryButton
          icon
          onClick={(e) => {
            e.stopPropagation();
            setDialog({
              show: true,
              path: path,
              index: index,
              value: item,
              showApi: showApi,
            });
          }}
        >
          <FontAwesomeIcon icon="pencil-alt" />
        </DevSecondaryButton>
        <DevSecondaryButton
          icon
          onClick={(e) => {
            e.stopPropagation();
            deleteMenu(index, [...path, "children"]);
          }}
        >
          <FontAwesomeIcon icon="trash-alt" />
        </DevSecondaryButton>
      </MenuItem>
      {shouldShowAdd && (
        <SubMenuItemWrapper>
          {map(item.children, (subItem, subIndex) => (
            <RenderMenuItem
              key={subIndex}
              item={subItem}
              index={subIndex}
              path={[...path, "children", index]}
              deleteMenu={deleteMenu}
              setDialog={setDialog}
              locale={locale}
            />
          ))}
          <MenuItem
            add
            onClick={() => {
              setDialog({ show: true, path: [...path, "children", index], index: item?.children.length });
            }}
          >
            <SectionThumbnailWrapper>
              <FontAwesomeIcon icon={["far", "plus-square"]} />
            </SectionThumbnailWrapper>
            Add sub menu item
          </MenuItem>
        </SubMenuItemWrapper>
      )}
    </MenuItemWrapper>
  );
};

const MenuConfig = ({ path, popStage }) => {
  const locale = useSelector((s) => s.get("locale"));
  const config = useFromJS(path);
  const count = config?.children?.length ?? 0;
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
          icon={true}
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

      <TextComponent
        config={{
          title: "Menu title",
          value: config?.title,
        }}
        ignoreLocale
        path={[...path, "title"]}
      />

      <ComponentWrapper>
        <label>Items</label>
        <MultipleWrapper>
          {map(config?.children, (item, index) => (
            <RenderMenuItem
              key={index}
              item={item}
              index={index}
              path={path}
              deleteMenu={deleteMenu}
              setDialog={setDialog}
              locale={locale}
              showApi={true}
            />
          ))}
          <MenuItemWrapper>
            <MenuItem
              add
              onClick={() => {
                setDialog({ show: true, path, index: count, showApi: true });
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
      <MenuDialog
        dialog={dialog}
        onClose={() => setDialog({})}
        onAddMenuItem={(item, path, index) => {
          addMenuItem(
            {
              ...item,
              children: item?.children ?? [],
              code: item.code ?? generate(),
            },
            [...path, "children", index]
          );
        }}
      />
    </SectionWrapper>
  );
};

export default MenuConfig;
