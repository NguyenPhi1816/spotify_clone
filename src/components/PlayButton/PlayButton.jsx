import classNames from 'classnames/bind';
import styles from './PlayButton.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import {
    dialogContextTypes,
    useDialogContext,
} from '../../context/DialogContext';

const cx = classNames.bind(styles);

export const types = { SONG: 'SONG', LIST: 'LIST', CARD: 'CARD' };

const PlayButton = ({
    isPlaying,
    onClick,
    className,
    noBackground = false,
    size = '16px',
}) => {
    const { state: authState } = useAuthContext();
    const { dispatch: dialogDispatch } = useDialogContext();

    const handleClick = (e) => {
        e.preventDefault();

        if (authState.authData !== null) {
            onClick();
        } else {
            dialogDispatch({
                type: dialogContextTypes.SHOW_AUTH_DIALOG,
                message: {
                    title: '',
                    message: 'Vui lòng đăng nhập để tận hưởng bài hát bạn nhé',
                    type: '',
                },
            });
        }
    };

    return (
        <>
            <div
                className={cx('play-btn', className)}
                style={{
                    width: size,
                    height: size,
                }}
                onClick={(e) => handleClick(e)}
            >
                <button
                    style={{
                        fontSize: size === '16px' && '16px',
                        backgroundColor: noBackground && 'transparent',
                        color: noBackground && 'var(--text-white)',
                    }}
                >
                    <FontAwesomeIcon
                        icon={faPlay}
                        className={cx('icon', { show: !isPlaying })}
                    />
                    <FontAwesomeIcon
                        icon={faPause}
                        className={cx('icon', { show: isPlaying })}
                    />
                </button>
            </div>
        </>
    );
};

export default PlayButton;
