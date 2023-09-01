import classNames from "classnames/bind";
import styles from "./Content.module.scss";

const cx = classNames.bind(styles);

function Content () {
    return <section className={cx("container")}>

    </section>
}

export default Content;