import React from 'react';
import { vi } from 'vitest';
import { render } from '@testing-library/react';
import CategorySettings from './CategorySettings';

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
            categories: [],
        },
        updateCategories: vi.fn()
    })
}));

describe('CategorySettings', () => {
    it('should render correctly' , () =>{
        const { baseElement } = render(<CategorySettings/>);
        expect(baseElement).toBeInTheDocument();
    });
});
