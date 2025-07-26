import { vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import Categories from './Categories';
import { waitFor } from '@testing-library/dom';


vi.mock('../../../../../common/api/catalogSettings/retrieveCatalogSettings', () =>({
    __esModule: true,
    default: () => Promise.resolve({ settings: [] }),
}));

describe('Categories', () => {
    it('should render correctly', () => {
        waitFor(() =>{
            const { baseElement } = render(<Categories />);
            expect(baseElement).toBeInTheDocument();
        });
    });
});
