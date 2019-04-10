import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import renderer from 'react-test-renderer';
import 'react-testing-library/cleanup-after-each';

import Controls from './Controls';
import Dashboard from '../dashboard/Dashboard';

describe('<Controls />', () => {
	it('defaults to unlocked and open', () => {
		const { getByText } = render(<Controls />);
		getByText(/lock gate/i);
		getByText(/close gate/i);
	});

	it('changes text when clicked', () => {
		const { getByText } = render(<Dashboard />);

		const closeBtn = getByText(/close gate/i);
		const lockBtn = getByText(/lock gate/i);

		fireEvent.click(closeBtn);
		fireEvent.click(lockBtn);

		getByText(/open gate/i);
		getByText(/unlock gate/i);
	});

	it('lock button disabled if gate open', () => {
		const { getByText } = render(<Dashboard />);

		const lockBtn = getByText(/lock gate/i);

		expect(lockBtn.disabled).toBeTruthy();
	});

	it('open button disabled if locked', () => {
		const { getByText } = render(<Dashboard />);

		const closeBtn = getByText(/close gate/i);
		const lockBtn = getByText(/lock gate/i);

		fireEvent.click(closeBtn);
		fireEvent.click(lockBtn);

		expect(closeBtn.disabled).toBeTruthy();
	});
});
