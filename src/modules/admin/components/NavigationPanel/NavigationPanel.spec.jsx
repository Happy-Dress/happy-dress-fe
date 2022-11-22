import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import NavigationPanel from './NavigationPanel';
import NavigationPanelDesktop from './NavigationPanelDesktop/NavigationPanelDesktop';
import NavigationPanelMobile from './NavigationPanelMobile/NavigationPanelMobile';


const media = (x) =>{
    if(x.matches){
        return render(
            <MemoryRouter>
                <NavigationPanel />
                <NavigationPanelDesktop />
            </MemoryRouter>
        );
    }
    
};
describe('NavigationPanel', () => {
    
    it('should rendering  NavigatingPanelDes', async () => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
        const mmObj = window.matchMedia('(min-width: 1024px)');
        media(mmObj);
        mmObj.addListener();      
        expect(screen.getByRole('desktopPanel')).toBeInTheDocument();
        expect(screen.getByRole('mobilePanel')).toBeInTheDocument();
        screen.debug();
    });
});
