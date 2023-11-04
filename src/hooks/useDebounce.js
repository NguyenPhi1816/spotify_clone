import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState('');

    useEffect(() => {
        const timerId = setTimeout(() => setDebounceValue(value), delay);

        return () => clearTimeout(timerId);
    }, [value, delay]);

    return debounceValue;
};

useDebounce.PropTypes = {
    value: PropTypes.string,
    delay: PropTypes.number,
};

export default useDebounce;
