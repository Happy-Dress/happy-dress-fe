import { fireEvent, render, screen } from '@testing-library/react';
import { ProductsCard } from './ProductsCard';
import { PRODUCT_CARD_DICTIONARY } from './ProductsCard.dictionary';
import { setupStore } from '../../../../common/ui/store/setupStore';
import { Provider } from 'react-redux';
import ToastersProvider from '../../../../common/ui/contexts/ToastersContext';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const { TITLE, FIELDS, OK,} = PRODUCT_CARD_DICTIONARY;
const { NAME, MATERIAL, CATEGORY, MODELS } = FIELDS;

const renderWithProvider = () => (
    render(
        <Provider store={setupStore()}>
            <ToastersProvider>
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<ProductsCard/>}/>
                    </Routes>
                </MemoryRouter>
            </ToastersProvider>
        </Provider>
    )
);

describe('ProductsCard', () => {
    it('should render title', () => {
        renderWithProvider();

        expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
        expect(screen.getByText(TITLE)).toBeInTheDocument();
    });

    it('should have inputs error class', async () => {
        renderWithProvider();

        const submitButton = screen.getByText(OK);
        expect(submitButton).toBeInTheDocument;
        await fireEvent.click(submitButton);
        expect(await screen.findByText(NAME.ERROR_MESSAGE)).toBeInTheDocument();
        expect(await screen.findByText(CATEGORY.ERROR_MESSAGE)).toBeInTheDocument();
        expect(await screen.findByText(MATERIAL.ERROR_MESSAGE)).toBeInTheDocument();
        expect(await screen.findByText(MODELS.ERROR_MESSAGE)).toBeInTheDocument();
    });
});
