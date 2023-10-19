import classNames from 'classnames/bind';
import styles from './AddAlbumModal.module.scss';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const AddAlbumModal = ({ onClose, onSave }) => {
    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h3>Tạo một album mới</h3>
                    <Button
                        onClick={onClose}
                        noBackground
                        className={cx('close-btn')}
                        content={<FontAwesomeIcon icon={faTimes} />}
                    />
                </div>
                <div className={cx('body')}>
                    <form className={cx('form')}>
                        <input type="text" placeholder="Nhập tên album..." />
                    </form>
                </div>
                <div className={cx('footer')}>
                    <Button
                        onClick={onClose}
                        noBackground
                        content="Để sau"
                        className={cx('btn-cancel')}
                    />
                    <Button onClick={onSave} content="Lưu và thêm bài hát" />
                </div>
            </div>
        </div>
    );
};

export default AddAlbumModal;
