import { GetTasksUseCase } from "./useCases";

(async () => {
    const useCase = new GetTasksUseCase();
    console.log(await useCase.execute());
})();