import classNames from 'classnames/bind';
import styles from './Song.module.scss';
import FavButton from '../FavButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

const cx = classNames.bind(styles);

const Song = ({
    className,
    index,
    data,
    showStreamCount = false,
    showArtists = false,
    showAlbums = false,
    showCreatedDate = false,
    showBlanks = false,
}) => {
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

    return (
        <div className={cx('container', className)}>
            <div className={cx('wrapper')}>
                <div>
                    <span className={cx('index')}>{index}</span>
                    <span className={cx('icon-play')}>
                        <FontAwesomeIcon icon={faPlay} />
                    </span>
                </div>
                <div className={cx('first')}>
                    <img
                        className={cx('thumb')}
                        src={data.imagePath}
                        alt={data.name}
                    />
                    <div className={cx('var1')}>
                        <Link to={`/track/${data.id}`} className={cx('name')}>
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
                    <div className={cx('album-container')}>
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
                    <Fragment>
                        <div></div>
                        <div className={cx('stream-count')}>
                            <p>1.000.000</p>
                        </div>
                    </Fragment>
                )}

                {showCreatedDate && (
                    <p className={cx('created-at')}>
                        {calculateCreatedDate(data.createdAt)}
                    </p>
                )}
                {showBlanks && (
                    <Fragment>
                        <div></div>
                        <div></div>
                    </Fragment>
                )}
                <div className={cx('last')}>
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
