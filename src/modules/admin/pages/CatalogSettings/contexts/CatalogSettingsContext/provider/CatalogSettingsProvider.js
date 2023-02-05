import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CatalogSettingsContext } from '../CatalogSettingsContext';
import { retrieveCatalogueSettings } from '../../../../../../../common/api';

const CatalogSettingsProvider = (props) => {

    const [initialCatalogSettings, setInitialCatalogSettings] = useState();
    const [catalogSettings, setCatalogSettings] = useState({
        models: []
    });

    useEffect(() =>{
        retrieveCatalogueSettings().then((settings) =>{
            setInitialCatalogSettings(settings);
            setCatalogSettings(settings);
        });
    }, []);

    const updateModels = (models) =>{
        setCatalogSettings(prevState => ({ ...prevState, models }));
    };

    const saveSettings = () => {
    };


    return (
        <CatalogSettingsContext.Provider value={{ settings: catalogSettings, updateModels, saveSettings }}>
            {props.children}
        </CatalogSettingsContext.Provider>
    );

};

CatalogSettingsProvider.propTypes = {
    children: PropTypes.element
};

export default CatalogSettingsProvider;
