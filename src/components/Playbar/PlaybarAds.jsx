import classNames from 'classnames/bind';
import styles from './Playbar.module.scss';

import Button from '../Button';

const cx = classNames.bind(styles);

const PlaybarAds = () => {
    return (
        <div className={cx('container')}>
            <div className={cx('not-logged-in')}>
                <div>
                    <p className={cx('p1')}>Xem trước Spotify</p>
                    <p>
                        Đăng ký để nghe không giới hạn các bài hát và podcast
                        với quảng cáo không thường xuyên. Không cần thẻ tín
                        dụng.
                    </p>
                </div>
                <div className={cx('btn')}>
                    <Button content="Đăng ký miễn phí" />
                </div>
            </div>
        </div>
    );
};

export default PlaybarAds;
