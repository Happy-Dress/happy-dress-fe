import PropTypes from 'prop-types';
import { CatalogSettingsContext } from '../CatalogSettingsContext';
import { useEffect, useState } from 'react';
import { retrieveCatalogueSettings } from '../../../../../../../common/api';

const CatalogSettingsProvider = (props) => {

    const [initialCatalogSettings, setInitialCatalogSettings] = useState();
    const [catalogSettings, setCatalogSettings] = useState();

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
        debugger;
    };


    return (
        <CatalogSettingsContext.Provider value={{ catalogSettings, updateModels, saveSettings }}>
            {props.children}
        </CatalogSettingsContext.Provider>
    );

};

CatalogSettingsProvider.propTypes = {
    children: PropTypes.element
};

export default CatalogSettingsProvider;
