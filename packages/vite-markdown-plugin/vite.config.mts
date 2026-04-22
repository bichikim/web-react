import {createViteConfig} from '@web-react/lib-config/create-vite-config.mts'
import path from 'node:path'
import fs from 'node:fs'

const runtimeRoot = process.cwd()
const packageJsonPath = path.join(runtimeRoot, 'package.json')
// eslint-disable-next-line unicorn/prefer-json-parse-buffer
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, `utf8`))

export default createViteConfig({
  ...packageJson,
  nodeOnly: true,
  root: runtimeRoot,
})()
