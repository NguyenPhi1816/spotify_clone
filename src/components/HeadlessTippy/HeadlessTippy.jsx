import React from 'react';
import Tippy from '@tippyjs/react/headless'; // different import path!

function HeadlessTippy({
    children,
    items,
    referenceClientRect,
    show,
    setShow,
}) {
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
            getReferenceClientRect={() => referenceClientRect}
        >
            {children}
        </Tippy>
    );
}

export default HeadlessTippy;
