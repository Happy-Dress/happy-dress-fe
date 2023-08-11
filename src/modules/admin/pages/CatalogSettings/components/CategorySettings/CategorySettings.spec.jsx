import React from 'react';
import { render } from '@testing-library/react';
import CategorySettings from './CategorySettings';

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
            categories: [],
        },
        updateCategories: jest.fn()
    })
}));

describe('CategorySettings', () => {
    it('should render correctly' , () =>{
        const { baseElement } = render(<CategorySettings/>);
        expect(baseElement).toBeInTheDocument();
    });
});
