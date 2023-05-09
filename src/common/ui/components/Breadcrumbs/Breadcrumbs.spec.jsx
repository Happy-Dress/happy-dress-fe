import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from './Breadcrumbs';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const breadcrumbs = [
    { id: 0, link: '/domain/home', linkTitle: 'Главная' },
    { id: 1, link: '../products-settings', linkTitle: 'Управление товаром' },
];

const Menu = () => {
    return (
        <Breadcrumbs
            breadcrumbs={breadcrumbs}
        />
    );
};

describe('Breadcrumbs', () => {
    it('should render', () => {
        render(
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Menu/>}/>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getAllByRole('link')).toHaveLength(2);
        expect(screen.getAllByText('>')).toHaveLength(1);
    });
});
