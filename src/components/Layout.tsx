'use client'

import { BulbFilled, BulbOutlined } from '@ant-design/icons'
import { Layout as AntdLayout, Space, Switch, Typography } from 'antd'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const { Header, Content, Footer } = AntdLayout
const { Title } = Typography

export default function Layout({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<AntdLayout style={{ minHeight: '100vh' }}>
			<Header
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Title level={3} style={{ color: 'white', margin: 0 }}>
					My App
				</Title>
				<Space>
					<Switch
						checked={theme === 'dark'}
						onChange={checked => setTheme(checked ? 'dark' : 'light')}
						checkedChildren={<BulbFilled />}
						unCheckedChildren={<BulbOutlined />}
					/>
				</Space>
			</Header>
			<Content style={{ padding: '0 50px', marginTop: 24 }}>
				<div style={{ background: 'inherit', padding: 24, minHeight: 380 }}>
					{children}
				</div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>
				My App ©{new Date().getFullYear()}
			</Footer>
		</AntdLayout>
	)
}
