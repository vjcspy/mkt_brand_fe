const CACHE_DATA = {};

export const register = (key, value) => {
    CACHE_DATA[key] = value;
}

export const registry = (key) => {
    return CACHE_DATA[key];
}
