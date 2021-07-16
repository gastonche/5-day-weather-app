export const getDay = date => {
  return new Intl.DateTimeFormat('default', {weekday: 'short'}).format(new Date(date * 1000))
}
