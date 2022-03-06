import React from 'react';

interface i18nMockProps {
    i18nKey: string;
}

jest.mock('react-i18next', () => ({
  Trans: ({ i18nKey }: i18nMockProps) => (<>{ i18nKey }</>)
}));
