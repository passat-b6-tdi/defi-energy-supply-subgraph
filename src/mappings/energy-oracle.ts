import {
  EnergyConsumptionRecorded as EnergyConsumptionRecordedEvent,
  EnergyConsumptionPaid as EnergyConsumptionPaidEvent,
} from "../types/EnergyOracle/EnergyOracle"
import {
  User
} from "../wrappers/user"
import {
  EnergyConsumption
} from "../wrappers/energy-oracle"
import { BigInt } from "@graphprotocol/graph-ts"

export function handleEnergyConsumptionRecorded(
  event: EnergyConsumptionRecordedEvent,
): void {
  const user = User.mustLoad(event.params.whoseConsumption.toHex())

  let consumption = EnergyConsumption.mustLoad(user.id)

  consumption.lastUpdateTimestamp = event.params.timestamp
  consumption.consumption = event.params.consumption

  consumption.save()
}

export function handleEnergyConsumptionSent(
  event: EnergyConsumptionPaidEvent,
): void {
  const user = User.mustLoad(event.params.whoseConsumption.toHex())

  let consumption = EnergyConsumption.mustLoad(user.id)

  consumption.lastUpdateTimestamp = event.params.timestamp
  consumption.consumption = BigInt.fromI32(0)

  consumption.save()
}