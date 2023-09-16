import classNames from 'classnames/bind';
import styles from './Song.module.scss';
import FavButton from '../FavButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

const cx = classNames.bind(styles);

const Song = ({ index, data }) => {
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
        <div className={cx('container')}>
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
                        src={data.thumb}
                        alt={data.name}
                    />
                    <div className={cx('var1')}>
                        <Link to={`/track/${data.id}`} className={cx('name')}>
                            {data.name}
                        </Link>
                        <div className={cx('artists')}>
                            {data.artists &&
                                data.artists.map((artist, index) => (
                                    <Fragment key={artist.id}>
                                        <Link to={`/artist/${artist.id}`}>
                                            {artist.name}
                                        </Link>
                                        {index < data.artists.length - 1 && (
                                            <p>, </p>
                                        )}
                                    </Fragment>
                                ))}
                        </div>
                    </div>
                </div>
                <Link to={`/album/${data.album.id}`} className={cx('album')}>
                    {data.album.name}
                </Link>
                <p className={cx('created-at')}>
                    {calculateCreatedDate(data.createdAt)}
                </p>
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
