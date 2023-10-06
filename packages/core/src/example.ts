import { GetTasksRepository } from "./infrastructure";
import {
  GetTasksUseCase,
  PostTasksUseCase,
  DeleteTasksUseCase,
  PatchTasksUseCase,
} from "./useCases";

(async () => {
  //   const useCase = new GetTasksUseCase();
  //   console.log(await useCase.execute());

  //   const repository = new GetTasksRepository();
  //   console.log(await repository.execute());

  //   const useCasePost = new PostTasksUseCase();
  //   console.log(await useCasePost.execute("#ffd068"));

  //   const useCaseDelete = new DeleteTasksUseCase();
  //   console.log(await useCaseDelete.execute(7));

  const useCasePatch = new PatchTasksUseCase();
  console.log(
    await useCasePatch.execute({
      id: 5,
      description: "new description",
      status: "done",
      title: "New Title",
      user_id: 2,
    })
  );
})();
