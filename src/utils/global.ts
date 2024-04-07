export const configure = [
  "battery",
  "camera",
  "cpu",
  "gpu",
  "hard disk",
  "operating system",
  "ram",
  "screen",
];

export const spaceCaseToCamelCase = (text: string) => {
  if (text === "operating system") return "os";
  if (text === "hard disk") return "hardDisk";

  return text;
};
