import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import GoodsSettingHeaderDesktop from './GoodsSettingHeaderDesktop';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const response = {
    'categories': [
        {
            'id': 4,
            'name': 'Свадебные',
            'description': 'В 2019 году HAPPYDRESS управляла 487 магазинами.',
            'imageUrl': 'http://drive.google.com/uc?export=view&id=1GzPcAb4BzO3BhUD8ATRTltmTRwKDOqz5'
        },
        {
            'id': 14,
            'name': 'Деловой Стиль',
            'description': 'Любая вечеринка станет незабываемой году управляла 487 магазинами.',
            'imageUrl': 'http://drive.google.com/uc?export=view&id=1nqtbehgBr1B-yexWuPY5WFz2ioxtOsk9'
        },
        {
            'id': 24,
            'name': 'Вечерние',
            'description': 'В 2019 году HAPPYDRESS управляла 487 магазинами.',
            'imageUrl': 'http://drive.google.com/uc?export=view&id=1sGnX9iA9Eji3HQNdg6DLSETflmgbhKIS'
        },
        {
            'id': 34,
            'name': 'Детские',
            'description': 'Радуйте своих детей с нами.',
            'imageUrl': 'http://drive.google.com/uc?export=view&id=1BV2Eau8tcCjbajQuz9gxRR8sLU2nutQp'
        },
        {
            'id': 44,
            'name': 'Коктейльные',
            'description': 'Любая вечеринка станет незабываемой.',
            'imageUrl': 'http://drive.google.com/uc?export=view&id=1mwjmrNd6eqce6vCdEXE8koKAcnk7hiP2'
        }
    ],
    'models': [
        {
            'id': 24,
            'name': 'Короткие'
        },
        {
            'id': 14,
            'name': 'Прямые'
        },
        {
            'id': 4,
            'name': 'Пышные'
        },
        {
            'id': 34,
            'name': 'Со шлейфом'
        }
    ],
    'materials': [
        {
            'id': 34,
            'name': 'Атлас'
        },
        {
            'id': 4,
            'name': 'Кружево'
        },
        {
            'id': 44,
            'name': 'Оргганза'
        },
        {
            'id': 24,
            'name': 'Фатин'
        },
        {
            'id': 14,
            'name': 'Шифон'
        }
    ],
    'colors': [
        {
            'id': 4,
            'name': 'красный',
            'firstColor': '#FF0000',
            'secondColor': null
        },
        {
            'id': 14,
            'name': 'белый',
            'firstColor': '#FFFFFF',
            'secondColor': null
        }
    ]
};

jest.mock('../../../../../../domain/api/catalogueSettings/retrieveCatalogueSettings', () =>({
    __esModule: true,
    default: () => Promise.resolve({ ...response }),
}));

describe('GoodsSettingHeaderDesktop', () => {

    it('should render correct layout', async () => {
        const { container } = render(<GoodsSettingHeaderDesktop/>, { wrapper: BrowserRouter });
        await waitFor(() => {
            const title = screen.getAllByText('Управление товаром');
            expect(title.length).toBe(2);
            expect(container.getElementsByClassName('searchContainer').length).toBe(1);
            expect(container.getElementsByClassName('DressCategories').length).toBe(1);
            expect(container.getElementsByClassName('searchBar').length).toBe(1);
            expect(container.getElementsByClassName('filters').length).toBe(1);
            expect(container.getElementsByClassName('currentFilters').length).toBe(1);
        });
    });

    it('should have active dress category', async () => {
        window.history.pushState({}, 'Test Title', '/admin/panel/goods-setting?categories=4');
        const { container } = render(<GoodsSettingHeaderDesktop/>, { wrapper: BrowserRouter });
        await waitFor(() => {
            const active = container.getElementsByClassName('active');
            expect(active.length).toBe(1);
        });
    });

    it('should open filters section', async () => {
        const { container } = render(<GoodsSettingHeaderDesktop/>, { wrapper: BrowserRouter });
        await waitFor(async () => {
            let filters = await container.getElementsByClassName('filters');

            expect(filters[0]).toHaveStyle('display: none');

            await act(() => {
                userEvent.click(container.querySelector('#filterIcon'));
            });

            expect(filters[0]).toHaveStyle('display: flex');
        });
    });
});