import {
  SupplierRegistered as SupplierRegisteredEvent,
  SupplierUnregistered as SupplierUnregisteredEvent,
  UserRegistered as UserRegisteredEvent,
  UserUnregistered as UserUnregisteredEvent
} from "../types/Register/Register"
import {
  Supplier,
  User
} from "../types/schema"


export function handleSupplierRegistered(event: SupplierRegisteredEvent): void {
  let entity = new Supplier(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.supplier = event.params.supplier
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSupplierUnregistered(
  event: SupplierUnregisteredEvent
): void {
  let entity = new Supplier(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.supplier = event.params.supplier
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUserRegistered(event: UserRegisteredEvent): void {
  let entity = new User(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.user = event.params.user
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUserUnregistered(event: UserUnregisteredEvent): void {
  let entity = new User(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.user = event.params.user
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
