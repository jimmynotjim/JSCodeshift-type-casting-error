import { forwardRef, ForwardedRef, HTMLAttributes } from 'react';

export interface TestComponentProps extends HTMLAttributes<HTMLDivElement> {
  testAttribute: 'oldValue' | 'newValue' | 'bar' | 'values...';
}

export const TestComponent = forwardRef(
  (props: TestComponentProps, ref: ForwardedRef<HTMLDivElement>) => {

    return (
      <div ref={ref}>This is a test component</div>
    );
  },
);

TestComponent.displayName = 'TestComponent';