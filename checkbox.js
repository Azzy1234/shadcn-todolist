import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";


const Checkbox = React.forwardRef(
  ({ className, ...props }, ref) => (
    <CheckboxPrimitive
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )}
      {...props}
      ref={ref}
    >
  
      <CheckboxPrimitive.Indicator
        
        className={cn("flex items-center justify-center text-current")}
      >
        
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive>
  )
);

Checkbox.displayName = "Checkbox";


export { Checkbox };