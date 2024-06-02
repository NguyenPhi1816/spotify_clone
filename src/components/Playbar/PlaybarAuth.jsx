import classNames from 'classnames/bind';
import styles from './Playbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBackward,
    faCirclePause,
    faCirclePlay,
    faForward,
    faHeart,
    faListUl,
    faRepeat,
    faShuffle,
    faVolumeHigh,
    faVolumeLow,
    faVolumeOff,
    faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { type, useAppContext } from '../../context/Context';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const PlaybarAuth = () => {
    const MUTE = 'mute';
    const OFF = 'off';
    const LOW = 'low';
    const HIGH = 'high';

    const MUTE_VALUE = 0;
    const OFF_VALUE = 0.1;
    const LOW_VALUE = 0.7;
    const HIGH_VALUE = 1;

    const { state, dispatch } = useAppContext();

    const [playStatus, setPlayStatus] = useState(() => state.isPlaying);
    const [volumeValue, setVolumeValue] = useState(state.volume);
    const [volumeIcon, setVolumeIcon] = useState(HIGH);
    const [durationValue, setDurationValue] = useState(0);
    const [currentPlayingPath, setCurrentPlayingPath] = useState(
        state.currentPlayingPath,
    );
    const [currentPlayingList, setCurrentPlayingList] = useState(
        state.currentPlayingList,
    );
    const [currentPlayingSongIndex, setCurrentPlayingSongIndex] = useState(
        state.currentPlayingSongIndex,
    );
    const [currentPlayingSong, setCurrentPlayingSong] = useState(
        state.currentPlayingSong,
    );
    const [currentTime, setCurrentTime] = useState('--:--');
    const [remainTime, setRemainTime] = useState('--:--');
    const [isRandom, setIsRandom] = useState(state.isRandom);
    const [isLoop, setIsLoop] = useState(state.isLoop);

    const handleTogglePlayPauseSong = () => {
        if (playStatus) {
            dispatch({ type: type.PAUSE_SONG });
        } else {
            dispatch({ type: type.PLAY_SONG });
        }
        setPlayStatus((prev) => !prev);
    };

    const handleVolumeChange = (e) => setVolumeValue(e.target.value);

    const handleMute = () => {
        if (volumeValue > 0) setVolumeValue(0);
        else setVolumeValue(1);
    };

    const handleDurationChange = (e) => {
        e.stopPropagation();
        const _durationValue = e.target.value;

        if (currentPlayingSong !== null) {
            setDurationValue(_durationValue);
            const time = currentPlayingSong.duration * _durationValue;
            currentPlayingSong.pause();
            currentPlayingSong.currentTime = time;
            currentPlayingSong.play();
            console.log(currentPlayingSong.currentTime);
        }
    };

    const loadIcon = (value) => {
        if (value === MUTE_VALUE) setVolumeIcon(MUTE);
        else if (value <= OFF_VALUE && value > MUTE_VALUE) setVolumeIcon(OFF);
        else if (value <= LOW_VALUE && value > OFF_VALUE) setVolumeIcon(LOW);
        else if (value <= HIGH_VALUE && value > LOW_VALUE) setVolumeIcon(HIGH);
    };

    const handlePlayingRandomSong = () => {
        const newIndex = Math.floor(Math.random() * currentPlayingList.length);
        dispatch({ type: type.PAUSE_SONG });
        dispatch({ type: type.SET_CURRENT_SONG_INDEX, index: newIndex });
        setTimeout(() => {
            dispatch({ type: type.PLAY_SONG });
        }, 1000);
    };

    const handleNextSong = () => {
        if (isRandom) {
            handlePlayingRandomSong();
        } else if (currentPlayingSongIndex + 1 < currentPlayingList.length) {
            dispatch({ type: type.PAUSE_SONG });
            dispatch({ type: type.NEXT_SONG });
        } else if (isLoop) {
            dispatch({ type: type.PAUSE_SONG });
            dispatch({ type: type.SET_CURRENT_SONG_INDEX, index: 0 });
        }
    };

    const handlePrevSong = () => {
        if (isRandom) {
            handlePlayingRandomSong();
        } else if (isLoop) {
            dispatch({ type: type.PAUSE_SONG });
            dispatch({
                type: type.SET_CURRENT_SONG_INDEX,
                index: currentPlayingList.length - 1,
            });
        } else if (currentPlayingSongIndex - 1 >= 0) {
            dispatch({ type: type.PAUSE_SONG });
            dispatch({ type: type.PREV_SONG });
        }
    };

    const handleRandomSong = () => {
        dispatch({ type: type.SET_RANDOM });
        setIsRandom((prev) => !prev);
    };

    const handleLoopSong = () => {
        dispatch({ type: type.SET_LOOP });
        setIsLoop((prev) => !prev);
    };

    useEffect(() => {
        loadIcon(volumeValue);
        dispatch({ type: type.SET_VOLUME, volume: volumeValue });
        if (currentPlayingSong !== null) {
            currentPlayingSong.volume = volumeValue;
        }
    }, [currentPlayingSong, volumeValue]);

    useEffect(() => {
        let song = null;
        let isChanged = false;
        let isCanPlayThrough = false;

        const handlePlaySong = (song) => {
            song.id = Math.random();
            dispatch({
                type: type.SET_SONG,
                songId: state.currentPlayingList[state.currentPlayingSongIndex]
                    .id,
                currentPlayingSong: song,
            });
            setCurrentPlayingSong(song);
            setTimeout(() => {
                dispatch({ type: type.PLAY_SONG });
            }, 1000);
        };

        const handleCanPlayThrough = () => {
            isCanPlayThrough = true;
            handlePlaySong(song);
        };

        if (
            state.currentPlayingPath !== null &&
            currentPlayingPath !== state.currentPlayingPath
        ) {
            setCurrentPlayingPath(state.currentPlayingPath);
            isChanged = true;
        }

        if (
            state.currentPlayingList !== null &&
            currentPlayingList !== state.currentPlayingList
        ) {
            setCurrentPlayingList(state.currentPlayingList);
            isChanged = true;
        }

        if (
            state.currentPlayingSongIndex !== null &&
            currentPlayingSongIndex !== state.currentPlayingSongIndex
        ) {
            setCurrentPlayingSongIndex(state.currentPlayingSongIndex);
            isChanged = true;
        }

        if (isChanged) {
            const prevSong = state.currentPlayingSong;
            if (prevSong !== null) {
                prevSong.pause();
                dispatch({ type: type.PAUSE_SONG });
            }
            const audioPath =
                state.currentPlayingList[state.currentPlayingSongIndex]
                    .audioPath;
            song = new Audio(audioPath);
        }

        if (song !== null && !isCanPlayThrough)
            song.addEventListener('canplaythrough', handleCanPlayThrough);

        return () => {
            if (song !== null) {
                console.log('remove');
                song.removeEventListener(
                    'canplaythrough',
                    handleCanPlayThrough,
                );
            }
        };
    }, [
        state.currentPlayingPath,
        state.currentPlayingList,
        state.currentPlayingSongIndex,
    ]);

    useEffect(() => {
        if (state.isPlaying && currentPlayingSong !== null) {
            currentPlayingSong.play();
            setPlayStatus(true);
        } else if (currentPlayingSong !== null) {
            currentPlayingSong.pause();
            setPlayStatus(false);
        }
    }, [state.isPlaying]);

    useEffect(() => {
        if (currentPlayingSong !== null) {
            const p = (
                currentPlayingSong.currentTime / currentPlayingSong.duration
            ).toFixed(2);
            setDurationValue(p);
        }
    });

    useEffect(() => {
        if (currentPlayingSong !== null) {
            // Add an event listener to update the current time
            const updateTime = () => {
                const minutes = Math.floor(currentPlayingSong.currentTime / 60)
                    .toString()
                    .padStart(2, '0');
                const seconds = Math.floor(currentPlayingSong.currentTime % 60)
                    .toString()
                    .padStart(2, '0');
                setCurrentTime(`${minutes}:${seconds}`);
            };

            const updateRemainTime = () => {
                const remainTime =
                    currentPlayingSong.duration -
                    currentPlayingSong.currentTime;
                const minutes = Math.floor(remainTime / 60)
                    .toString()
                    .padStart(2, '0');
                const seconds = Math.floor(remainTime % 60)
                    .toString()
                    .padStart(2, '0');
                setRemainTime(`${minutes}:${seconds}`);
            };

            const handleAudioEnded = () => {
                if (currentPlayingSongIndex + 1 <= currentPlayingList.length) {
                    handleNextSong();
                } else {
                    setCurrentTime('--:--');
                    setRemainTime('--:--');
                }
            };

            currentPlayingSong.addEventListener('timeupdate', updateTime);
            currentPlayingSong.addEventListener('timeupdate', updateRemainTime);
            currentPlayingSong.addEventListener('ended', handleAudioEnded);

            // Clean up the event listener when the component unmounts
            return () => {
                currentPlayingSong.removeEventListener(
                    'timeupdate',
                    updateTime,
                );
                currentPlayingSong.removeEventListener(
                    'timeupdate',
                    updateRemainTime,
                );
                currentPlayingSong.removeEventListener(
                    'ended',
                    handleAudioEnded,
                );
            };
        }
    }, [currentPlayingSong]);

    return (
        <div className={cx('playbar-auth')}>
            <div>
                {currentPlayingList && (
                    <div className={cx('playbar-auth-current-album')}>
                        <Link to={currentPlayingPath}>
                            <img
                                src={
                                    currentPlayingList[
                                        currentPlayingSongIndex
                                    ] &&
                                    currentPlayingList[currentPlayingSongIndex]
                                        .imagePath
                                }
                                alt={
                                    currentPlayingList[
                                        currentPlayingSongIndex
                                    ] &&
                                    currentPlayingList[currentPlayingSongIndex]
                                        .name
                                }
                            />
                        </Link>
                        <div>
                            {currentPlayingList[currentPlayingSongIndex] && (
                                <Link
                                    to={`/track/${currentPlayingList[currentPlayingSongIndex].id}`}
                                >
                                    {
                                        currentPlayingList[
                                            currentPlayingSongIndex
                                        ].name
                                    }
                                </Link>
                            )}
                            <div className={cx('links')}>
                                {currentPlayingList[currentPlayingSongIndex]
                                    .users &&
                                    currentPlayingList[
                                        currentPlayingSongIndex
                                    ].users.map((user) => (
                                        <Link
                                            key={user.id}
                                            to={`/artist/${user.id}`}
                                        >
                                            {user.fullName}
                                        </Link>
                                    ))}
                            </div>
                        </div>
                        <div className={cx('like-btn')}>
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                    </div>
                )}
            </div>
            <div>
                <div className={cx('playbar-auth-header')}>
                    <button
                        className={cx('playbar-auth-btn', { active: isRandom })}
                        onClick={handleRandomSong}
                    >
                        <FontAwesomeIcon icon={faShuffle} />
                    </button>
                    <button
                        className={cx('playbar-auth-btn')}
                        disabled={!currentPlayingSong}
                        onClick={handlePrevSong}
                    >
                        <FontAwesomeIcon icon={faBackward} />
                    </button>
                    <button
                        className={cx('playbar-auth-btn')}
                        onClick={handleTogglePlayPauseSong}
                        disabled={!currentPlayingSong}
                    >
                        <div>
                            <FontAwesomeIcon
                                icon={faCirclePlay}
                                className={cx('play', { show: !playStatus })}
                            />
                            <FontAwesomeIcon
                                icon={faCirclePause}
                                className={cx('pause', { show: playStatus })}
                            />
                        </div>
                    </button>
                    <button
                        className={cx('playbar-auth-btn')}
                        disabled={!currentPlayingSong}
                        onClick={handleNextSong}
                    >
                        <FontAwesomeIcon icon={faForward} />
                    </button>
                    <button
                        className={cx('playbar-auth-btn', { active: isLoop })}
                        onClick={handleLoopSong}
                    >
                        <FontAwesomeIcon icon={faRepeat} />
                    </button>
                </div>
                <div className={cx('playbar-auth-footer')}>
                    <span>{currentTime}</span>
                    <span className={cx('playbar-auth-duration')}>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={durationValue}
                            style={{
                                backgroundSize: `${durationValue * 100}% 100%`,
                            }}
                            onChange={(e) => handleDurationChange(e)}
                        />
                    </span>
                    <span>{remainTime}</span>
                </div>
            </div>
            <div>
                <div
                    className={cx('playbar-auth-header', 'playbar-auth-volume')}
                >
                    <button className={cx('playbar-auth-btn')}>
                        <FontAwesomeIcon icon={faListUl} />
                    </button>
                    <div className={cx('mr8', 'dpf-center')}>
                        <button
                            className={cx('playbar-auth-btn')}
                            onClick={handleMute}
                        >
                            <div>
                                <FontAwesomeIcon
                                    className={cx('volume-icon', {
                                        show: volumeIcon === MUTE,
                                    })}
                                    icon={faVolumeXmark}
                                />
                                <FontAwesomeIcon
                                    className={cx('volume-icon', {
                                        show: volumeIcon === OFF,
                                    })}
                                    icon={faVolumeOff}
                                />
                                <FontAwesomeIcon
                                    className={cx('volume-icon', {
                                        show: volumeIcon === LOW,
                                    })}
                                    icon={faVolumeLow}
                                />
                                <FontAwesomeIcon
                                    className={cx('volume-icon', {
                                        show: volumeIcon === HIGH,
                                    })}
                                    icon={faVolumeHigh}
                                />
                            </div>
                        </button>
                        <div className={cx('playbar-auth-volume-bar')}>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volumeValue}
                                style={{
                                    backgroundSize: `${
                                        volumeValue * 100
                                    }% 100%`,
                                }}
                                onChange={(e) => handleVolumeChange(e)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaybarAuth;
