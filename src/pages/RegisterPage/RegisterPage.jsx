import classNames from 'classnames/bind';
import styles from './RegisterPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { register as registerUser } from '../../services/authenticationServices';
import ConfirmationDialog from '../../dialog/ConfirmationDialog';
import Loading from '../../components/Loading';
import CustomSpinner from '../../icon/spinner';
import {
    dialogContextTypes,
    useDialogContext,
} from '../../context/DialogContext';
import { MessageType } from '../../dialog/MessageDialog/MessageDialog';

const cx = classNames.bind(styles);

const RegisterPage = () => {
    const { dispatch: dialogDispatch } = useDialogContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onBlur' });

    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showMessageDialog, setShowMessageDialog] = useState(false);

    const handleShowPass = (e) => {
        e.preventDefault();
        return setShowPass((prev) => !prev);
    };

    const onSubmit = (data) => {
        const dateOfBirth = new Date(data.dateOfBirth);
        const day = dateOfBirth.getDate();
        const month = dateOfBirth.getMonth() + 1;
        const year = dateOfBirth.getFullYear();

        const body = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            day,
            month,
            year,
            gender: data.gender,
        };

        setIsLoading(true);
        registerUser(body)
            .then(() => {
                setShowConfirmDialog(true);
            })
            .catch((error) => {
                console.log(error.message);
                dialogDispatch({
                    type: dialogContextTypes.SHOW_MESSAGE_DIALOG,
                    message: {
                        title: 'Có lỗi xảy ra',
                        message: error.message,
                        type: MessageType.ERROR,
                    },
                });
            })
            .finally(() => setIsLoading(false));
    };

    const handleNavigateToLoginPage = () => {
        navigate('/login');
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
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className={cx('form')}
                        >
                            <label className={cx('form-group')}>
                                <p>Email của bạn là gì?</p>
                                <input
                                    {...register('email', {
                                        required: true,
                                        pattern:
                                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                    })}
                                    className={cx({
                                        'error-input': errors.email,
                                    })}
                                    type="text"
                                    placeholder="Nhập email của bạn."
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
                                <p>Tạo mật khẩu</p>
                                <div className={cx('password')}>
                                    <input
                                        {...register('password', {
                                            required: true,
                                            minLength: 8,
                                        })}
                                        className={cx({
                                            'error-input': errors.password,
                                        })}
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
                            <label className={cx('form-group')}>
                                <p>Bạn tên là gì?</p>
                                <div className={cx('name')}>
                                    <input
                                        {...register('firstName', {
                                            required: true,
                                        })}
                                        className={cx({
                                            'error-input': errors.firstName,
                                        })}
                                        type="text"
                                        placeholder="Họ và tên đệm."
                                    />
                                    <input
                                        {...register('lastName', {
                                            required: true,
                                        })}
                                        className={cx({
                                            'error-input': errors.lastName,
                                        })}
                                        type="text"
                                        placeholder="Tên."
                                    />
                                </div>
                                {(errors.firstName || errors.lastName) && (
                                    <span className={cx('error-message')}>
                                        Vui lòng nhập tên của bạn
                                    </span>
                                )}
                            </label>
                            <label className={cx('form-group')}>
                                <p>Bạn sinh ngày nào?</p>
                                <input
                                    {...register('dateOfBirth', {
                                        required: true,
                                    })}
                                    className={cx({
                                        'error-input': errors.dateOfBirth,
                                    })}
                                    type="date"
                                />
                                {errors.dateOfBirth && (
                                    <span className={cx('error-message')}>
                                        Vui lòng chọn ngày sinh của bạn
                                    </span>
                                )}
                            </label>
                            <label className={cx('form-group')}>
                                <p>Giới tính của bạn là gì?</p>
                                <div>
                                    <label htmlFor="male">
                                        <input
                                            {...register('gender')}
                                            type="radio"
                                            id="male"
                                            value="MALE"
                                            name="gender"
                                            checked
                                        />
                                        <span
                                            className={cx('checkmark')}
                                        ></span>
                                        Nam
                                    </label>

                                    <label htmlFor="male">
                                        <input
                                            {...register('gender')}
                                            type="radio"
                                            id="female"
                                            value="FEMALE"
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
                                <button
                                    className={cx('submit-btn')}
                                    disabled={Object.keys(errors).length > 0}
                                >
                                    {isLoading && <CustomSpinner />}
                                    Đăng ký
                                </button>
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
            {showConfirmDialog && (
                <ConfirmationDialog
                    message={'Đăng ký thành công. Bạn có muốn đăng nhập'}
                    onConfirm={handleNavigateToLoginPage}
                    setShow={setShowConfirmDialog}
                />
            )}
        </section>
    );
};

export default RegisterPage;
