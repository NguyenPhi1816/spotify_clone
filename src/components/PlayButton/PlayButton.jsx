import classNames from 'classnames/bind';
import styles from './PlayButton.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { type, useAppContext } from '../../Context/Context';
import React, { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const PlayButton = React.forwardRef(
    (
        {
            currentListPath,
            currentList,
            currentIndex,
            className,
            noBackground = false,
            size = '16px',
        },
        ref,
    ) => {
        const { state, dispatch } = useAppContext();
        const [isPlaying, setIsPlaying] = useState(false);

        const handlePlayingAlbum = () => {
            if (
                state.currentPlayingPath !== currentListPath ||
                state.currentPlayingSongIndex !== currentIndex
            ) {
                dispatch({
                    type: type.LOAD_SONG,
                    currentPlayingPath: currentListPath,
                    currentPlayingList: currentList,
                    currentPlayingSongIndex: currentIndex,
                });
                setTimeout(() => {
                    dispatch({ type: type.PLAY_SONG });
                    setIsPlaying(!state.isPlaying);
                }, 1000);
            } else {
                if (!state.isPlaying) {
                    dispatch({ type: type.PLAY_SONG });
                } else {
                    dispatch({ type: type.PAUSE_SONG });
                }
            }
        };

        useEffect(() => {
            if (
                state.currentPlayingPath === currentListPath &&
                state.currentPlayingSongIndex === currentIndex
            ) {
                setIsPlaying(state.isPlaying);
            } else if (state.currentPlayingSongIndex === currentIndex) {
                setIsPlaying(state.isPlaying);
            }
        }, [state.isPlaying]);

        return (
            <div
                className={cx('play-btn', className)}
                style={{
                    width: size,
                    height: size,
                }}
                onClick={handlePlayingAlbum}
            >
                <button
                    ref={ref}
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
        );
    },
);

export default PlayButton;
