import Axios from "axios";
import { all, put, select, takeEvery } from "redux-saga/effects";
import {
  ADD_FILES_UPLOAD,
  DOWNLOAD_FILE,
  FETCH_CONFIG,
  FETCH_MEDIAS,
  FETCH_MEDIA_COUNT,
  PUT_CONFIG,
  PUT_PUBLIC_CONFIG,
  REMOVE_FILES_UPLOAD,
  SET_INITIAL_SITE,
  SET_MEDIAS,
  SET_MEDIA_COUNT,
  SET_SITE,
  UPDATE_API_STATUS,
  UPLOAD_FILES,
  LOGIN,
  SET_TOKEN,
  GET_SITE,
  FETCH_MENU,
  GET_MY_VOUCHER,
  SET_MY_VOUCHER,
  GGG_INTERNAL,
  SET_LIST_BLOG_IS_SHOW,
  GET_BLOGS_BY_IS_SHOW,
} from "../constants";
import { chain, get, head } from "lodash";

function* fetchConfig({ value }) {
  try {
    const host = process.env.NEXT_PUBLIC_API_HOST;
    const {
      data: [site],
    } = yield Axios.get(`${host}/sites?_limit=1&site_code=${value}`);
    yield put({ type: SET_INITIAL_SITE, value: site });
  } catch (e) {}
}

