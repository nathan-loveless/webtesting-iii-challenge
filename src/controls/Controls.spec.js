// Test away!
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Controls from '../controls/Controls';

test('provide buttons to toggle the closed and locked states.', () => {
    const { getAllByText } = render(<Controls />);
    const gate = getAllByText(/gate/i);
    expect(gate).toBeDefined();
});

test('buttons text changes to reflect the state the door will be in if clicked', () => {
    let mockDoorState = { locked: false, closed: false }

    const toggleLockedDoor = jest.fn();
    const toggleClosedDoor = jest.fn();
    const { getAllByText } = render(<Controls locked={mockDoorState.locked} toggleLocked={toggleLockedDoor} closed={mockDoorState.closed} toggleClosed={toggleClosedDoor}/>);
    const [toggleDoorLock, toggleDoorClose ] = getAllByText(/gate/i);
    fireEvent.click(toggleDoorClose);
    expect(toggleClosedDoor).toHaveBeenCalled();
    expect(toggleDoorClose.textContent).toBe('Close Gate');
    expect(toggleDoorLock.textContent).toBe('Lock Gate');
});

test('the closed toggle button is disabled if the gate is locked', () => {
    const toggleClosedDoor = jest.fn();
    const { getByText } = render(<Controls locked={true} toggleClosed={toggleClosedDoor} />);
    const button = getByText('Close Gate');
    fireEvent.click(button);
    expect(toggleClosedDoor).not.toHaveBeenCalled();
});

test('the locked toggle button is disabled if the gate is open', () => {
    const toggleLockedDoor = jest.fn();
    const { getByText } = render(<Controls closed={false} toggleLocked={toggleLockedDoor} />)
    const button = getByText('Lock Gate');
    fireEvent.click(button)
    expect(toggleLockedDoor).not.toHaveBeenCalled();
});