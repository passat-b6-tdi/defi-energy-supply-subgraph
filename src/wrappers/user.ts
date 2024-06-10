import { Bytes, log } from '@graphprotocol/graph-ts'
import { User as UserEntity } from '../types/schema'

export class User extends UserEntity {
	constructor(id: string) {
		super(id)

		this.supplier = ''
	}

	static loadOrCreate(userAddress: string): User {
		let entity = User.load(userAddress)

		if (entity === null) {
			entity = new User(userAddress)
		}

		return changetype<User>(entity)
	}

	static mustLoad(userAddress: string): User {
		const entity = User.load(userAddress)

		if (entity === null) {
			log.critical('User not found: {}', [userAddress])
		}

		return changetype<User>(entity)
	}
}
