import classNames from 'classnames/bind';
import styles from './AuthenticationDialog.module.scss';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {
    dialogContextTypes,
    useDialogContext,
} from '../../context/DialogContext';

const cx = classNames.bind(styles);

const AuthenticationDialog = ({ message }) => {
    const { dispatch: dialogDispatch } = useDialogContext();

    const handleClose = () => {
        dialogDispatch({ type: dialogContextTypes.HIDE_AUTH_DIALOG });
    };

    return createPortal(
        <div className={cx('container')}>
            <div className={cx('activation-trigger')}>
                <div className={cx('header')}>
                    <Button
                        noBackground
                        content={<FontAwesomeIcon icon={faTimes} />}
                        onClick={handleClose}
                    />
                </div>
                <p className={cx('message')}>{message}</p>
                <div className={cx('register-login')}>
                    <div className={cx('btn')}>
                        <Button
                            onClick={handleClose}
                            to="/register"
                            style={{
                                color: 'var(--text-white)',
                            }}
                            content="Đăng ký"
                            noBackground
                        />
                    </div>
                    <div className={cx('btn')}>
                        <Button
                            onClick={handleClose}
                            to="/login"
                            content="Đăng nhập"
                            gap="32px"
                        />
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('root'),
    );
};

AuthenticationDialog.propTypes = {
    message: PropTypes.string,
};

export default AuthenticationDialog;
