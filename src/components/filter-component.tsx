import FilterPanel2, {
	FilterConfig,
	FilterValues,
} from './filter-panel2/filter-panel2'

export const MyComponent = () => {
	const filtersConfig: FilterConfig[] = [
		{
			key: 'name',
			label: 'Название',
			type: 'text',
			placeholder: 'Введите название товара',
		},
		{
			key: 'category',
			label: 'Категория',
			type: 'select',
			options: [
				{ value: 'electronics', label: 'Электроника' },
				{ value: 'clothing', label: 'Одежда' },
			],
		},
		{
			key: 'status',
			label: 'Статус',
			type: 'checkbox-group',
			options: [
				{ value: 'active', label: 'Активный' },
				{ value: 'inactive', label: 'Неактивный' },
			],
		},
	]

	const handleFilterChange = (filters: FilterValues) => {
		console.log('Applied filters:', filters)
		// Здесь можно обновлять данные таблицы или другого компонента
	}

	return (
		<div>
			<FilterPanel2
				filters={filtersConfig}
				onFilterChange={handleFilterChange}
				initialValues={{ status: ['active'] }}
			/>
			{/* Ваш компонент с данными */}
		</div>
	)
}
