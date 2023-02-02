import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import GoodsSettingHeader from './GoodsSettingHeader';

jest.mock('./GoodsSettingHeaderDesktop', () => ({
    __esModule: true,
    default: () => <div>Goods Setting Header desktop</div>
}));

jest.mock('./GoodsSettingHeaderMobile', () => ({
    __esModule: true,
    default: () => <div>Goods Setting Header mobile</div>
}));

let mockIsMobileWidth = false;
let mockIsMobileHeight = false;
let mockIsDesktopWidth = false;

jest.mock('../../hooks/useGoodsMediaQuery', () => () => ({
    isMobileWidth: mockIsMobileWidth,
    isMobileHeight: mockIsMobileHeight,
    isDesktopWidth: mockIsDesktopWidth,
}));

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

describe('GoodsSettingHeader', () => {
    it('should render desktop goods setting component', async () => {
        mockIsDesktopWidth = true;
        mockIsMobileWidth = false;
        mockIsMobileHeight = false;

        render(<GoodsSettingHeader filters={response}/>);

        await waitFor(async () => {
            const desktopPanel = await screen.getByText('Goods Setting Header desktop');
            expect(desktopPanel).toBeInTheDocument();
        });
    });
    it('should render mobile goods setting component', async () => {
        mockIsMobileWidth = true;
        mockIsMobileHeight = true;
        mockIsDesktopWidth = false;

        render(<GoodsSettingHeader filters={response}/>);

        await waitFor(async () => {
            const mobilePanel = await screen.getByText('Goods Setting Header mobile');
            expect(mobilePanel).toBeInTheDocument();
        });
    });
});