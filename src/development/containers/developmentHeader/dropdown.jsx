import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { List } from "immutable";
import { isObject, map } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_PAGE_NAME, UPDATE_CONFIG } from "../../../constants";
import useFromJS from "../../../hooks/useFromJS";
import useSiteRouter from "../../../hooks/useSiteRouter";
import { Pages } from "../../../sections";
import { DropDownWrapper, DropDownContent, DropDownButton, DropDownItem } from "./styled";

const DropDown = () => {
  /// Selector
  const pages = useFromJS(["modifiedConfig", "pages"]);
  const pageName = useSelector((s) => s.get("pageName"));
  const router = useSiteRouter();
  /// Dispatch
  const dispatch = useDispatch();
  const setPageName = useCallback((value) => dispatch({ type: SET_PAGE_NAME, value }), [dispatch]);
  const setBreadcrumbs = (value) => dispatch({ type: UPDATE_CONFIG, path: ["breadcrumbs"], value: List(value) });
  const menuSlug = useSelector((s) => s.get("menu-slug"));

  const [item, setItem] = useState();
  const [show, setShow] = useState();

  useEffect(() => {
    if (pageName && pageName != (item?.name ?? null)) {
      setItem(pages[pageName]);
      switch (pageName) {
        case Pages.home.name:
          setBreadcrumbs([Pages.home]);
          break;
        case Pages.promo.name:
          setBreadcrumbs([Pages.home, Pages.promo]);
          break;
        case Pages["our-menu"].name:
          setBreadcrumbs([Pages.home, Pages["our-menu"]]);
          break;
        case Pages["our-menu-detail"].name:
          setBreadcrumbs([Pages.home, Pages["our-menu"], { ...Pages["our-menu-detail"], path: "/our-menu/" + menuSlug }]);
          break;
        case Pages.map.name:
          setBreadcrumbs([Pages.home, Pages.map]);
          break;
        default:
          break;
      }
      const { page } = router.query;
      if (page != pageName) {
        router.push(`/edit/${pageName}`, undefined, { shallow: true });
      }
    }
  }, [pageName, item, pages]);

  return (
    <DropDownWrapper>
      <DropDownButton onClick={() => setShow(true)} onBlur={() => setTimeout(() => setShow(), 100)}>
        {item?.icon && <FontAwesomeIcon icon={item.icon} />}
        {item?.title}
        <FontAwesomeIcon className="caret" icon={"caret-down"} />
      </DropDownButton>
      {show && isObject(pages) && (
        <DropDownContent>
          {map(pages, (item) => (
            <DropDownItem
              key={item.name}
              onClick={() => {
                setPageName(item.name);
                setShow();
              }}
            >
              {item.icon && <FontAwesomeIcon icon={item.icon} />}
              {item.title}
            </DropDownItem>
          ))}
        </DropDownContent>
      )}
    </DropDownWrapper>
  );
};

export default DropDown;
