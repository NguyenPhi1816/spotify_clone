import classNames from 'classnames/bind';
import styles from './MessageDialog.module.scss';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleCheck,
    faCircleExclamation,
    faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../context/Context';
import { type as contextType } from '../../context/Context';

const cx = classNames.bind(styles);

export const MessageType = {
    ERROR: 'ERROR',
    INFORMATION: 'INFORMATION',
    SUCCESS: 'SUCCESS',
};

const MessageDialog = ({ title, message, type }) => {
    const { dispatch } = useAppContext();
    const [themeColor, setThemeColor] = useState('');
    const [icon, setIcon] = useState(null);

    useEffect(() => {
        switch (type) {
            case MessageType.INFORMATION: {
                setThemeColor('var(--infor)');
                setIcon(faCircleInfo);
                break;
            }
            case MessageType.ERROR: {
                setThemeColor('var(--error)');
                setIcon(faCircleExclamation);
                break;
            }
            case MessageType.SUCCESS: {
                setThemeColor('var(--success)');
                setIcon(faCircleCheck);
                break;
            }
        }
    }, [type]);

    const handleClose = () => {
        dispatch({ type: contextType.HIDE_MESSAGE_DIALOG });
    };

    return createPortal(
        <div className={cx('container')}>
            <div className={cx('modal')}>
                <div className={cx('icon-container')}>
                    <FontAwesomeIcon
                        icon={icon}
                        className={cx('icon')}
                        style={{ color: themeColor }}
                    />
                </div>
                <div className={cx('title')}>
                    <h2>{title}</h2>
                </div>
                <div className={cx('message')}>
                    <p>{message}</p>
                </div>
                <button
                    className={cx('button')}
                    onClick={handleClose}
                    style={{ backgroundColor: themeColor }}
                >
                    Đóng
                </button>
            </div>
        </div>,
        document.getElementById('root'),
    );
};

export default MessageDialog;
