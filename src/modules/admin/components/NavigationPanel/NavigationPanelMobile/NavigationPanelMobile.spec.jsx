
import React from 'react';
import { screen,  waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavigationPanelMobile from './NavigationPanelMobile';
import { renderWithRouter } from '../NavigationPanelDesktop/NavigationPanelDesktop.spec';


jest.mock('../../../pages/BlogSetting/BlogSetting', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid="blog-page"></div>;
    },
}));

jest.mock('../../../pages/CatalogSetting/CatalogSetting', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid="catalog-page"></div>;
    },
}));

jest.mock('../../../pages/GoodsSetting/GoodsSetting', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid="goods-page"></div>;
    },
}));

jest.mock('../../../pages/SignIn/', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid="athorization">Athorization form</div>;
    },
}));

jest.mock('../../../pages/RegistrationSetting/RegistrationSetting', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid="registration-page"></div>;
    },
}));

describe('NavigationPanelMobile', () => {
    beforeEach(() => {
        renderWithRouter(<NavigationPanelMobile />);
    });

    it('should render NavigatingPanelMobile', async () => {
        await waitFor(() => {
            const panelBtn = screen.getByAltText('W');
            expect(panelBtn).toBeInTheDocument();
        });
    });

    it('Should after clicking the "Каталог" link, the Catalog page opens.', async () => {
        const panelBtn = screen.getByAltText('W');
        fireEvent.click(panelBtn);
        const btn = screen.getByText('Каталог');
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('catalog-page')).toBeInTheDocument();
        });
    });

    it('Should after clicking the "Товар" link, the Goods page opens.', async () => {
        const panelBtn = screen.getByAltText('W');
        fireEvent.click(panelBtn);
        const btn = screen.getByText('Товар');
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('goods-page')).toBeInTheDocument();
        });
    });

    it('Should after clicking the "Записи" link, the Registration page opens.', async () => {
        const panelBtn = screen.getByAltText('W');
        fireEvent.click(panelBtn);
        const btn = screen.getByText('Записи');
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('registration-page')).toBeInTheDocument();
        });
    });

    it('Should after clicking the "Блог" link, the Blog page opens.', async () => {
        const panelBtn = screen.getByAltText('W');
        fireEvent.click(panelBtn);
        const btn = screen.getByText('Блог');
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('blog-page')).toBeInTheDocument();
        });
    });
});
