# Changelog

All notable changes to this project will be documented here.
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [2.0.1] - 2026-02-20

### Fixed

- **ACTIVE mode timeout** — activity timer was being reset on every valid
  packet, not just on height changes. After long desk movements the desk
  display stays warm and keeps responding for many seconds after stopping,
  causing rapid polling to persist far beyond the intended 5 s window. The
  timer now resets only when the decoded height actually changes, so the
  5 s countdown begins the moment the desk stops moving.

- **False "desk stopped" during movement** — `now` was captured once at the
  top of `loop()`, before `process_packet_()` could update
  `last_activity_time_`. The stale timestamp caused a `uint32_t` underflow
  in the ACTIVITY_TIMEOUT check, instantly triggering "desk stopped" on
  every packet during movement. Fixed by refreshing `now` after UART
  processing and before the state machine runs.

### Changed

- **UART batch reading** — aligned with ESPHome 2026.2.0's batch read
  pattern. The single byte-by-byte `while` loop is replaced with a
  three-phase approach: scan for start byte, read length byte, then fetch
  the remaining packet bytes in one `read_array()` call. Reduces
  `read_byte()` calls from 9 to 2 per typical height packet.

---

## [2.0.0] - 2025-12-01

### Changed

- **Full rewrite** of the custom `desk_height` component with a proper
  three-state polling machine (Boot → Idle → Active).
- **Silent wake command** replaces the M command for idle polling —
  the desk display no longer lights up every 3 s.
- **Boot sequence** sends a single M command after a 10 s delay to
  get the initial height without repeated display activation.
- **Active mode** increases poll rate to 0.33 s on height change and
  returns to idle after 5 s of no movement.

### Added

- API encryption key support.
- OTA password protection.
- `secrets.yaml.example` template.
- WiFi RSSI sensor.

### Fixed

- Height sensor now filters out zero and invalid readings.
