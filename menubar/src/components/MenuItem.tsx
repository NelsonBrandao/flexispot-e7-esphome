import classNames from 'classNames';

interface MenuItemProps extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
  hasError?: boolean;
  icon: React.ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export const MenuItem = ({ children, hasError, icon, isDisabled, isLoading, ...props }: MenuItemProps) => {
  return (
    <button
      className={classNames(
        'flex flex-col items-center rounded-lg p-3  cursor-pointer transition-all text-gray-700 fill-gray-700',
        {
          'hover:text-sky-500 hover:fill-sky-500 hover:bg-sky-100': !isDisabled,
          'text-gray-300 fill-gray-300': isDisabled,
          'animate-pulse': isLoading,
          'animate-error': hasError,
        },
      )}
      {...props}
    >
      <div>{icon}</div>

      <p className='font-light text-sm tracking-wide pt-1'>{children}</p>
    </button>
  );
};
