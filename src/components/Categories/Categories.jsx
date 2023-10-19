import classNames from 'classnames/bind';
import styles from './Categories.module.scss';

import CategoryItem from '../CategoryItem';
import { useEffect, useState } from 'react';
import { getAllCategories } from '../../services/categoryServices';

const cx = classNames.bind(styles);

function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories().then((res) => setCategories(res.data));
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h2>Duyệt tìm tất cả</h2>
                </div>
                <div className={cx('categories-container')}>
                    <ul className={cx('list')}>
                        {categories &&
                            categories.map((item) => (
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
