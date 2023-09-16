import classNames from 'classnames/bind';
import styles from './PlayButton.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const PlayButton = ({ className, size = '16px' }) => {
    return (
        <div
            className={cx('play-btn', className)}
            style={{ width: size, height: size }}
        >
            <button>
                <FontAwesomeIcon icon={faPlay} />
            </button>
        </div>
    );
};

export default PlayButton;
