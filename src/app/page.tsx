'use client'

import { MyComponent } from '@/components/filter-component'
import FilterPanel from '@/components/filter-panel/filter-panel'
import Layout from '@/components/Layout'
import '@ant-design/v5-patch-for-react-19'
import { Card, Space, Typography } from 'antd'

const { Title, Text } = Typography

export default function Home() {
	return (
		<Layout>
			<div style={{ padding: '2rem' }}>
				<Card>
					<Title level={2}>Next.js + Ant Design</Title>
					<Text>Пример использования Ant Design в Next.js</Text>
					<Space style={{ marginTop: '1rem' }}>
						<FilterPanel />
					</Space>
				</Card>
				<Card>
					<Title level={2}>Next.js + Ant Design</Title>
					<Text>Пример использования Ant Design в Next.js</Text>
					<Space style={{ marginTop: '1rem' }}>
						<MyComponent />
					</Space>
				</Card>
			</div>
		</Layout>
	)
}
