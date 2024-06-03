import PlaybarAds from './PlaybarAds';
import PlaybarAuth from './PlaybarAuth';

import classNames from 'classnames/bind';
import styles from './Playbar.module.scss';
import { useAuthContext } from '../../context/AuthContext';

const cx = classNames.bind(styles);

function Playbar() {
    const { state: authState } = useAuthContext();
    return (
        <div className={cx('wrapper')}>
            {!authState.isAuthenticated ? <PlaybarAds /> : <PlaybarAuth />}
        </div>
    );
}

export default Playbar;
