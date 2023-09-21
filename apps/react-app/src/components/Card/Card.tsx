import { Task } from "core";
import { ButtonHTMLAttributes, forwardRef, useState } from "react";
import { CardStyles, Colors } from "ui";

type CardProps = ButtonHTMLAttributes<HTMLDivElement> & {
  color?: string;
  task: Task;
  focus: boolean;
  onValueChange: (task: Task) => void;
  onDelete: (task: Task) => void;
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ color = Colors.orange, task, onValueChange, onDelete, focus, ...props }, ref) => {
    const [deleting, setDeleting] = useState(false);
    const onClickDelete = () => {
      setDeleting(true);
      onDelete(task);
    }
    return (  
      <div className="relative">      
        {/* Overlay de carga */}
          {deleting && (
            <div className="absolute z-50 flex items-center justify-center w-full h-full bg-black opacity-50 rounded-2xl">
              <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        <div ref={ref} className={CardStyles({ color })} {...props}>
          {/** Content */}
          <div className="h-full">
            <input
              className="w-full text-xl font-semibold bg-transparent focus:outline-none"
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
            className="w-full h-full bg-transparent resize-none focus:outline-none"
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
          <button
            onClick={onClickDelete}
            className="flex items-center justify-center w-8 h-8 transition-all duration-100 ease-in-out scale-100 bg-white rounded-full hover:shadow-lg hover:border-black hover:scale-105"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
        </div>
        </div>
      </div>
    )
  }
);

Card.displayName = "Card";

export { Card };
