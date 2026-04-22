# @web-react/iconify-icons

Iconify `customCollections`에 연결하기 위한 커스텀 SVG 아이콘 모음 패키지입니다.

## 제공 아이콘

- `src/svg/app-logo.svg`
- `src/svg/sparkle-ring.svg`

## 사용 방법

### 1) Vite 설정에 컬렉션 연결

```ts
import icons from 'unplugin-icons/vite'
import {createIconifyCollection} from '@web-react/iconify-icons'

export default defineConfig({
  plugins: [
    icons({
      compiler: 'jsx',
      customCollections: {
        app: createIconifyCollection(),
      },
      jsx: 'react',
    }),
  ],
})
```

이 방식은 on-demand 로딩이라 실제로 import한 아이콘만 정규화됩니다.

### 2) 컴포넌트에서 아이콘 import

```tsx
import AppLogoIcon from '~icons/app/app-logo'
import SparkleRingIcon from '~icons/app/sparkle-ring'

export const Example = () => {
  return (
    <div>
      <AppLogoIcon />
      <SparkleRingIcon />
    </div>
  )
}
```

`app`은 `customCollections`에서 지정한 prefix이며, 아이콘 이름은 `src/svg` 파일명(확장자 제외)입니다.

## 커스텀 정규화

공통 정규화 함수는 `normalizeSvg`로 export 됩니다. 특정 아이콘만 추가 후처리가 필요하면 패키지 내부에서 아래처럼 적용하면 됩니다.

```ts
import specialIcon from './svg/special-icon.svg?raw'
import {normalizeSvg} from './index'

const specialIconSvg = normalizeSvg(specialIcon).replace(/stroke="black"/gu, 'stroke="currentColor"')
```
