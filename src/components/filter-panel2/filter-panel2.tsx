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

// Типы для фильтров
type FilterType = 'text' | 'select' | 'multi-select' | 'checkbox-group'

export interface FilterConfig {
	key: string
	label: string
	type: FilterType
	options?: { value: string; label: string }[]
	placeholder?: string
}

export interface FilterValues {
	[key: string]: string | string[] | undefined
}

interface FilterPanelProps {
	filters: FilterConfig[]
	initialValues?: FilterValues
	onFilterChange?: (values: FilterValues) => void
}

const FilterPanel2: React.FC<FilterPanelProps> = ({
	filters,
	initialValues = {},
	onFilterChange,
}) => {
	const [form] = Form.useForm<FilterValues>()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [appliedFilters, setAppliedFilters] =
		useState<FilterValues>(initialValues)
	const [hasFilters, setHasFilters] = useState<boolean>(
		Object.values(initialValues).some(
			val =>
				(Array.isArray(val) && val.length > 0) || (!Array.isArray(val) && val)
		)
	)

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
					Object.values(values).some(
						val =>
							(Array.isArray(val) && val.length > 0) ||
							(!Array.isArray(val) && val)
					)
				)
				onFilterChange?.(values)
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
		const emptyFilters: FilterValues = {}
		setAppliedFilters(emptyFilters)
		setHasFilters(false)
		onFilterChange?.(emptyFilters)
	}

	const removeFilter = (key: string, value?: string) => {
		const newFilters = { ...appliedFilters }

		if (value && Array.isArray(newFilters[key])) {
			// Удаляем значение из массива
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
		onFilterChange?.(newFilters)
		form.setFieldsValue(newFilters)
	}

	const renderFilterInput = (filter: FilterConfig) => {
		switch (filter.type) {
			case 'text':
				return (
					<Input
						placeholder={
							filter.placeholder || `Введите ${filter.label.toLowerCase()}`
						}
					/>
				)

			case 'select':
				return (
					<Select
						placeholder={
							filter.placeholder || `Выберите ${filter.label.toLowerCase()}`
						}
						allowClear
					>
						{filter.options?.map(option => (
							<Option key={option.value} value={option.value}>
								{option.label}
							</Option>
						))}
					</Select>
				)

			case 'multi-select':
				return (
					<Select
						mode='multiple'
						placeholder={
							filter.placeholder || `Выберите ${filter.label.toLowerCase()}`
						}
						allowClear
					>
						{filter.options?.map(option => (
							<Option key={option.value} value={option.value}>
								{option.label}
							</Option>
						))}
					</Select>
				)

			case 'checkbox-group':
				return (
					<Checkbox.Group>
						<Space direction='vertical'>
							{filter.options?.map(option => (
								<Checkbox key={option.value} value={option.value}>
									{option.label}
								</Checkbox>
							))}
						</Space>
					</Checkbox.Group>
				)

			default:
				return null
		}
	}

	const renderAppliedFilters = () => {
		if (!hasFilters) return null

		return (
			<div style={{ marginTop: 16 }}>
				<Divider orientation='left' style={{ fontSize: 14 }}>
					Примененные фильтры
				</Divider>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
					{Object.entries(appliedFilters).map(([key, value]) => {
						if (!value || (Array.isArray(value) && value.length === 0))
							return null

						const filterConfig = filters.find(f => f.key === key)
						if (!filterConfig) return null

						if (Array.isArray(value)) {
							return value.map(val => {
								const option = filterConfig.options?.find(o => o.value === val)
								return (
									<Tag
										key={`${key}-${val}`}
										closable
										onClose={() => removeFilter(key, val)}
										closeIcon={<CloseOutlined style={{ fontSize: 12 }} />}
									>
										{filterConfig.label}: {option?.label || val}
									</Tag>
								)
							})
						}

						const option = filterConfig.options?.find(o => o.value === value)
						return (
							<Tag
								key={key}
								closable
								onClose={() => removeFilter(key)}
								closeIcon={<CloseOutlined style={{ fontSize: 12 }} />}
							>
								{filterConfig.label}: {option?.label || value}
							</Tag>
						)
					})}
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
				open={isModalVisible}
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
					{filters.map(filter => (
						<Form.Item key={filter.key} name={filter.key} label={filter.label}>
							{renderFilterInput(filter)}
						</Form.Item>
					))}
				</Form>
			</Modal>

			{renderAppliedFilters()}
		</div>
	)
}

export default FilterPanel2
