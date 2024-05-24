import {describe, it ,expect , vi} from 'vitest';
import App from './App';
import { fireEvent, render,screen } from '@testing-library/react';
import '@testing-library/jest-dom';


describe('App component',()=>{
        it('should have Click button',()=>{
        render(<App/>);
            const button = screen.getByRole('button',{name:'Click'});
            expect(button).toBeInTheDocument();
            expect(button).toHaveAttribute('style','background-color: red;');
        })
        it('should update color of button on click',()=>{
            render(<App/>);
            const button = screen.getByRole('button',{name:'Click'});
            fireEvent.click(button);
            expect(button).toHaveAttribute('style','background-color: blue;');
            fireEvent.click(button);
            expect(button).toHaveAttribute('style','background-color: green;');
            fireEvent.click(button);
            expect(button).toHaveAttribute('style','background-color: red;');
        })
        it('Should have local time,GMT time, ACT time values set to Never at start',()=>{
            let result = render(<App/>);
            const localTime = result.container.querySelector('#localTime');
            const gmtTime = result.container.querySelector('#gmtTime');
            const actTime = result.container.querySelector('#actTime');

            expect(localTime).toBeInTheDocument();
            expect(localTime).toHaveTextContent('Local Time: Never');
            expect(gmtTime).toBeInTheDocument();
            expect(gmtTime).toHaveTextContent('GMT Time: Never');
            expect(actTime).toBeInTheDocument();
            expect(actTime).toHaveTextContent('ACT Time: Never');

        })
        it('Should update the local,GMT,ACT time on click',()=>{
            let result = render(<App/>);
            const localTime = result.container.querySelector('#localTime');
            const gmtTime = result.container.querySelector('#gmtTime');
            const actTime = result.container.querySelector('#actTime');
            const mockDate = new Date(2024, 4, 24, 10, 0, 0);
            vi.setSystemTime(mockDate);
            const button = screen.getByRole('button',{name:'Click'});
            fireEvent.click(button);
            const expectedLocalTime = mockDate.toLocaleString();
            const expectedGMTTime = mockDate.toUTCString();
            const expectedACTTime = mockDate.toLocaleString('en-US',{timeZone:'Australia/Darwin'});
            expect(localTime).toHaveTextContent(`Local Time: ${expectedLocalTime}`);
            expect(gmtTime).toHaveTextContent(`GMT Time: ${expectedGMTTime}`);
            expect(actTime).toHaveTextContent(`ACT Time: ${expectedACTTime}`);
        })
})
