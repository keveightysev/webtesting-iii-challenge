import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import renderer from 'react-test-renderer';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

import Controls from './Controls';
import Dashboard from '../dashboard/Dashboard';

describe('<Controls />', () => {
	it('defaults to unlocked and open', () => {
		const { getByText } = render(<Controls />);
		getByText(/lock gate/i);
		getByText(/close gate/i);
	});

	it('changes "close gate" to "open gate" when clicked', () => {
		let props = {
			closed: false,
		};

		const closeMock = jest.fn(() => {
			props.closed = !props.closed;
		});

		const { getByText, rerender } = render(
			<Controls {...props} toggleClosed={closeMock} />,
		);

		const closeBtn = getByText(/close gate/i);
		fireEvent.click(closeBtn);
		rerender(<Controls {...props} />);
		expect(closeBtn.innerHTML).toBe('Open Gate');
	});

	it('changes "lock gate" to "unlock gate" when clicked', () => {
		let props = {
			closed: true,
			locked: false,
		};

		const lockMock = jest.fn(() => {
			props.locked = !props.locked;
		});

		const { getByText, rerender } = render(
			<Controls {...props} toggleLocked={lockMock} />,
		);

		const lockBtn = getByText(/lock gate/i);

		fireEvent.click(lockBtn);
		rerender(<Controls {...props} />);
		expect(lockBtn.innerHTML).toBe('Unlock Gate');
	});

	it('lock button disabled if gate open', () => {
		const { getByText } = render(<Controls />);

		const lockBtn = getByText(/lock gate/i);

		expect(lockBtn.disabled).toBeTruthy();
	});

	it('open button disabled if locked', () => {
		let props = {
			closed: true,
			locked: true,
		};

		const { getByText } = render(<Controls {...props} />);

		const closeBtn = getByText(/open gate/i);
		const lockBtn = getByText(/unlock gate/i);

		expect(closeBtn.disabled).toBeTruthy();
	});
});
