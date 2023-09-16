import classNames from 'classnames/bind';
import styles from './Categories.module.scss';

import CategoryItem from '../CategoryItem';

const cx = classNames.bind(styles);

function Categories() {
    const CATEGORIES = [
        {
            id: 1,
            title: 'Podcast',
            thumb: '../src/assets/images/category_thumb.jpg',
        },
        {
            id: 2,
            title: 'Podcast',
            thumb: '../src/assets/images/category_thumb.jpg',
        },
        {
            id: 3,
            title: 'Podcast',
            thumb: '../src/assets/images/category_thumb.jpg',
        },
        {
            id: 4,
            title: 'Podcast',
            thumb: '../src/assets/images/category_thumb.jpg',
        },
        {
            id: 5,
            title: 'Podcast',
            thumb: '../src/assets/images/category_thumb.jpg',
        },
        {
            id: 6,
            title: 'Podcast',
            thumb: '../src/assets/images/category_thumb.jpg',
        },
        {
            id: 7,
            title: 'Podcast',
            thumb: '../src/assets/images/category_thumb.jpg',
        },
        {
            id: 8,
            title: 'Podcast',
            thumb: '../src/assets/images/category_thumb.jpg',
        },
        {
            id: 9,
            title: 'Podcast',
            thumb: '../src/assets/images/category_thumb.jpg',
        },
        {
            id: 10,
            title: 'Podcast',
            thumb: '../src/assets/images/category_thumb.jpg',
        },
        {
            id: 11,
            title: 'Podcast',
            thumb: '../src/assets/images/category_thumb.jpg',
        },
    ];

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h2>Duyệt tìm tất cả</h2>
                </div>
                <div className={cx('categories-container')}>
                    <ul className={cx('list')}>
                        {CATEGORIES.map((item) => (
                            <li key={item.id}>
                                <CategoryItem data={item} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Categories;
