import { useContext } from 'react';
import { DeviceTypeContext } from '../DeviceTypeContext';

export const useDeviceTypeContext = () => useContext(DeviceTypeContext);
