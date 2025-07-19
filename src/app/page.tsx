'use client'

import FilterPanel from '@/components/filter-panel/filter-panel'
import '@ant-design/v5-patch-for-react-19'
import { Card, Space, Typography } from 'antd'

const { Title, Text } = Typography

export default function Home() {
	return (
		<div style={{ padding: '2rem' }}>
			<Card>
				<Title level={2}>Next.js + Ant Design</Title>
				<Text>Пример использования Ant Design в Next.js</Text>

				<Space style={{ marginTop: '1rem' }}>
					<FilterPanel />
				</Space>
			</Card>
		</div>
	)
}
