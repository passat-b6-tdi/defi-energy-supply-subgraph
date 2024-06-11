import {
  EnergyConsumptionRecorded as EnergyConsumptionRecordedEvent,
  EnergyConsumptionSent as EnergyConsumptionSentEvent,
} from "../types/EnergyOracle/EnergyOracle"
import {
  User
} from "../wrappers/user"
import {
  EnergyConsumption
} from "../wrappers/energy-oracle"

export function handleEnergyConsumptionRecorded(
  event: EnergyConsumptionRecordedEvent,
): void {
  const user = User.mustLoad(event.params.whoseConsumption.toHex())

  let consumption = EnergyConsumption.mustLoad(user.id)

  consumption.lastUpdateTimestamp = event.params.timestamp
  consumption.consumption = consumption.consumption.plus(event.params.consumption)

  consumption.save()
}

export function handleEnergyConsumptionSent(
  event: EnergyConsumptionSentEvent,
): void {
  const user = User.mustLoad(event.params.whoseConsumption.toHex())

  let consumption = EnergyConsumption.mustLoad(user.id)

  consumption.lastUpdateTimestamp = event.params.timestamp
  consumption.consumption = consumption.consumption.minus(event.params.consumption)

  consumption.save()
}