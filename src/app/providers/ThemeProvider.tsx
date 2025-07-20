'use client'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider, theme } from 'antd'
import { useTheme } from 'next-themes'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const { resolvedTheme } = useTheme()

	return (
		<AntdRegistry>
			<ConfigProvider
				theme={{
					algorithm:
						resolvedTheme === 'dark'
							? theme.darkAlgorithm
							: theme.defaultAlgorithm,
				}}
			>
				{children}
			</ConfigProvider>
		</AntdRegistry>
	)
}
