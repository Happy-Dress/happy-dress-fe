import React from 'react';
import { render } from '@testing-library/react';
import MaterialSettings from './MaterialSettings';

jest.mock('../SimpleSettingsControl/SimpleSettingsControl', () =>({
    __esModule: true,
    default: () => {
        return <div>Test</div>;
    }
}));

jest.mock('../../contexts/CatalogSettingsContext/hook/useCatalogSettings', () => ({
    useCatalogSettings: () =>({
        settings: {
            models: [],
            materials: []
        },
        updateMaterials: jest.fn()
    })
}));


describe('MaterialSettings', () => {
    it('should render correctly' , () =>{
        const { baseElement } = render(<MaterialSettings/>);
        expect(baseElement).toBeInTheDocument();
    });
});
