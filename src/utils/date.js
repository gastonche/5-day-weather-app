const format = (value, options) => {
  value = !Number.isInteger(value)? value: new Date(value * 1000);
  return new Intl.DateTimeFormat("default", options).format(value)
}
export const getDay = (timestamp) => format(timestamp, { weekday: "short" });

export const getTime = (timestamp) =>
  format(timestamp, { hour: "2-digit", minute: "2-digit" });

export const getDate = (timestamp) =>
  format(timestamp, { day: "2-digit", month: "2-digit", year: "2-digit" });
