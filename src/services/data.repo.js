import { getDate } from "../utils/date";
import api from "./api";

export async function fetchCityWeatherData({lat, lon, units = 'imperial'}) {
  const [current, daily] = await Promise.all([
    fetchCurrentDayData({lat, lon, units}),
    fetchDailyData({lat, lon, units}),
  ]);

  // form days taking latest time and filling up all hours
  const dayGroups = daily.reduce((acc, hour) => {
    const date = getDate(hour.dt);
    acc[date] = {
      ...hour,
      date,
      hours: [...acc[date]?.hours || [], hour]
    }

    return acc;
  }, {});

  const days = Object.keys(dayGroups).sort().map(key => dayGroups[key]);

  return [formatCurrentDay(current, daily), ...days.slice(1, 5)]
}

function formatCurrentDay(current, hours) {
  const nextDt = new Date(new Date(current.dt * 1000).getTime() + 60 * 60 * 24 * 1000).getTime() / 1000;
  return {
    ...current,
    date: getDate(current.dt),
    hours: [
      current,
      ...hours.filter(hour => hour.dt > current.dt &&  hour.dt < nextDt)
    ]
  }
}

function fetchDailyData(params) {
  return api.get(`forecast`, params).then(res => res.list.map(formatWeatherData));
}

function formatWeatherData({dt, weather, main}) {
  return {
    dt,
    weather: weather[0],
    temp: main.temp
  }
}

function fetchCurrentDayData(params) {
  return api.get(`weather`, params).then(formatWeatherData);
}
