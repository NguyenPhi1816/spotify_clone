import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faCompactDisc,
    faHouse,
    faMagnifyingGlass,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <nav className={cx('container')}>
            <div className={cx('item', 'top')}>
                <ul className={cx('top-list')}>
                    <li className={cx('list-item', 'active')}>
                        <a href="/">
                            <FontAwesomeIcon icon={faHouse} />
                            <span>Trang chủ</span>
                        </a>
                    </li>
                    <li className={cx('list-item')}>
                        <a href="/">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <span>Tìm kiếm</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className={cx('item', 'body')}>
                <div className={cx('body-container')}>
                    <div className={cx('list-item', 'p-s')}>
                        <div>
                            <FontAwesomeIcon icon={faCompactDisc} />
                            <span>Thư viện</span>
                            <div className={cx('icons')}>
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className={cx('plus')}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={cx('body-list')}>
                        <div className={cx('article')}>
                            <h4 className={cx('acticle-title')}>
                                Tạo danh sách phát đầu tiên của bạn
                            </h4>
                            <p className={cx('acticle-content')}>
                                Rất dễ! Chúng tôi sẽ giúp bạn
                            </p>
                            <button className={cx('article-btn')}>
                                Tạo danh sách phát
                            </button>
                        </div>

                        <div className={cx('article')}>
                            <h4 className={cx('acticle-title')}>
                                Hãy cùng tìm và theo dõi một số podcast
                            </h4>
                            <p className={cx('acticle-content')}>
                                Chúng tôi sẽ cập nhật thông tin cho bạn về các
                                tập mới
                            </p>
                            <button className={cx('article-btn')}>
                                Duyệt xem podcast
                            </button>
                        </div>
                        <div className={cx('article')}>
                            <h4 className={cx('acticle-title')}>
                                Hãy cùng tìm và theo dõi một số podcast
                            </h4>
                            <p className={cx('acticle-content')}>
                                Chúng tôi sẽ cập nhật thông tin cho bạn về các
                                tập mới
                            </p>
                            <button className={cx('article-btn')}>
                                Duyệt xem podcast
                            </button>
                        </div>
                        <div className={cx('article')}>
                            <h4 className={cx('acticle-title')}>
                                Hãy cùng tìm và theo dõi một số podcast
                            </h4>
                            <p className={cx('acticle-content')}>
                                Chúng tôi sẽ cập nhật thông tin cho bạn về các
                                tập mới
                            </p>
                            <button className={cx('article-btn')}>
                                Duyệt xem podcast
                            </button>
                        </div>
                        <div className={cx('article')}>
                            <h4 className={cx('acticle-title')}>
                                Hãy cùng tìm và theo dõi một số podcast
                            </h4>
                            <p className={cx('acticle-content')}>
                                Chúng tôi sẽ cập nhật thông tin cho bạn về các
                                tập mới
                            </p>
                            <button className={cx('article-btn')}>
                                Duyệt xem podcast
                            </button>
                        </div>
                        <div className={cx('article')}>
                            <h4 className={cx('acticle-title')}>
                                Hãy cùng tìm và theo dõi một số podcast
                            </h4>
                            <p className={cx('acticle-content')}>
                                Chúng tôi sẽ cập nhật thông tin cho bạn về các
                                tập mới
                            </p>
                            <button className={cx('article-btn')}>
                                Duyệt xem podcast
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
