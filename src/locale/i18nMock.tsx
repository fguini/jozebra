import React from 'react';

interface i18nMockProps {
    i18nKey: string;
}

jest.mock('react-i18next', () => {
    let currentLng = 'es';

    return ({
        Trans: ({ i18nKey }: i18nMockProps) => (<>{ i18nKey }</>),
        useTranslation: () => {
            return {
                t: (value: string) => value,
                i18n: {
                    changeLanguage: (lng: string) => new Promise((resolve: (value?: any) => void) => {
                        currentLng = lng;
                        resolve();
                    }),
                    language: currentLng
                },
            };
        },
    });
});
