import { GetTasksRepository } from "./infraestructure";
import { GetTasksUseCase } from "./useCases";

(async () => {
    const useCase = new GetTasksUseCase();
    console.log(await useCase.execute());

    const repository = new GetTasksRepository();
    console.log(await repository.execute());
})();