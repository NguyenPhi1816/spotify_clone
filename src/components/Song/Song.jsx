import classNames from 'classnames/bind';
import styles from './Song.module.scss';
import FavButton from '../FavButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useAppContext } from '../../Context/Context';
import PlayButton from '../PlayButton';

const cx = classNames.bind(styles);

const Song = ({
    className,
    index,
    data,
    showStreamCount = false,
    showArtists = false,
    showAlbums = false,
    showCreatedDate = false,
    currentList = [],
}) => {
    const { state } = useAppContext();

    const location = useLocation();
    const playButtonRef = useRef();
    const [isCurrentSong, setIsCurrentSong] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);

    const calculateCreatedDate = (createdDateStr) => {
        const createdDate = new Date(createdDateStr);
        const currentDate = new Date();
        const diff = currentDate - createdDate;
        const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));

        let output = '';

        if (daysDiff < 30) {
            output = daysDiff + ' ngày trước';
        } else if (daysDiff < 365) {
            let months = Math.floor(daysDiff / 30);
            output = months + ' tháng trước';
        } else {
            let years = Math.floor(daysDiff / 365);
            output = years + ' năm trước';
        }

        return output;
    };

    const songMatched = () =>
        state.currentPlayingSongId !== null &&
        data.id === state.currentPlayingSongId;

    useEffect(() => {
        setIsCurrentSong(() => songMatched());
    }, [state.currentPlayingSongId]);

    useEffect(() => {
        setIsPlaying(state.isPlaying);
    }, [state.isPlaying]);

    console.log(data.albums);

    return (
        <div className={cx('container', className)}>
            <div className={cx('wrapper')}>
                <div className={cx('col1')}>
                    <span className={cx('index')}>
                        {isPlaying && isCurrentSong && (
                            <img
                                src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif"
                                alt="playing icon"
                            />
                        )}
                        {(!isPlaying || !isCurrentSong) && (
                            <p
                                style={{
                                    color:
                                        isCurrentSong &&
                                        'var(--background-green-base)',
                                }}
                            >
                                {index + 1}
                            </p>
                        )}
                    </span>
                    <span className={cx('icon-play')}>
                        <PlayButton
                            ref={playButtonRef}
                            currentListPath={location.pathname}
                            currentList={currentList}
                            currentIndex={index}
                            noBackground
                            className={cx('btn')}
                        />
                    </span>
                </div>
                <div className={cx('first', 'col2')}>
                    <img
                        className={cx('thumb')}
                        src={data.imagePath}
                        alt={data.name}
                    />
                    <div className={cx('var1')}>
                        <Link
                            to={`/track/${data.id}`}
                            className={cx('name')}
                            style={{
                                color:
                                    isCurrentSong &&
                                    'var(--background-green-base)',
                            }}
                        >
                            {data.name}
                        </Link>
                        {showArtists && (
                            <div className={cx('artists')}>
                                {data.users &&
                                    data.users.map((artist, index) => (
                                        <Fragment key={artist.id}>
                                            <Link to={`/artist/${artist.id}`}>
                                                {artist.firstName +
                                                    ' ' +
                                                    artist.lastName}
                                            </Link>
                                            {index < data.users.length - 1 && (
                                                <p>, </p>
                                            )}
                                        </Fragment>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>

                {showAlbums && (
                    <div className={cx('album-container', 'col3')}>
                        {data.albums &&
                            data.albums.map((album, index) => (
                                <Fragment key={album.id}>
                                    <Link
                                        to={`/album/${album.id}`}
                                        className={cx('album')}
                                    >
                                        {album.name}
                                    </Link>
                                    {index < data.albums.length - 1 && <p>,</p>}
                                </Fragment>
                            ))}
                    </div>
                )}

                {showStreamCount && (
                    <div className={cx('stream-count', 'col4')}>
                        <p>{data.viewCount}</p>
                    </div>
                )}

                {showCreatedDate && (
                    <p className={cx('created-at', 'col4')}>
                        {calculateCreatedDate(data.releaseDate)}
                    </p>
                )}

                <div className={cx('last', 'col5')}>
                    <FavButton className={cx('fav-btn')} />
                    <p className={cx('duration')}>{data.duration}</p>
                    <button className={cx('ellipsis')}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Song;
