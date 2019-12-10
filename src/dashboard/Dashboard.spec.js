// Test away
import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from './Dashboard';

test('shows the controls and display', () => {
    const { getByText } = render(<Dashboard />);

    getByText('Unlocked');
    const openDisplay = getByText('Open');
    getByText('Lock Gate');
    const closeControls = getByText('Close Gate');

    expect(openDisplay).toBeDefined();
    expect(closeControls).toBeDefined();
});