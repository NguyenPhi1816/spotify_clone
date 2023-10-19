import classNames from 'classnames/bind';
import styles from './MessageDialog.module.scss';
import Button from '../../components/Button';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

export const types = {
    ERROR: 'ERROR',
    INFORMATION: 'INFORMATION',
    SUCCESS: 'SUCCESS',
};

const MessageDialog = ({ message, type, setShow = () => {} }) => {
    const [backgroundColor, setBackgroundColor] = useState('');

    const handleClose = () => setShow(false);

    useEffect(() => {
        switch (type) {
            case types.INFORMATION: {
                setBackgroundColor('#2e77d0');
                break;
            }
            case types.ERROR: {
                setBackgroundColor('red');
                break;
            }
            case types.SUCCESS: {
                setBackgroundColor('var(--background--green-base)');
                break;
            }
        }
    }, [type]);

    return (
        <div className={cx('background')}>
            <div
                className={cx('dialog')}
                style={{
                    backgroundColor: backgroundColor,
                }}
            >
                <h3 className={cx('message')}>{message}</h3>
                <div className={cx('btns')}>
                    <Button onClick={handleClose} content={'Đã hiểu'} />
                </div>
            </div>
        </div>
    );
};

export default MessageDialog;
