import classNames from "classnames/bind";
import styles from "./Playbar.module.scss";

const cx = classNames.bind(styles);

function Playbar() {
  return <div className={cx("container")}></div>;
}

export default Playbar;
