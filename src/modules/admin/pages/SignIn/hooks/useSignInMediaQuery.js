import { useMediaQuery } from 'react-responsive';

const useSignInMediaQuery = () => {
    const DESKTOP_MIN_SCREEN_SIZE = '768px';
    const MOBILE_MAX_WIDTH_SIZE = '767px';
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

export default useSignInMediaQuery;