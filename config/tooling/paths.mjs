import path from 'node:path'

/**
 * 返回项目配置层复用的关键路径定义，避免各工具重复维护目录常量。
 */
export function getProjectPaths() {
  return {
    srcAlias: '@',
    rootAlias: '~',
    srcDir: './src',
    appDir: './src/app',
    domainsDir: './src/domains',
    sharedDir: './src/shared',
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
    [`${paths.rootAlias}/*`]: [`${paths.srcDir}/*`],
    [`${paths.rootAlias}app/*`]: [`${paths.appDir}/*`],
    [`${paths.rootAlias}shared/*`]: [`${paths.sharedDir}/*`],
    [`${paths.rootAlias}domains/*`]: [`${paths.domainsDir}/*`],
    [`${paths.rootAlias}blog/*`]: [`${paths.domainsDir}/blog/*`],
    [`${paths.rootAlias}home/*`]: [`${paths.domainsDir}/home/*`],
    [`${paths.rootAlias}project/*`]: [`${paths.domainsDir}/project/*`],
    [`${paths.rootAlias}resume/*`]: [`${paths.domainsDir}/resume/*`],
    [`${paths.rootAlias}search/*`]: [`${paths.domainsDir}/search/*`],
    [`${paths.rootAlias}site/*`]: [`${paths.domainsDir}/site/*`],
  }
}

/**
 * 返回 Vitest `resolve.alias` 使用的绝对路径映射，避免在配置文件里手动拼接。
 */
export function getVitestAliasEntries(projectRootDir) {
  const paths = getProjectPaths()
  const normalizedSrcDir = paths.srcDir.replace(/^\.\//, '')
  const normalizedAppDir = paths.appDir.replace(/^\.\//, '')
  const normalizedDomainsDir = paths.domainsDir.replace(/^\.\//, '')
  const normalizedSharedDir = paths.sharedDir.replace(/^\.\//, '')

  return {
    [paths.srcAlias]: path.join(projectRootDir, normalizedSrcDir),
    [paths.rootAlias]: path.join(projectRootDir, normalizedSrcDir),
    [`${paths.rootAlias}app`]: path.join(projectRootDir, normalizedAppDir),
    [`${paths.rootAlias}shared`]: path.join(projectRootDir, normalizedSharedDir),
    [`${paths.rootAlias}domains`]: path.join(projectRootDir, normalizedDomainsDir),
    [`${paths.rootAlias}blog`]: path.join(projectRootDir, normalizedDomainsDir, 'blog'),
    [`${paths.rootAlias}home`]: path.join(projectRootDir, normalizedDomainsDir, 'home'),
    [`${paths.rootAlias}project`]: path.join(projectRootDir, normalizedDomainsDir, 'project'),
    [`${paths.rootAlias}resume`]: path.join(projectRootDir, normalizedDomainsDir, 'resume'),
    [`${paths.rootAlias}search`]: path.join(projectRootDir, normalizedDomainsDir, 'search'),
    [`${paths.rootAlias}site`]: path.join(projectRootDir, normalizedDomainsDir, 'site'),
  }
}
