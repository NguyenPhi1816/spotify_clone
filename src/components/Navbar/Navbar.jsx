import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import Button from '../Button';

const cx = classNames.bind(styles);

function Navbar() {
    return (
        <nav className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('navigation-btns')}>
                    <div>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div>
                <div className={cx('register-login')}>
                    <div className={cx('btn')}>
                        <Button content="Đăng ký" noBackground />
                    </div>
                    <div className={cx('btn')}>
                        <Button content="Đăng nhập" />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
