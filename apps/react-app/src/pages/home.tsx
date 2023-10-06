import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import { Colors } from "ui";
import { useTasks } from "../hooks/useTasks";
import { Button, Card, SearchBar } from "../components";
import avatar from "animal-avatar-generator";
import { funAnimalName } from "fun-animal-names";

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
      <div
        slot="left-bar"
        className="flex flex-col items-center justify-between"
      >
        <div>
          <h3>Añadir</h3>
          <Button onClick={() => setShowColors(!showColors)}>&#10010;</Button>
          {showColors && (
            <ul className="pt-4" ref={parent}>
              {colors.map((item) => (
                <li key={item}>
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
        <div className="flex flex-col">
          <span className="text-xs text-center">
            made with <span>🥚</span>
          </span>
          <span className="text-sm font-bold text-center">by web-ones</span>
          <span className="text-xs text-center">&copy; 2023</span>
        </div>
      </div>
      <div slot="main">
        <div className="flex justify-betwen">
          <div className="w-[85%] pl-1 ">
            <SearchBar onValueChange={updateFilter} />
            <h1 className="text-5xl">Notas</h1>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="rounded-full"
              height="100"
              width="100"
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                avatar(clientCode, { size: 100 }).trim()
              )}`}
            />
            <span className="font-bold text-center">
              {funAnimalName(clientCode)}
            </span>
          </div>
        </div>
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
