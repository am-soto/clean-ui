import { Task } from "core";
import { ButtonHTMLAttributes, useEffect, useState } from "react";

type OverlayProps = ButtonHTMLAttributes<HTMLDivElement> & {
  clientCode: string;
  task: Task;
};

const Overlay = ({ clientCode, task }: OverlayProps) => {
  const isEditable = () => {
    if (clientCode !== task.clientCode) {
      const now = new Date();
      const differenceInSeconds =
        (now.getTime() - task.updatedAt.getTime()) / 1000;
      return differenceInSeconds > 5;
    }
    return true;
  };
  const [, setTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 100);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return !isEditable() && <edit-overlay />;
};
Overlay.displayName = "Overlay";

export { Overlay };
