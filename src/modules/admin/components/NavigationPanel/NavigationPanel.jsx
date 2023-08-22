import React, { useState, useEffect } from 'react';
import NavigationPanelMobile from './NavigationPanelMobile/NavigationPanelMobile';
import NavigationPanelDesktop from './NavigationPanelDesktop/NavigationPanelDesktop';
import getOrdersAmount from '../../api/getOrdersAmount';
import adaptive from '../../../../common/ui/hocs/adaptive';
import { useNavigate } from 'react-router-dom';
import { useToasters } from '../../../../common/ui/contexts/ToastersContext';
import { ADMIN_PANEL_ROUTES } from '../../adminRoutes';
import { NAVIGATION_PANEL_DICTIONARY } from './NavigationPanel.dictionary';

const {
    SUCCESS_EXIT,
} = NAVIGATION_PANEL_DICTIONARY;

const NavigationPanel = () => {
    const { SIGN_IN } = ADMIN_PANEL_ROUTES;

    const navigate = useNavigate();
    const { showToasterSuccess } = useToasters();
    const [ordersAmount, setOrdersAmount] = useState(0);

    const handleExit = (e) =>{
        e.preventDefault();
        localStorage.removeItem('Authorization');
        localStorage.removeItem('refreshToken');
        showToasterSuccess(SUCCESS_EXIT);
        navigate(SIGN_IN);
    };

    useEffect(() => {
        getOrdersAmount().then((val) => setOrdersAmount(val));
    }, []);

    const AdaptivePanel = adaptive(NavigationPanelDesktop, NavigationPanelMobile);

    return <AdaptivePanel ordersAmount={ordersAmount} handleExit={handleExit} />;
};

export default NavigationPanel;
