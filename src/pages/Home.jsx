import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CityWeatherPage from "../components/organisms/CityWeatherPage/CityWeatherPage";
import {
  daysSelector,
  fetchCityWeather,
  hoursSelector,
  loadingSelector,
  setCity,
  setCurrentDay
} from "../store/slices/city";

const cities = [
  {
    id: 0,
    label: "Guadalajara",
    lat: 20.676667,
    lon: -103.3475,
  },
  {
    id: 1,
    label: "Amsterdam",
    lat: 52.366667,
    lon: 4.9,
  },
  {
    id: 2,
    label: "Cape Town",
    lat: -33.925278,
    lon: 18.423889,
  },
];

let timeoutMarker = null;

const Home = () => {
  const city = useSelector(
    (state) => cities.find(({ id }) => id === state.city) || cities[0]
  );
  const loading = useSelector((state) => loadingSelector(state));
  const days = useSelector(state => daysSelector(state));
  const hours = useSelector(state => hoursSelector(state));
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      await dispatch(fetchCityWeather(city));
      clearTimeout(timeoutMarker);
      timeoutMarker = setTimeout(load, 15 * 60 * 1000);
    }

    load();
  }, [city, dispatch]);

  return (
    <CityWeatherPage
      cities={cities}
      days={days}
      hours={hours}
      selectedCity={city.id}
      loading={loading}
      onCityChange={(id) => dispatch(setCity(id))}
      onDaySelected={day => dispatch(setCurrentDay(day))}
    />
  );
};

export default Home;
