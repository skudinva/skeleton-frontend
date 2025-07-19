'use client'

import theme from '@/app/theme/themeConfig'
import { ConfigProvider } from 'antd'
import React from 'react'

const AntdProvider = ({ children }: { children: React.ReactNode }) => {
	return <ConfigProvider theme={theme}>{children}</ConfigProvider>
}

export default AntdProvider
