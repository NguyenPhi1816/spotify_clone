import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBrain,
    faChevronLeft,
    faChevronRight,
    faMagnifyingGlass,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import Button from '../Button';
import HeadlessTippy from '../HeadlessTippy';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type, useAppContext } from '../../Context/Context';
import SearchByEmotion from '../SearchByEmotion';
import { isArtist } from '../../services/authorizationServices';
import { removeAuthCookie } from '../../cookies/removeCookie';

const cx = classNames.bind(styles);

function Navbar({ showSearchBar = false }) {
    const { state, dispatch } = useAppContext();

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleShowToolTip = () => setShow((prev) => !prev);
    const handleGoForward = () => navigate(1);
    const handleGoBackward = () => navigate(-1);

    const handleLogout = () => {
        dispatch({ type: type.LOGOUT });
        removeAuthCookie();
        navigate('/login');
    };

    const handleShowModal = () => setShowModal((prev) => !prev);

    return (
        <nav className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('navigation-btns')}>
                    <button
                        className={cx('navigation-btn')}
                        onClick={handleGoBackward}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                        className={cx('navigation-btn')}
                        onClick={handleGoForward}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                    <div
                        className={cx('search-bar', { isHide: !showSearchBar })}
                    >
                        <label className={cx('form-group')}>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>
                            <input placeholder="Bạn muốn nghe gì?" />
                        </label>
                        <HeadlessTippy
                            items={
                                <div className={cx('activation-trigger')}>
                                    <p>
                                        Đăng nhập để sử dụng chức năng tìm kiếm
                                        theo cảm xúc
                                    </p>
                                    <div className={cx('register-login')}>
                                        <div className={cx('btn')}>
                                            <Button
                                                style={{
                                                    color: 'var(--text-white)',
                                                }}
                                                content="Đăng ký"
                                                noBackground
                                            />
                                        </div>
                                        <div className={cx('btn')}>
                                            <Button
                                                content="Đăng nhập"
                                                gap="32px"
                                            />
                                        </div>
                                    </div>
                                </div>
                            }
                            show={showModal && !state.isAuthenticated}
                            setShow={setShowModal}
                        >
                            <Button
                                content={<FontAwesomeIcon icon={faBrain} />}
                                onClick={handleShowModal}
                                className={cx('smart-btn')}
                            />
                        </HeadlessTippy>
                    </div>
                </div>
                {state.isAuthenticated ? (
                    <HeadlessTippy
                        items={
                            <div className={cx('tippy')}>
                                {isArtist(state.authData.user.role.id) && (
                                    <Button
                                        to={`/dashboard/${state.authData.user.id}`}
                                        className={cx('tippy-btn')}
                                        noBackground
                                        content={<p>Dashboard</p>}
                                    />
                                )}
                                <Button
                                    to={`/user/${state.authData.user.id}`}
                                    className={cx('tippy-btn')}
                                    noBackground
                                    content={<p>Hồ sơ</p>}
                                />
                                <Button
                                    className={cx('tippy-btn')}
                                    noBackground
                                    content={<p>Chỉnh sửa hồ sơ</p>}
                                />
                                <Button
                                    className={cx('tippy-btn')}
                                    noBackground
                                    onClick={handleLogout}
                                    content={<p>Đăng xuất</p>}
                                />
                            </div>
                        }
                        show={show}
                        setShow={setShow}
                    >
                        <Button
                            className={cx('user')}
                            onClick={() => handleShowToolTip()}
                            content={<FontAwesomeIcon icon={faUser} />}
                        ></Button>
                    </HeadlessTippy>
                ) : (
                    <div className={cx('register-login')}>
                        <div className={cx('btn')}>
                            <Button
                                to="/register"
                                style={{ color: 'var(--text-grey)' }}
                                content="Đăng ký"
                                noBackground
                            />
                        </div>
                        <div className={cx('btn')}>
                            <Button
                                to="/login"
                                content="Đăng nhập"
                                gap="32px"
                            />
                        </div>
                    </div>
                )}
            </div>
            {showModal && state.isAuthenticated && (
                <SearchByEmotion onClose={handleShowModal} />
            )}
        </nav>
    );
}

export default Navbar;
