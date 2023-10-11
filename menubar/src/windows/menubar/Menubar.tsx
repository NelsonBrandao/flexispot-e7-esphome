import { MenuItem } from '../../components/MenuItem';
import { OneIcon } from '../../components/icons/OneIcon';
import { TwoIcon } from '../../components/icons/TwoIcon';
import { SeatIcon } from '../../components/icons/SeatIcon';
import { StandIcon } from '../../components/icons/StandIcon';
import { Preset } from '../../api/Flexispot';
import { useFlexispotPresets } from '../../hooks/useFlexispotPresets';

const PRESETS = [
  {
    icon: OneIcon,
    label: 'Preset 1',
    type: Preset.One,
  },
  {
    icon: TwoIcon,
    label: 'Preset 2',
    type: Preset.Two,
  },
  {
    icon: StandIcon,
    label: 'Stand',
    type: Preset.Stand,
  },
  {
    icon: SeatIcon,
    label: 'Sit',
    type: Preset.Sit,
  },
];

export const Menubar = () => {
  const [{ preset: activePreset, isInitializing, hasError, isLoading }, onPresetClicked] = useFlexispotPresets();

  if (isInitializing) {
    return;
  }

  return (
    <div className='w-full h-full grid grid-cols-4 gap-0.5 px-2 items-center'>
      {PRESETS.map(({ icon: Icon, label, type }) => (
        <MenuItem
          hasError={hasError && activePreset === type}
          isLoading={isLoading && activePreset === type}
          icon={<Icon width={34} />}
          isDisabled={isInitializing}
          key={type}
          onClick={() => onPresetClicked(type)}
        >
          {label}
        </MenuItem>
      ))}
    </div>
  );
};
