import { mockCatalogueSettingsResponse } from './mockCatalogueSettingsResponse';
import { mockCatalogueItemsResponse } from './mockCatalogueItemsResponse';

export const mockGoodsSettingContext = {
    state: {
        filters: { ...mockCatalogueSettingsResponse },
        loading: {
            header: false,
            content: false
        },
        currentFilters: {
            categories: [24],
            materials: [34, 4, 64, 54]
        },
        selectedItems: [],
        items: [...mockCatalogueItemsResponse]
    },
    dispatch: jest.fn(),
    changeFilter: () => {
        function add() {

        }

        function remove() {

        }

        function replace() {

        }

        return {
            add,
            remove,
            replace
        };
    },
    selectProductHandler: () => {
        function add() {

        }

        function remove() {

        }

        return {
            add,
            remove
        };
    }
};
