import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SettingsList from './SettingsList';
import styles from './SettingsList.module.scss';

const props = {
    settings: [
        {
            'id': 394,
            'name': 'Длинные',
            orderNumber: 0,
        },
        {
            'id': 224,
            'name': 'Короткие',
            orderNumber: 1,
        }
    ],
    handleReorder: vi.fn(),
    onEdit: vi.fn(),
    onRemove: vi.fn(),
    onSelect: vi.fn(),
    onUnSelect: vi.fn()
};

describe('SettingsList', () => {
    it('should render', () => {
        const { container } = render(<SettingsList {...props}/>);

        expect(container.getElementsByClassName(styles.SettingsList)[0]).toBeInTheDocument();
        expect(container.getElementsByClassName(styles.listArea)[0]).toBeInTheDocument();
        expect(screen.getByText(props.settings[0].name)).toBeInTheDocument();

        screen.debug();
    });
});
