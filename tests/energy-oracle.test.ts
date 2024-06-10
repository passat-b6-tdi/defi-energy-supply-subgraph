import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { EnergyConsumptionRecorded } from "../generated/schema"
import { EnergyConsumptionRecorded as EnergyConsumptionRecordedEvent } from "../generated/EnergyOracle/EnergyOracle"
import { handleEnergyConsumptionRecorded } from "../src/mappings/energy-oracle"
import { createEnergyConsumptionRecordedEvent } from "./energy-oracle-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let sender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let supplierId = BigInt.fromI32(234)
    let timestamp = BigInt.fromI32(234)
    let consumption = BigInt.fromI32(234)
    let newEnergyConsumptionRecordedEvent =
      createEnergyConsumptionRecordedEvent(
        sender,
        user,
        supplierId,
        timestamp,
        consumption
      )
    handleEnergyConsumptionRecorded(newEnergyConsumptionRecordedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("EnergyConsumptionRecorded created and stored", () => {
    assert.entityCount("EnergyConsumptionRecorded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "EnergyConsumptionRecorded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sender",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "EnergyConsumptionRecorded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "EnergyConsumptionRecorded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "supplierId",
      "234"
    )
    assert.fieldEquals(
      "EnergyConsumptionRecorded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "timestamp",
      "234"
    )
    assert.fieldEquals(
      "EnergyConsumptionRecorded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "consumption",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
