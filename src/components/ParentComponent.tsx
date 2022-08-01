import { forwardRef, ForwardedRef } from 'react';
import { TestComponent } from './TestComponent';


export const ParentComponent = forwardRef(
  (ref: ForwardedRef<SVGSVGElement>) => {

    return (
      <TestComponent testAttribute="oldValue" />
    );
  },
);

TestComponent.displayName = 'TestComponent';