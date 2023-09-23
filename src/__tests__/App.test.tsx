// Imports
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

// To Test
import App from '../App';

// Tests
describe('Renders main page correctly', async () => {
    it('Should render the page correctly', async () => {
        const wrapper = render(<App />)
        expect(wrapper).toBeTruthy()
    });
});