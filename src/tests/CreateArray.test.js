import { CreateArray } from "../scripts/gameOfLife";

describe("CreateArray function", () => {
  test("should return an array with the specified number of columns and rows", () => {
    const cols = 3;
    const rows = 4;
    const result = CreateArray(cols, rows);
    expect(result.length).toBe(cols);
    result.forEach((column) => {
      expect(column.length).toBe(rows);
    });
  });

  test("should return an array filled with null values", () => {
    const cols = 2;
    const rows = 3;
    const result = CreateArray(cols, rows);
    expect(
      result.every((column) => column.every((value) => value === null))
    ).toBe(true);
  });
});
