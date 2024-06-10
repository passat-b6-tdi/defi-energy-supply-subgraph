import {
  EnergyConsumptionRecorded as EnergyConsumptionRecordedEvent,
  EnergyConsumptionSent as EnergyConsumptionSentEvent,
} from "../types/EnergyOracle/EnergyOracle"
import {
  EnergyConsumption,
} from "../types/schema"

export function handleEnergyConsumptionRecorded(
  event: EnergyConsumptionRecordedEvent,
): void {
  let entity = new EnergyConsumption(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.sender = event.params.sender
  entity.user = event.params.user
  entity.supplierId = event.params.supplierId
  entity.timestamp = event.params.timestamp
  entity.consumption = event.params.consumption

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEnergyConsumptionSent(
  event: EnergyConsumptionSentEvent,
): void {
  let entity = new EnergyConsumption(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.sender = event.params.sender
  entity.user = event.params.user
  entity.supplierId = event.params.supplierId
  entity.timestamp = event.params.timestamp
  entity.consumption = event.params.consumption

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}