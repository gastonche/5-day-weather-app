import api from "./api";

export function fetchCityWeatherData({lat, lon}) {
  return api.get(`onecall`, {lat, lon});
}
