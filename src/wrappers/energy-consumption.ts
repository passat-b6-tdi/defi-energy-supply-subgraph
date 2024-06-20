import { BigInt, log } from '@graphprotocol/graph-ts'

import { EnergyConsumption as EnergyConsumptionEntity } from '../types/schema'

export class EnergyConsumption extends EnergyConsumptionEntity {
	constructor(id: string) {
		super(id)

		this.consumer = ''
		this.lastUpdateTimestamp = BigInt.fromI32(0)
		this.consumption = BigInt.fromI32(0)
	}

	static loadOrCreate(id: string): EnergyConsumption {
		let entity = EnergyConsumption.load(id)

		if (entity === null) {
			entity = new EnergyConsumption(id)
		}

		return changetype<EnergyConsumption>(entity)
	}

	static mustLoad(id: string): EnergyConsumption {
		let entity = EnergyConsumption.load(id)

		if (entity === null) {
			log.critical('EnergyConsumption not found: {}', [id])
		}

		return changetype<EnergyConsumption>(entity)
	}
}
