import { ButtonHTMLAttributes, forwardRef } from "react";
import { ButtonStyles, Colors } from "ui";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: string;
};
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color = Colors.black, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={ButtonStyles({ color })}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";

export { Button };
