import path from 'node:path'

/**
 * 返回项目配置层复用的关键路径定义，避免各工具重复维护目录常量。
 */
export function getProjectPaths() {
  return {
    srcAlias: '@',
    srcDir: './src',
    appDir: './src/app',
    contentDir: './src/blog',
  }
}

/**
 * 返回 TypeScript `paths` 字段使用的别名映射，作为当前仓库的规范来源。
 */
export function getTypeScriptPathAliases() {
  const paths = getProjectPaths()

  return {
    [`${paths.srcAlias}/*`]: [`${paths.srcDir}/*`],
  }
}

/**
 * 返回 Vitest `resolve.alias` 使用的绝对路径映射，避免在配置文件里手动拼接。
 */
export function getVitestAliasEntries(projectRootDir) {
  const paths = getProjectPaths()
  const normalizedSrcDir = paths.srcDir.replace(/^\.\//, '')

  return {
    [paths.srcAlias]: path.join(projectRootDir, normalizedSrcDir),
  }
}
