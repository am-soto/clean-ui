import { Task } from "core";
import { ButtonHTMLAttributes, forwardRef, useEffect, useState } from "react";
import {
  ButtonDeleteStyles,
  CardStyles,
  InputStyles,
  TextareaStyles,
} from "ui";
import { Overlay } from "../Overlay";
import avatar from "animal-avatar-generator";
import { LocalService } from "utils";

type CardProps = ButtonHTMLAttributes<HTMLDivElement> & {
  clientCode: string;
  task: Task;
  onValueChange: (task: Task) => void;
  onDelete: (task: Task) => void;
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ clientCode, task, onValueChange, onDelete, ...props }, ref) => {
    const [deleting, setDeleting] = useState(false);
    const [internalTask, setInternalTask] = useState(task);
    const [isEditedbyMe, setIsEditedbyMe] = useState(true);

    const onClickDelete = () => {
      setDeleting(true);
      onDelete(task);
    };

    useEffect(() => {
      setInternalTask({
        ...task,
        title: task.title,
        description: task.description,
      });
      setIsEditedbyMe(task.clientCode === LocalService.get("client-code"));
    }, [task]);

    useEffect(() => {
      setIsEditedbyMe(
        internalTask.clientCode === LocalService.get("client-code")
      );
    }, [internalTask]);

    const isEditable = () => {
      if (clientCode !== task.clientCode) {
        const now = new Date();
        const differenceInSeconds =
          (now.getTime() - task.updatedAt.getTime()) / 1000;
        return differenceInSeconds > 5;
      }
      return true;
    };

    const [focusTitle, setFocusTitle] = useState<boolean>(false);

    return (
      <div
        className={`relative z-50 ml-[7px] mb-[7px] ${
          focusTitle
            ? "outline outline-[#555] rounded-2xl outline-offset-4"
            : ""
        }`}
        onFocus={() => setFocusTitle(true)}
        onBlur={() => setFocusTitle(false)}
      >
        {/* Overlay de carga */}
        <Overlay clientCode={clientCode} task={task} />
        {deleting && <delete-loading-overlay />}
        <div ref={ref} className={CardStyles({ color: task.color })} {...props}>
          {/** Content */}
          <div className="h-full">
            <input
              className={InputStyles}
              aria-label="input title"
              maxLength={20}
              value={internalTask.title}
              onChange={({ currentTarget }) => {
                if (isEditable()) {
                  // setTitle(currentTarget.value);
                  setInternalTask({
                    ...task,
                    title: currentTarget.value,
                    clientCode: LocalService.get("client-code") ?? "",
                  });
                  onValueChange({
                    ...task,
                    title: currentTarget.value,
                  });
                }
              }}
            />
            <textarea
              className={TextareaStyles}
              value={internalTask.description}
              aria-label="input description"
              onChange={({ currentTarget }) => {
                if (isEditable()) {
                  // setDescription(currentTarget.value);
                  setInternalTask({
                    ...task,
                    description: currentTarget.value,
                    clientCode: LocalService.get("client-code") ?? "",
                  });
                  onValueChange({
                    ...task,
                    description: currentTarget.value,
                    clientCode: LocalService.get("client-code") ?? "",
                  });
                }
              }}
            />
          </div>

          {/** Footer */}
          <div className="flex items-end justify-between font-medium pt-7">
            {isEditedbyMe ? (
              <span className="text-[#555]">Editada por ti</span>
            ) : (
              <img
                className="transition-all scale-100 rounded-full outline outline-2 outline-offset-2 hover:scale-150 hover:outline-none"
                height="32"
                width="32"
                src={`data:image/svg+xml;utf8,${encodeURIComponent(
                  avatar(task.clientCode, { size: 100 }).trim()
                )}`}
              />
            )}
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
