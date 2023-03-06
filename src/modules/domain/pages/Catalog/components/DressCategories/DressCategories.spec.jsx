import DressCategories from './DressCategories';
import renderWithStore from '../../../../../../common/util/tests/renderWithStore';
import { screen } from '@testing-library/dom';
import { mockCatalogueSettingsResponse } from '../../../../../../__mocks__/mockCatalogueSettingsResponse';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const preloadedStore = {
    productsSearch: {
        loading: false,
        filters: {
            category: mockCatalogueSettingsResponse.categories[0].id
        }
    },
    catalogueSettings: {
        loading: false,
        settings: {
            ...mockCatalogueSettingsResponse
        }
    }
};

describe('DressCategories', () => {
    it('should render', async () => {
        const { baseElement } = renderWithStore(<DressCategories />, preloadedStore);

        expect(baseElement).toBeInTheDocument();
        expect(screen.getByText('Деловой Стиль')).toHaveClass('selected');
    });

    it('should change category', async () => {
        renderWithStore(<DressCategories />, preloadedStore);

        expect(screen.getByText('Деловой Стиль')).toHaveClass('selected');

        await act(() => {
            userEvent.click(screen.getByText(mockCatalogueSettingsResponse.categories[1].name));
        });

        expect(screen.getByText(mockCatalogueSettingsResponse.categories[1].name)).toHaveClass('selected');
    });
});
