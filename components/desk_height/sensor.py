import esphome.codegen as cg
import esphome.config_validation as cv
from esphome.components import sensor, uart

DEPENDENCIES = ["uart"]

desk_height_ns = cg.esphome_ns.namespace("desk_height")
DeskHeightSensor = desk_height_ns.class_(
    "DeskHeightSensor", sensor.Sensor, cg.Component, uart.UARTDevice
)

CONFIG_SCHEMA = (
    sensor.sensor_schema(DeskHeightSensor)
    .extend(uart.UART_DEVICE_SCHEMA)
    .extend(cv.COMPONENT_SCHEMA)
)


async def to_code(config):
    var = await sensor.new_sensor(config)
    await cg.register_component(var, config)
    await uart.register_uart_device(var, config)
