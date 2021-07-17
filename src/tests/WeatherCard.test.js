import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import WeatherCard from "../components/molecules/WeatherCard/WeatherCard";
import setupTests from "./setupTests";

setupTests((settings) => {
  it("renders with a loading animation when loading or without data", () => {
    act(() => {
      render(<WeatherCard loading={true} />, settings.container);
    });
    expect(
      settings.container.querySelector('[data-test-id="card"]').textContent
    ).toBe("loading...");
  });

  it("Renders with correct day, weather, temperature, icon", () => {
    const day = {
      dt: 1626517817,
      temp: 68.24,
      weather: {
        description: "broken clouds",
        icon: "04n",
        id: 803,
        main: "Clouds",
      },
    };
    act(() => {
      render(<WeatherCard day={day} />, settings.container);
    });
    expect(
      settings.container.querySelector('[data-test-id="card"] span').textContent
    ).toBe("Sat");
    expect(
      settings.container
        .querySelector('[data-test-id="card"] img')
        .src.includes(day.weather.icon)
    ).toBe(true);
    expect(
      settings.container
        .querySelector('[data-test-id="card"] span:not(:first-child)')
        .textContent
    ).toBe(`${day.temp}°C`);
    expect(
      settings.container
        .querySelector('[data-test-id="card"] p')
        .textContent
    ).toBe(day.weather.description);
    expect(
      settings.container
        .querySelector('[data-test-id="card"] p')
        .title
    ).toBe(day.weather.main);
  });
});
