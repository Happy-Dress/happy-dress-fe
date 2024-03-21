import React, { useMemo } from 'react';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import adaptive from '../../../../common/ui/hocs/adaptive';
import { useSelector } from 'react-redux';

const Header = () => {
    const ordersAmount = useSelector(state => state.orders.count);


    const AdaptiveHeader = useMemo(() => adaptive(HeaderDesktop, HeaderMobile), []);
    return (
        <AdaptiveHeader
            ordersAmount={ordersAmount}
        />
    );
};

export default Header;
