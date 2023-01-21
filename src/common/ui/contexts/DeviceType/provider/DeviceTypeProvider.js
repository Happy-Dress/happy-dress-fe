import { DeviceTypeContext } from '../DeviceTypeContext';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

const DeviceTypeProvider = (props) =>{

    const DESKTOP_MIN_SCREEN_SIZE = '1024px';
    const MAX_MOBILE_SIZE='1023px';
    const isDesktop = useMediaQuery({ query: `(min-width: ${DESKTOP_MIN_SCREEN_SIZE})` });
    const isMobile = useMediaQuery({ query: `(max-width: ${MAX_MOBILE_SIZE})` });

    return (
        <DeviceTypeContext.Provider value={{ isMobile, isDesktop }}>
            {props.children}
        </DeviceTypeContext.Provider>
    );
};

DeviceTypeProvider.propTypes = {
    children: PropTypes.element
};

export default DeviceTypeProvider;
