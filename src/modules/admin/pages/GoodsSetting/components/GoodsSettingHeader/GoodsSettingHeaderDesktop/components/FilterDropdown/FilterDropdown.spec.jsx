import { act, render, waitFor, screen } from '@testing-library/react';
import React from 'react';
import FilterDropdown from './FilterDropdown';
import userEvent from '@testing-library/user-event';

const options = [
    {
        id: 24,
        name: 'Имя1'
    },
    {
        id: 14,
        name: 'Имя2'
    },
    {
        id: 34,
        name: 'Имя3'
    },
];

describe('FilterDropdown', () => {
    it('should open FiltersOption', async () => {
        const currentFilters = {
            categories: '4',
            models: '24,14'
        };
        const { container } = render(<FilterDropdown
            currentFilters={currentFilters}
            name={'models'}
            options={options}
            setCurrentFilters={() => {}}
        />);

        await waitFor(async () => {
            let optionsContainer = await container.getElementsByClassName('options');
            expect(optionsContainer[0]).toHaveStyle('height: 0');
            await userEvent.click(container.getElementsByClassName('currentFilter')[0]);
            optionsContainer = await container.getElementsByClassName('options');
            expect(optionsContainer[0]).toHaveStyle(`height: calc(60px * ${options.length})`);
        });
    });

    it('should check checkBox', async () => {
        const currentFilters = {
            categories: '4',
            models: ''
        };
        const { container } = render(<FilterDropdown
            currentFilters={currentFilters}
            name={'models'}
            options={options}
            setCurrentFilters={() => {}}
        />);

        await waitFor(async () => {
            const empty = await container.getElementsByClassName('empty')[0];

            await act(() => {
                userEvent.click(container.getElementsByClassName('currentFilter')[0]);
            });

            expect(empty).toBeInTheDocument();

            await act(() => {
                userEvent.click(screen.getAllByPlaceholderText('checkbox')[0]);
            });

            const checked = await container.getElementsByClassName('checkbox')[0];

            expect(checked).toBeInTheDocument();
        });
    });
});