declare module '*.svg' {
  import React, { PropsWithoutRef } from 'react';
  const ReactComponent: React.FunctionComponent<PropsWithoutRef<SVGSVGElement>>;
  export { ReactComponent };
  const src: string;
  export default src;
}
