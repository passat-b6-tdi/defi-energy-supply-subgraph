import { BigInt, store } from "@graphprotocol/graph-ts";
import {
  ProducerRegistered as ProducerRegisteredEvent,
  ProducerUnregistered as ProducerUnregisteredEvent,
  SupplierRegistered as SupplierRegisteredEvent,
  SupplierUnregistered as SupplierUnregisteredEvent,
  ConsumerRegistered as ConsumerRegisteredEvent,
  ConsumerUnregistered as ConsumerUnregisteredEvent,
} from "../types/Register/Register";
import { Producer } from "../wrappers/producer";
import { Supplier } from "../wrappers/supplier";
import { Consumer } from "../wrappers/consumer";
import { EnergyConsumption } from "../wrappers/energy-consumption";
import { EnergyProduction } from "../wrappers/energy-production";

export function handleProducerRegistered(event: ProducerRegisteredEvent): void {
  const producerId = event.params.producerId;
  const id = producerId.toHex();

  let producer = Producer.loadOrCreate(id);
  producer.producerId = producerId;
  producer.producerAddress = event.params.producer;

  producer.save();
}

export function handleProducerUnregistered(
  event: ProducerUnregisteredEvent,
): void {
  store.remove("Producer", event.params.producerId.toHex());
}

export function handleSupplierRegistered(event: SupplierRegisteredEvent): void {
  const supplierAddress = event.params.supplier;
  const supplierId = event.params.supplierId;
  const id = supplierId.toHex();

  let supplier = Supplier.loadOrCreate(id);
  supplier.supplierId = supplierId;
  supplier.supplierAddress = supplierAddress;

  let production = EnergyProduction.loadOrCreate(id);
  production.supplier = supplier.id;
  production.lastUpdateTimestamp = event.block.timestamp;
  production.production = BigInt.fromI32(0);

  supplier.save();
  production.save();
}

export function handleSupplierUnregistered(
  event: SupplierUnregisteredEvent,
): void {
  const id = event.params.supplierId.toHex();

  store.remove("Supplier", id);
  store.remove("EnergyProduction", id);
}

export function handleUserRegistered(event: ConsumerRegisteredEvent): void {
  const supplierKey = event.params.supplierId.toHex();
  const consumerAddress = event.params.consumer;
  const consumerId = consumerAddress.toHex().concat("-").concat(supplierKey);

  let consumer = Consumer.loadOrCreate(consumerId);
  consumer.supplier = supplierKey;
  consumer.consumerAddress = consumerAddress;

  let consumption = EnergyConsumption.loadOrCreate(consumerId);
  consumption.consumer = consumer.id;
  consumption.lastUpdateTimestamp = event.block.timestamp;
  consumption.consumption = BigInt.fromI32(0);

  consumer.save();
  consumption.save();
}

export function handleUserUnregistered(event: ConsumerUnregisteredEvent): void {
  const supplierKey = event.params.supplierId.toHex();
  const consumerId = event.params.consumer
    .toHex()
    .concat("-")
    .concat(supplierKey);

  store.remove("Consumer", consumerId);
  store.remove("EnergyConsumption", consumerId);
}
