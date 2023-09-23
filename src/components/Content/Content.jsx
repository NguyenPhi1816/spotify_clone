import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Content.module.scss';

import Shelf from '../Shelf';

const cx = classNames.bind(styles);

function Content({ title, data }) {
    const [content, setContent] = useState([]);

    useEffect(() => {
        setContent(data);
    }, [data]);

    // console.log(content);

    return (
        <section className={cx('section')}>
            {title && (
                <div className={cx('title')}>
                    <h1>{title}</h1>
                </div>
            )}
            <div className={cx('container')}>
                {content &&
                    content.map((item) => (
                        <Shelf key={item.id} shelfData={item} />
                    ))}
            </div>
        </section>
    );
}

export default Content;
