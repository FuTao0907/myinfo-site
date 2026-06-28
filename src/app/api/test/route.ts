// src/app/api/test/route.ts
import { NextResponse } from 'next/server'
import { getPublicEnv } from '@/env'

/**
 * 返回测试接口响应，并顺带校验当前公开环境变量是否已正确配置。
 */
export async function GET() {
  const env = getPublicEnv()

  return NextResponse.json({
    msg: 'API 工作了',
    amapKeyConfigured: Boolean(env.amapKey),
    time: new Date().toISOString(),
  })
}
