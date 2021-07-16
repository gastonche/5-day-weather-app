import { useState } from "react";
import classNames from "classnames";
import classes from "./SelectField.module.css";

const SelectField = (props) => {
  const [open, setOpened] = useState(false);
  const value =
    props.value || props.value === 0
      ? props.options.find(({ id }) => id === props.value).label
      : null;

  function select({id}) {
    setOpened(false);
    props.onChange(id);
  }

  return (
    <div className={classes.Root}>
      <label className={classes.Label}>{props.children}</label>
      <div className={classes.Field} onClick={() => setOpened(!open)}>
        <div>{value}</div>
        <div className={classes.Toggle}>
          <span className="material-icons">
            {open ? "expand_less" : "expand_more"}
          </span>
        </div>
      </div>
      <div className={classNames({ [classes.Dropdown]: true, [classes.Active]: open })}>
        {props.options.map((option) => (
          <div
            className={classNames({
              [classes.Item]: true,
              [classes.Selected]: option.id === props.value,
            })}
            key={option.id}
            onClick={() => select(option)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectField;
