import 'react';

type MockTagProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      [K: `mock-${string}`]: MockTagProps;
    }
  }
}

export {};
