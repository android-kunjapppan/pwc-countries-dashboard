import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorAlert from "./../components/ErrorAlert";
import '@testing-library/jest-dom';

describe('ErrorAlert component', () => {
  it('renders error alert message', () => {
    render(<ErrorAlert />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Some Error Occurred')).toBeInTheDocument();
  });


  it('renders alert within a Box component', () => {
    render(<ErrorAlert />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});