import React from 'react';
import ZeroBlock from './ZeroBlock';
import Categories from './Categories';
import withRouteTracker from '../../../../common/ui/hocs/withRouteTracker';

const Landing = () => {
    return(
        <>
            <ZeroBlock/>
            <Categories />
        </>
    );
};

export default withRouteTracker(Landing);