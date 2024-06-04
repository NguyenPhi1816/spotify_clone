import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';
import { useEffect, useState } from 'react';
import { uploadComment } from '../../services/reviewServices';
import { useAuthContext } from '../../context/AuthContext';
import CustomSpinner from '../../icon/spinner';
import {
    dialogContextTypes,
    useDialogContext,
} from '../../context/DialogContext';
import { MessageType } from '../../dialog/MessageDialog/MessageDialog';

const cx = classNames.bind(styles);

const Comments = ({ data = [], songId }) => {
    const { state: authState } = useAuthContext();
    const { dispatch: dialogDispatch } = useDialogContext();

    const [isLoading, setIsLoading] = useState(false);
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState([]);

    const calculateCreatedDate = (createdDateStr) => {
        const [datePart, timePart] = createdDateStr.split(' ');
        const [month, day, year] = datePart.split('/');
        const newDate = month + '/' + day + '/' + year + ' ' + timePart;

        const createdDate = new Date(newDate);
        const currentDate = new Date();
        const diff = currentDate - createdDate;
        let daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (daysDiff === 0) daysDiff = 1;

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

    const handleChange = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) setComment(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await uploadComment(authState.authData.user.id, songId, comment)
            .then((res) => {
                setCommentList(res.data);
                setComment('');
            })
            .catch((error) => {
                dialogDispatch({
                    type: dialogContextTypes.SHOW_MESSAGE_DIALOG,
                    message: {
                        title: 'Có lỗi xảy ra',
                        message: error.message,
                        type: MessageType.ERROR,
                    },
                });
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        setCommentList(data);
    }, [data]);

    return (
        <div className={cx('container')}>
            <h3>Bình luận</h3>
            {authState.isAuthenticated && (
                <div className={cx('user-section')}>
                    <span className={cx('author')}>
                        <img
                            src={authState.authData.user.photoImagePath}
                            alt={authState.authData.user.fullName}
                        />
                        <p>{authState.authData.user.fullName}</p>
                    </span>
                    <form className={cx('form')}>
                        <textarea
                            value={comment}
                            onChange={(e) => handleChange(e)}
                            placeholder="Hãy để lại một bình luận về bài hát..."
                        />
                        <button
                            className={cx('submit-btn')}
                            onClick={handleSubmit}
                        >
                            {isLoading && <CustomSpinner />}
                            Bình luận
                        </button>
                    </form>
                </div>
            )}
            <div className={cx('comment')}>
                <ul className={cx('comment-list')}>
                    {commentList.length > 0 &&
                        commentList.map((item) => (
                            <li key={item.id}>
                                <span className={cx('author')}>
                                    <img
                                        src={item.user.photoImagePath}
                                        alt={item.user.fullName}
                                    />
                                    <p>{item.user.fullName}</p>
                                </span>
                                <div className={cx('comment-text')}>
                                    <p>{item.content}</p>
                                </div>
                                <div className={cx('comment-bottom')}>
                                    <Button
                                        className={cx('like-btn')}
                                        noBackground
                                        content={
                                            <FontAwesomeIcon icon={faHeart} />
                                        }
                                    />
                                    <p>
                                        {calculateCreatedDate(item.createdAt)}
                                    </p>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default Comments;
