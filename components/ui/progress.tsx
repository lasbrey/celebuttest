'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value = 0, ...props }, ref) => {
  const safeValue = typeof value === 'number' ? value : 0;
  const transformStyle = `translateX(-${100 - safeValue}%)`;

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-4 w-full overflow-hidden rounded-xl bg-secondary',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: transformStyle }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
