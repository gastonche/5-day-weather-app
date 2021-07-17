import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCityWeatherData } from "../../services/data.repo";

const statusValues = Object.freeze({
  LOADING: "LOADING",
  ERROR: "ERROR",
  LOADED: "LOADED",
});

const initialState = {
  status: statusValues.LOADING,
  days: [],
  selectedDay: 0,
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
      state.selectedDay = 0;
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
        state.days = action.payload;
        state.status = statusValues.LOADED;
        state.cityLoaded = true;
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
  return state.days.map((day, index) => ({...day, selected: index === state.selectedDay}));
};

export const hoursSelector = (state) => state.days[state.selectedDay]?.hours || [];

export default citySlice.reducer;
