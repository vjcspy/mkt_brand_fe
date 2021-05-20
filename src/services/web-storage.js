export class WebStorage {

  save(key, value) {
    if (typeof window !== "undefined" && window.localStorage) {
      if (typeof value === "object") {
        value = JSON.stringify(value);
      }
      window.localStorage.setItem(key, value);
    }

    return this;
  }

  get(key) {
    if (typeof window !== "undefined" && window.localStorage) {
      let data = window.localStorage.getItem(key);
      try {
        data = JSON.parse(data);
      } catch (e) {
      }

      return data;
    }

    return undefined;
  }
}
