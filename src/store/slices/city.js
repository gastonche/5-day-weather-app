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
};

export const fetchCityWeather = createAsyncThunk(
  "days/fetchCityWeather",
  (params) => fetchCityWeatherData(params)
);

export const citySlice = createSlice({
  name: "city",
  initialState: { ...initialState },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCityWeather.pending, (state, action) => {
        state.status = statusValues.LOADED;
      })
      .addCase(fetchCityWeather.fulfilled, (state, action) => {
        state.status = statusValues.LOADED;
        state.data = action.payload;
        state.cityLoaded = true;
      })
      .addCase(fetchCityWeather.rejected, (state, action) => {
        state.status = statusValues.ERROR;
        console.log(action)
      });
  },
});

export default citySlice.reducer;
