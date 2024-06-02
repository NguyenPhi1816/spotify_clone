import { useAppContext } from '../../context/Context';
import PlaybarAds from './PlaybarAds';
import PlaybarAuth from './PlaybarAuth';

import classNames from 'classnames/bind';
import styles from './Playbar.module.scss';

const cx = classNames.bind(styles);

function Playbar() {
    const { state } = useAppContext();
    return (
        <div className={cx('wrapper')}>
            {!state.isAuthenticated ? <PlaybarAds /> : <PlaybarAuth />}
        </div>
    );
}

export default Playbar;
