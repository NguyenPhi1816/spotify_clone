import React from 'react';
import Tippy from '@tippyjs/react/headless'; // different import path!

function HeadlessTippy({ children, items, show, setShow, ...props }) {
    const handleClickOutside = () => setShow((prev) => !prev);

    return (
        <Tippy
            render={(attrs) => (
                <div className="box" tabIndex="-1" {...attrs}>
                    {items}
                </div>
            )}
            appendTo={() => document.body}
            visible={show}
            interactive={true}
            onClickOutside={() => handleClickOutside()}
            {...props}
        >
            {children}
        </Tippy>
    );
}

export default HeadlessTippy;
