import classNames from "classnames/bind";
import styles from "./MainLayout.module.scss";

const cx = classNames.bind(styles);

function MainLayout() {
  return (
      <div className={cx("container")}>Hello world</div>
  );
}

export default MainLayout;
