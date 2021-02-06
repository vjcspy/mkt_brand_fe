import byteSize from "byte-size";

export const getType = (mime) => {
  if (!mime) {
    return "file";
  }

  const type = mime.split(/[\s/]+/)[0];

  if (type === "image" || type === "video") {
    return type;
  }

  return "file";
};
export const formatBytes = (receivedBytes, decimals = 0) => {
  const { value, unit } = byteSize(receivedBytes * 1000, { precision: decimals });

  if (!unit) {
    return "0B";
  }

  return `${value}${unit.toUpperCase()}`;
};
