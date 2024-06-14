import { Bytes, log } from '@graphprotocol/graph-ts'
import { Consumer as ConsumerEntity } from '../types/schema'

export class Consumer extends ConsumerEntity {
	constructor(id: string) {
		super(id)

		this.consumerAddress = Bytes.fromHexString('')
		this.supplier = ''
	}

	static loadOrCreate(consumerAddress: string): Consumer {
		let entity = Consumer.load(consumerAddress)

		if (entity === null) {
			entity = new Consumer(consumerAddress)
		}

		return changetype<Consumer>(entity)
	}

	static mustLoad(consumerAddress: string): Consumer {
		const entity = Consumer.load(consumerAddress)

		if (entity === null) {
			log.critical('User not found: {}', [consumerAddress])
		}

		return changetype<Consumer>(entity)
	}
}
