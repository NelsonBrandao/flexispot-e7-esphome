# Flexispot Menubar

This project contains an ESPHome configuration file that will connect a ESP32 to the Flexispot table and a simple menubar app to interact with the table.

![Demo image](/menubar/demo/demo.png)

### ESPHome

The esphome code was inspired by the amazing work done on [LoctekMotion_IoT](https://github.com/iMicknl/LoctekMotion_IoT). I have provided a template yaml for the Flexispot E7. For more information and examples check LoctekMotion_IoT's repo.

### Menubar

The menubar app is a simple Tauri app to control the Flexispot table.

#### Build

- `npm run install`
- `npm run build`
