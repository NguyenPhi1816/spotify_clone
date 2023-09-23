import classNames from 'classnames/bind';
import styles from './SongSection.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { getSongById } from '../../services/apiServices';
import PlayButton from '../PlayButton';
import FavButton from '../FavButton';
import Button from '../Button';
import Song from '../Song';
import Shelf from '../Shelf';

const cx = classNames.bind(styles);

const SongSection = () => {
    const HIDDEN_SONG_NUMBERS = 5;
    const DISPLAYED_SONG_NUMBERS = 10;

    const { id } = useParams();
    const [data, setData] = useState({});
    const [numberOfSongs, setNumberOfSongs] = useState(5);
    const [isShowMore, setIsShowMore] = useState(true);

    useEffect(() => {
        getSongById(id).then((res) => setData(res.data));
    }, [id]);

    useEffect(() => {
        if (!isShowMore) {
            setNumberOfSongs(DISPLAYED_SONG_NUMBERS);
        } else setNumberOfSongs(HIDDEN_SONG_NUMBERS);
    }, [isShowMore]);

    const SONGS = [
        {
            id: 1,
            imagePath: '../src/assets/images/den_vau.jpg',
            name: 'Đem tiền về cho mẹ',
            users: [
                { id: 1, firstName: 'Đen', lastName: 'Vâu' },
                { id: 2, firstName: 'Nguyên', lastName: 'Thảo' },
            ],
            albums: [
                { id: 1, name: 'Đem tiền về cho mẹ' },
                { id: 2, name: 'Đồng Âm' },
            ],
            createdAt: '12/21/2021 00:00:00', // MM/dd/yyyy hh:mm:ss
            duration: '6:45',
        },
        {
            id: 2,
            imagePath: '../src/assets/images/den_vau.jpg',
            name: 'Nấu ăn cho em',
            users: [
                { id: 1, firstName: 'Đen', lastName: 'Vâu' },
                { id: 3, firstName: 'Pia', lastName: 'Linh' },
            ],
            albums: [{ id: 2, name: 'Nấu ăn cho em' }],
            createdAt: '05/13/2023 00:00:00', // MM/dd/yyyy hh:mm:ss
            duration: '4:01',
        },
        {
            id: 3,
            imagePath: '../src/assets/images/den_vau.jpg',
            name: 'Đem tiền về cho mẹ',
            users: [
                { id: 1, firstName: 'Đen', lastName: 'Vâu' },
                { id: 2, firstName: 'Nguyên', lastName: 'Thảo' },
            ],
            albums: [
                { id: 1, name: 'Đem tiền về cho mẹ' },
                { id: 2, name: 'Đồng Âm' },
            ],
            createdAt: '12/21/2021 00:00:00', // MM/dd/yyyy hh:mm:ss
            duration: '6:45',
        },
        {
            id: 4,
            imagePath: '../src/assets/images/den_vau.jpg',
            name: 'Nấu ăn cho em',
            users: [
                { id: 1, firstName: 'Đen', lastName: 'Vâu' },
                { id: 3, firstName: 'Pia', lastName: 'Linh' },
            ],
            albums: [{ id: 2, name: 'Nấu ăn cho em' }],
            createdAt: '05/13/2023 00:00:00', // MM/dd/yyyy hh:mm:ss
            duration: '4:01',
        },
        {
            id: 5,
            imagePath: '../src/assets/images/den_vau.jpg',
            name: 'Đem tiền về cho mẹ',
            users: [
                { id: 1, firstName: 'Đen', lastName: 'Vâu' },
                { id: 2, firstName: 'Nguyên', lastName: 'Thảo' },
            ],
            albums: [
                { id: 1, name: 'Đem tiền về cho mẹ' },
                { id: 2, name: 'Đồng Âm' },
            ],
            createdAt: '12/21/2021 00:00:00', // MM/dd/yyyy hh:mm:ss
            duration: '6:45',
        },
        {
            id: 6,
            imagePath: '../src/assets/images/den_vau.jpg',
            name: 'Nấu ăn cho em',
            users: [
                { id: 1, firstName: 'Đen', lastName: 'Vâu' },
                { id: 3, firstName: 'Pia', lastName: 'Linh' },
            ],
            albums: [{ id: 2, name: 'Nấu ăn cho em' }],
            createdAt: '05/13/2023 00:00:00', // MM/dd/yyyy hh:mm:ss
            duration: '4:01',
        },
        {
            id: 7,
            imagePath: '../src/assets/images/den_vau.jpg',
            name: 'Đem tiền về cho mẹ',
            users: [
                { id: 1, firstName: 'Đen', lastName: 'Vâu' },
                { id: 2, firstName: 'Nguyên', lastName: 'Thảo' },
            ],
            albums: [
                { id: 1, name: 'Đem tiền về cho mẹ' },
                { id: 2, name: 'Đồng Âm' },
            ],
            createdAt: '12/21/2021 00:00:00', // MM/dd/yyyy hh:mm:ss
            duration: '6:45',
        },
        {
            id: 8,
            imagePath: '../src/assets/images/den_vau.jpg',
            name: 'Nấu ăn cho em',
            users: [
                { id: 1, firstName: 'Đen', lastName: 'Vâu' },
                { id: 3, firstName: 'Pia', lastName: 'Linh' },
            ],
            albums: [{ id: 2, name: 'Nấu ăn cho em' }],
            createdAt: '05/13/2023 00:00:00', // MM/dd/yyyy hh:mm:ss
            duration: '4:01',
        },
        {
            id: 9,
            imagePath: '../src/assets/images/den_vau.jpg',
            name: 'Đem tiền về cho mẹ',
            users: [
                { id: 1, firstName: 'Đen', lastName: 'Vâu' },
                { id: 2, firstName: 'Nguyên', lastName: 'Thảo' },
            ],
            albums: [
                { id: 1, name: 'Đem tiền về cho mẹ' },
                { id: 2, name: 'Đồng Âm' },
            ],
            createdAt: '12/21/2021 00:00:00', // MM/dd/yyyy hh:mm:ss
            duration: '6:45',
        },
        {
            id: 10,
            imagePath: '../src/assets/images/den_vau.jpg',
            name: 'Nấu ăn cho em',
            users: [
                { id: 1, firstName: 'Đen', lastName: 'Vâu' },
                { id: 3, firstName: 'Pia', lastName: 'Linh' },
            ],
            albums: [{ id: 2, name: 'Nấu ăn cho em' }],
            createdAt: '05/13/2023 00:00:00', // MM/dd/yyyy hh:mm:ss
            duration: '4:01',
        },
    ];

    const ALBUMS = [
        {
            id: 7,
            name: 'playlist1Child1',
            description: 'playlist_1_Child_1_Desc',
            imagePath:
                'https://cdn.tgdd.vn/hoi-dap/580732/loi-404-not-found-la-gi-9-cach-khac-phuc-loi-404-not-5-800x450.jpg',
            thumbnailPath:
                'https://cdn.tgdd.vn/hoi-dap/580732/loi-404-not-found-la-gi-9-cach-khac-phuc-loi-404-not-5-800x450.jpg',
            sumSongCount: 0,
            sumViewCount: 0,
            likedCount: 0,
        },
        {
            id: 1,
            name: 'playlist1Child1',
            description: 'playlist_1_Child_1_Desc',
            imagePath:
                'https://cdn.tgdd.vn/hoi-dap/580732/loi-404-not-found-la-gi-9-cach-khac-phuc-loi-404-not-5-800x450.jpg',
            thumbnailPath:
                'https://cdn.tgdd.vn/hoi-dap/580732/loi-404-not-found-la-gi-9-cach-khac-phuc-loi-404-not-5-800x450.jpg',
            sumSongCount: 2,
            sumViewCount: 0,
            likedCount: 1,
        },
        {
            id: 3,
            name: 'playlist2Child1',
            description: 'playlist_2_Child_1_Desc',
            imagePath:
                'https://cdn.tgdd.vn/hoi-dap/580732/loi-404-not-found-la-gi-9-cach-khac-phuc-loi-404-not-5-800x450.jpg',
            thumbnailPath:
                'https://cdn.tgdd.vn/hoi-dap/580732/loi-404-not-found-la-gi-9-cach-khac-phuc-loi-404-not-5-800x450.jpg',
            sumSongCount: 2,
            sumViewCount: 0,
            likedCount: 0,
        },
        {
            id: 5,
            name: 'playlist1Child1',
            description: 'playlist_1_Child_1_Desc',
            imagePath:
                'https://cdn.tgdd.vn/hoi-dap/580732/loi-404-not-found-la-gi-9-cach-khac-phuc-loi-404-not-5-800x450.jpg',
            thumbnailPath:
                'https://cdn.tgdd.vn/hoi-dap/580732/loi-404-not-found-la-gi-9-cach-khac-phuc-loi-404-not-5-800x450.jpg',
            sumSongCount: 0,
            sumViewCount: 0,
            likedCount: 0,
        },
        {
            id: 8,
            name: 'playlist2Child1',
            description: 'playlist_2_Child_1_Desc',
            imagePath:
                'https://cdn.tgdd.vn/hoi-dap/580732/loi-404-not-found-la-gi-9-cach-khac-phuc-loi-404-not-5-800x450.jpg',
            thumbnailPath:
                'https://cdn.tgdd.vn/hoi-dap/580732/loi-404-not-found-la-gi-9-cach-khac-phuc-loi-404-not-5-800x450.jpg',
            sumSongCount: 0,
            sumViewCount: 0,
            likedCount: 0,
        },
        {
            id: 6,
            name: 'playlist2Child1',
            description: 'playlist_2_Child_1_Desc',
            imagePath:
                'https://cdn.tgdd.vn/hoi-dap/580732/loi-404-not-found-la-gi-9-cach-khac-phuc-loi-404-not-5-800x450.jpg',
            thumbnailPath:
                'https://cdn.tgdd.vn/hoi-dap/580732/loi-404-not-found-la-gi-9-cach-khac-phuc-loi-404-not-5-800x450.jpg',
            sumSongCount: 0,
            sumViewCount: 0,
            likedCount: 0,
        },
    ];

    const handleShowMore = () => {
        setIsShowMore((prev) => !prev);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div
                    className={cx('background')}
                    style={{
                        backgroundImage: `url(../src/assets/images/den_vau.jpg)`,
                    }}
                ></div>
                <div className={cx('header-wrapper')}>
                    <img
                        className={cx('image')}
                        src="../src/assets/images/den_vau.jpg"
                        alt={data.name}
                    />
                    <div className={cx('info')}>
                        <p>Bài hát</p>
                        <h1>Paint The Town Red</h1>
                        <span>
                            <img
                                src="../src/assets/images/den_vau.jpg"
                                alt="name"
                            />
                            <Link to={`/artist/`} className={cx('artist')}>
                                Doja Cat
                            </Link>
                            <span className={cx('dot')}></span>
                            <Link to={`/album/`}>Paint The Town Red</Link>
                            <span className={cx('dot')}></span>
                            <p>2023</p>
                            <span className={cx('dot')}></span>
                            <p>3:51</p>
                            <span className={cx('dot')}></span>
                            <p>266.839.250</p>
                        </span>
                    </div>
                </div>
            </div>
            <div className={cx('body')}>
                <div
                    className={cx('background')}
                    style={{
                        backgroundImage: `url(../src/assets/images/den_vau.jpg)`,
                    }}
                ></div>
                <div className={cx('btns')}>
                    <PlayButton className={cx('btn')} size="56px" />
                    <FavButton className={cx('btn')} size="32px" />
                </div>
                <div className={cx('lyrics-container')}>
                    <div className={cx('activation-trigger')}>
                        <p>
                            Đăng nhập để xem lời bài hát và nghe toàn bộ bản
                            nhạc
                        </p>
                        <div className={cx('register-login')}>
                            <div className={cx('btn')}>
                                <Button
                                    style={{ color: 'var(--text-white)' }}
                                    content="Đăng ký"
                                    noBackground
                                />
                            </div>
                            <div className={cx('btn')}>
                                <Button content="Đăng nhập" gap="32px" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('artist-container')}>
                    <img src="../src/assets/images/den_vau.jpg" alt="name" />
                    <div>
                        <p>Nghệ sĩ</p>
                        <Link to={`/artist/`}>Doja Cat</Link>
                    </div>
                </div>
                <div className={cx('song-container')}>
                    <p>Các bản nhạc thịnh hành của</p>
                    <h3>Doja Cat</h3>
                    <ul className={cx('song-list')}>
                        {SONGS.slice(0, numberOfSongs).map((item, index) => (
                            <li key={item.id}>
                                <Song
                                    index={index + 1}
                                    data={item}
                                    showStreamCount
                                />
                            </li>
                        ))}
                        <li>
                            <div className={cx('show-more')}>
                                <Button
                                    onClick={() => handleShowMore()}
                                    className={cx('hide-btn', {
                                        'show-btn': isShowMore,
                                    })}
                                    content="Xem thêm"
                                    noBackground
                                    customFontSize="14px"
                                    style={{ color: 'var(--text-white)' }}
                                />
                                <Button
                                    onClick={() => handleShowMore()}
                                    className={cx('hide-btn', {
                                        'show-btn': !isShowMore,
                                    })}
                                    content="Ẩn bớt"
                                    noBackground
                                    customFontSize="14px"
                                    style={{ color: 'var(--text-white)' }}
                                />
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={cx('artist-album-container')}>
                    <Shelf
                        shelfData={{
                            title: 'Các bản phát thịnh hành của Doja Cat',
                            playlists: ALBUMS,
                        }}
                    />
                </div>
                <div className={cx('album-container')}>
                    <div className={cx('album-container-header')}>
                        <img src="../src/assets/images/den_vau.jpg" />
                        <div>
                            <p>Từ đĩa đơn</p>
                            <Link to={`/album/`}>Paint The Town Red</Link>
                        </div>
                    </div>
                    <div className={cx('album-container-body')}>
                        <ul className={cx('song-list')}>
                            {SONGS.map((item, index) => (
                                <li key={item.id}>
                                    <Song
                                        className={cx('song')}
                                        index={index + 1}
                                        data={item}
                                        showArtists
                                        showBlanks
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={cx('created-date')}>
                    <p>4 tháng 8, 2023</p>
                </div>
            </div>
        </div>
    );
};

export default SongSection;
