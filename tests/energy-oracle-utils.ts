import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  EnergyConsumptionRecorded,
  EnergyConsumptionSent,
  OutlierDetected,
  Paused,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Unpaused
} from "../generated/EnergyOracle/EnergyOracle"

export function createEnergyConsumptionRecordedEvent(
  sender: Address,
  user: Address,
  supplierId: BigInt,
  timestamp: BigInt,
  consumption: BigInt
): EnergyConsumptionRecorded {
  let energyConsumptionRecordedEvent = changetype<EnergyConsumptionRecorded>(
    newMockEvent()
  )

  energyConsumptionRecordedEvent.parameters = new Array()

  energyConsumptionRecordedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  energyConsumptionRecordedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  energyConsumptionRecordedEvent.parameters.push(
    new ethereum.EventParam(
      "supplierId",
      ethereum.Value.fromUnsignedBigInt(supplierId)
    )
  )
  energyConsumptionRecordedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  energyConsumptionRecordedEvent.parameters.push(
    new ethereum.EventParam(
      "consumption",
      ethereum.Value.fromUnsignedBigInt(consumption)
    )
  )

  return energyConsumptionRecordedEvent
}

export function createEnergyConsumptionSentEvent(
  sender: Address,
  user: Address,
  supplierId: BigInt,
  timestamp: BigInt,
  consumption: BigInt
): EnergyConsumptionSent {
  let energyConsumptionSentEvent = changetype<EnergyConsumptionSent>(
    newMockEvent()
  )

  energyConsumptionSentEvent.parameters = new Array()

  energyConsumptionSentEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  energyConsumptionSentEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  energyConsumptionSentEvent.parameters.push(
    new ethereum.EventParam(
      "supplierId",
      ethereum.Value.fromUnsignedBigInt(supplierId)
    )
  )
  energyConsumptionSentEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  energyConsumptionSentEvent.parameters.push(
    new ethereum.EventParam(
      "consumption",
      ethereum.Value.fromUnsignedBigInt(consumption)
    )
  )

  return energyConsumptionSentEvent
}

export function createOutlierDetectedEvent(
  sender: Address,
  user: Address,
  supplierId: BigInt,
  timestamp: BigInt,
  consumption: BigInt
): OutlierDetected {
  let outlierDetectedEvent = changetype<OutlierDetected>(newMockEvent())

  outlierDetectedEvent.parameters = new Array()

  outlierDetectedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  outlierDetectedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  outlierDetectedEvent.parameters.push(
    new ethereum.EventParam(
      "supplierId",
      ethereum.Value.fromUnsignedBigInt(supplierId)
    )
  )
  outlierDetectedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  outlierDetectedEvent.parameters.push(
    new ethereum.EventParam(
      "consumption",
      ethereum.Value.fromUnsignedBigInt(consumption)
    )
  )

  return outlierDetectedEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}
