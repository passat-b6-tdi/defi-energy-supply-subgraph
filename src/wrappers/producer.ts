import { BigInt, Bytes, log } from '@graphprotocol/graph-ts'
import { Producer as ProducerEntity } from '../types/schema'

export class Producer extends ProducerEntity {
	constructor(id: string) {
		super(id)

		this.producerId = BigInt.fromI32(0)
		this.producerAddress = Bytes.fromHexString('')
	}

	static loadOrCreate(producerId: string): Producer {
		let entity = Producer.load(producerId)

		if (entity === null) {
			entity = new Producer(producerId)
		}

		return changetype<Producer>(entity)
	}

	static mustLoad(producerId: string): Producer {
		const entity = Producer.load(producerId)

		if (entity === null) {
			log.critical('Producer Id not found: {}', [producerId])
		}

		return changetype<Producer>(entity)
	}
}
