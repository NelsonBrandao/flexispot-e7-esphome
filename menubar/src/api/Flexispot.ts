import { FetchOptions, fetch } from '@tauri-apps/api/http';

export enum Preset {
  One = 'preset_1',
  Two = 'preset_2',
  Stand = 'stand',
  Sit = 'sit',
}

interface SensorResponse {
  id: string;
  value: number;
  state: string;
}

export class Flexispot {
  constructor(private baseUrl: string) {}

  triggerPreset(preset: Preset) {
    return this.fetch<void>(`/switch/${preset}/turn_on`, { method: 'POST' });
  }

  async getUptime(): Promise<SensorResponse> {
    const response = await this.fetch<SensorResponse>(`/sensor/uptime`, { method: 'GET' });

    return response.data;
  }

  async getWifiSignal(): Promise<SensorResponse> {
    const response = await this.fetch<SensorResponse>(`/sensor/wifi_signal`);

    return response.data;
  }

  private fetch<T>(path: string, options?: FetchOptions) {
    return fetch<T>(`${this.baseUrl}${path}`, options);
  }
}
