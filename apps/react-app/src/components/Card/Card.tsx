import { Task } from "core";
import { ButtonHTMLAttributes, forwardRef, useEffect, useState } from "react";
import {
  ButtonDeleteStyles,
  CardStyles,
  InputStyles,
  TextareaStyles,
} from "ui";
import { Overlay } from "../Overlay";

type CardProps = ButtonHTMLAttributes<HTMLDivElement> & {
  clientCode: string;
  task: Task;
  focus: boolean;
  onValueChange: (task: Task) => void;
  onDelete: (task: Task) => void;
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ clientCode, task, onValueChange, onDelete, focus, ...props }, ref) => {
    const [deleting, setDeleting] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const onClickDelete = () => {
      setDeleting(true);
      onDelete(task);
    };

    useEffect(() => {
      setTitle(task.title);
      setDescription(task.description);
    }, [task]);

    const isEditable = () => {
      if (clientCode !== task.clientCode) {
        const now = new Date();
        const differenceInSeconds =
          (now.getTime() - task.updatedAt.getTime()) / 1000;
        return differenceInSeconds > 5;
      }
      return true;
    };

    return (
      <div className="relative">
        {/* Overlay de carga */}
        <Overlay clientCode={clientCode} task={task} />
        {deleting && <delete-loading-overlay />}
        <div ref={ref} className={CardStyles({ color: task.color })} {...props}>
          {/** Content */}
          <div className="h-full">
            <input
              className={InputStyles}
              autoFocus={focus}
              value={title}
              onChange={({ currentTarget }) => {
                if (isEditable()) {
                  setTitle(currentTarget.value);
                  onValueChange({
                    ...task,
                    title: currentTarget.value,
                  });
                }
              }}
            />
            <textarea
              className={TextareaStyles}
              value={description}
              onChange={({ currentTarget }) => {
                if (isEditable()) {
                  setDescription(currentTarget.value);
                  onValueChange({
                    ...task,
                    description: currentTarget.value,
                  });
                }
              }}
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
