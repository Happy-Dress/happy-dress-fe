import React from 'react';
import { render } from '@testing-library/react';
import ColorSettings from './ColorSettings';

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
            materials: [],
            colors: []
        },
        updateMaterials: jest.fn()
    })
}));


describe('ModelSettings', () => {
    it('should render correctly' , () =>{
        const { baseElement } = render(<ColorSettings/>);
        expect(baseElement).toBeInTheDocument();
    });
});
