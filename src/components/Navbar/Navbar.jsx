import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

import Button from '../Button';

const cx = classNames.bind(styles);

function Navbar({ showSearchBar = false }) {
    return (
        <nav className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('navigation-btns')}>
                    <div className={cx('navigation-btn')}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <div className={cx('navigation-btn')}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                    <div
                        className={cx('search-bar', { isHide: !showSearchBar })}
                    >
                        <label className={cx('form-group')}>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>
                            <input placeholder="Bạn muốn nghe gì?" />
                        </label>
                    </div>
                </div>
                <div className={cx('register-login')}>
                    <div className={cx('btn')}>
                        <Button content="Đăng ký" noBackground />
                    </div>
                    <div className={cx('btn')}>
                        <Button content="Đăng nhập" gap="32px" />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
