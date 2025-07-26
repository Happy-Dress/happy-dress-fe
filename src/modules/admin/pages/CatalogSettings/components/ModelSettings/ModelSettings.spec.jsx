import React from 'react';
import { vi } from 'vitest';
import { render } from '@testing-library/react';
import ModelSettings from './ModelSettings';

vi.mock('../SimpleSettingsControl/SimpleSettingsControl', () =>({
    __esModule: true,
    default: () => {
        return <div>Test</div>;
    }
}));

vi.mock('../../contexts/CatalogSettingsContext/hook/useCatalogSettings', () => ({
    useCatalogSettings: () =>({
        settings: {
            models: [],
            materials: []
        },
        updateMaterials: vi.fn()
    })
}));


describe('ModelSettings', () => {
    it('should render correctly' , () =>{
        const { baseElement } = render(<ModelSettings/>);
        expect(baseElement).toBeInTheDocument();
    });
});
