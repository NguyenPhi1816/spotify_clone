import classNames from 'classnames/bind';
import styles from './Playlist.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PlayButton from '../PlayButton';
import FavButton from '../FavButton';
import Song from '../Song';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getPlaylistById } from '../../services/playlistServices';

const cx = classNames.bind(styles);

const Playlist = () => {
    const { id } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        getPlaylistById(id).then((res) => {
            setData(res.data);
        });
    }, [id]);
    const totalDuration = () => {
        const MINUTE = 0;
        const SECOND = 1;
        let totalMinutes = 0;
        let totalSeconds = 0;
        data.songs &&
            data.songs.map((item) => {
                const duration = item.duration.split(':');
                totalMinutes += Number(duration[MINUTE]);
                totalSeconds += Number(duration[SECOND]);
            });

        totalMinutes += Math.ceil(totalSeconds / 60);
        return totalMinutes;
    };
    return (
        <div className={cx('container')}>
            <div
                className={cx('header')}
                style={{ backgroundImage: `url(${data.imagePath})` }}
            >
                <p>Playlist</p>
                <h1>{data.name}</h1>
                <p>{data.description}</p>
                <div className={cx('playlist-info')}>
                    <img src={import.meta.env.VITE_LOGO_PRIMARY_URL} />
                    <p>Spotify</p>
                    <span className={cx('dot')}></span>
                    <p>{data.likedCount} lượt thích</p>
                    <span className={cx('dot')}></span>
                    <p>{data.sumSongCount} bài hát,</p>
                    <p className={cx('duration')}>
                        khoảng {totalDuration()} phút
                    </p>
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('btns')}>
                    <PlayButton
                        currentListPath={`/playlist/${data.id}`}
                        currentList={data.songs}
                        currentIndex={0}
                        className={cx('btn')}
                        size="56px"
                    />
                    <FavButton className={cx('btn')} size="32px" />
                </div>
                <ul>
                    <li className={cx('list-header')}>
                        <div className={cx('list-header-content')}>
                            <p className={cx('index')}>#</p>
                            <p className={cx('first')}>Tiêu đề</p>
                            <p className={cx('album')}>Album</p>
                            <p className={cx('created-at')}>Ngày thêm</p>
                            <div className={cx('last')}>
                                <span> </span>
                                <FontAwesomeIcon icon={faClock} />
                                <span> </span>
                            </div>
                        </div>
                    </li>
                    {data.songs &&
                        data.songs.map((item, index) => (
                            <li key={item.id}>
                                <Song
                                    index={index}
                                    currentList={data.songs}
                                    data={item}
                                    showArtists
                                    showAlbums
                                    showCreatedDate
                                />
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default Playlist;
