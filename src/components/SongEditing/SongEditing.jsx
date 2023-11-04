import classNames from 'classnames/bind';
import styles from './SongEditing.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import {
    getSongById,
    uploadSong,
    uploadSongAudio,
    uploadSongImage,
} from '../../services/songServices';
import { useRef } from 'react';
import { useAppContext } from '../../Context/Context';
import HeadlessTippy from '../HeadlessTippy';
import Button from '../Button';
import ImageUploadModal from '../ImageUploadModal';
import ConfirmationDialog from '../../dialog/ConfirmationDialog';
import AudioUploadModal from '../AudioUploadModal';
import TextEditor from '../TextEditor';
import Loading from '../Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import AddArtistToSong from '../AddArtistToSong/AddArtistToSong';

const cx = classNames.bind(styles);

const SongEditing = () => {
    const { state } = useAppContext();

    const { id } = useParams();
    const songNameRef = useRef();
    const lyricContainerRef = useRef();
    const [data, setData] = useState({});
    const [mainArtist, setMainArtist] = useState({});
    const [mainAlbum, setMainAlbum] = useState({});
    const [showTippy, setShowTippy] = useState(false);
    const [showUploadImageModal, setShowUploadImageModal] = useState(false);
    const [title, setTitle] = useState('');
    const [showTitleChangeConfirm, setShowTitleChangeConfirm] = useState(false);
    const [showUploadAudioModal, setShowUploadAudioModal] = useState(false);
    const [lyrics, setLyrics] = useState('');
    const [showLyricsEditor, setShowLyricsEditor] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditArtist, setIsEditArtist] = useState(false);

    const handleShowTippy = () => setShowTippy((prev) => !prev);

    const handleShowUploadImageModal = () => {
        setShowTippy(false);
        setShowUploadImageModal((prev) => !prev);
    };

    const handleShowUploadAudioModal = () => {
        setShowUploadAudioModal((prev) => !prev);
    };

    const handleShowLyricsEditor = () => {
        setShowLyricsEditor((prev) => !prev);
    };

    const handleChangeImage = (file) => {
        uploadSongImage(id, file).then((res) => setData(res.data));
        setShowUploadImageModal(false);
    };

    const handleChangeAudio = (file) => {
        uploadSongAudio(id, file).then((res) => setData(res.data));
        setShowUploadAudioModal(false);
    };

    const dateExtractor = (date) => {
        const [a, datePart, b] = data.releaseDate.split(' ');
        const [month, day, year] = datePart.split('/');
        return [month, day, year];
    };

    const convertToSecond = (durationStr) => {
        const [min, sec] = durationStr.split(':');
        const duration = Number.parseInt(min) * 60 + Number.parseInt(sec);
        return duration;
    };

    const handleChangeTitle = () => {
        const [month, day, year] = dateExtractor(data.releaseDate);
        const duration = convertToSecond(data.duration);
        uploadSong(
            id,
            title,
            data.genre,
            duration,
            data.lyric,
            Number.parseInt(day),
            Number.parseInt(month),
            Number.parseInt(year),
            data.label,
            state.authData.user.id,
        ).then((res) => setData(res.data));
    };

    const handleChangeLyrics = () => {
        const [month, day, year] = dateExtractor(data.releaseDate);
        const duration = convertToSecond(data.duration);
        uploadSong(
            id,
            data.name,
            data.genre,
            duration,
            lyrics,
            Number.parseInt(day),
            Number.parseInt(month),
            Number.parseInt(year),
            data.label,
            state.authData.user.id,
        ).then((res) => setData(res.data));
        setShowLyricsEditor(false);
    };

    useEffect(() => {
        setIsLoading(true);
        getSongById(id).then((res) => {
            setData(res.data);
            setMainArtist(res.data.users[0]);
            setMainAlbum(res.data.albums[0]);
            setLyrics(res.data.lyric);
            setIsLoading(false);
        });
    }, [id]);

    useEffect(() => {
        if (state.isAuthenticated)
            lyricContainerRef.current.innerHTML =
                '<h3>Lời bài hát</h3>' + data.lyric;
    }, [data.lyric]);

    useEffect(() => {
        lyricContainerRef.current.addEventListener(
            'click',
            handleShowLyricsEditor,
        );

        return () => {
            if (lyricContainerRef.current) {
                lyricContainerRef.current.removeEventListener(
                    'click',
                    handleShowLyricsEditor,
                );
            }
        };
    }, [lyricContainerRef.current]);

    useEffect(() => {
        const handleEditTitle = () => {
            songNameRef.current.contentEditable = true;
            songNameRef.current.focus();
        };

        const handleBlurTitle = () => {
            songNameRef.current.contentEditable = false;
            const new_title = songNameRef.current.innerText;
            if (new_title.trim() !== data.name.trim()) {
                setTitle(songNameRef.current.innerText);
                setShowTitleChangeConfirm(true);
            }
        };

        songNameRef.current.addEventListener('click', handleEditTitle);
        songNameRef.current.addEventListener('blur', handleBlurTitle);

        return () => {
            if (songNameRef.current) {
                songNameRef.current.removeEventListener(
                    'click',
                    handleEditTitle,
                );
                songNameRef.current.removeEventListener(
                    'blur',
                    handleBlurTitle,
                );
            }
        };
    }, [songNameRef.current, data]);

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div
                    className={cx('background')}
                    style={{
                        backgroundImage: `url(${data.imagePath})`,
                    }}
                ></div>
                <div className={cx('header-wrapper')}>
                    <HeadlessTippy
                        items={
                            <div className={cx('tippy')}>
                                <Button
                                    className={cx('tippy-btn')}
                                    noBackground
                                    content={<p>Thay đổi hình ảnh</p>}
                                    onClick={handleShowUploadImageModal}
                                />
                            </div>
                        }
                        show={showTippy}
                        setShow={setShowTippy}
                    >
                        <span onClick={handleShowTippy}>
                            <img
                                className={cx('image')}
                                src={data.imagePath}
                                alt={data.name}
                            />
                        </span>
                    </HeadlessTippy>
                    <div className={cx('info')}>
                        <p>Bài hát</p>
                        <div className={cx('title-container')}>
                            <h1 className={cx('title')} ref={songNameRef}>
                                {data.name}
                            </h1>
                        </div>
                        <span>
                            <img
                                src={mainArtist.photoImagePath}
                                alt={mainArtist.fullName}
                            />
                            <Link
                                to={`/artist/${mainArtist.id}`}
                                className={cx('artist', 'link')}
                            >
                                {mainArtist.fullName}
                            </Link>
                            <span className={cx('dot')}></span>
                            <Link
                                className={cx('link')}
                                to={`/album/${mainAlbum.id}`}
                            >
                                {mainAlbum.name}
                            </Link>
                            <span className={cx('dot')}></span>
                            <p>
                                {data.releaseDate &&
                                    data.releaseDate.substring(7, 11)}
                            </p>
                            <span className={cx('dot')}></span>
                            <p>{data.duration}</p>
                            <span className={cx('dot')}></span>
                            <p>{data.viewCount}</p>
                        </span>
                    </div>
                </div>
            </div>
            <div className={cx('body')}>
                <div
                    className={cx('background')}
                    style={{
                        backgroundImage: `url(${data.imagePath})`,
                    }}
                ></div>
                <div className={cx('lyric-artist')}>
                    <div
                        className={cx('lyrics-container')}
                        ref={lyricContainerRef}
                    ></div>
                    <div className={cx('artist-container')}>
                        <div className={cx('artist-container-header')}>
                            <h3>Nghệ sĩ</h3>{' '}
                            <Button
                                onClick={() => setIsEditArtist(true)}
                                className={cx('pencil')}
                                noBackground
                                content={<FontAwesomeIcon icon={faPencil} />}
                            />
                        </div>
                        <ul>
                            {data.users &&
                                data.users.map((user) => (
                                    <li key={user.id}>
                                        <div className={cx('artist')}>
                                            <img
                                                className={cx('artist-img')}
                                                src={user.photoImagePath}
                                                alt={user.fullName}
                                            />
                                            <div className={cx('artist-info')}>
                                                <p>Nghệ sĩ</p>
                                                <Link
                                                    className={cx('link')}
                                                    to={`/artist/${user.id}`}
                                                >
                                                    {user.fullName}
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
                <div className={cx('audio-container')}>
                    <h3>Tệp âm thanh</h3>
                    <div className={cx('audio-link')}>
                        <Link to={data.audioPath}>
                            <p>{data.audioPath}</p>
                        </Link>
                        <Button
                            onClick={handleShowUploadAudioModal}
                            content={'Thay đổi'}
                        />
                    </div>
                </div>
                <div className={cx('created-date')}>
                    <p>4 tháng 8, 2023</p>
                </div>
            </div>
            {showUploadImageModal && (
                <ImageUploadModal
                    handleUploadFile={handleChangeImage}
                    onClose={handleShowUploadImageModal}
                />
            )}
            {showUploadAudioModal && (
                <AudioUploadModal
                    handleUploadFile={handleChangeAudio}
                    onClose={handleShowUploadAudioModal}
                />
            )}
            {showTitleChangeConfirm && (
                <ConfirmationDialog
                    message={`Thay đổi tên bài hát thành "${title}" ?`}
                    setShow={setShowTitleChangeConfirm}
                    onConfirm={handleChangeTitle}
                />
            )}
            {showLyricsEditor && (
                <TextEditor
                    value={lyrics}
                    setValue={setLyrics}
                    onClose={handleShowLyricsEditor}
                    onSave={handleChangeLyrics}
                />
            )}
            {isLoading && <Loading isFitDashboardLayoutContent />}
            {isEditArtist && (
                <AddArtistToSong
                    songId={id}
                    onClose={() => setIsEditArtist(false)}
                    onChange={(artists) => {
                        const newData = { ...data, users: artists };
                        setData(newData);
                    }}
                />
            )}
        </div>
    );
};

export default SongEditing;
