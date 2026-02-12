import { describe, it, expect } from 'vitest';
import { computePairCells, computeGridCells } from '../gridUtils';
import type { OpenedTile } from '../../types';

describe('gridUtils', () => {
  const mockTile = (number: number, color: number): OpenedTile => ({
    uniqueID: number * 10 + color,
    number,
    color,
    isJoker: false,
    isOkey: false,
    group_id: 1,
  });

  describe('computePairCells', () => {
    it('should stack pair groups sequentially in rows', () => {
      const groups: OpenedTile[][] = [
        [mockTile(1, 1), mockTile(1, 2)],
        [mockTile(2, 1), mockTile(2, 2)],
      ];
      
      const cells = computePairCells(groups);

      // First group -> row 0
      expect(cells).toContainEqual(expect.objectContaining({ row: 0, col: 0 }));
      expect(cells).toContainEqual(expect.objectContaining({ row: 0, col: 1 }));
      
      // Second group -> row 1
      expect(cells).toContainEqual(expect.objectContaining({ row: 1, col: 0 }));
      expect(cells).toContainEqual(expect.objectContaining({ row: 1, col: 1 }));
      
      expect(cells).toHaveLength(4);
    });

    it('should ignore tiles beyond index 1 in a group (max 2 columns)', () => {
      const groups: OpenedTile[][] = [
        [mockTile(1, 1), mockTile(1, 2), mockTile(1, 3)],
      ];
      
      const cells = computePairCells(groups);
      
      expect(cells).toHaveLength(2);
      expect(cells.find(c => c.col === 2)).toBeUndefined();
    });
  });

  describe('computeGridCells', () => {
    it('should handle sequential runs correctly', () => {
      // 1, 2, 3 sequence
      const group: OpenedTile[] = [mockTile(1, 1), mockTile(2, 1), mockTile(3, 1)];
      const cells = computeGridCells([group]);

      expect(cells).toHaveLength(3);
      // tile 1 (index 0) should be at col 0 (number - 1)
      expect(cells).toContainEqual(expect.objectContaining({ col: 0, row: 0 }));
      // tile 2 (index 1) should be at col 1
      expect(cells).toContainEqual(expect.objectContaining({ col: 1, row: 0 }));
      // tile 3 (index 2) should be at col 2
      expect(cells).toContainEqual(expect.objectContaining({ col: 2, row: 0 }));
    });

    // Add more cases as needed for sets logic if applicable
  });
});
