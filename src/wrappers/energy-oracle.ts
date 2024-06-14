import { BigInt, Bytes, log } from '@graphprotocol/graph-ts'

import { EnergyConsumption as EnergyConsumptionEntity } from '../types/schema'

export class EnergyConsumption extends EnergyConsumptionEntity {
	constructor(id: string) {
		super(id)

		this.consumer = ''
		this.lastUpdateTimestamp = BigInt.fromI32(0)
		this.consumption = BigInt.fromI32(0)
	}

	static loadOrCreate(consumerAddress: string): EnergyConsumption {
		let entity = EnergyConsumption.load(consumerAddress)

		if (entity === null) {
			entity = new EnergyConsumption(consumerAddress)
		}

		return changetype<EnergyConsumption>(entity)
	}

	static mustLoad(consumerAddress: string): EnergyConsumption {
		let entity = EnergyConsumption.load(consumerAddress)

		if (entity === null) {
			log.critical('EnergyConsumption not found: {}', [consumerAddress])
		}

		return changetype<EnergyConsumption>(entity)
	}
}
