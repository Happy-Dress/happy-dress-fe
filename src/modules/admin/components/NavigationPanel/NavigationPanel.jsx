import React, { useState, useEffect } from 'react';
import NavigationPanelMobile from './NavigationPanelMobile/NavigationPanelMobile';
import NavigationPanelDesktop from './NavigationPanelDesktop/NavigationPanelDesktop';
import { useDeviceTypeContext } from '../../../../common/contexts/DeviceType';
import getOrdersAmount from '../../api/getOrdersAmount';

const NavigationPanel = () => {
    const { isDesktop, isMobile } = useDeviceTypeContext();
    const [ordersAmount, setOrdersAmount] = useState(0);
    useEffect(() => {
        getOrdersAmount().then((val) => setOrdersAmount(val));
    }, []);
    console.log('mobile : ' + isMobile + '    ' + 'desk: ' + isDesktop);
    return (
        <div>
            {isMobile && <NavigationPanelMobile ordersAmount={ordersAmount} />}
            {isDesktop && <NavigationPanelDesktop ordersAmount={ordersAmount} />}
        </div>
    );
};

export default NavigationPanel;