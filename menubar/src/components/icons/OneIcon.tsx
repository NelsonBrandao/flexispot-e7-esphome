import { IconProps } from './types';

export const OneIcon = (props: IconProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
      <path d='M11.98 17h1.976V7.033h-.212L9.622 8.51v1.606l2.358-.731V17Z' />

      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-2 0a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z'
      />
    </svg>
  );
};
