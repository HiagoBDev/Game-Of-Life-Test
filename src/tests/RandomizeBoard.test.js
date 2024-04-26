import { RandomizeBoard } from "../scripts/gameOfLife";

describe('RandomizeBoard function', () => {
  test('should randomize the board correctly', () => {
    const cols = 3;
    const rows = 3;

    const board = new Array(cols).fill(null).map(() => new Array(rows).fill(0));

    RandomizeBoard(cols, rows, board);

    let valid = true;
    board.forEach(row => {
      row.forEach(cell => {
        if (cell !== 0 && cell !== 1) {
          valid = false;
        }
      });
    });

    expect(valid).toBe(true);
  });
});