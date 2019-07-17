import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import renderer from 'react-test-renderer';
import 'react-testing-library/cleanup-after-each';

import Display from './Display';

describe('<Display />', () => {
	it('displays "Closed" if the closed prop is true', () => {
		const props = {
			closed: true,
		};
		const { getByText } = render(<Display {...props} />);
		getByText(/Closed/i);
	});

	it('displays "Open" if the closed prop is false', () => {
		const props = {
			closed: false,
		};
		const { getByText } = render(<Display {...props} />);
		getByText(/Open/i);
	});

	it('displays "Unlocked" if the locked prop is false', () => {
		const props = {
			locked: false,
		};
		const { getByText } = render(<Display {...props} />);
		getByText(/Unlocked/i);
	});

	it('displays "Locked" if the locked prop is true', () => {
		const props = {
			locked: true,
		};
		const { getByText } = render(<Display {...props} />);
		getByText(/Locked/i);
	});

	it('uses red-led class when locked or closed', () => {
		const props = {
			closed: true,
			locked: true,
		};
		const { getByText } = render(<Display {...props} />);
		expect(getByText(/Closed/i).className).toContain('red-led');
		expect(getByText(/Locked/i).className).toContain('red-led');
	});

	it('uses green-led class when unlocked or open', () => {
		const props = {
			closed: false,
			locked: false,
		};
		const { getByText } = render(<Display {...props} />);
		expect(getByText(/Open/i).className).toContain('green-led');
		expect(getByText(/Unlocked/i).className).toContain('green-led');
	});
});
