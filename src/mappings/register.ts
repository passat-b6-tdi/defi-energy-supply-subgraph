import { BigInt, Bytes, store } from "@graphprotocol/graph-ts"
import {
  SupplierRegistered as SupplierRegisteredEvent,
  SupplierUnregistered as SupplierUnregisteredEvent,
  UserRegistered as UserRegisteredEvent,
  UserUnregistered as UserUnregisteredEvent
} from "../types/Register/Register"
import {
  Supplier
} from "../wrappers/supplier"
import {
  User
} from "../wrappers/user"
import { EnergyConsumption } from "../wrappers/energy-oracle"


export function handleSupplierRegistered(event: SupplierRegisteredEvent): void {
  let supplier = Supplier.loadOrCreate(event.params.supplierId.toHex())

  supplier.supplierAddress = event.params.supplier
  supplier.amountOfUsers = event.params.amountOfUsers

  supplier.save()
}

export function handleSupplierUnregistered(
  event: SupplierUnregisteredEvent
): void {
  let supplier = Supplier.mustLoad(event.params.supplierId.toHex())

  supplier.supplierAddress = Bytes.fromHexString('')
  supplier.amountOfUsers = BigInt.fromI32(0)

  supplier.save()

  store.remove('Supplier', supplier.id)
}

export function handleUserRegistered(event: UserRegisteredEvent): void {
  let supplier = Supplier.mustLoad(event.params.usersSupplierId.toHex())
  let user = User.loadOrCreate(event.params.user.toHex())
  let consumption = EnergyConsumption.loadOrCreate(event.params.user.toHex())

  user.supplier = supplier.id
  consumption.user = user.id
  consumption.supplierId = event.params.usersSupplierId
  consumption.lastUpdateTimestamp = event.block.timestamp
  consumption.consumption = BigInt.fromI32(0)

  user.save()
  consumption.save()
}

export function handleUserUnregistered(event: UserUnregisteredEvent): void {
  let user = User.mustLoad(event.params.user.toHex())
  let consumption = EnergyConsumption.mustLoad(user.id)

  user.supplier = ''

  consumption.user = ''
  consumption.supplierId = BigInt.fromI32(0)
  consumption.lastUpdateTimestamp = BigInt.fromI32(0)
  consumption.consumption = BigInt.fromI32(0)

  user.save()
  consumption.save()

  store.remove('User', user.id)
  store.remove('EnergyConsumption', consumption.id)
}
