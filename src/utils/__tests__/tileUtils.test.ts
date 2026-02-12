import { describe, it, expect } from 'vitest';
import { getTileImagePath, getActionLabel } from '../tileUtils';
import type { Tile } from '../../types';

describe('tileUtils', () => {
  describe('getTileImagePath', () => {
    it('should return fake okey path if isJoker is true', () => {
      const tile: Tile = { uniqueID: 1, number: 1, color: 1, isJoker: true, isOkey: false };
      expect(getTileImagePath(tile)).toBe('/assets/images/tiles/FakeOkey.png');
    });

    it('should return correct path based on color and number', () => {
      const tile: Tile = { uniqueID: 2, number: 5, color: 2, isJoker: false, isOkey: false };
      // 2 -> Blue
      expect(getTileImagePath(tile)).toBe('/assets/images/tiles/Blue_5.png');
    });

    it('should default to Red if color is unknown (though unusual)', () => {
       const tile: Tile = { uniqueID: 3, number: 5, color: 99, isJoker: false, isOkey: false };
       expect(getTileImagePath(tile)).toBe('/assets/images/tiles/Red_5.png');
    });
  });

  describe('getActionLabel', () => {
    it('should translate known actions correctly', () => {
      expect(getActionLabel('StartGame')).toBe('Oyun Başladı');
      expect(getActionLabel('DiscardTile')).toBe('Taş Attı');
      expect(getActionLabel('MergeSet')).toBe('Seriye Ekledi');
    });

    it('should return original string for unknown actions', () => {
      expect(getActionLabel('UnknownAction')).toBe('UnknownAction');
    });
  });
});
