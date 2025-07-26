import React from 'react';
import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import NavigationPanelMobile from './NavigationPanelMobile';
import { renderWithRouter } from '../NavigationPanelDesktop/NavigationPanelDesktop.spec';
import userEvent from '@testing-library/user-event';

vi.mock('../../../pages/BlogSettings/BlogSettings', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid="blog-page"/>;
    },
}));

vi.mock('../../../pages/CatalogSettings/CatalogSettings', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid="catalog-page"/>;
    },
}));

vi.mock('../../../pages/ProductSettings/ProductSettings', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid="goods-page"/>;
    },
}));

vi.mock('../../../pages/SignIn/', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid="athorization">Athorization form</div>;
    },
}));

vi.mock('../../../pages/RegistrationSetting/RegistrationSetting', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid="registration-page"/>;
    },
}));

describe('NavigationPanelMobile', () => {

    const mockExit = vi.fn();

    beforeEach(() => {
        renderWithRouter(<NavigationPanelMobile ordersAmount={1} handleExit={mockExit}/>);
    });

    it('should render NavigatingPanelMobile', async () => {
        await waitFor(() => {
            const panelBtn = screen.getByLabelText('burger-icon');
            expect(panelBtn).toBeInTheDocument();
        });
    });

    it('Should after clicking the "Каталог" link, the Catalog page opens.', async () => {
        const panelBtn = screen.getByLabelText('burger-icon');
        userEvent.click(panelBtn);
        const btn = screen.getByText('Каталог');
        userEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('catalog-page')).toBeInTheDocument();
        });
    });

    it('Should after clicking the "Товар" link, the Goods page opens.', async () => {
        const panelBtn = screen.getByLabelText('burger-icon');
        userEvent.click(panelBtn);
        const btn = screen.getByText('Товар');
        userEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('goods-page')).toBeInTheDocument();
        });
    });

    it('Should after clicking the "Записи" link, the Registration page opens.', async () => {
        const panelBtn = screen.getByLabelText('burger-icon');
        userEvent.click(panelBtn);
        const btn = screen.getByText('Записи');
        userEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('registration-page')).toBeInTheDocument();
        });
    });

    it('Should after clicking the "Блог" link, the Blog page opens.', async () => {
        const panelBtn = screen.getByLabelText('burger-icon');
        userEvent.click(panelBtn);
        const btn = screen.getByText('Блог');
        userEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('blog-page')).toBeInTheDocument();
        });
    });

    it('Should after clicking the "Exit" link, the Sign-in page opens.', async () => {
        const panelBtn = screen.getByLabelText('burger-icon');
        userEvent.click(panelBtn);
        const btn = screen.getByText('Выход');
        userEvent.click(btn);
        await waitFor(() => {
            expect(mockExit).toHaveBeenCalled();
        });
    });
});
