interface PublicEnv {
  amapKey: string
  amapSecurityJsCode: string
}

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
 * 返回当前项目依赖的公开环境变量集合，并在缺失时统一报错。
 */
export function getPublicEnv(): PublicEnv {
  return {
    amapKey: requirePublicEnvValue('NEXT_PUBLIC_AMAP_KEY'),
    amapSecurityJsCode: requirePublicEnvValue('NEXT_PUBLIC_AMAP_SECURITY_JS_CODE'),
  }
}
