import {
  EnergyConsumptionRecorded as EnergyConsumptionRecordedEvent,
  EnergyConsumptionPaid as EnergyConsumptionPaidEvent,
  EnergyProductionRecorded as EnergyProductionRecordedEvent,
} from "../types/EnergyOracle/EnergyOracle"
import {
  EnergyConsumption
} from "../wrappers/energy-consumption"
import {
  EnergyProduction
} from "../wrappers/energy-production"
import { BigInt } from "@graphprotocol/graph-ts"

export function handleEnergyConsumptionRecorded(
  event: EnergyConsumptionRecordedEvent,
): void {
  const consumerAddress = event.params.whoseConsumption.toHex()
  const supplierId = event.params.supplierId.toHex()
  const consumerId = consumerAddress.concat('-').concat(supplierId)

  let consumption = EnergyConsumption.mustLoad(consumerId)
  consumption.lastUpdateTimestamp = event.params.timestamp
  consumption.consumption = event.params.consumption

  consumption.save()
}

export function handleEnergyConsumptionSent(
  event: EnergyConsumptionPaidEvent,
): void {
  const consumerAddress = event.params.whoseConsumption.toHex()
  const supplierId = event.params.supplierId.toHex()
  const consumerId = consumerAddress.concat('-').concat(supplierId)

  let consumption = EnergyConsumption.mustLoad(consumerId)
  consumption.lastUpdateTimestamp = event.params.timestamp
  consumption.consumption = BigInt.fromI32(0)

  consumption.save()
}

export function handleEnergyProductionRecorded(
  event: EnergyProductionRecordedEvent,
): void {
  const supplierAddress = event.params.supplier.toHex()
  const supplierId = event.params.supplierId.toHex()
  const id = supplierAddress.concat('-').concat(supplierId)

  let production = EnergyProduction.mustLoad(id)
  production.lastUpdateTimestamp = event.params.timestamp
  production.production = event.params.production

  production.save()
}