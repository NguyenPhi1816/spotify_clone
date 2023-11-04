import classNames from 'classnames/bind';
import styles from './PlayButton.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { type, useAppContext } from '../../Context/Context';
import React, { useEffect, useState } from 'react';
import AuthenticationDialog from '../../dialog/AuthenticationDialog';

const cx = classNames.bind(styles);

export const types = { SONG: 'SONG', LIST: 'LIST', CARD: 'CARD' };

const PlayButton = ({
    isPlaying,
    onClick,
    className,
    noBackground = false,
    size = '16px',
}) => {
    const { state } = useAppContext();
    const [showDialog, setShowDialog] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();

        if (state.authData !== null) {
            onClick();
        } else {
            setShowDialog(true);
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
            {showDialog && (
                <AuthenticationDialog
                    message={'Vui lòng đăng nhập để tận hưởng bài hát bạn nhé.'}
                    onClose={() => setShowDialog(false)}
                />
            )}
        </>
    );
};

export default PlayButton;
