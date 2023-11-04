import classNames from 'classnames/bind';
import styles from './ArtistCard.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const ArtistCard = ({ data }) => {
    return (
        <Link to={`/artist/${data.id}`} className={cx('link')}>
            <div className={cx('container')}>
                <div className={cx('top')}>
                    <div className={cx('thumb-container')}>
                        <img src={data.photoImagePath} alt={data.fullName} />
                    </div>
                </div>
                <div className={cx('body')}>
                    <h3 className={cx('title')}>{data.fullName}</h3>
                    <p className={cx('desc')}>Hồ sơ</p>
                </div>
            </div>
        </Link>
    );
};

export default ArtistCard;
