import { NeighborsCounter } from "../scripts/gameOfLife";

describe("NeighborsCounter function", () => {
  test("should return the correct number of neighbors", () => {
    const board = [
      [0, 1, 0],
      [1, 0, 1],
      [0, 1, 0],
    ];
    const x = 1;
    const y = 1;
    const result = NeighborsCounter(board, x, y);
    expect(result).toBe(4);
  });

  test("should handle edge cases correctly", () => {
    const board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const x = 0;
    const y = 0;
    const result = NeighborsCounter(board, x, y);
    expect(result).toBe(0);
  });
});
