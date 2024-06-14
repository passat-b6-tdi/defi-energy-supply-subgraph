import {
  EnergyConsumptionRecorded as EnergyConsumptionRecordedEvent,
  EnergyConsumptionPaid as EnergyConsumptionPaidEvent,
} from "../types/EnergyOracle/EnergyOracle"
import {
  Consumer
} from "../wrappers/consumer"
import {
  EnergyConsumption
} from "../wrappers/energy-oracle"
import { BigInt } from "@graphprotocol/graph-ts"
import { Supplier } from "../wrappers/supplier"

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

  const userId = consumerAddress.concat('-').concat(supplierId)

  let consumption = EnergyConsumption.mustLoad(userId)

  consumption.lastUpdateTimestamp = event.params.timestamp
  consumption.consumption = BigInt.fromI32(0)

  consumption.save()
}