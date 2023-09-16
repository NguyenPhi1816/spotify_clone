import classNames from 'classnames/bind';
import styles from './Playlist.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PlayButton from '../PlayButton';
import FavButton from '../FavButton';
import Song from '../Song';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

const PLAYLISTS = [
    {
        id: 1,
        image: '../src/assets/images/den_vau.jpg',
        title: "Today's Top Hits",
        desc: 'Doja Cat is on top of the Hottest 50!',
        likeCount: '34.313.792',
        items: [
            {
                id: 1,
                thumb: '../src/assets/images/den_vau.jpg',
                name: 'Đem tiền về cho mẹ',
                artists: [
                    { id: 1, name: 'Đen Vâu' },
                    { id: 2, name: 'Nguyên Thảo' },
                ],
                album: { id: 1, name: 'Đem tiền về cho mẹ' },
                createdAt: '12/21/2021 00:00:00', // MM/dd/yyyy hh:mm:ss
                duration: '6:45',
            },
            {
                id: 2,
                thumb: '../src/assets/images/den_vau.jpg',
                name: 'Nấu ăn cho em',
                artists: [
                    { id: 1, name: 'Đen Vâu' },
                    { id: 3, name: 'PiaLinh' },
                ],
                album: { id: 2, name: 'Nấu ăn cho em' },
                createdAt: '05/13/2023 00:00:00', // MM/dd/yyyy hh:mm:ss
                duration: '4:01',
            },
        ],
    },
];

const Playlist = () => {
    const id = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        setData(() => {
            const response = PLAYLISTS.filter((item) => {
                return item.id == id.id;
            });
            return response[0];
        });
    }, [id]);

    const calculatePlaylistDuration = () => {
        let duration = 0;

        data.items &&
            data.items.map((item) => {
                const [minutes, seconds] = item.duration.split(':');
                duration += minutes * 60 + seconds * 1;
            });

        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);

        let output = '';

        if (hours !== 0) {
            output = hours + ' giờ ' + minutes + ' phút.';
        } else {
            output = minutes + ' phút.';
        }

        return output;
    };

    return (
        <div className={cx('container')}>
            <div
                className={cx('header')}
                style={{ backgroundImage: `url(${data.image})` }}
            >
                <p>Playlist</p>
                <h1>{data.title}</h1>
                <p>{data.desc}</p>
                <div className={cx('playlist-info')}>
                    <img src={import.meta.env.VITE_LOGO_PRIMARY_URL} />
                    <p>Spotify</p>
                    <span className={cx('dot')}></span>
                    <p>{data.likeCount} lượt thích</p>
                    <span className={cx('dot')}></span>
                    <p>{data.items && data.items.length} bài hát,</p>
                    <p className={cx('duration')}>
                        Khoảng {calculatePlaylistDuration()}
                    </p>
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('btns')}>
                    <PlayButton className={cx('btn')} size="56px" />
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
                    {data.items &&
                        data.items.map((item, index) => (
                            <li key={item.id}>
                                <Song index={index + 1} data={item} />
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default Playlist;
