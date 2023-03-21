import PropTypes from "prop-types";
import style from "../../sass/shared/digitalCircleClock.module.scss";

export default function DigitalCircleClock({ hrs, min, sec }) {
  //?@___Handler Functions___
  const times = { hrs, min, sec };
  /**
   * @description This Function Provide Hour, Min , Sec From Date Object
   * @param {object} date - Date Object
   * @returns {object} Hrs, Min, Sec
   */
  const getTimeFormat = (value, key) => {
    /* @___12 Hour Format */
    if (key === "hrs") return value > 12 ? value - 12 : value ? value : 12;
    return value;
  };

  const getTimePrefix = (value) => {
    if (!value) return "00";
    if (value < 10) return "0" + value;
    return value;
  };

  return (
    <div className={style.time}>
      {Object.keys(times).map((key, index) => (
        <div className={style.time__circle} key={index}>
          <div
            className={style.time__dot}
            style={{
              transform: `rotate(${
                getTimeFormat(times[key], key) * timeFormat[key].deg
              }deg)`,
            }}
          ></div>
          <svg>
            <circle cx="50" cy="50" r="50"></circle>
            <circle
              cx="50"
              cy="50"
              r="50"
              strokeDashoffset={
                315 -
                (315 * getTimeFormat(times[key], key)) / timeFormat[key].format
              }
            ></circle>
          </svg>
          <p className={style.time__text}>
            {getTimePrefix(getTimeFormat(times[key], key))}
            <span className={style.time__indicator}>
              {timeFormat[key].view}
            </span>
          </p>
        </div>
      ))}
      <p className={style.time__ampm}>{hrs > 12 ? "PM" : "AM"}</p>
    </div>
  );
}
DigitalCircleClock.propTypes = {
  hrs: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  sec: PropTypes.number.isRequired,
};
const timeFormat = {
  hrs: {
    format: 12,
    deg: 30,
    view: "hrs",
  },
  min: {
    format: 60,
    deg: 6,
    view: "min",
  },
  sec: {
    format: 60,
    deg: 6,
    view: "sec",
  },
};
