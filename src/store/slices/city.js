import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCityWeatherData } from "../../services/data.repo";

const statusValues = Object.freeze({
  LOADING: "LOADING",
  ERROR: "ERROR",
  LOADED: "LOADED",
});

const initialState = {
  status: statusValues.LOADING,
  data: {},
  selectedDay: null,
  cityLoaded: false,
  city: 0,
};

export const fetchCityWeather = createAsyncThunk(
  "days/fetchCityWeather",
  (params) => fetchCityWeatherData(params)
);

export const citySlice = createSlice({
  name: "city",
  initialState: { ...initialState },
  reducers: {
    setCity(state, action) {
      state.city = action.payload;
      state.cityLoaded = false;
    },
    setCurrentDay(state, action) {
      state.selectedDay = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCityWeather.pending, (state) => {
        state.status = statusValues.LOADING;
      })
      .addCase(fetchCityWeather.fulfilled, (state, action) => {
        state.data = action.payload;
        state.cityLoaded = true;
        state.status = statusValues.LOADED;
        state.selectedDay = state.data.current;
      })
      .addCase(fetchCityWeather.rejected, (state) => {
        state.status = statusValues.ERROR;
      });
  },
});

export const { setCity, setCurrentDay } = citySlice.actions;

export const loadingSelector = (state) =>
  state.status === statusValues.LOADING && !state.cityLoaded;

export const daysSelector = (state) => {
  return [state.data?.current, ...(state.data?.daily || []).slice(1, 5)]
    .filter(Boolean)
    .map((day) => ({
      ...day,
      temp: Math.floor(day.temp?.max || day.temp),
      selected: day.dt === state.selectedDay.dt,
    }));
};

export default citySlice.reducer;
