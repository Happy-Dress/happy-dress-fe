import React, { useState, useEffect } from 'react';
import NavigationPanelMobile from './NavigationPanelMobile/NavigationPanelMobile';
import NavigationPanelDesktop from './NavigationPanelDesktop/NavigationPanelDesktop';
import { useDeviceTypeContext } from '../../../../common/contexts/DeviceType';
import getOrdersAmount from '../../getOrdersAmount/getOrdersAmount';
const NavigationPanel = () => {
    const { isDesktop, isMobile } = useDeviceTypeContext();
    const [ordersAmount, setOrdersAmount] = useState(0);
    useEffect(() => {
        getOrdersAmount().then((val) => setOrdersAmount(val));
    }, []);
  
    return (
        <div>
            {isMobile && <NavigationPanelMobile quanty={ordersAmount} />}
            {isDesktop && <NavigationPanelDesktop quanty={ordersAmount} />}
        </div>
    );
};

export default NavigationPanel;