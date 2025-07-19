import { CloseOutlined, FilterOutlined } from '@ant-design/icons'
import {
	Button,
	Checkbox,
	Divider,
	Form,
	Input,
	Modal,
	Select,
	Space,
	Tag,
} from 'antd'
import React, { useState } from 'react'

const { Option } = Select

interface FilterValues {
	name?: string
	status?: string[]
	type?: string
}

const statusLabels: Record<string, string> = {
	active: 'Активный',
	pending: 'В ожидании',
	blocked: 'Заблокирован',
}

const typeLabels: Record<string, string> = {
	type1: 'Тип 1',
	type2: 'Тип 2',
	type3: 'Тип 3',
}

const FilterPanel: React.FC = () => {
	const [form] = Form.useForm<FilterValues>()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [appliedFilters, setAppliedFilters] = useState<FilterValues>({})
	const [hasFilters, setHasFilters] = useState(false)

	const showModal = () => {
		form.setFieldsValue(appliedFilters)
		setIsModalVisible(true)
	}

	const handleOk = () => {
		form
			.validateFields()
			.then(values => {
				setAppliedFilters(values)
				setIsModalVisible(false)
				setHasFilters(
					!!values.name || !!values.type || (values.status ?? []).length > 0
				)
			})
			.catch(info => {
				console.log('Validate Failed:', info)
			})
	}

	const handleCancel = () => {
		setIsModalVisible(false)
	}

	const resetFilters = () => {
		form.resetFields()
		setAppliedFilters({})
		setHasFilters(false)
	}

	const removeFilter = (key: keyof FilterValues, value?: string) => {
		const newFilters = { ...appliedFilters }

		if (value && Array.isArray(newFilters[key])) {
			// Удаляем значение из массива (для статусов)
			newFilters[key] = (newFilters[key] as string[]).filter(v => v !== value)
			if ((newFilters[key] as string[]).length === 0) {
				delete newFilters[key]
			}
		} else {
			// Удаляем весь фильтр
			delete newFilters[key]
		}

		setAppliedFilters(newFilters)
		setHasFilters(Object.keys(newFilters).length > 0)
	}

	const renderAppliedFilters = () => {
		if (!hasFilters) return null

		return (
			<div style={{ marginTop: 16 }}>
				<Divider orientation='left' style={{ fontSize: 14 }}>
					Примененные фильтры
				</Divider>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
					{appliedFilters.name && (
						<Tag
							closable
							onClose={() => removeFilter('name')}
							closeIcon={<CloseOutlined style={{ fontSize: 12 }} />}
						>
							Название: {appliedFilters.name}
						</Tag>
					)}

					{appliedFilters.type && (
						<Tag
							closable
							onClose={() => removeFilter('type')}
							closeIcon={<CloseOutlined style={{ fontSize: 12 }} />}
						>
							Тип: {typeLabels[appliedFilters.type] || appliedFilters.type}
						</Tag>
					)}

					{appliedFilters.status?.map(status => (
						<Tag
							key={status}
							closable
							onClose={() => removeFilter('status', status)}
							closeIcon={<CloseOutlined style={{ fontSize: 12 }} />}
						>
							Статус: {statusLabels[status] || status}
						</Tag>
					))}
				</div>
			</div>
		)
	}

	return (
		<div style={{ marginBottom: 16 }}>
			<Button
				type={hasFilters ? 'primary' : 'default'}
				onClick={showModal}
				icon={<FilterOutlined />}
			>
				Фильтры
				{hasFilters && <span style={{ marginLeft: 4 }}>•</span>}
			</Button>

			<Modal
				title='Фильтры'
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				width={600}
				footer={[
					<Button key='reset' onClick={resetFilters}>
						Сбросить
					</Button>,
					<Button key='cancel' onClick={handleCancel}>
						Отмена
					</Button>,
					<Button key='submit' type='primary' onClick={handleOk}>
						Применить
					</Button>,
				]}
			>
				<Form form={form} layout='vertical'>
					<Form.Item name='name' label='Название'>
						<Input placeholder='Введите название' />
					</Form.Item>

					<Form.Item name='status' label='Статус'>
						<Checkbox.Group>
							<Space direction='vertical'>
								<Checkbox value='active'>Активный</Checkbox>
								<Checkbox value='pending'>В ожидании</Checkbox>
								<Checkbox value='blocked'>Заблокирован</Checkbox>
							</Space>
						</Checkbox.Group>
					</Form.Item>

					<Form.Item name='type' label='Тип'>
						<Select placeholder='Выберите тип' allowClear>
							<Option value='type1'>Тип 1</Option>
							<Option value='type2'>Тип 2</Option>
							<Option value='type3'>Тип 3</Option>
						</Select>
					</Form.Item>
				</Form>
			</Modal>

			{renderAppliedFilters()}
		</div>
	)
}

export default FilterPanel
