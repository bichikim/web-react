import {Image} from '../Image'

export default {
  component: Image,
  title: 'Components/Image',
}

export const Default = () => {
  return <Image src="https://fakeimg.pl/300/"></Image>
}

export const Error = () => {
  return <Image src="https://iamerror.pl/300/" fallbackSrc="https://fakeimg.pl/300/"></Image>
}
