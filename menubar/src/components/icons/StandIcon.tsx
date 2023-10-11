import { IconProps } from './types';

export const StandIcon = (props: IconProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' {...props}>
      <path d='M370.875 103.922c27.761-10.39 41.815-41.317 31.363-69.109C391.849 7.082 360.901-6.971 333.17 3.429c-27.751 10.42-41.785 41.347-31.394 69.108 10.41 27.762 41.358 41.826 69.099 31.385Zm24.894 207.214V167.261c-.367-21.798-18.358-39.159-40.156-38.772-21.808.376-39.201 18.328-38.824 40.136v129.761l12.303 180.786c-.05 15.142 12.192 27.517 27.386 27.6 15.173.02 27.538-12.212 27.598-27.395 0 0 11.815-127.005 11.693-168.241ZM209.356 183.735v-31.838H101.505L61.674 51.679 33.943 62.69l47.321 121.045h128.092Zm41.683 14.634H35.673V512h38.213V240.011h177.153v-41.642Z' />
    </svg>
  );
};
