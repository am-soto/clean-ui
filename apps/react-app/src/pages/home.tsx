import {
  Button,
  Card,
  CardFooter,
  CardContent,
  SearchBar,
} from "../components";
import "../styles/globals.css";
import { useFilterNotes } from "../hooks/useFilterNotes";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  GetTasksUseCase,
  PatchTasksUseCase,
  PostTasksUseCase,
  Task,
} from "core";
import { useCallback, useEffect, useState } from "react";
import { Colors } from "ui";

const useCasePost = new PostTasksUseCase();
const useCasePatch = new PatchTasksUseCase();

export const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const { searchedTasks, filterNotes } = useFilterNotes(tasks);
  const [parent] = useAutoAnimate();

  const [showColors, setShowColors] = useState(false);
  const [colors] = useState<string[]>(() =>
    Object.keys(Colors).filter((item) => item !== "white" && item !== "black")
  );

  const createTask = async (color: string) => {
    const task = await useCasePost.execute(color);
    setTasks([...tasks, ...task]);
  };

  useEffect(() => {
    const getData = async () => {
      const useCase = new GetTasksUseCase();
      const response = await useCase.execute();
      setTasks(response);
    };
    getData();
  }, []);

  // TODO: Cambiar editable tag por input transparente
  const editTask = async (text: string, id: number, key: string) => {
    await useCasePatch.execute({
      [key]: text,
      id,
    });
  };

  // TODO: Eliminar tareas

  const debounce = (func: any) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const debounceEditTask = useCallback(debounce(editTask), []);

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
        <SearchBar onValueChange={filterNotes} />
        <h1 className="text-5xl">Notas</h1>
        <ul className="flex flex-wrap gap-4 py-2 overflow-auto " ref={parent}>
          {searchedTasks.length ? (
            searchedTasks
              .map((t) => (
                <li key={t.id}>
                  <Card color={t.color}>
                    <CardContent>
                      <input defaultValue={t.title} onChange={({ currentTarget }) => debounceEditTask(currentTarget.value, t.id, "title")} />
                      <textarea defaultValue={t.description} onChange={({ currentTarget }) => debounceEditTask(currentTarget.value, t.id, "description")} />
                    </CardContent>
                    <CardFooter className="pt-5">
                      {t.createdAt.toLocaleString("ES")}
                    </CardFooter>
                  </Card>
                </li>
              ))
              .reverse()
          ) : (
            <h2>No se encontraron resultados.</h2>
          )}
        </ul>
      </div>
    </div>
  );
};
