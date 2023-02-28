import { useMediaQuery } from 'react-responsive';

const useGoodsMediaQuery = () => {
    const DESKTOP_MIN_SCREEN_SIZE = '1024px';
    const MOBILE_MAX_WIDTH_SIZE = '1023px';
    const MOBILE_MAX_HEIGHT_SIZE = '600px';

    const isDesktopWidth = useMediaQuery({ query: `(min-width: ${DESKTOP_MIN_SCREEN_SIZE})` });
    const isMobileWidth = useMediaQuery({ query: `(max-width: ${MOBILE_MAX_WIDTH_SIZE})` });
    const isMobileHeight = useMediaQuery({ query: `(max-height: ${MOBILE_MAX_HEIGHT_SIZE})` });

    return {
        isDesktopWidth,
        isMobileWidth,
        isMobileHeight,
    };
};

export default useGoodsMediaQuery;