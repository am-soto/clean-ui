import { Button, Card } from "../components";
import { CardFooter } from "../components/Card";
import { CardContent } from "../components/Card/Card";
import { Colors } from "ui";
import { GetTasksUseCase, Task } from "core";
import "../styles/globals.css";
import { useEffect, useState } from "react";

export const Home = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(()=> {
        const getData = async () => {
            const useCase = new GetTasksUseCase();
            const response = await useCase.execute();
            setTasks(response);
        }
        getData();
    }, [])
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello Hiberus from React!
      </h1>

      <Button color={Colors.blue}>+</Button>
      {tasks.map((t) =>       
        <Card color={Colors.red} key={t.id}>
            <CardContent>
                {t.title}
            </CardContent>
            <CardFooter>
                <div>{t.createdAt.toLocaleString("ES")}</div>
                <Button>+</Button>
            </CardFooter>
        </Card>
      )}
    </>
  );
};
