import classNames from 'classnames/bind';
import styles from './FavButton.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const FavButton = ({ className, size = '16px' }) => {
    return (
        <button className={cx('fav-btn', className)} style={{ fontSize: size }}>
            <FontAwesomeIcon icon={faHeart} />
        </button>
    );
};

export default FavButton;
