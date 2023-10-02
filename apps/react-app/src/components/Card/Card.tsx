import { Task } from "core";
import { ButtonHTMLAttributes, forwardRef, useState } from "react";
import {
  ButtonDeleteStyles,
  CardStyles,
  InputStyles,
  TextareaStyles,
} from "ui";

type CardProps = ButtonHTMLAttributes<HTMLDivElement> & {
  task: Task;
  focus: boolean;
  onValueChange: (task: Task) => void;
  onDelete: (task: Task) => void;
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ task, onValueChange, onDelete, focus, ...props }, ref) => {
    const [deleting, setDeleting] = useState(false);
    const onClickDelete = () => {
      setDeleting(true);
      onDelete(task);
    };
    return (
      <div className="relative">
        {/* Overlay de carga */}
        {deleting && <delete-loading-overlay />}
        <div ref={ref} className={CardStyles({ color: task.color })} {...props}>
          {/** Content */}
          <div className="h-full">
            <input
              className={InputStyles}
              autoFocus={focus}
              defaultValue={task.title}
              onChange={({ currentTarget }) =>
                onValueChange({
                  ...task,
                  title: currentTarget.value,
                })
              }
            />
            <textarea
              className={TextareaStyles}
              defaultValue={task.description}
              onChange={({ currentTarget }) =>
                onValueChange({
                  ...task,
                  description: currentTarget.value,
                })
              }
            />
          </div>

          {/** Footer */}
          <div className="flex items-end justify-between font-medium pt-7">
            {task.createdAt.toLocaleString("ES")}
            <button onClick={onClickDelete} className={ButtonDeleteStyles}>
              <trash-icon />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
