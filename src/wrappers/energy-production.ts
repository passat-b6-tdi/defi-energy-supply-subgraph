import { BigInt, log } from '@graphprotocol/graph-ts'

import { EnergyProduction as EnergyProductionEntity } from '../types/schema'

export class EnergyProduction extends EnergyProductionEntity {
	constructor(id: string) {
		super(id)

		this.supplier = ''
		this.lastUpdateTimestamp = BigInt.fromI32(0)
		this.production = BigInt.fromI32(0)
	}

	static loadOrCreate(id: string): EnergyProduction {
		let entity = EnergyProduction.load(id)

		if (entity === null) {
			entity = new EnergyProduction(id)
		}

		return changetype<EnergyProduction>(entity)
	}

	static mustLoad(id: string): EnergyProduction {
		let entity = EnergyProduction.load(id)

		if (entity === null) {
			log.critical('EnergyProduction not found: {}', [id])
		}

		return changetype<EnergyProduction>(entity)
	}
}
