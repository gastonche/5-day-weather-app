import classNames from "classnames";
import { getTime } from "../../../utils/date";
import LineChart from "../../atoms/LineChart";
import Loading from "../WeatherCard/Loading";
import classes from "./TemperatureGraph.module.css";

const TemperatureGraph = (props) => {
  return (
    <div
      className={classNames({
        [classes.TemperatureGraph]: true,
        [classes.Loading]: props.loading,
      })}
    >
      {props.loading ? <Loading /> : <Graph hours={props.hours || []} />}
    </div>
  );
};

const formGrapConfigs = (hours) => {
  return hours.reduce(
    (acc, hour) => {
      acc.x.push(getTime(hour.dt));
      acc.y.push(hour.temp);

      return acc;
    },
    { x: [], y: [] }
  );
};

const Graph = (props) => {
  const data = formGrapConfigs(props.hours);
  return <LineChart data={data} />;
};

export default TemperatureGraph;
