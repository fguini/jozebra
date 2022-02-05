import { useEffect } from 'react';
import { BACKSPACE_KEY, ENTER_KEY } from '../utils';

export function useKeyboardListener() {
    useEffect(() => {
        function runOnKeyEvent(key: string, callback: (element: HTMLElement) => void) {
            if (
                (key.length === 1 && /[a-zñ]/i.test(key))
                || [ BACKSPACE_KEY, ENTER_KEY ].includes(key)
            ) {
                const element = document.getElementById(`key-${key.toLowerCase()}`);
                if(element) {
                    callback(element);
                }
            }
        }

        const handleKeyUp = ({ key }: KeyboardEvent) => runOnKeyEvent(key, (element) => {
            element.classList.remove('active');
            element.click();
        });

        const handleKeyDown = ({ key }: KeyboardEvent) => runOnKeyEvent(key, (element) => {
            element.classList.add('active');
        });

        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('keyup', handleKeyDown);
        };
    }, []);
}
