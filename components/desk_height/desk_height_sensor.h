#pragma once

#include "esphome/core/component.h"
#include "esphome/components/sensor/sensor.h"
#include "esphome/components/uart/uart.h"

namespace esphome {
namespace desk_height {

enum class DisplayState {
  BOOT_WAIT,   // Waiting 10s after boot before first wake command
  IDLE,        // Polling every 3s to detect changes
  ACTIVE       // Rapid polling during movement
};

class DeskHeightSensor : public sensor::Sensor, public Component, public uart::UARTDevice {
 public:
  void setup() override;
  void loop() override;
  void dump_config() override;
  float get_setup_priority() const override;

 protected:
  // Buffer for incoming UART data
  uint8_t buffer_[32];
  size_t buffer_index_ = 0;

  // Current desk height in cm
  float current_height_ = 0.0;
  float last_published_height_ = -1.0;

  // State tracking
  DisplayState display_state_ = DisplayState::BOOT_WAIT;
  uint32_t boot_time_ = 0;
  uint32_t last_poll_time_ = 0;
  uint32_t last_activity_time_ = 0;
  [[maybe_unused]] bool initial_reading_done_ = false;

  // Timing constants (in milliseconds)
  static const uint32_t BOOT_DELAY = 10000;           // 10s delay before initial M command
  static const uint32_t IDLE_POLL_INTERVAL = 3000;    // Poll every 3s when idle
  static const uint32_t ACTIVE_POLL_INTERVAL = 330;   // Poll every 0.33s when active
  static const uint32_t ACTIVITY_TIMEOUT = 5000;      // 5s no activity = back to idle

  // Wake command - silently queries height without lighting up the display
  static const uint8_t WAKE_COMMAND[8];

  // Helper methods
  void reset_buffer_();
  int decode_7segment_(uint8_t byte);
  bool has_decimal_(uint8_t byte);
  void process_packet_();
  void publish_current_height_();
  void send_wake_command_();
};

}  // namespace desk_height
}  // namespace esphome
