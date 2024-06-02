import { IconContext } from 'react-icons';

export const ProvideIconStyles = (props: React.PropsWithChildren) => (
  <IconContext.Provider
    value={{
      size: '16px',
    }}
  >
    {props.children}
  </IconContext.Provider>
);
