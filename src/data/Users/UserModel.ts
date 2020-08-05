import Model from 'lib/Model'

class UserModel extends Model {

	constructor(data: object) {
		super(data)

	}
	
}

interface IUserData {
	id: string
}

export default UserModel