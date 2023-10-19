import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';
import { useAppContext } from '../../Context/Context';

const cx = classNames.bind(styles);

const Comments = () => {
    const { state } = useAppContext();

    return (
        <div className={cx('container')}>
            <h3>Bình luận</h3>
            {state.isAuthenticated && (
                <div className={cx('user-section')}>
                    <span className={cx('author')}>
                        <img
                            src="../src/assets/images/den_vau.jpg"
                            alt="name"
                        />
                        <p>Đen Vâu</p>
                    </span>
                    <form className={cx('form')}>
                        <textarea placeholder="Hãy để lại một bình luận về bài hát..." />
                        <input type="submit" value="Bình luận" />
                    </form>
                </div>
            )}
            <div className={cx('comment')}>
                <span className={cx('author')}>
                    <img src="../src/assets/images/den_vau.jpg" alt="name" />
                    <p>Đen Vâu</p>
                </span>
                <div className={cx('comment-text')}>
                    <p>
                        Bài hát này rất buồn. Chạm đến trái tim của tôi. Bài hát
                        này rất buồn. Chạm đến trái tim của tôi. Bài hát này rất
                        buồn. Chạm đến trái tim của tôi. Bài hát này rất buồn.
                        Chạm đến trái tim của tôi
                    </p>
                </div>
                <div className={cx('comment-bottom')}>
                    <Button
                        className={cx('like-btn')}
                        noBackground
                        content={<FontAwesomeIcon icon={faHeart} />}
                    />
                    <p>5 ngày trước</p>
                </div>
            </div>
        </div>
    );
};

export default Comments;
