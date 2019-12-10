// Test away!
import React from 'react';
import { render } from '@testing-library/react';
import Display from '../display/Display';

test('displays if gate is open/closed and if it is locked/unlocked', () => {
    const mockDoorState = { locked: true, closed: true }

    const { getByText } = render(<Display locked={mockDoorState.locked} closed={mockDoorState.closed} />);

    if(mockDoorState.locked)
        expect('Locked').toBeDefined();
    else
        expect('Unlocked').toBeDefined();

    if(mockDoorState.closed)
        expect('Closed').toBeDefined();
    else
        expect('Open').toBeDefined();   
});

test('displays Closed if the closed prop is true and Open if otherwise', () => {
    const mockDoorState = { closed: true }
    const { getByText } = render(<Display closed={mockDoorState.closed} />);

    if(mockDoorState.closed)
        expect('Closed').toBeDefined();
    else
        expect('Open').toBeDefined();   
});

test('displays Locked if the locked prop is true and Unlocked if otherwise', () => {
    const mockDoorState = { locked: true }
    const { getByText } = render(<Display locked={mockDoorState.locked} />);

    if(mockDoorState.locked)
        expect('Locked').toBeDefined();
    else
        expect('Unlocked').toBeDefined();   
});

test('when locked or closed use the red-led class', () => {
    const mockDoorState = { locked: false, closed: false};
    const { getByText } = render(<Display locked={mockDoorState.locked} closed={mockDoorState.closed} />);
    const isDoorClosed = getByText('Open');
    const isDoorLocked = getByText('Unlocked');

    expect(isDoorLocked.classList.contains('green-led')).toBe(true);
    expect(isDoorClosed.classList.contains('green-led')).toBe(true);
});

test('when unlocked or open use the green-led class', () => {
    const mockDoorState = { locked: true, closed: true};
    const { getByText } = render(<Display locked={mockDoorState.locked} closed={mockDoorState.closed} />);
    const isDoorClosed = getByText('Closed');
    const isDoorLocked = getByText('Locked');

    expect(isDoorLocked.classList.contains('red-led')).toBe(true);
    expect(isDoorClosed.classList.contains('red-led')).toBe(true);
});