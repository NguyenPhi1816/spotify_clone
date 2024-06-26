import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Button from '../Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faCompactDisc,
    faFolder,
    faHouse,
    faMagnifyingGlass,
    faMusic,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '../HeadlessTippy';
import UnAuthSidebarList from '../SidebarList/UnAuthSidebarList';
import AuthSidebarList from '../SidebarList/AuthSidebarList';
import { useAuthContext } from '../../context/AuthContext';

const cx = classNames.bind(styles);

function Sidebar() {
    const location = useLocation();
    const currentPath = location.pathname;

    const { state: authState } = useAuthContext();

    const [show, setShow] = useState(false);

    const handleShowToolTip = () => setShow((prev) => !prev);

    return (
        <nav className={cx('container')}>
            <div className={cx('item', 'top')}>
                <ul className={cx('top-list')}>
                    <li className={cx('list-item')}>
                        <Link to="/">
                            <span className={cx('logo')}>
                                <img
                                    src={import.meta.env.VITE_LOGO_PRIMARY_URL}
                                />
                                <span>Spotify</span>
                            </span>
                        </Link>
                    </li>
                    <li
                        className={cx('list-item', {
                            active: currentPath === '/',
                        })}
                    >
                        <Link to="/">
                            <FontAwesomeIcon icon={faHouse} />
                            <span>Trang chủ</span>
                        </Link>
                    </li>
                    <li
                        className={cx('list-item', {
                            active: currentPath === '/search',
                        })}
                    >
                        <Link to="/search">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <span>Tìm kiếm</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={cx('item', 'body')}>
                <div className={cx('body-container')}>
                    <div className={cx('list-item', 'p-s', 'd-g')}>
                        <div>
                            <FontAwesomeIcon icon={faCompactDisc} />
                            <span>Thư viện</span>
                        </div>
                        <div className={cx('icons')}>
                            <HeadlessTippy
                                items={
                                    <div className={cx('tippy')}>
                                        <Button
                                            className={cx('tippy-btn')}
                                            noBackground
                                            content={
                                                <span
                                                    className={cx(
                                                        'tippy-btn-content',
                                                    )}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faMusic}
                                                    />
                                                    <p>
                                                        Tạo danh sách phát mới
                                                    </p>
                                                </span>
                                            }
                                        />
                                        <Button
                                            className={cx('tippy-btn')}
                                            noBackground
                                            content={
                                                <span
                                                    className={cx(
                                                        'tippy-btn-content',
                                                    )}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faFolder}
                                                    />
                                                    <p>
                                                        Tạo thư mục danh sách
                                                        phát
                                                    </p>
                                                </span>
                                            }
                                        />
                                    </div>
                                }
                                show={show}
                                setShow={setShow}
                                getReferenceClientRect={() => ({
                                    width: 130,
                                    height: 100,
                                    left: 378,
                                    right: 0,
                                    top: 100,
                                    bottom: 0,
                                })}
                            >
                                <div
                                    className={cx('plus', 'icon')}
                                    onClick={() => handleShowToolTip()}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                            </HeadlessTippy>
                        </div>
                    </div>

                    <div className={cx('body-list')}>
                        {!authState.isAuthenticated ? (
                            <UnAuthSidebarList />
                        ) : (
                            <AuthSidebarList />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
