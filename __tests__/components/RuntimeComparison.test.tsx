import React from 'react';
import { render } from '@testing-library/react';
import RuntimeComparison from '@/app/components/RuntimeComparison';

describe('RuntimeComparison Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<RuntimeComparison />);
    expect(container).toBeInTheDocument();
  });

  it('displays comparison layout', () => {
    const { getAllByText, getByText, getByRole } = render(<RuntimeComparison />);

    // Use getAllByText since "Serverless" appears in both h1 and h2
    expect(getAllByText(/Serverless/i).length).toBeGreaterThan(0);
    expect(getAllByText(/Edge/i).length).toBeGreaterThan(0);

    // Check unique heading
    expect(getByText(/Serverless vs Edge/i)).toBeInTheDocument();

    // Use getByRole to target the button specifically
    expect(getByRole('button', { name: /Run Comparison/i })).toBeInTheDocument();
  });

  it('renders Run Comparison button', () => {
    const { getByRole } = render(<RuntimeComparison />);
    expect(getByRole('button', { name: /Run Comparison/i })).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<RuntimeComparison />);
    expect(container).toMatchSnapshot();
  });
});