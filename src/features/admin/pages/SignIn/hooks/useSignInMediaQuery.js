import { useMediaQuery } from 'react-responsive';

const useSignInMediaQuery = () => {
    const DESKTOP_MIN_SCREEN_SIZE = '768px';
    const MOBILE_MAX_SCREEN_SIZE = '767px';
    const isDesktop = useMediaQuery({ query: `(min-width: ${DESKTOP_MIN_SCREEN_SIZE})` });
    const isMobile = useMediaQuery({ query: `(max-width: ${MOBILE_MAX_SCREEN_SIZE})` });

    return {
        isDesktop,
        isMobile
    };
};

export default useSignInMediaQuery;