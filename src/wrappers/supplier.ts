import { BigInt, Bytes, log } from '@graphprotocol/graph-ts'
import { Supplier as SupplierEntity } from '../types/schema'

export class Supplier extends SupplierEntity {
	constructor(id: string) {
		super(id)

		this.supplierId = BigInt.fromI32(0)
		this.supplierAddress = Bytes.fromHexString('')
	}

	static loadOrCreate(supplierId: string): Supplier {
		let entity = Supplier.load(supplierId)

		if (entity === null) {
			entity = new Supplier(supplierId)
		}

		return changetype<Supplier>(entity)
	}

	static mustLoad(supplierId: string): Supplier {
		const entity = Supplier.load(supplierId)

		if (entity === null) {
			log.critical('Suplier Id not found: {}', [supplierId])
		}

		return changetype<Supplier>(entity)
	}
}
