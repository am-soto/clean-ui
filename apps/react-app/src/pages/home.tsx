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
  DeleteTasksUseCase,
  GetTasksUseCase,
  PatchTasksUseCase,
  PostTasksUseCase,
  Task,
} from "core";
import { useCallback, useEffect, useState } from "react";
import { Colors } from "ui";
import { debounce } from "../heplers/debounce";
import "./loader.css";

const useCasePost = new PostTasksUseCase();
const useCasePatch = new PatchTasksUseCase();
const useCaseDelete = new DeleteTasksUseCase();
const useCaseGet = new GetTasksUseCase();

export const Home = () => {
  const [isLoadingDelete, setLoadingDelete] = useState(false);
  const [currentDeleteIndex, setCurrentDeleteIndex] = useState<number | null>();
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
      const response = await useCaseGet.execute();
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceEditTask = useCallback(debounce(editTask), [editTask]);

  const deleteTask = async (id: number, index: number) => {
    setLoadingDelete(true);
    setCurrentDeleteIndex(index);
    await useCaseDelete.execute(id);
    const response = await useCaseGet.execute();
    setTasks(response);

    setCurrentDeleteIndex(null);
    setLoadingDelete(false);
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
        <SearchBar onValueChange={filterNotes} />
        <h1 className="text-5xl">Notas</h1>
        <ul className="flex flex-wrap gap-4 py-2 overflow-auto " ref={parent}>
          {searchedTasks.length ? (
            searchedTasks
              .map((t, index) => (
                <li key={t.id} className="relative">
                  {/* Overlay de carga */}
                  {isLoadingDelete && index === currentDeleteIndex && (
                    <div className="absolute z-50 flex items-center justify-center w-full h-full bg-black opacity-50 rounded-2xl">
                      <div className="delete-spinner" />
                    </div>
                  )}
                  <Card color={t.color}>
                    <CardContent>
                      <input
                        className="w-full text-xl font-semibold bg-transparent focus:outline-none"
                        autoFocus
                        defaultValue={t.title}
                        onChange={({ currentTarget }) =>
                          debounceEditTask(currentTarget.value, t.id, "title")
                        }
                      />
                      <textarea
                        className="w-full h-full bg-transparent resize-none focus:outline-none"
                        defaultValue={t.description}
                        onChange={({ currentTarget }) =>
                          debounceEditTask(
                            currentTarget.value,
                            t.id,
                            "description"
                          )
                        }
                      />
                    </CardContent>
                    <CardFooter className="flex items-end justify-between font-medium pt-7">
                      {t.createdAt.toLocaleString("ES")}
                      <button
                        onClick={() => deleteTask(t.id, index)}
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
