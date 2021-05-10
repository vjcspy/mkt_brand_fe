import path from "path";

const fs = require("fs");
const _ = require("lodash");

export class CacheFile {
  static _CACHE_DATA = {};

  static async save(key, value, store = "default") {
    if (!_.isString(key)) {
      throw new Error("key must be string");
    }

    if (!_.isObject(value)) {
      throw new Error("value must be object");
    }

    try {
      const valueString = JSON.stringify(value);
      await CacheFile._saveFile(CacheFile._getFilePathByKey(key, store), valueString);
    } catch (e) {
      console.error("Could not save data to cache for " + key);
      console.error(e);
    }
  }

  static async get(key, store = "default") {
    if (!_.isString(key)) {
      throw new Error("key must be string");
    }

    if (CacheFile._CACHE_DATA.hasOwnProperty(key)) {
      console.info("found cache for key " + key);
      return CacheFile._CACHE_DATA[key];
    }

    try {
      const stringValue = await CacheFile._getFile(CacheFile._getFilePathByKey(key, store));
      if (stringValue) {
        console.info("found cache file for key " + key);
        const data = JSON.parse(stringValue);
        if (_.isObject(data)) {
          CacheFile._CACHE_DATA[key] = data;
          return data;
        }
        return undefined;
      } else {
        return undefined;
      }
    } catch (e) {
      console.error("Could not get cache for " + key);
      console.error(e);
    }

    return undefined;
  }

  static _getFilePathByKey(key, store = "default") {
    const pathFile = "_cache/" + store + "/" + key + ".json";

    return path.join(process.cwd(), pathFile);
  }

  static async _saveFile(filePath, value) {
    try {
      CacheFile.ensureDirectoryExistence(filePath);
      fs.writeFileSync(filePath, value);
    } catch (e) {
      console.error("Could not save data to cache file");
      console.error(e);
    }
  }

  static async _getFile(filePath) {
    try {
      return fs.readFileSync(filePath, "utf-8");
    } catch (e) {
      return undefined;
    }
  }

  static ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
      return true;
    }
    CacheFile.ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
  }
}
