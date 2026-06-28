import { getProjectPaths } from './paths.mjs'

/**
 * 返回根配置文件共享的扫描范围、忽略目录和扩展名，作为统一配置来源。
 */
export function getToolingSharedConfig() {
  const paths = getProjectPaths()

  return {
    projectPaths: paths,
    mdxExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    tailwindContent: [`${paths.srcDir}/**/*.{ts,tsx}`],
    ignoreDirs: ['.next', 'dist', 'coverage'],
  }
}
