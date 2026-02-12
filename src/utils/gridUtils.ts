import type { OpenedTile } from '../types';

export interface GridCell {
  tile: OpenedTile;
  row: number;
  col: number;
}

function isSequentialRun(group: OpenedTile[]): boolean {
  if (group.length <= 1) return true;
  const numbers = group.map((t) => t.number);
  const uniqueNumbers = new Set(numbers);
  if (uniqueNumbers.size === 1) return false;

  const sorted = [...uniqueNumbers].sort((a, b) => a - b);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] !== sorted[i - 1] + 1) return false;
  }
  return true;
}

function computeSetColumns(baseNumber: number, count: number): number[] {
  const baseCol = baseNumber - 1;
  const cols: number[] = [baseCol];
  let right = baseCol + 1;
  let left = baseCol - 1;

  for (let i = 1; i < count; i++) {
    if (right <= 12) {
      cols.push(right);
      right++;
    } else if (left >= 0) {
      cols.push(left);
      left--;
    }
  }

  return cols;
}

export function computeGridCells(groups: OpenedTile[][]): GridCell[] {
  const cells: GridCell[] = [];

  groups.forEach((group, rowIdx) => {
    if (rowIdx >= 7) return;

    if (isSequentialRun(group)) {
      const sorted = [...group].sort((a, b) => a.number - b.number);
      sorted.forEach((tile) => {
        const col = tile.number - 1;
        if (col >= 0 && col <= 12) {
          cells.push({ tile, row: rowIdx, col });
        }
      });
    } else {
      const baseNumber = group[0].number;
      const cols = computeSetColumns(baseNumber, group.length);
      group.forEach((tile, i) => {
        if (i < cols.length) {
          cells.push({ tile, row: rowIdx, col: cols[i] });
        }
      });
    }
  });

  return cells;
}

export function computePairCells(pairGroups: OpenedTile[][]): GridCell[] {
  const cells: GridCell[] = [];
  
  pairGroups.forEach((group, groupIndex) => {
    group.forEach((tile, tileIndex) => {
      if (tileIndex < 2) { 
        cells.push({ tile, row: groupIndex, col: tileIndex });
      }
    });
  });

  return cells;
}
