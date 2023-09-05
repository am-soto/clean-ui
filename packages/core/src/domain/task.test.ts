import { expect, test, describe, beforeEach, afterEach, vi } from "vitest";
import { Task } from "./task";

describe("Task", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("create", () => {
    expect(Task.create(1, "Task 1", "", "todo", "", "", null)).toEqual({
      id: 1,
      title: "Task 1",
      description: "",
      status: "todo",
      color: "",
      createdAt: new Date(),
      user: null,
    });
  });
});
