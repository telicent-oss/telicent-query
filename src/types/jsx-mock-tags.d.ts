import type React from 'react';

type MockTagProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

type MockIntrinsicElements = {
  [K in `mock-${string}`]: MockTagProps;
};

declare global {
  namespace JSX {
    interface IntrinsicElements extends MockIntrinsicElements {}
  }
}

export {};
