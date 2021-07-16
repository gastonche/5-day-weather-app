import classNames from "classnames";
import React, { Fragment } from "react";
import { getDay } from "../../../utils/date";
import WeatherIcon from "../../atoms/WeatherIcon";
import classes from "./WeatherCard.module.css";

const WeatherCard = (props) => {
  return (
    <article
      className={classNames({
        [classes.Card]: true,
        [classes.Selected]: props.day.selected,
        [classes.Loading]: props.loading,
      })}
      onClick={() => props.onSelected(props.day)}
    >
      {props.loading ? <Loading /> : <Card {...props.day} />}
    </article>
  );
};

const Loading = () => <div className={classes.Loading}>loading...</div>;

const Card = (props) => {
  return (
    <Fragment>
      <span className={classes.date}>{getDay(props.dt)}</span>
      <WeatherIcon
        icon={props.weather[0].icon}
        weather={props.weather[0].main}
      />
      <span className={classes.temp}>
        {props.temp}&deg;<span>C</span>
      </span>
      <p className={classes.description} title={props.weather[0].main}>
        {props.weather[0].description}
      </p>
    </Fragment>
  );
};

export default WeatherCard;
