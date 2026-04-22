import {FileSystemIconLoader} from 'unplugin-icons/loaders'
import {join, resolve, sep} from 'node:path'

/**
 * Vite(Node.js) 프로세스에서 SVG 문자열을 공통 정규화합니다.
 *
 * 실행 흐름:
 * 1) `apps/client/vite.config.ts`가 로드되며 `@web-react/iconify-icons`를 import합니다.
 * 2) `createIconifyCollection()`이 패키지의 `src/svg`(고정) 디렉터리를 기준으로 `FileSystemIconLoader(..., normalizeSvg)`를 생성합니다.
 * 3) 앱 코드에서 `~icons/app/*`를 import한 아이콘에 대해서만 `normalizeSvg()`가 호출됩니다.
 * 4) 정규화된 결과를 기준으로 아이콘 컴포넌트 코드가 생성됩니다.
 *
 * 참고: 브라우저 렌더링 시점이 아니라 Vite dev/build의 Node 런타임에서
 * "요청된 아이콘만" 처리되는 on-demand 전처리 함수입니다.
 */
export const normalizeSvg = (svg: string) => {
  return svg.replace(/<svg\b(?<attributes>[^>]*)>/u, (...args) => {
    const groups = args.at(-1) as {attributes?: string} | undefined
    const attributes = groups?.attributes ?? ''
    const withoutSize = attributes.replaceAll(/\s(?:width|height)="[^"]*"/gu, '')
    const hasFill = /\sfill=/u.test(withoutSize)
    const fillAttribute = hasFill ? '' : ' fill="currentColor"'
    return `<svg${fillAttribute}${withoutSize}>`
  })
}

const currentDirectoryPath = __dirname
const isDistBuild = currentDirectoryPath.endsWith(`${sep}dist`)
const iconifyIconsPackageRootPath = isDistBuild
  ? resolve(currentDirectoryPath, '..')
  : currentDirectoryPath
const resolvedIconDirectoryPath = join(iconifyIconsPackageRootPath, 'src', 'svg')

/**
 * 패키지에 포함된 `src/svg` 디렉터리(절대 경로)입니다.
 */
export const iconifyIconsDirectory = resolvedIconDirectoryPath

/**
 * `unplugin-icons`의 on-demand 컬렉션 로더를 생성합니다.
 *
 * 사용 예시:
 * `app: createIconifyCollection()`
 */
export const createIconifyCollection = () => {
  return FileSystemIconLoader(resolvedIconDirectoryPath, normalizeSvg)
}
