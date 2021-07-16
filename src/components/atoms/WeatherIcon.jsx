const WeatherIcon = (props) => {
  const src = `${process.env.REACT_APP_ICON_URL}${props.icon}@2x.png`;
  return <img src={src} alt={props.weather} />
}

export default WeatherIcon;
