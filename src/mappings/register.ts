import { BigInt, Bytes, store } from "@graphprotocol/graph-ts"
import {
  SupplierRegistered as SupplierRegisteredEvent,
  SupplierUnregistered as SupplierUnregisteredEvent,
  ConsumerRegistered as ConsumerRegisteredEvent,
  ConsumerUnregistered as ConsumerUnregisteredEvent
} from "../types/Register/Register"
import {
  Supplier
} from "../wrappers/supplier"
import {
  Consumer
} from "../wrappers/consumer"
import { EnergyConsumption } from "../wrappers/energy-oracle"


export function handleSupplierRegistered(event: SupplierRegisteredEvent): void {
  const supplierAddress = event.params.supplier
  const supplierId = event.params.supplierId

  const supplierAddressAndId = supplierAddress.toHex().concat('-').concat(supplierId.toHex())

  let supplier = Supplier.loadOrCreate(supplierAddressAndId)

  supplier.supplierId = supplierId
  supplier.supplierAddress = supplierAddress

  supplier.save()
}

export function handleSupplierUnregistered(
  event: SupplierUnregisteredEvent
): void {
  const supplierAddress = event.params.supplier
  const supplierId = event.params.supplierId

  const supplierAddressAndId = supplierAddress.toHex().concat('-').concat(supplierId.toHex())

  let supplier = Supplier.mustLoad(supplierAddressAndId)

  supplier.supplierId = BigInt.fromI32(0)
  supplier.supplierAddress = Bytes.fromHexString('')

  supplier.save()

  store.remove('Supplier', supplier.id)
}

export function handleUserRegistered(event: ConsumerRegisteredEvent): void {
  const supplierId = event.params.supplierId.toHex()
  const supplierAddress = event.params.supplierAddress.toHex()
  const supplierAddressAndId = supplierAddress.concat('-').concat(supplierId)

  const consumerAddress = event.params.consumer.toHex()
  const consumerAddressAndSupplierId = consumerAddress.concat('-').concat(supplierId)

  let consumer = Consumer.loadOrCreate(consumerAddressAndSupplierId)
  let consumption = EnergyConsumption.loadOrCreate(consumerAddressAndSupplierId)

  consumer.supplier = supplierAddressAndId
  consumption.consumer = consumer.id
  consumption.lastUpdateTimestamp = event.block.timestamp
  consumption.consumption = BigInt.fromI32(0)

  consumer.save()
  consumption.save()
}

export function handleUserUnregistered(event: ConsumerUnregisteredEvent): void {
  const supplierId = event.params.supplierId.toHex()

  let consumerId = event.params.consumer.toHex().concat('-').concat(supplierId)

  let consumer = Consumer.mustLoad(consumerId)
  let consumption = EnergyConsumption.mustLoad(consumerId)

  consumer.supplier = ''

  consumption.consumer = ''
  consumption.lastUpdateTimestamp = BigInt.fromI32(0)
  consumption.consumption = BigInt.fromI32(0)

  consumer.save()
  consumption.save()

  store.remove('Consumer', consumer.id)
  store.remove('EnergyConsumption', consumption.id)
}
