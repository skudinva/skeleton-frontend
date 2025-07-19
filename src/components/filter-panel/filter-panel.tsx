import { FilterOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Modal, Select, Space } from 'antd'
import React, { useState } from 'react'

const { Option } = Select

interface FilterValues {
	name?: string
	status?: string[]
	type?: string
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

	return (
		<div style={{ marginBottom: 16 }}>
			<Button type={hasFilters ? 'primary' : 'default'} onClick={showModal}>
				<Space>
					<FilterOutlined />
					Фильтры
					{hasFilters && <span>•</span>}
				</Space>
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

			{hasFilters && (
				<div style={{ marginTop: 16 }}>
					<h4>Примененные фильтры:</h4>
					<pre>{JSON.stringify(appliedFilters, null, 2)}</pre>
				</div>
			)}
		</div>
	)
}

export default FilterPanel
