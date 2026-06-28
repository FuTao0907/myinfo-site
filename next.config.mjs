import createMDX from '@next/mdx'
import { getToolingSharedConfig } from './config/tooling/shared.mjs'

const toolingSharedConfig = getToolingSharedConfig()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: toolingSharedConfig.mdxExtensions,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
}

const withMDX = createMDX({
})

export default withMDX(nextConfig)
