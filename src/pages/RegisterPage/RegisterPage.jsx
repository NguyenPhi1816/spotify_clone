import classNames from 'classnames/bind';
import styles from './RegisterPage.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const RegisterPage = () => {
    const [showPass, setShowPass] = useState(false);

    const handleShowPass = (e) => {
        e.preventDefault();
        return setShowPass((prev) => !prev);
    };
    return (
        <section className={cx('section')}>
            <div>
                <nav>
                    <Link to="/">
                        <span className={cx('logo')}>
                            <img src={import.meta.env.VITE_LOGO_PRIMARY_URL} />
                            <span>Spotify</span>
                        </span>
                    </Link>
                </nav>
                <div className={cx('body')}>
                    <div className={cx('container')}>
                        <h1>Đăng ký miễn phí để bắt đầu nghe.</h1>
                        <form className={cx('form')}>
                            <label className={cx('form-group')}>
                                <p>Email của bạn là gì?</p>
                                <input
                                    type="text"
                                    placeholder="Nhập email của bạn."
                                />
                            </label>
                            <label className={cx('form-group')}>
                                <p>Tạo mật khẩu</p>
                                <div className={cx('password')}>
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        placeholder="Tạo mật khẩu."
                                    />
                                    <button
                                        className={cx('show-pass')}
                                        onClick={(e) => handleShowPass(e)}
                                    >
                                        <FontAwesomeIcon
                                            className={cx('eye', {
                                                show: !showPass,
                                            })}
                                            icon={faEyeSlash}
                                        />
                                        <FontAwesomeIcon
                                            className={cx('eye', {
                                                show: showPass,
                                            })}
                                            icon={faEye}
                                        />
                                    </button>
                                </div>
                            </label>
                            <label className={cx('form-group')}>
                                <p>Bạn tên là gì?</p>
                                <input
                                    type="text"
                                    placeholder="Nhập tên hồ sơ."
                                />
                            </label>
                            <label className={cx('form-group')}>
                                <p>Bạn sinh ngày nào?</p>
                                <input
                                    type="date"
                                    placeholder="Nhập tên hồ sơ."
                                />
                            </label>
                            <label className={cx('form-group')}>
                                <p>Giới tính của bạn là gì?</p>
                                <div>
                                    <label for="male">
                                        <input
                                            type="radio"
                                            id="male"
                                            value="male"
                                            name="gender"
                                        />
                                        <span
                                            className={cx('checkmark')}
                                        ></span>
                                        Nam
                                    </label>

                                    <label for="male">
                                        <input
                                            type="radio"
                                            id="female"
                                            value="female"
                                            name="gender"
                                        />
                                        <span
                                            className={cx('checkmark')}
                                        ></span>
                                        Nữ
                                    </label>
                                </div>
                            </label>
                            <label className={cx('form-group')}>
                                <input type="submit" value="Đăng ký" />
                            </label>
                        </form>
                        <div className={cx('register')}>
                            <span>Bạn có tài khoản?</span>
                            <Link to="/login" className={cx('underline')}>
                                Đăng nhập
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;
