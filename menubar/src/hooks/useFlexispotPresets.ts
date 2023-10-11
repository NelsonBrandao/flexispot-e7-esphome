import { useCallback, useEffect, useRef, useState } from 'react';
import { Flexispot, Preset } from '../api/Flexispot';

interface Status {
  hasError?: boolean;
  isLoading?: boolean;
  preset?: Preset;
}

export function useFlexispotPresets(): [Status & { isInitializing: boolean }, (preset: Preset) => Promise<void>] {
  const client = useRef<Flexispot | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [status, setStatus] = useState<Status>();

  useEffect(() => {
    client.current = new Flexispot('http://flexispot-e7.local');

    setIsInitializing(false);
  }, []);

  const triggerPreset = useCallback(
    async (preset: Preset) => {
      if (!client.current) {
        return;
      }

      setStatus({ isLoading: true, preset: preset, hasError: false });

      try {
        await client.current.triggerPreset(preset);

        setStatus({ isLoading: false, preset: preset, hasError: false });
      } catch (error) {
        setStatus({ isLoading: false, preset: preset, hasError: true });
      }
    },
    [client],
  );

  return [
    {
      isInitializing,
      ...status,
    },
    triggerPreset,
  ];
}
