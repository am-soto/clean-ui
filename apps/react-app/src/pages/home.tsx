import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import { Colors } from "ui";
import { useTasks } from "../hooks/useTasks";
import { Button, Card, SearchBar } from "../components";

export const Home = () => {
  const [parent] = useAutoAnimate();
  const [showColors, setShowColors] = useState(false);
  const [colors] = useState<string[]>(() =>
    Object.keys(Colors).filter((item) => item !== "white" && item !== "black")
  );
  const {
    clientCode,
    getTasks,
    createTask,
    updateFilter,
    updateTask,
    deleteTask,
  } = useTasks();

  return (
    <home-layout>
      <div slot="left-bar">
        <h3>Añadir</h3>
        <Button onClick={() => setShowColors(!showColors)}>&#10010;</Button>
        {showColors && (
          <ul className="pt-4" ref={parent}>
            {colors.map((item) => (
              <li key={item}>
                {/* TODO: mover a ui */}
                <button
                  type="button"
                  className={`w-7 h-7 rounded-full bg-${item} transition-all active:scale-110`}
                  onClick={() => createTask(item)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div slot="main">
        <SearchBar onValueChange={updateFilter} />
        <h1 className="text-5xl">Notas</h1>
        <ul className="flex flex-wrap gap-4 py-2 overflow-auto" ref={parent}>
          {getTasks().length ? (
            getTasks().map((t) => (
              <li key={t.id}>
                <Card
                  clientCode={clientCode}
                  task={t}
                  onDelete={deleteTask}
                  onValueChange={updateTask}
                />
              </li>
            ))
          ) : (
            <h2>No se encontraron resultados.</h2>
          )}
        </ul>
      </div>
    </home-layout>
  );
};
