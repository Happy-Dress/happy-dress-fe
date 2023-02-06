import React from 'react';
import { render, waitFor } from '@testing-library/react';
import GoodsSetting from './index';
import { BrowserRouter } from 'react-router-dom';

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

jest.mock('../../../../common/api/catalogueSettings/retrieveCatalogueSettings', () =>({
    __esModule: true,
    default: () => Promise.resolve({ ...response }),
}));

jest.mock('../../../../common/api/catalogueItems/getCatalogueItems', () =>({
    __esModule: true,
    default: () => Promise.resolve([
        {
            id: 1,
            name: 'S000012345',
            colors: [
                '#fff',
                '#000',
                '#a65f30'
            ],
            sizes: [1, 2, 3, 4],
            category: 'Свадебные',
            imageUrl: 'url'
        },
        {
            id: 2,
            name: 'S000012346',
            colors: [
                '#fff',
                '#000',
                '#a65f30'
            ],
            sizes: [1, 2, 3, 4],
            category: 'Деловой стиль',
            imageUrl: 'url'
        },
    ]),
}));

describe('GoodsSetting', () => {
    it('should render correctly', async () => {
        const { container } = render(<GoodsSetting/>, { wrapper: BrowserRouter });

        await waitFor(async () => {
            const goodsSetting = container.getElementsByClassName('GoodsSetting')[0];
            const goodsSettingContent = container.getElementsByClassName('GoodsSettingContent')[0];
            expect(goodsSetting).toBeInTheDocument();
            expect(goodsSettingContent).toBeInTheDocument();
        });
    });
});