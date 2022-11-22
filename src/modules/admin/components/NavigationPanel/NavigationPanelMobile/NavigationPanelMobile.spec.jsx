import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import NavigationPanelMobile from './NavigationPanelMobile';
import CatalogSetting from '../../../pages/CatalogSetting/CatalogSetting';
import GoodsSetting from '../../../pages/GoodsSetting/GoodsSetting';
import BlogSetting from '../../../pages/BlogSetting/BlogSetting';
import RegistrationSetting from '../../../pages/RegistrationSetting/RegistrationSetting';

describe('NavigationPanelMobile', () => {
    it('should rendering/adminNavigatingPanel', async () => {
        const { getByText, baseElement } = render(
            <MemoryRouter>
                <NavigationPanelMobile />
            </MemoryRouter>
        );
        expect(baseElement).toBeInTheDocument();
        expect(getByText('HAPPYDRESS')).toBeInTheDocument();
    });
    const user = userEvent.setup();

    it('Should after clicking the "Каталог" link, the Catalog page opens.', () => {
        const { baseElement } = render(
            <MemoryRouter>
                <NavigationPanelMobile />
                <CatalogSetting />
            </MemoryRouter>
        );
        user.click(screen.getAllByText('Управление каталогом'));
        expect(baseElement).toBeInTheDocument();
    });

    it('Should after clicking the "Товар" link, the Goods page opens.', () => {
        const { baseElement } = render(
            <MemoryRouter>
                <NavigationPanelMobile />
                <GoodsSetting />
            </MemoryRouter>
        );
        user.click(screen.getAllByText('Карта товара'));
        expect(baseElement).toBeInTheDocument();
    });

    it('Should after clicking the "Записи" link, the Registration page opens.', () => {
        const { baseElement } = render(
            <MemoryRouter>
                <NavigationPanelMobile />
                <RegistrationSetting />
            </MemoryRouter>
        );
        user.click(screen.getAllByText('Управление записями'));
        expect(baseElement).toBeInTheDocument();
    });

    it('Should after clicking the "Блог" link, the Blog page opens.', () => {
        const { baseElement } = render(
            <MemoryRouter>
                <NavigationPanelMobile />
                <BlogSetting />
            </MemoryRouter>
        );
        user.click(screen.getAllByText('Управление блогом'));
        expect(baseElement).toBeInTheDocument();
    });
});
