import { BigInt, Bytes, log } from '@graphprotocol/graph-ts'

import { EnergyConsumption as EnergyConsumptionEntity } from '../types/schema'

export class EnergyConsumption extends EnergyConsumptionEntity {
	constructor(id: string) {
		super(id)

		this.user = ''
		this.supplierId = BigInt.fromI32(0)
		this.lastUpdateTimestamp = BigInt.fromI32(0)
		this.consumption = BigInt.fromI32(0)
	}

	static loadOrCreate(userAddress: string): EnergyConsumption {
		let entity = EnergyConsumption.load(userAddress)

		if (entity === null) {
			entity = new EnergyConsumption(userAddress)
		}

		return changetype<EnergyConsumption>(entity)
	}

	static mustLoad(userAddress: string): EnergyConsumption {
		let entity = EnergyConsumption.load(userAddress)

		if (entity === null) {
			log.critical('EnergyConsumption not found: {}', [userAddress])
		}

		return changetype<EnergyConsumption>(entity)
	}
}
