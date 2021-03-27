import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isObject, map } from "lodash";
import { useRouter } from "next/dist/client/router";
import { stringifyUrl } from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SET_PAGE_NAME } from "../../../constants";
import useFromJS from "../../../hooks/useFromJS";
import { DropDownWrapper, DropDownContent, DropDownButton, DropDownItem } from "./styled";

const DropDown = () => {
  /// Selector
  const pages = useFromJS(["modifiedConfig", "pages"]);
  const router = useRouter();
  const { page } = router.query;
  /// Dispatch
  const dispatch = useDispatch();
  // const setPageName = useCallback((value) => dispatch({ type: SET_PAGE_NAME, value }), [dispatch]);
  // const setBreadcrumbs = (value) => dispatch({ type: UPDATE_CONFIG, path: ["breadcrumbs"], value: List(value) });

  const [item, setItem] = useState();
  const [show, setShow] = useState();

  const setPageRouter = (itemPage) => {
    setItem(itemPage);
    dispatch({ type: SET_PAGE_NAME, value: itemPage.name });
    if (itemPage.name === "home") {
      router.push(stringifyUrl({ url: "/edit", query: router.query }), undefined, { shallow: true });
    } else {
      const query = router.query;
      query.page = itemPage.name;
      router.push(
        stringifyUrl({
          url: "/edit",
          query: query,
        }),
        undefined,
        { shallow: true }
      );
    }
  };
  useEffect(() => {
    if (pages) {
      const item = pages[page ?? "home"];
      setItem(item);
    }
  }, [pages, page]);

  useEffect(() => {
    dispatch({ type: SET_PAGE_NAME, value: page });
  }, []);

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
                setPageRouter(item);
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
