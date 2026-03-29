# Flexispot E7 ESPHome Integration

ESPHome custom component for controlling and monitoring Flexispot E7 standing desks via Home Assistant.

Forked from [NelsonBrandao/flexispot-e7-esphome](https://github.com/NelsonBrandao/flexispot-e7-esphome).

## Features

- Real-time desk height sensor (cm)
- Preset buttons: Sit, Stand, 1, 2
- Manual Up / Down control
- Memory (M) and Wake buttons
- WiFi signal strength sensor
- Encrypted API and OTA password protection

## Hardware

- ESP32 development board (e.g. ESP32-DevKitC)
- Flexispot E7 desk
- RJ45 breakout or spliced cable from the desk's control port

### Wiring

Connect the ESP32 directly to the desk's RJ45 port (not through the handset):

| Wire Color | ESP32 Pin | Function |
|------------|-----------|----------|
| Green      | GPIO1     | TX (commands to desk) |
| White/Blue | GPIO3     | RX (data from desk) |
| Blue       | GPIO21    | Virtual screen enable |
| Black      | GND       | Ground |
| Red        | 5V/VIN    | Power |

> Verify your wiring with a multimeter before powering on.

## Setup

1. Copy the `components/desk_height/` folder and `flexispot-e7.yaml` to your ESPHome config directory.

2. Create a `secrets.yaml` file (see `secrets.yaml.example`):

   ```yaml
   wifi_ssid: "your_wifi_ssid"
   wifi_password: "your_wifi_password"
   api_encryption_key: "your_base64_key_here"
   ota_password: "your_ota_password_here"
   ```

3. Generate an API encryption key:

   ```powershell
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }) -as [byte[]])
   ```

   Or on Linux/macOS:

   ```bash
   openssl rand -base64 32
   ```

4. Flash to your ESP32:

   ```bash
   esphome run flexispot-e7.yaml
   ```

5. In Home Assistant, add the device using the API encryption key when prompted.

## How It Works

The component communicates with the desk controller over UART at 9600 baud. Height data is returned as three 7-segment encoded display bytes.

On startup, the component sends a single M command to wake the display and retrieve the initial height. After that, it uses a silent wake command to poll for height changes without lighting up the desk's display.

### Polling States

| State | Poll Interval | Trigger |
|-------|--------------|---------|
| Boot  | One-shot after 10s | Startup |
| Idle  | Every 3s | Default after boot / movement stops |
| Active | Every 0.33s | Height change detected |

The component returns to idle after 5 seconds of no height changes.

## Exposed Entities

### Sensors
- **Desk Height** - current height in cm
- **WiFi RSSI** - signal strength (dBm)

### Buttons
- **Preset 1** / **Preset 2** - saved height presets
- **Sit** / **Stand** - sit and stand presets
- **Up** / **Down** - manual height adjustment
- **Memory (M)** - memory/preset save mode
- **Wake** - silently query the desk for its current height
- **Reboot ESP** - restart the ESP32

## Troubleshooting

- **"Unknown" or no height reading** - Check wiring, especially the virtual screen pin (GPIO21). This must be held high for the desk to respond.
- **Height not updating after boot** - Check logs for the initial M command. If the desk doesn't respond, verify TX/RX wiring isn't swapped.
- **Display lights up every few seconds** - This should not happen. The idle/active polling uses the wake command which does not activate the display. If you see this, check that the firmware is up to date.

## License

MIT License - See [LICENSE](LICENSE).

## Credits

Based on the work by [NelsonBrandao](https://github.com/NelsonBrandao/flexispot-e7-esphome) and the ESPHome community's reverse engineering of the Flexispot UART protocol.
