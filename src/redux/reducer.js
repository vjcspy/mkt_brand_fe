import { fromJS, List } from "immutable";
import {
  ADD_FILES_UPLOAD,
  ADD_SECTION,
  PRODUCTION_MODE,
  REMOVE_FILES_UPLOAD,
  REMOVE_SECTION,
  SET_CONFIG,
  SET_INITIAL_SITE,
  SET_MEDIAS,
  SET_MEDIA_COUNT,
  SET_MEDIA_DIALOG,
  SET_MODE,
  SET_MODIFIED_CONFIG,
  SET_SELECTED_SECTION,
  SET_SITE,
  SET_TOKEN,
  UPDATE_API_STATUS,
  UPDATE_CONFIG,
  SET_LOCALE,
  SET_SELECTED_COMPONENT,
  JWT_TOKEN,
  REMOVE_CONFIG,
  SHOW_LANGUAGE_LOCATION,
  SET_PAGE_NAME,
  SET_OUR_MENUS,
  SET_HEADER_HEIGHT,
  SET_SHOW_MENU_HEADER,
  UPDATE_VALUE_TRANSITION,
  SET_LOCATION,
  SET_HOST,
  SET_ID_BLOG,
  SET_HEIGHT_POPUP,
  ACCEPT_COOKIE,
  SET_FIRST_LOAD,
} from "../constants";
import { Pages } from "../sections";
import { formatConfig, setStorage } from "../services/frontend";

export const initialState = fromJS({
  mode: PRODUCTION_MODE,
  selectedSection: null,
  locale: "vi",
  location: "hn",
  acceptCookie: false,
});

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MODE:
      return state.set("mode", action.value);
    case SET_CONFIG:
      return state.set("config", fromJS(action.value));
    case SET_MODIFIED_CONFIG:
      return state.set("modifiedConfig", fromJS(action.value));
    case SET_SELECTED_SECTION:
      return state.set("selectedSection", action.value);
    case SET_SELECTED_COMPONENT:
      return state.set("selectedComponent", action.value);
    case UPDATE_CONFIG:
      return state.updateIn(action.path, () => action.value);
    case REMOVE_CONFIG:
      if (state.getIn(action.path) instanceof List) {
        return state.updateIn(action.path, (list) => {
          return list.filter((e, index) => index !== action.value);
        });
      }
      return state.deleteIn(action.path);
    case SET_TOKEN:
      setStorage(action.value, JWT_TOKEN, action.remember);
      return state.set("token", action.value);
    case SET_SITE:
      return state.set("site", fromJS(action.value));
    case SET_INITIAL_SITE:
      const site = action.value;
      const rawConfig = site?.raw_config;
      const modifiedConfig = formatConfig(rawConfig);
      return state
        .set("site", fromJS(site))
        .set("modifiedConfig", fromJS(modifiedConfig))
        .set("pageName", action.pageName ?? Pages.home.name)
        .set("site_code", site?.site_code);
    case ADD_SECTION:
      return state.updateIn(["modifiedConfig", "pages", state.get("pageName"), "sections"], (sections) =>
        sections.concat?.([fromJS(action.value)])
      );
    case REMOVE_SECTION:
      return state.deleteIn(["modifiedConfig", "pages", state.get("pageName"), "sections", action.value]);
    case SET_MEDIAS:
      return state.set("medias", List(action.value));
    case SET_MEDIA_COUNT:
      return state.set("mediaCount", action.value);
    case ADD_FILES_UPLOAD:
      let filesUpload = Array.from(action.value).map((file) => {
        let url = URL.createObjectURL(file);
        let lastIndex = file.name.lastIndexOf(".");
        let name = file.name;
        let ext = lastIndex !== -1 ? name.substr(lastIndex + 1, name.length) : null;
        return fromJS({ file, ext, url, fileInfo: { name: file.name, alternativeText: "", caption: "" } });
      });
      return state.update("filesUpload", (files = List([])) => files.concat(List(filesUpload)));
    case REMOVE_FILES_UPLOAD:
      URL.revokeObjectURL(action.value.url);
      return state.update("filesUpload", (files) => files.filter((fileUpload) => fileUpload.get("url") != action.value.url));
    case UPDATE_API_STATUS:
      return state.updateIn(["apiStatus", ...action.path], () => fromJS(action.value));
    case SET_MEDIA_DIALOG:
      return state.set("mediaDialog", fromJS(action.value));
    case SET_LOCALE:
      return state.set("locale", action.value);
    case SET_LOCATION:
      return state.set("location", action.value);
    case SHOW_LANGUAGE_LOCATION:
      return state.set("showLanguageLocation", action.value);
    case SET_PAGE_NAME:
      return state.set("pageName", action.value);
    case SET_OUR_MENUS:
      return state.set("ourMenus", List(action.value));
    case SET_HEADER_HEIGHT:
      return state.set("headerHeight", action.value);
    case SET_SHOW_MENU_HEADER:
      return state.set("showMenuHeader", action.value);
    case UPDATE_VALUE_TRANSITION:
      return state.updateIn(["modifiedConfig", "translation", ...action.path], () => action.value);
    case SET_HOST:
      return state.set("host", action.host).set("graphqlHost", action.graphqlHost);
    case SET_ID_BLOG:
      return state.set("idBlog", action.value);
    case SET_HEIGHT_POPUP:
      return state.set("heightPopup", action.value);
    case ACCEPT_COOKIE:
      return state.update("acceptCookie", () => action.value);
    case SET_FIRST_LOAD:
      return state.update("firstLoad", () => action.value);
    default:
      return state;
  }
}
