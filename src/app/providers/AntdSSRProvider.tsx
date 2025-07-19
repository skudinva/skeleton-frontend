'use client'

import theme from '@/app/theme/themeConfig'
import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider } from 'antd'
import React from 'react'

const AntdSSRProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<ConfigProvider theme={theme}>
			<StyleProvider hashPriority='high'>{children}</StyleProvider>
		</ConfigProvider>
	)
}

export default AntdSSRProvider
