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
      console.log(differenceInSeconds);
      return differenceInSeconds > 5;
    }
    return true;
  };
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return !isEditable() && <edit-overlay />;
};
Overlay.displayName = "Overlay";

export { Overlay };