function* putConfig({ value: raw_config }) {
  try {
    const host = process.env.NEXT_PUBLIC_API_HOST;
    const [site] = yield select((s) => [s.get("site").toJS()]);
    const [token] = yield select((s) => [s.get("token")]);
    const { data } = yield Axios.put(
      `${host}/sites/${site.id}`,
      {
        raw_config,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    yield put({ type: SET_SITE, value: { ...site, raw_config: data.raw_config } });
    alert("Success");
  } catch (e) {
    alert(e);
  }
}

function* putPublicConfig() {
  try {
    const host = process.env.NEXT_PUBLIC_API_HOST;
    const [site] = yield select((s) => [s.get("site").toJS()]);
    const [token] = yield select((s) => [s.get("token")]);
    yield Axios.put(
      `${host}/sites/${site.id}`,
      {
        config: site.raw_config,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // const response = yield Axios.post(
    //   "/api/deploy",
    //   {},
    //   {
    //     params: { site_code: site.site_code },
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    alert("Success");
  } catch (e) {
    alert(e);
  }
}

function* fetchMedias({ _limit, _start, _q }) {
  try {
    const host = process.env.NEXT_PUBLIC_API_HOST;
    yield put({ type: UPDATE_API_STATUS, value: { loading: true }, path: ["medias"] });
    const { data: medias } = yield Axios.get(
      `${host}/upload/files?_limit=${_limit}&_start=${_start}${_q ? `&_q=${_q}` : ""}`
    );
    yield put({ type: SET_MEDIAS, value: medias });
    yield put({ type: UPDATE_API_STATUS, value: { success: true }, path: ["medias"] });
  } catch (e) {}
}

function* fetchMediaCount({ _q }) {
  try {
    const host = process.env.NEXT_PUBLIC_API_HOST;
    const { data: count } = yield Axios.get(`${host}/upload/files/count${_q ? `&_q=${_q}` : ""}`);
    yield put({ type: SET_MEDIA_COUNT, value: count });
  } catch (e) {
    alert(e);
  }
}

function* uploadFile({ file, fileInfo, url }) {
  const host = process.env.NEXT_PUBLIC_API_HOST;
  try {
    const formData = new FormData();
    const token = yield select((s) => s.get("token"));
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    formData.append("files", file);
    formData.append("fileInfo", JSON.stringify(fileInfo));
    formData.append("path", "/assets");

    const request = yield Axios({
      method: "POST",
      url: `${host}/upload/`,
      data: formData,
      headers,
    });

    yield put({ type: REMOVE_FILES_UPLOAD, value: { url } });

    return request;
  } catch (err) {
    console.error(err);
    alert(err);

    // const status = get(err, 'response.status', get(err, 'status', null));
    // const statusText = get(err, 'response.statusText', get(err, 'statusText', null));
    // const errorMessage = get(
    //   err,
    //   ['response', 'payload', 'message', '0', 'messages', '0', 'message'],
    //   get(err, ['response', 'payload', 'message'], statusText)
    // );
    // if (status) {
    //   dispatch({
    //     type: 'SET_FILE_ERROR',
    //     fileIndex: originalIndex,
    //     errorMessage,
    //   });
    // }
  }
}

function* uploadFiles() {
  try {
    yield put({ type: UPDATE_API_STATUS, path: ["filesUpload"], value: { loading: true } });
    const filesUpload = yield select((s) => s.get("filesUpload")?.toJS() ?? []);
    yield all(filesUpload.map((fileData) => uploadFile(fileData)));
    yield put({ type: UPDATE_API_STATUS, path: ["filesUpload"], value: { success: true } });
  } catch (e) {
    console.error(e);
    alert(e);
  }
}

function* downloadFile({ url }) {
  try {
    const host = process.env.NEXT_PUBLIC_API_HOST;

    const fileUrl = new URL(url);
    const name = decodeURIComponent(fileUrl.pathname.substring(fileUrl.pathname.lastIndexOf("/") + 1));

    const { data } = yield Axios({
      method: "GET",
      responseType: "blob",
      url: `${host}/upload/proxy?url=${url}`,
    });
    const createdFile = new File([data], name, {
      type: data.type,
    });
    yield put({ type: ADD_FILES_UPLOAD, value: [createdFile] });
  } catch (e) {
    alert(e);
  }
}

function* login({ email, password, remember }) {
  try {
    yield put({ type: UPDATE_API_STATUS, value: { loading: true }, path: ["login"] });
    let response = yield Axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/auth/local`, {
      identifier: email,
      password: password,
    });
    if (response.data?.error) {
      yield put({
        type: UPDATE_API_STATUS,
        value: { error: get(response, ["data", "message", 0, "messages", 0, "message"]) },
        path: ["login"],
      });
      return;
    }
    if (response.data.jwt) {
      yield put({ type: SET_TOKEN, value: response.data.jwt, remember });
    }
    yield put({ type: UPDATE_API_STATUS, value: { success: true }, path: ["login"] });
  } catch (e) {
    let error = get(e, ["response", "data", "message", 0, "messages", 0, "message"]);
    if (error) {
      yield put({
        type: UPDATE_API_STATUS,
        value: { error },
        path: ["login"],
      });
    } else {
      yield put({ type: UPDATE_API_STATUS, value: {}, path: ["login"] });
      alert(e);
    }
  }
}

function* getSite({ site_code, pageName }) {
  try {
    yield put({ type: UPDATE_API_STATUS, value: { loading: true }, path: ["getSite"] });
    const host = process.env.NEXT_PUBLIC_API_HOST;
    const token = yield select((s) => s.get("token"));
    const { data: site } = yield Axios.get(`${host}/sites/config/${site_code}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put({ type: SET_INITIAL_SITE, value: site, pageName });
    yield put({ type: UPDATE_API_STATUS, value: { success: true }, path: ["getSite"] });
  } catch (e) {
    yield put({ type: UPDATE_API_STATUS, value: {}, path: ["getSite"] });
    alert(e);
  }
}

function* getListBlogIsShow() {
  try {
    const host = process.env.NEXT_PUBLIC_API_HOST;
    const token = yield select((s) => s.get("token"));
    yield put({ type: SET_LIST_BLOG_IS_SHOW, value: { loading: true } });
    const data = yield Axios.post(`${host}/graphql`, {
      query: `query {
          blogs (where: {isShow : true}){
            avatar {
              url
            }
          }
        }`,
    });
    if (data.status === 200) {
      yield put({ type: SET_LIST_BLOG_IS_SHOW, value: { loading: false, data: data.data } });
    } else {
      yield put({ type: SET_LIST_BLOG_IS_SHOW, value: { loading: false, error: "Cant get data" } });
    }
  } catch (e) {
    yield put({ type: SET_LIST_BLOG_IS_SHOW, value: { loading: false, error: e } });
  }
}

function* getMyVoucher() {
  try {
    const { token, customerNumber } = yield select((s) => s.get("tokenUser").toJS());
    yield put({ type: SET_MY_VOUCHER, value: { loading: true } });
    const { data, error } = yield Axios.post(
      `${process.env.NEXT_PUBLIC_GGG_INTERNAL}/my-voucher`,
      {
        type: "all",
        memId: customerNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "tgs-version": "2.6.10",
        },
      }
    );
    if (data.result) {
      put({ type: SET_MY_VOUCHER, value: { loading: false, data: data.result } });
    } else {
      yield put({ type: SET_MY_VOUCHER, value: { loading: false, error: error ? error.message : data.message } });
    }
  } catch (e) {
    yield put({ type: SET_MY_VOUCHER, value: { loading: false, error: e } });
  }
}

function* fetchMenu({ urlKey = "gogi" } = {}) {
  try {
    yield put({ type: UPDATE_API_STATUS, value: { loading: true }, path: ["menu"] });
    const { data } = yield Axios.post("/api/graphql", {
      query: `
      query {
        categories(filters: { url_key: { eq: "${urlKey}" } }, pageSize: 1, currentPage: 1) {
          items { 
            id
            name
            position
            url_key
            children {
              id
              name
              position
              url_key
            }
          }
          page_info {
            total_pages
            page_size
          }
          total_count
        }
      }
      `,
    });

    const menus = chain(data)
      .get(["data", "categories", "items", 0, "children"])
      .sortBy("position")
      .map((menu) => ({
        url: "/our-menu/" + menu.url_key,
        label: {
          en: menu.name,
          vi: menu.name,
        },
      }))
      .value();

    yield put({ type: UPDATE_API_STATUS, value: { data: menus, success: true }, path: ["menu"] });
  } catch (e) {
    yield put({ type: UPDATE_API_STATUS, value: { loading: false }, path: ["menu"] });
    console.error(e);
  }
}

function* saga() {
  yield takeEvery(FETCH_CONFIG, fetchConfig);
  yield takeEvery(PUT_CONFIG, putConfig);
  yield takeEvery(PUT_PUBLIC_CONFIG, putPublicConfig);
  yield takeEvery(FETCH_MEDIAS, fetchMedias);
  yield takeEvery(FETCH_MEDIA_COUNT, fetchMediaCount);
  yield takeEvery(UPLOAD_FILES, uploadFiles);
  yield takeEvery(DOWNLOAD_FILE, downloadFile);
  yield takeEvery(LOGIN, login);
  yield takeEvery(GET_SITE, getSite);
  yield takeEvery(FETCH_MENU, fetchMenu);
  yield takeEvery(GET_MY_VOUCHER, getMyVoucher);
  yield takeEvery(GET_BLOGS_BY_IS_SHOW, getListBlogIsShow);
}

export default saga;
