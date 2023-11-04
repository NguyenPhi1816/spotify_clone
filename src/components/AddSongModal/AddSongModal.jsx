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
import { useAppContext } from '../../Context/Context';

const cx = classNames.bind(styles);

const AddSongModal = ({ onClose, onSubmit }) => {
    const lyricsRef = useRef();
    const errorMessageRef = useRef();
    const { state } = useAppContext();
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('POP');
    const [sentiment, setSentiment] = useState('happy');
    const [lyrics, setLyrics] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [showImage, setShowImage] = useState(false);
    const [showAudio, setShowAudio] = useState(false);
    const [showLyrics, setShowLyrics] = useState(false);

    const readFile = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                return e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadImage = (file) => {
        setSelectedImage(file);
        setShowImage(false);
    };

    const handleUploadAudio = (file) => {
        setSelectedAudio(file);
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
        if (
            name !== '' &&
            genre !== '' &&
            selectedAudio !== null &&
            lyrics !== '' &&
            sentiment !== '' &&
            selectedImage !== null
        ) {
            errorMessageRef.current.innerText = '';

            const currentDate = new Date();
            const audio = new Audio();
            audio.src = URL.createObjectURL(selectedAudio);
            audio.addEventListener('loadedmetadata', function () {
                // Lấy duration của audio
                const audioDuration = Math.floor(audio.duration);

                const data = {
                    name,
                    genre,
                    duration: audioDuration,
                    lyric: lyrics,
                    day: currentDate.getDate(),
                    month: currentDate.getMonth() + 1,
                    year: currentDate.getFullYear(),
                    label: sentiment,
                    usersId: state.authData.user.id,
                };

                onSubmit(data, selectedAudio, selectedImage);

                // Giải phóng tài nguyên sau khi sử dụng
                URL.revokeObjectURL(audio.src);
            });

            audio.addEventListener('error', function (e) {
                errorMessageRef.current.innerText =
                    'Có lỗi xảy ra khi tải tệp âm thanh';
            });
        } else {
            errorMessageRef.current.innerText =
                'Vui lòng điền đầy đủ thông tin';
        }
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) setName(value);
    };

    const handleGenreChange = (e) => setGenre(e.target.value);

    const handleSentimentChange = (e) => setSentiment(e.target.value);

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
                                <option value="POP">Pop</option>
                                <option value="BALLAD">Ballad</option>
                                <option value="ROCK">Rock</option>
                                <option value="HIPHOP">Hiphop</option>
                                <option value="CLASSICAL">Classical</option>
                            </select>
                        </label>
                        <label className={cx('form-group')}>
                            <p>Cảm xúc của bài hát</p>
                            <select onChange={handleSentimentChange}>
                                <option value="happy">Vui</option>
                                <option value="sad">Buồn</option>
                                <option value="energetic">Năng lượng</option>
                                <option value="relax">Thư giãn</option>
                                <option value="cant predicted">
                                    Chưa xác định
                                </option>
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
                                        src={URL.createObjectURL(selectedImage)}
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
                                                src={URL.createObjectURL(
                                                    selectedAudio,
                                                )}
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
                        <p
                            className={cx('error-message')}
                            ref={errorMessageRef}
                        ></p>
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
