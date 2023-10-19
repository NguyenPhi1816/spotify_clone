import classNames from 'classnames/bind';
import styles from './ConfirmationDialog.module.scss';
import Button from '../../components/Button';

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

    return (
        <div className={cx('background')}>
            <div className={cx('dialog')}>
                <h3 className={cx('message')}>{message}</h3>
                <div className={cx('btns')}>
                    <Button
                        style={{ color: 'var(--text-white)' }}
                        noBackground
                        onClick={handleClose}
                        content={'Không'}
                    />
                    <Button onClick={handleConfirm} content={'Có'} />
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
