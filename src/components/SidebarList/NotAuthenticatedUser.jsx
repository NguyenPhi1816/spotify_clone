import classNames from 'classnames/bind';
import styles from './SidebarList.module.scss';
import { Fragment, useState } from 'react';
import Button from '../Button';
import AuthenticationDialog from '../../dialog/AuthenticationDialog';

const cx = classNames.bind(styles);

const NotAuthenticatedUser = () => {
    const [showDialog, setShowDialog] = useState(false);

    return (
        <Fragment>
            <div className={cx('article')}>
                <h4 className={cx('acticle-title')}>
                    Tạo danh sách phát đầu tiên của bạn
                </h4>
                <p className={cx('acticle-content')}>
                    Rất dễ! Chúng tôi sẽ giúp bạn
                </p>
                <div className="btn">
                    <Button
                        onClick={() => setShowDialog(true)}
                        content="Tạo danh sách phát"
                        customFontSize="14px"
                    />
                </div>
            </div>
            <div className={cx('article')}>
                <h4 className={cx('acticle-title')}>
                    Hãy cùng tìm và theo dõi một số podcast
                </h4>
                <p className={cx('acticle-content')}>
                    Chúng tôi sẽ cập nhật thông tin cho bạn về các tập mới
                </p>
                <div className="btn">
                    <Button
                        onClick={() => setShowDialog(true)}
                        content="Duyệt xem Podcast"
                        customFontSize="14px"
                    />
                </div>
            </div>
            {showDialog && (
                <AuthenticationDialog
                    message={'Vui lòng đăng nhập để sử dụng chức năng này'}
                    onClose={() => setShowDialog(false)}
                />
            )}
        </Fragment>
    );
};

export default NotAuthenticatedUser;
