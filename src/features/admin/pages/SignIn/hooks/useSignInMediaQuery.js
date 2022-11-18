import { useMediaQuery } from 'react-responsive';

const useSignInMediaQuery = () => {
    const DESKTOP_MIN_SCREEN_SIZE = '768px';
    const MOBILE_MAX_SCREEN_SIZE = '767px';
    const isDesktopWidth = useMediaQuery({ query: `(min-width: ${DESKTOP_MIN_SCREEN_SIZE})` });
    const isMobileWidth = useMediaQuery({ query: `(max-width: ${MOBILE_MAX_SCREEN_SIZE})` });
    const isMobileHeight = useMediaQuery({ query: '(max-height: 600px)' });

    return {
        isDesktopWidth,
        isMobileWidth,
        isMobileHeight,
    };
};

export default useSignInMediaQuery;