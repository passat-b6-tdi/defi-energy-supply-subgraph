import {
  EnergyConsumptionRecorded as EnergyConsumptionRecordedEvent,
  EnergyConsumptionUpdated as EnergyConsumptionUpdatedEvent,
  EnergyProductionRecorded as EnergyProductionRecordedEvent,
} from "../types/EnergyOracle/EnergyOracle";
import { EnergyConsumption } from "../wrappers/energy-consumption";
import { EnergyProduction } from "../wrappers/energy-production";

export function handleEnergyConsumptionRecorded(
  event: EnergyConsumptionRecordedEvent,
): void {
  const consumerAddress = event.params.whoseConsumption.toHex();
  const supplierId = event.params.supplierId.toHex();
  const consumerId = consumerAddress.concat("-").concat(supplierId);

  let consumption = EnergyConsumption.mustLoad(consumerId);
  consumption.lastUpdateTimestamp = event.params.timestamp;
  consumption.consumption = event.params.consumption;

  consumption.save();
}

export function handleEnergyConsumptionUpdated(
  event: EnergyConsumptionUpdatedEvent,
): void {
  const consumerAddress = event.params.whoseConsumption.toHex();
  const supplierId = event.params.supplierId.toHex();
  const consumerId = consumerAddress.concat("-").concat(supplierId);

  let consumption = EnergyConsumption.mustLoad(consumerId);
  consumption.lastUpdateTimestamp = event.params.timestamp;
  consumption.consumption = consumption.consumption
    .plus(event.params.consumptionToAdd)
    .minus(event.params.consumptionToRemove);

  consumption.save();
}

export function handleEnergyProductionRecorded(
  event: EnergyProductionRecordedEvent,
): void {
  const supplierId = event.params.supplierId.toHex();

  let production = EnergyProduction.mustLoad(supplierId);
  production.lastUpdateTimestamp = event.params.timestamp;
  production.production = event.params.production;

  production.save();
}
