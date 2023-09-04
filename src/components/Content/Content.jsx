import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Content.module.scss';

import Shelf from '../Shelf';

const cx = classNames.bind(styles);

function Content() {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData([
            {
                id: 1,
                title: 'Danh sách phát trên Spotify',
                items: [
                    {
                        id: 1,
                        image: '../src/assets/images/den_vau.jpg',
                        title: "Today's Top Hits",
                        desc: 'Doja Cat is on top of the Hottest 50!',
                    },
                    {
                        id: 2,
                        image: '../src/assets/images/den_vau.jpg',
                        title: "Today's Top Hits",
                        desc: 'Doja Cat is on top of the Hottest 50!',
                    },
                    {
                        id: 3,
                        image: '../src/assets/images/den_vau.jpg',
                        title: "Today's Top Hits",
                        desc: 'Doja Cat is on top of the Hottest 50!',
                    },
                    {
                        id: 4,
                        image: '../src/assets/images/den_vau.jpg',
                        title: "Today's Top Hits",
                        desc: 'Doja Cat is on top of the Hottest 50!',
                    },
                    {
                        id: 5,
                        image: '../src/assets/images/den_vau.jpg',
                        title: "Today's Top Hits",
                        desc: 'Doja Cat is on top of the Hottest 50!',
                    },
                ],
            },
            {
                id: 2,
                title: 'Tập Trung',
                items: [
                    {
                        id: 1,
                        image: '../src/assets/images/den_vau.jpg',
                        title: "Today's Top Hits",
                        desc: 'Doja Cat is on top of the Hottest 50!',
                    },
                    {
                        id: 2,
                        image: '../src/assets/images/den_vau.jpg',
                        title: "Today's Top Hits",
                        desc: 'Doja Cat is on top of the Hottest 50!',
                    },
                    {
                        id: 3,
                        image: '../src/assets/images/den_vau.jpg',
                        title: "Today's Top Hits",
                        desc: 'Doja Cat is on top of the Hottest 50!',
                    },
                    {
                        id: 4,
                        image: '../src/assets/images/den_vau.jpg',
                        title: "Today's Top Hits",
                        desc: 'Doja Cat is on top of the Hottest 50!',
                    },
                    {
                        id: 5,
                        image: '../src/assets/images/den_vau.jpg',
                        title: "Today's Top Hits",
                        desc: 'Doja Cat is on top of the Hottest 50!',
                    },
                ],
            },
        ]);
    }, []);

    return (
        <section className={cx('section')}>
            <div className={cx('container')}>
                {data &&
                    data.map((item) => (
                        <Shelf key={item.id} shelfData={{ ...item }} />
                    ))}
            </div>
        </section>
    );
}

export default Content;
