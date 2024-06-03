import classNames from 'classnames/bind';
import styles from './ProfilePage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import HeadlessTippy from '../../components/HeadlessTippy';
import Button from '../../components/Button';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { removeAuthCookie } from '../../cookies/removeCookie';
import { authContextTypes, useAuthContext } from '../../context/AuthContext';
import {
    useUserDataContext,
    userDataContextTypes,
} from '../../context/UserDataContext';

const cx = classNames.bind(styles);

const ProfilePage = () => {
    const { dispatch: authDispatch } = useAuthContext();
    const { dispatch: userDataDispatch } = useUserDataContext();
    const { dispatch: songDispatch } = useSongContext();

    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleShowToolTip = () => setShow((prev) => !prev);

    const handleLogout = () => {
        authDispatch({ type: authContextTypes.LOGOUT });
        userDataDispatch({ type: userDataContextTypes.CLEAR_USER_DATA });
        songDispatch({ type: songContextTypes.CLEAR_SONG });
        removeAuthCookie();
        navigate('/login');
    };

    return (
        <section className={cx('section')}>
            <div>
                <nav className={cx('navbar')}>
                    <Link to="/">
                        <span className={cx('logo')}>
                            <img src={import.meta.env.VITE_LOGO_PRIMARY_URL} />
                            <span>Spotify</span>
                        </span>
                    </Link>
                    <HeadlessTippy
                        items={
                            <div className={cx('tippy')}>
                                <Button
                                    className={cx('tippy-btn')}
                                    noBackground
                                    content={<p>Hồ sơ</p>}
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
                </nav>
                <div className={cx('body')}>
                    <div className={cx('container')}>
                        <h1>Chỉnh sửa hồ sơ</h1>
                        <div className={cx('form-group')}>
                            <h3>Tên người dùng</h3>
                            <p>Nguyễn Quốc Khả Phi</p>
                        </div>
                        <form className={cx('form')}>
                            <label className={cx('form-group')}>
                                <p>Email</p>
                                <input type="text" name="email" />
                            </label>
                            <label className={cx('form-group')}>
                                <p>Giới tính</p>
                                <input type="text" name="email" />
                            </label>
                            <label className={cx('form-group')}>
                                <p>Giới tính</p>
                                <input type="date" name="email" />
                            </label>
                            <label className={cx('form-group')}>
                                <input type="submit" value={'Lưu hồ sơ'} />
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfilePage;
