import Model from 'lib/Model'

class ListModel extends Model {

	constructor(data: object) {
		super(data)

	}
	
}

interface IListData {
	id: string,
	title: string,
	date: Date,
	lists: string[]
}

export default ListModel