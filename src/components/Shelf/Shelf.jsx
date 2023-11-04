import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Shelf.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Shelf({ title, to = null, children }) {
    let ref = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);

    useLayoutEffect(() => {
        setContainerWidth(ref.current.offsetWidth);
    }, []);

    return (
        <section className={cx('container')} ref={ref}>
            <div className={cx('header')}>
                <h2 className={cx('title')}>{title}</h2>
                {to !== null && <Link to={to}>Hiện tất cả</Link>}
            </div>
            <div>
                <ul
                    className={cx('list')}
                    style={{
                        gridTemplateColumns: `repeat(${Math.floor(
                            containerWidth / 200,
                        )}, 1fr)`,
                    }}
                >
                    {children}
                </ul>
            </div>
        </section>
    );
}

export default Shelf;
