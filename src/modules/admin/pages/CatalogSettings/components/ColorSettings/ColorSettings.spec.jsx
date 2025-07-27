import React from 'react';
import { vi } from 'vitest';
import { render } from '@testing-library/react';
import ColorSettings from './ColorSettings';

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
            materials: [],
            colors: []
        },
        updateMaterials: vi.fn()
    })
}));


describe('ModelSettings', () => {
    it('should render correctly' , () =>{
        const { baseElement } = render(<ColorSettings/>);
        expect(baseElement).toBeInTheDocument();
    });
});
