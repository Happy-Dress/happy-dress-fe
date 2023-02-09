import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import adaptive from '../../../../../../common/ui/hocs/adaptive';
import { CatalogHeaderDesktop } from './components/CatalogHeaderDesktop';

const CatalogHeader = ({ filters, isLoading }) => {

    const AdaptiveCatalogHeader = useMemo(() => {
        return adaptive(CatalogHeaderDesktop, <div>Mobile</div>);
    }, []);

    if(isLoading) return <p>Loader</p>;

    return (
        <AdaptiveCatalogHeader filters={filters}/>
    );
};

CatalogHeader.propTypes = {
    filters: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default CatalogHeader;