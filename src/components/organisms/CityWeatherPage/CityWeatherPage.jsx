import React from "react";
import SelectField from "../../atoms/SelectField/SelectField";
import TemperatureGraph from "../../molecules/TemperatureGraph/TemperatureGraph";
import WeatherCard from "../../molecules/WeatherCard/WeatherCard";
import classes from "./CityWeatherPage.module.css";

const CityWeatherPage = (props) => {
  const days = !props.loading ? props.days : new Array(5).fill(0);
  return (
    <main>
      <header>
        <SelectField
          options={props.cities}
          value={props.selectedCity}
          onChange={props.onCityChange}
        >
          Select a City
        </SelectField>
      </header>
      <section className={classes.Days}>
        {days.map((day, index) => (
          <WeatherCard
            day={day}
            key={props.loading ? index : day.dt}
            loading={props.loading}
            onSelected={() => props.onDaySelected(index)}
          />
        ))}
      </section>
      <section className={classes.Graph}>
        <TemperatureGraph loading={props.loading} hours={props.hours} />
      </section>
    </main>
  );
};

export default CityWeatherPage;
