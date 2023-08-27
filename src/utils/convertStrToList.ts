export function convertStrToList(str: string) {
  const values = str.split(",");
  values.forEach((value: string) => {
    value = value.trim();
  });
  values.splice(values.length - 1, 1)
  return values;
}
