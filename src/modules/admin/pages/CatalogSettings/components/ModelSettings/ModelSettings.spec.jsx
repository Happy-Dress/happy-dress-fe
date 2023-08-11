import React from 'react';
import { render } from '@testing-library/react';
import ModelSettings from './ModelSettings';

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


describe('ModelSettings', () => {
    it('should render correctly' , () =>{
        const { baseElement } = render(<ModelSettings/>);
        expect(baseElement).toBeInTheDocument();
    });
});
