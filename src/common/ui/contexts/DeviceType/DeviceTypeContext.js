import { createContext } from 'react';

const initialDeviceTypeContext = {
    isDesktop: false,
    isMobile: false
};

export const DeviceTypeContext = createContext(initialDeviceTypeContext);
