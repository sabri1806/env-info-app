import { render } from '@testing-library/react'
import ImageOptimizationComparision from '@/app/components/ImageOptimizationComparision'

describe('ImageOptimizationComparision', () => {
  it('renders without crashing', () => {
    const { container } = render(<ImageOptimizationComparision />)
    expect(container).toBeInTheDocument()
  })

  it('renders standard HTML image section', () => {
    const { getByText } = render(<ImageOptimizationComparision />)
    expect(getByText('Standard HTML Image')).toBeInTheDocument()
  })

  it('renders Next.js optimized image section', () => {
    const { getByText } = render(<ImageOptimizationComparision />)
    expect(getByText('Next js Optimized Image')).toBeInTheDocument()
  })

  it('matches snapshot', () => {
    const { container } = render(<ImageOptimizationComparision />)
    expect(container).toMatchSnapshot()
  })
})