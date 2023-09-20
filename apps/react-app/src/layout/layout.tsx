import { ReactNode, useState } from "react";
import { Button } from "../components";
import { Colors } from "ui";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { PostTasksUseCase } from "core";

export const Layout = ({ children }: { children: ReactNode }) => {
  const [showColors, setShowColors] = useState(false);
  const [colors] = useState<string[]>(() =>
    Object.keys(Colors).filter((item) => item !== "white")
  );
  const [parent] = useAutoAnimate();

  const useCasePost = new PostTasksUseCase();

  const createTask = async (color: string) => {
    await useCasePost.execute(color);
  };

  return (
    <div className="flex h-screen divide-x">
      <div className="flex flex-col items-center gap-8 p-5 text-center ">
        <h3>App</h3>
        <div className="flex flex-col gap-4">
          <Button onClick={() => setShowColors(!showColors)}>+</Button>
          <ul ref={parent} className="flex flex-col gap-1">
            {showColors &&
              colors.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className={`w-7 h-7 rounded-full bg-${item}`}
                    onClick={() => createTask(item)}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col w-full gap-10 p-5 w-ful md:px-20">
        {children}
      </div>
    </div>
  );
};
