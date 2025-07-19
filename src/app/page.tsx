'use client'

import '@ant-design/v5-patch-for-react-19'
import { Button, Card, Space, Typography } from 'antd'

const { Title, Text } = Typography

export default function Home() {
	return (
		<div style={{ padding: '2rem' }}>
			<Card>
				<Title level={2}>Next.js + Ant Design</Title>
				<Text>Пример использования Ant Design в Next.js</Text>

				<Space style={{ marginTop: '1rem' }}>
					<Button type='primary'>Primary Button</Button>
					<Button>Default Button</Button>
				</Space>
			</Card>
		</div>
	)
}
