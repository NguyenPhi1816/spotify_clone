import classNames from 'classnames/bind';
import styles from './AddSongModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCirclePlus,
    faPlus,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';
import { useRef, useState } from 'react';
import ImageUploadModal from '../ImageUploadModal';
import AudioUploadModal from '../AudioUploadModal';
import TextEditor from '../TextEditor';

const cx = classNames.bind(styles);

const AddSongModal = ({ onClose, onSubmit }) => {
    const lyricsRef = useRef();
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [lyrics, setLyrics] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [showImage, setShowImage] = useState(false);
    const [showAudio, setShowAudio] = useState(false);
    const [showLyrics, setShowLyrics] = useState(false);

    const readFile = (setter, file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setter(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadImage = (file) => {
        readFile(setSelectedImage, file);
        setShowImage(false);
    };

    const handleUploadAudio = (file) => {
        readFile(setSelectedAudio, file);
        setShowAudio(false);
    };

    const handleSaveLyrics = () => {
        lyricsRef.current.innerHTML = lyrics;
        setShowLyrics(false);
    };

    const handleShowImageModal = () => {
        setShowImage((prev) => !prev);
    };

    const handleShowAudioModal = (e) => {
        e.preventDefault();
        setShowAudio((prev) => !prev);
    };

    const handleShowLyricsModal = (e) => {
        e.preventDefault();
        setShowLyrics((prev) => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { name, genre, selectedImage, selectedAudio, lyrics };
        onSubmit(data);
    };

    const handleNameChange = (e) => setName(e.target.value);

    const handleGenreChange = (e) => setGenre(e.target.value);

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h3>Thêm bài hát mới</h3>
                    <Button
                        onClick={onClose}
                        noBackground
                        content={<FontAwesomeIcon icon={faTimes} />}
                    />
                </div>
                <div className={cx('body')}>
                    <form className={cx('form')}>
                        <label className={cx('form-group')}>
                            <p>Tên bài hát</p>
                            <input
                                type="text"
                                placeholder="Tên bài hát"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </label>
                        <label className={cx('form-group')}>
                            <p>Thể loại</p>
                            <select onChange={handleGenreChange}>
                                <option value="pop">Pop</option>
                                <option value="ballad">Ballad</option>
                                <option value="rock">Rock</option>
                                <option value="hiphop">Hiphop</option>
                            </select>
                        </label>
                        <label className={cx('form-group')}>
                            <p>Ảnh bài hát</p>
                            <div
                                onClick={handleShowImageModal}
                                className={cx('image-container')}
                            >
                                {selectedImage ? (
                                    <img
                                        src={selectedImage}
                                        alt="Seleted Image"
                                    />
                                ) : (
                                    <FontAwesomeIcon icon={faPlus} />
                                )}
                            </div>
                        </label>
                        <label className={cx('form-group')}>
                            <p>Tệp âm thanh</p>
                            <div className={cx('audio-container')}>
                                {selectedAudio ? (
                                    <>
                                        <audio controls>
                                            <source
                                                src={selectedAudio}
                                                type="audio/mpeg"
                                            />
                                            Your browser does not support the
                                            audio element.
                                        </audio>
                                        <Button
                                            onClick={handleShowAudioModal}
                                            noBackground
                                            content={'Thay đổi'}
                                        />
                                    </>
                                ) : (
                                    <div
                                        className={cx('audio-upload-btn')}
                                        onClick={handleShowAudioModal}
                                    >
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCirclePlus}
                                            />
                                        </span>
                                        <p>Chọn tệp</p>
                                    </div>
                                )}
                            </div>
                        </label>
                        <label className={cx('form-group')}>
                            <p>Lời bài hát</p>
                            <div>
                                <div
                                    ref={lyricsRef}
                                    className={cx('lyrics-container')}
                                ></div>
                                <div
                                    className={cx('lyrics-upload-btn')}
                                    onClick={handleShowLyricsModal}
                                >
                                    <span>
                                        <FontAwesomeIcon icon={faCirclePlus} />
                                    </span>
                                    <p>
                                        {lyrics
                                            ? 'Chỉnh sửa'
                                            : 'Thêm lời bài hát'}
                                    </p>
                                </div>
                            </div>
                        </label>
                        <label className={cx('form-group')}>
                            <input
                                onClick={handleSubmit}
                                type="submit"
                                value="Tải bài hát"
                            />
                        </label>
                    </form>
                </div>
            </div>
            {showImage && (
                <ImageUploadModal
                    handleUploadFile={handleUploadImage}
                    onClose={handleShowImageModal}
                />
            )}
            {showAudio && (
                <AudioUploadModal
                    handleUploadFile={handleUploadAudio}
                    onClose={handleShowAudioModal}
                />
            )}
            {showLyrics && (
                <TextEditor
                    value={lyrics}
                    setValue={setLyrics}
                    onClose={handleShowLyricsModal}
                    onSave={handleSaveLyrics}
                />
            )}
        </div>
    );
};

export default AddSongModal;
