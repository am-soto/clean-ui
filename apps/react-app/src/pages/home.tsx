
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import { Colors } from "ui";
import { useTasks } from "../hooks/useTasks";
import {
  Button,
  Card,
  SearchBar,
} from "../components";

export const Home = () => {
  const [parent] = useAutoAnimate();
  const [showColors, setShowColors] = useState(false);
  const [colors] = useState<string[]>(() =>
    Object.keys(Colors).filter((item) => item !== "white" && item !== "black")
  );
  const { focusNew, getTasks, createTask, updateFilter, updateTask, deleteTask } = useTasks();

  return (
    <div className="flex h-screen divide-x">
      <div className="flex flex-col items-center gap-8 p-5 text-center ">
        <h3>App</h3>
        <div className="flex flex-col gap-4">
          <Button onClick={() => setShowColors(!showColors)}>+</Button>
          <ul className="flex flex-col gap-1">
            {showColors &&
              colors.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className={`w-7 h-7 rounded-full bg-${item} animate__animated animate__fadeInDown`}
                    onClick={() => createTask(item)}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col w-full gap-10 p-5 w-ful md:px-20">
        <SearchBar onValueChange={updateFilter} />
        <h1 className="text-5xl">Notas</h1>
        <ul className="flex flex-wrap gap-4 py-2 overflow-auto " ref={parent}>
          {getTasks().length ? (
            getTasks()
              .map((t) => (
                <li key={t.id}>
                  <Card focus={focusNew} color={t.color} task={t} onDelete={deleteTask} onValueChange={updateTask} />
                </li>
              ))
          ) : (
            <h2>No se encontraron resultados.</h2>
          )}
        </ul>
      </div>
    </div>
  );
};
