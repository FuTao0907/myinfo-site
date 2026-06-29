interface PublicEnv {
  amapKey: string
  amapSecurityJsCode: string
}

const DEFAULT_CONTENT_API_BASE_URL = 'http://localhost:3001/api'

/**
 * 读取单个公开环境变量，缺失时立即抛错，避免运行时静默失败。
 */
function requirePublicEnvValue(name: 'NEXT_PUBLIC_AMAP_KEY' | 'NEXT_PUBLIC_AMAP_SECURITY_JS_CODE') {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing ${name}`)
  }

  return value
}

/**
 * 返回可选的公开环境变量集合，适用于允许降级运行的展示配置。
 */
export function getOptionalPublicEnv(): PublicEnv {
  return {
    amapKey: process.env.NEXT_PUBLIC_AMAP_KEY ?? '',
    amapSecurityJsCode: process.env.NEXT_PUBLIC_AMAP_SECURITY_JS_CODE ?? '',
  }
}

/**
 * 返回当前项目依赖的公开环境变量集合，并在缺失时统一报错。
 */
export function getPublicEnv(): PublicEnv {
  return {
    amapKey: requirePublicEnvValue('NEXT_PUBLIC_AMAP_KEY'),
    amapSecurityJsCode: requirePublicEnvValue('NEXT_PUBLIC_AMAP_SECURITY_JS_CODE'),
  }
}

/**
 * 返回内容接口地址，优先使用服务端地址，其次回退到公开地址和本地默认值。
 */
export function getContentApiBaseUrl(): string {
  return (
    process.env.MYINFO_API_BASE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    DEFAULT_CONTENT_API_BASE_URL
  )
}
