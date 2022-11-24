import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import NavigationPanelMobile from './NavigationPanelMobile';
import { AppRouter } from '../NavigationPanelDesktop/NavigationPanelDesktop.spec';


jest.mock('../../../pages/SignIn/', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid="athorization">Athorization form</div>;
    },
}));



describe('NavigationPanelMobile', () => {
    it('should render NavigatingPanelMobile', async () => {
        render(
            <MemoryRouter>
                <NavigationPanelMobile />
            </MemoryRouter>
        );
        const panelMobile = screen.getByTestId('mobilePanel');
        await waitFor(() => {
            expect(panelMobile).toBeInTheDocument();
        });
    });

    it('Should after clicking the "Каталог" link, the Catalog page opens.', async () => {
        
        render(
            <MemoryRouter>
                <NavigationPanelMobile />
                <AppRouter />
            </MemoryRouter>
        );
        const menuBtn = screen.getByTestId('activeMenu');
        fireEvent.click(menuBtn);
        const btn = screen.getByTestId('Каталог');
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('catalog-page')).toBeInTheDocument();
            screen.debug();
        });
    });

    it('Should after clicking the "Товар" link, the Goods page opens.', async () => {
        
        render(
            <MemoryRouter>
                <NavigationPanelMobile />
                <AppRouter />
            </MemoryRouter>
        );
        const menuBtn = screen.getByTestId('activeMenu');
        fireEvent.click(menuBtn);
        const btn = screen.getByTestId('Товар');
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('goods-page')).toBeInTheDocument();
            screen.debug();
        });
    });
    it('Should after clicking the "Записи" link, the Registration page opens.', async () => {
        render(
            <MemoryRouter>
                <NavigationPanelMobile />
                <AppRouter />
            </MemoryRouter>
        );
        const menuBtn = screen.getByTestId('activeMenu');
        fireEvent.click(menuBtn);
        const btn = screen.getByTestId('Записи');
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('registration-page')).toBeInTheDocument();
            screen.debug();
        });
    });

    it('Should after clicking the "Блог" link, the Blog page opens.', async () => {
        render(
            <MemoryRouter>
                <NavigationPanelMobile />
                <AppRouter />
            </MemoryRouter>
        );
        const menuBtn = screen.getByTestId('activeMenu');
        fireEvent.click(menuBtn);
        const btn = screen.getByTestId('Блог');
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('blog-page')).toBeInTheDocument();
            screen.debug();
        });
    });
});
