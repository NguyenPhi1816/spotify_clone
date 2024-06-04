import classNames from 'classnames/bind';
import styles from './LoginPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { authenticate } from '../../services/authenticationServices';
import { useForm } from 'react-hook-form';
import CustomSpinner from '../../icon/spinner/CustomSpinner';
import { MessageType } from '../../dialog/MessageDialog/MessageDialog';
import { authContextTypes, useAuthContext } from '../../context/AuthContext';
import {
    dialogContextTypes,
    useDialogContext,
} from '../../context/DialogContext';
import { setAuthCookie } from '../../cookies/setCookie';

const cx = classNames.bind(styles);

const LoginPage = () => {
    const ERR_NETWORK = 'ERR_NETWORK';
    const ERR_BAD_REQUEST = 'ERR_BAD_REQUEST';

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onBlur' });

    const { dispatch: authDispatch } = useAuthContext();
    const { dispatch: dialogDispatch } = useDialogContext();

    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(true);
    const [showPass, setShowPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleRemember = (e) => {
        e.preventDefault();
        return setRememberMe((prev) => !prev);
    };

    const handleShowPass = (e) => {
        e.preventDefault();
        return setShowPass((prev) => !prev);
    };

    const handleSubmitForm = (data) => {
        setIsLoading(true);
        authenticate(data.email, data.password)
            .then((res) => {
                const data = res.data;

                if (rememberMe) {
                    setAuthCookie(data);
                }
                authDispatch({ payload: data, type: authContextTypes.LOGIN });
                navigate('/');
            })
            .catch((err) => {
                console.log(err.message);
                let message = '';
                if (err.code === ERR_NETWORK) {
                    message =
                        'Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại.';
                } else if (err.code === ERR_BAD_REQUEST) {
                    message =
                        'Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.';
                } else {
                    message = 'Lỗi không xác định. Vui lòng thử lại';
                }
                setIsLoading(false);
                dialogDispatch({
                    type: dialogContextTypes.SHOW_MESSAGE_DIALOG,
                    message: {
                        title: 'Đăng nhập thất bại',
                        message,
                        type: MessageType.ERROR,
                    },
                });
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
                        <form
                            onSubmit={handleSubmit(handleSubmitForm)}
                            className={cx('form')}
                        >
                            <label className={cx('form-group')}>
                                <p>Email hoặc tên người dùng</p>
                                <input
                                    type="text"
                                    name="email"
                                    {...register('email', {
                                        required: true,
                                        pattern:
                                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                    })}
                                    className={cx({
                                        'error-input': errors.email,
                                    })}
                                    placeholder="Email hoặc tên người dùng"
                                />
                                {errors.email?.type === 'required' && (
                                    <span className={cx('error-message')}>
                                        Vui lòng nhập email
                                    </span>
                                )}
                                {errors.email?.type === 'pattern' && (
                                    <span className={cx('error-message')}>
                                        Email không hợp lệ
                                    </span>
                                )}
                            </label>
                            <label className={cx('form-group')}>
                                <p>Mật khẩu</p>
                                <div className={cx('password')}>
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        name="pass"
                                        {...register('password', {
                                            required: true,
                                            minLength: 8,
                                        })}
                                        className={cx({
                                            'error-input': errors.password,
                                        })}
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
                                {errors.password?.type === 'required' && (
                                    <span className={cx('error-message')}>
                                        Vui lòng nhập mật khẩu
                                    </span>
                                )}
                                {errors.password?.type === 'minLength' && (
                                    <span className={cx('error-message')}>
                                        Độ dài mật khẩu phải lớn hơn 8 ký tự
                                    </span>
                                )}
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
                            <button className={cx('submit-btn')}>
                                {isLoading && <CustomSpinner />}
                                Đăng nhập
                            </button>
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
