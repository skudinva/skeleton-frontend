import AntdSSRProvider from '@/app/providers/AntdProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Next.js + Ant Design',
	description: 'Next.js application with Ant Design',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='ru'>
			<body className={inter.className}>
				<AntdSSRProvider>{children}</AntdSSRProvider>
			</body>
		</html>
	)
}
