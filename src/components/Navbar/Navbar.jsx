import classNames from "classnames/bind";
import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);

function Navbar () {
    return <nav className={cx("container")}></nav>
}

export default Navbar;