import { ButtonHTMLAttributes, forwardRef } from "react";
import { CardStyles, Colors } from "ui";

type CardProps = ButtonHTMLAttributes<HTMLDivElement> & {
  color?: string;
};

const CardFooter = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLDivElement>) => (
  <div className="flex items-center justify-between pt-1" {...props}>
    {children}
  </div>
);

const CardContent = ({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLDivElement>) => (
  <div
    className={`${className} h-full line-clamp-[7] hover:line-clamp-none `}
    {...props}
  >
    {children}
  </div>
);

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ color = Colors.orange, ...props }, ref) => (
    <div ref={ref} className={CardStyles({ color })} {...props} />
  )
);

Card.displayName = "Card";

export { Card, CardFooter, CardContent };
