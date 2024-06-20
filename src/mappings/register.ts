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
import { EnergyConsumption } from "../wrappers/energy-consumption"
import { EnergyProduction } from "../wrappers/energy-production"


export function handleSupplierRegistered(event: SupplierRegisteredEvent): void {
  const supplierAddress = event.params.supplier
  const supplierId = event.params.supplierId
  const supplierAddressAndId = supplierAddress.toHex().concat('-').concat(supplierId.toHex())

  let supplier = Supplier.loadOrCreate(supplierAddressAndId)
  supplier.supplierId = supplierId
  supplier.supplierAddress = supplierAddress

  let production = EnergyProduction.loadOrCreate(supplier.id)
  production.supplier = supplierAddress.toHex()
  production.lastUpdateTimestamp = event.block.timestamp
  production.production = BigInt.fromI32(0)

  supplier.save()
  production.save()
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

  let production = EnergyProduction.mustLoad(supplier.id)
  production.supplier = ''
  production.lastUpdateTimestamp = BigInt.fromI32(0)
  production.production = BigInt.fromI32(0)

  supplier.save()
  production.save()

  store.remove('Supplier', supplier.id)
  store.remove('EnergyProduction', supplier.id)
}

export function handleUserRegistered(event: ConsumerRegisteredEvent): void {
  const supplierId = event.params.supplierId.toHex()
  const supplierAddress = event.params.supplierAddress.toHex()
  const supplierAddressAndId = supplierAddress.concat('-').concat(supplierId)

  const consumerAddress = event.params.consumer
  const consumerId = consumerAddress.toHex().concat('-').concat(supplierId)

  let consumer = Consumer.loadOrCreate(consumerId)
  consumer.supplier = supplierAddressAndId
  consumer.consumerAddress = consumerAddress

  let consumption = EnergyConsumption.loadOrCreate(consumerId)
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
  consumer.supplier = ''
  consumer.consumerAddress = Bytes.fromHexString('')

  let consumption = EnergyConsumption.mustLoad(consumerId)
  consumption.consumer = ''
  consumption.lastUpdateTimestamp = BigInt.fromI32(0)
  consumption.consumption = BigInt.fromI32(0)

  consumer.save()
  consumption.save()

  store.remove('Consumer', consumer.id)
  store.remove('EnergyConsumption', consumption.id)
}
