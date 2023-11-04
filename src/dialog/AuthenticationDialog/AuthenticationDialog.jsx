import classNames from 'classnames/bind';
import styles from './AuthenticationDialog.module.scss';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { createPortal } from 'react-dom';

const cx = classNames.bind(styles);

const AuthenticationDialog = ({ message, onClose = () => {} }) => {
    return createPortal(
        <div className={cx('container')}>
            <div className={cx('activation-trigger')}>
                <div className={cx('header')}>
                    <Button
                        noBackground
                        content={<FontAwesomeIcon icon={faTimes} />}
                        onClick={onClose}
                    />
                </div>
                <p>{message}</p>
                <div className={cx('register-login')}>
                    <div className={cx('btn')}>
                        <Button
                            to="/register"
                            style={{
                                color: 'var(--text-white)',
                            }}
                            content="Đăng ký"
                            noBackground
                        />
                    </div>
                    <div className={cx('btn')}>
                        <Button to="/login" content="Đăng nhập" gap="32px" />
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('root'),
    );
};

export default AuthenticationDialog;
