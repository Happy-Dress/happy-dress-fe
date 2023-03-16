import { useEffect, useMemo, useState } from 'react';

export const usePageScroll = (value = 0) => {
    const [pageOffset, setPageOffset] = useState(null);

    useEffect(() => {
        const scrollFunc = () => {
            setPageOffset(window.scrollY);
        };

        document.addEventListener('scroll', scrollFunc);

        return () => {
            document.removeEventListener('scroll', scrollFunc);
        };
    }, []);

    return useMemo(() => {
        return pageOffset >= value;
    }, [pageOffset]);
};
