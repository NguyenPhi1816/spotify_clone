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

const cx = classNames.bind(styles);

function Sidebar() {
    const location = useLocation();
    const currentPath = location.pathname;

    const [show, setShow] = useState(false);

    const handleShowToolTip = () => setShow((prev) => !prev);

    return (
        <nav className={cx('container')}>
            <div className={cx('item', 'top')}>
                <ul className={cx('top-list')}>
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
                                referenceClientRect={{
                                    width: 100,
                                    height: 100,
                                    left: 378,
                                    right: 0,
                                    top: 70,
                                    bottom: 0,
                                }}
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
                        <div className={cx('article')}>
                            <h4 className={cx('acticle-title')}>
                                Tạo danh sách phát đầu tiên của bạn
                            </h4>
                            <p className={cx('acticle-content')}>
                                Rất dễ! Chúng tôi sẽ giúp bạn
                            </p>
                            <div className="btn">
                                <Button
                                    content="Tạo danh sách phát"
                                    customFontSize="14px"
                                />
                            </div>
                        </div>

                        <div className={cx('article')}>
                            <h4 className={cx('acticle-title')}>
                                Hãy cùng tìm và theo dõi một số podcast
                            </h4>
                            <p className={cx('acticle-content')}>
                                Chúng tôi sẽ cập nhật thông tin cho bạn về các
                                tập mới
                            </p>
                            <div className="btn">
                                <Button
                                    content="Duyệt xem Podcast"
                                    customFontSize="14px"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
