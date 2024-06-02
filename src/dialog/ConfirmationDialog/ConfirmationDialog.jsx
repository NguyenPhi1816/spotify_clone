import classNames from 'classnames/bind';
import styles from './ConfirmationDialog.module.scss';
import Button from '../../components/Button';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const ConfirmationDialog = ({
    message,
    setShow = () => {},
    onConfirm = () => {},
}) => {
    const handleClose = () => setShow(false);
    const handleConfirm = () => {
        onConfirm();
        setShow(false);
    };

    return createPortal(
        <div className={cx('container')}>
            <div className={cx('modal')}>
                <div className={cx('icon-container')}>
                    <FontAwesomeIcon
                        icon={faCircleQuestion}
                        className={cx('icon')}
                        style={{ color: 'var(--text-green-base)' }}
                    />
                </div>
                <div className={cx('title')}>
                    <h2>Vui lòng xác nhận</h2>
                </div>
                <div className={cx('message')}>
                    <p>{message}</p>
                </div>
                <div className={cx('btn-group')}>
                    <button
                        className={cx('button')}
                        onClick={handleClose}
                        style={{
                            color: 'var(--text-white)',
                            backgroundColor: 'var(--background-grey)',
                        }}
                    >
                        Đóng
                    </button>
                    <button
                        className={cx('button')}
                        onClick={handleConfirm}
                        style={{
                            backgroundColor: 'var(--background-green-base)',
                        }}
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById('root'),
    );
};

export default ConfirmationDialog;
