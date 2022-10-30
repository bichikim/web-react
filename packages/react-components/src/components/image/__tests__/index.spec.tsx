import {fireEvent, render} from '@testing-library/react'
import {Image} from '../Image'

describe('Image', () => {
  it('should render image', () => {
    const src = 'https://example.com/image.jpg'
    const wrapper = render(<Image src={src} />)
    expect(wrapper.getByRole('img').attributes.getNamedItem('src').value).toBe(src)
  })

  it('should render image with error', () => {
    const src = 'https://example.com/image.jpg'
    const fallbackSrc = 'https://example.com/fallback.jpg'
    const wrapper = render(<Image src={src} fallbackSrc={fallbackSrc} />)
    fireEvent.error(wrapper.getByRole('img'))
    expect(wrapper.getByRole('img').attributes.getNamedItem('src').value).toBe(fallbackSrc)
  })
})
