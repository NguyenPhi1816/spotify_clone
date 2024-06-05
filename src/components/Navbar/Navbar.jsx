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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchByEmotion from '../SearchByEmotion';
import { isArtist } from '../../services/authorizationServices';
import {
    removeAuthCookie,
    removeStatesCookie,
} from '../../cookies/removeCookie';
import useDebounce from '../../hooks/useDebounce';

import PropTypes from 'prop-types';
import { authContextTypes, useAuthContext } from '../../context/AuthContext';
import {
    useUserDataContext,
    userDataContextTypes,
} from '../../context/UserDataContext';
import { songContextTypes, useSongContext } from '../../context/SongContext';

const cx = classNames.bind(styles);

function Navbar({ onSearch, showSearchBar }) {
    const { state: authState, dispatch: authDispatch } = useAuthContext();
    const { dispatch: userDataDispatch } = useUserDataContext();
    const { dispatch: songDispatch } = useSongContext();

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const debounceValue = useDebounce(searchValue, 500);

    const handleShowToolTip = () => setShow((prev) => !prev);
    const handleGoForward = () => navigate(1);
    const handleGoBackward = () => navigate(-1);

    const handleLogout = () => {
        authDispatch({ type: authContextTypes.LOGOUT });
        userDataDispatch({ type: userDataContextTypes.CLEAR_USER_DATA });
        songDispatch({ type: songContextTypes.CLEAR_SONG });
        removeAuthCookie();
        removeStatesCookie();
        navigate('/login');
    };

    const handleShowModal = () => setShowModal((prev) => !prev);

    const handleChangeSearchValue = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) setSearchValue(value);
    };

    useEffect(() => {
        onSearch(debounceValue);
    }, [debounceValue]);

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
                            <input
                                value={searchValue}
                                onChange={handleChangeSearchValue}
                                placeholder="Bạn muốn nghe gì?"
                            />
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
                            show={showModal && !authState.isAuthenticated}
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
                {authState.isAuthenticated ? (
                    <HeadlessTippy
                        items={
                            <div className={cx('tippy')}>
                                {isArtist(authState.authData.user.role.id) && (
                                    <Button
                                        to={`/dashboard/${authState.authData.user.id}`}
                                        className={cx('tippy-btn')}
                                        noBackground
                                        content={<p>Dashboard</p>}
                                    />
                                )}
                                <Button
                                    to={`/user/${authState.authData.user.id}`}
                                    className={cx('tippy-btn')}
                                    noBackground
                                    content={<p>Hồ sơ</p>}
                                />
                                <Button
                                    to={'/profile'}
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
            {showModal && authState.isAuthenticated && (
                <SearchByEmotion onClose={handleShowModal} />
            )}
        </nav>
    );
}

Navbar.propTypes = { onSearch: PropTypes.func, showSearchBar: PropTypes.bool };

Navbar.defaultProps = {
    onSearch: () => {},
    showSearchBar: false,
};

export default Navbar;
