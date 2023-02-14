import React from 'react';
import { render, waitFor } from '@testing-library/react';
import GoodsSetting from './index';
import { BrowserRouter } from 'react-router-dom';
import { mockCatalogueItemsResponse } from '../../../../__mocks__/mockCatalogueItemsResponse';
import { mockCatalogueSettingsResponse } from '../../../../__mocks__/mockCatalogueSettingsResponse';

jest.mock('../../../../common/api/catalogueSettings/retrieveCatalogueSettings', () =>({
    __esModule: true,
    default: () => Promise.resolve(mockCatalogueSettingsResponse),
}));

jest.mock('../../../../common/api/catalogueItems/getCatalogueItems', () =>({
    __esModule: true,
    default: () => Promise.resolve(mockCatalogueItemsResponse),
}));

describe('GoodsSetting', () => {
    it('should render correctly', async () => {
        render(<GoodsSetting/>, { wrapper: BrowserRouter });

        await waitFor(async () => {

        });
    });
});
