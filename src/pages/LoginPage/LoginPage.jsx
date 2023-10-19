import classNames from 'classnames/bind';
import styles from './LoginPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { authenticate } from '../../services/authenticationServices';
import { type, useAppContext } from '../../Context/Context';
import { setAuthCookie } from '../../cookies/setCookie';
import { getAuthCookie } from '../../cookies/getCookie';

const cx = classNames.bind(styles);

const LoginPage = () => {
    const { dispatch } = useAppContext();

    const [rememberMe, setRememberMe] = useState(true);
    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        pass: '',
    });
    const [resData, setResData] = useState({});

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRemember = (e) => {
        e.preventDefault();
        return setRememberMe((prev) => !prev);
    };

    const handleShowPass = (e) => {
        e.preventDefault();
        return setShowPass((prev) => !prev);
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        authenticate(formData.email, formData.pass)
            .then((res) => {
                setResData(res.data);
                if (rememberMe) {
                    delete res.data.user.songs;
                    setAuthCookie(res.data);
                }
                dispatch({ payload: res.data, type: type.LOGIN });
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
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
                        <h1>Đăng nhập vào Spotify</h1>
                        <form className={cx('form')}>
                            <label className={cx('form-group')}>
                                <p>Email hoặc tên người dùng</p>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email hoặc tên người dùng"
                                />
                            </label>
                            <label className={cx('form-group')}>
                                <p>Mật khẩu</p>
                                <div className={cx('password')}>
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        name="pass"
                                        value={formData.pass}
                                        onChange={handleInputChange}
                                        placeholder="Mật khẩu"
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
                            <div className={cx('toggle')}>
                                <button
                                    className={cx('toggle-btn', {
                                        active: rememberMe,
                                    })}
                                    onClick={(e) => handleRemember(e)}
                                >
                                    <span
                                        className={cx('toggle-btn-thumb')}
                                    ></span>
                                </button>
                                <p>Hãy nhớ tôi</p>
                            </div>
                            <label
                                className={cx('form-group')}
                                onClick={(e) => handleSubmitForm(e)}
                            >
                                <input type="submit" value="Đăng nhập" />
                            </label>
                        </form>
                        <Link to="/forgot-password" className={cx('underline')}>
                            Quên mật khẩu của bạn?
                        </Link>
                        <div className={cx('register')}>
                            <span>Bạn chưa có tài khoản?</span>
                            <Link to="/register" className={cx('underline')}>
                                Đăng ký Spotify
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
