import React, { useState, useEffect } from 'react';
import NavigationPanelMobile from './NavigationPanelMobile/NavigationPanelMobile';
import NavigationPanelDesktop from './NavigationPanelDesktop/NavigationPanelDesktop';
import getOrdersAmount from '../../api/getOrdersAmount';
import adaptive from '../../../../common/ui/hocs/adaptive';

const NavigationPanel = () => {
    const [ordersAmount, setOrdersAmount] = useState(0);

    useEffect(() => {
        getOrdersAmount().then((val) => setOrdersAmount(val));
    }, []);

    const AdaptivePanel = adaptive(NavigationPanelDesktop, NavigationPanelMobile);

    return <AdaptivePanel ordersAmount={ordersAmount} />;
};

export default NavigationPanel;
