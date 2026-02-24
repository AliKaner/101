import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { GameAction, Tile, OpenedTile } from '../../types';
import { getActionLabel } from '../../utils/tileUtils';
import { COLOR_MAP } from '../../types';
import styles from './MovesTable.module.scss';

type SortKey = 'index' | 'player' | 'actionType';
type SortDir = 'asc' | 'desc';

function getTileImg(tile: Tile | null | undefined): string | null {
  if (!tile) return null;
  if (tile.isJoker) return '/assets/images/tiles/FakeOkey.png';
  const colorName = COLOR_MAP[tile.color] || 'Red';
  return `/assets/images/tiles/${colorName}_${tile.number}.png`;
}

function TileThumb({ tile }: { tile: Tile | OpenedTile }) {
  const src = getTileImg(tile);
  if (!src) return null;
  return (
    <img
      src={src}
      alt={`${tile.number}`}
      className={styles.tileThumb}
      title={`${tile.number} (${COLOR_MAP[tile.color] ?? '?'})`}
    />
  );
}

function TileGroupRow({ group }: { group: OpenedTile[] }) {
  return (
    <div className={styles.tileGroup}>
      {group.map((t) => (
        <TileThumb key={t.uniqueID} tile={t} />
      ))}
    </div>
  );
}

function isDiscardAction(name: string) {
  return name === 'DiscardTile';
}

function isDrawAction(name: string) {
  return name === 'DrawFromDiscard' || name === 'DrawFromMiddle';
}

function isOpeningAction(name: string) {
  return name === 'OpenSet' || name === 'OpenSetPairs' || name === 'MergeSet';
}

const ACTION_NAMES_ALL = [
  'StartGame',
  'DistributedTilesPairs',
  'DistributedTiles',
  'DiscardTile',
  'DrawFromDiscard',
  'DrawFromMiddle',
  'OpenSet',
  'OpenSetPairs',
  'MergeSet',
];

const MovesTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const actions: GameAction[] = (location.state as { actions: GameAction[] } | null)?.actions ?? [];
  const onBack = () => navigate(-1);

  const [sortKey, setSortKey] = useState<SortKey>('index');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [filterType, setFilterType] = useState('');
  const [filterWon, setFilterWon] = useState(false);
  const [search, setSearch] = useState('');

  // Determine the winning action index
  const winnerActionIdx = useMemo(() => {
    for (let i = actions.length - 1; i >= 0; i--) {
      if (
        actions[i].action_name === 'DiscardTile' ||
        actions[i].action_name === 'OpenSet' ||
        actions[i].action_name === 'OpenSetPairs' ||
        actions[i].action_name === 'MergeSet'
      ) {
        // Check if after this action there are no more player moves
        const hasPlayerMoveAfter = actions
          .slice(i + 1)
          .some(
            (a) =>
              a.action_name === 'DiscardTile' ||
              a.action_name === 'DrawFromDiscard' ||
              a.action_name === 'DrawFromMiddle' ||
              a.action_name === 'OpenSet' ||
              a.action_name === 'OpenSetPairs' ||
              a.action_name === 'MergeSet'
          );
        if (!hasPlayerMoveAfter) {
          return i;
        }
      }
    }
    return -1;
  }, [actions]);

  const rows = useMemo(() => {
    return actions.map((a, idx) => {
      const label = getActionLabel(a.action_name);
      const isWon = idx === winnerActionIdx;

      const drawnTile = isDrawAction(a.action_name) ? a.tile : null;
      const discardedTile = isDiscardAction(a.action_name) ? a.tile : null;

      const allGroups: OpenedTile[][] = a.series_opened ?? [];
      const regularGroups = allGroups.filter((g) => g.length !== 2);
      const pairGroups = allGroups.filter((g) => g.length === 2);

      const openingType = isOpeningAction(a.action_name) ? label : null;

      const searchStr = `${a.user_name} ${label}`.toLowerCase().trim();

      return {
        idx,
        sira: idx + 1,
        player: a.user_name || 'Sistem',
        label,
        drawnTile,
        discardedTile,
        regularGroups,
        pairGroups,
        openingType,
        isWon,
        searchStr,
        actionName: a.action_name,
      };
    });
  }, [actions, winnerActionIdx]);

  const filtered = useMemo(() => {
    let result = rows;

    if (filterType) {
      result = result.filter((r) => r.actionName === filterType);
    }

    if (filterWon) {
      result = result.filter((r) => r.isWon);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter((r) => r.searchStr.includes(q));
    }

    return result;
  }, [rows, filterType, filterWon, search]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'index') cmp = a.sira - b.sira;
      else if (sortKey === 'player') cmp = a.player.localeCompare(b.player);
      else if (sortKey === 'actionType') cmp = a.label.localeCompare(b.label);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortIcon = (key: SortKey) => {
    if (sortKey !== key) return <span className={styles.sortInactive}>⇅</span>;
    return <span className={styles.sortActive}>{sortDir === 'asc' ? '▲' : '▼'}</span>;
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack} title="Geri Dön">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span>Oyuna Dön</span>
        </button>
        <h1 className={styles.title}>Hamle Tablosu</h1>
        <span className={styles.count}>{sorted.length} / {rows.length} hamle</span>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={styles.searchIcon}>
            <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
          <input
            className={styles.searchInput}
            placeholder="Oyuncu veya hamle tipi ara…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className={styles.clearBtn} onClick={() => setSearch('')}>✕</button>
          )}
        </div>

        <select
          className={styles.select}
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Tüm Hamle Tipleri</option>
          {ACTION_NAMES_ALL.map((name) => (
            <option key={name} value={name}>
              {getActionLabel(name)}
            </option>
          ))}
        </select>

        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={filterWon}
            onChange={(e) => setFilterWon(e.target.checked)}
          />
          <span>Sadece Kazanma Hamlesi</span>
        </label>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th} onClick={() => handleSort('index')}>
                # {sortIcon('index')}
              </th>
              <th className={styles.th} onClick={() => handleSort('player')}>
                Oyuncu {sortIcon('player')}
              </th>
              <th className={styles.th} onClick={() => handleSort('actionType')}>
                Hamle Tipi {sortIcon('actionType')}
              </th>
              <th className={styles.th}>Çekilen Taş</th>
              <th className={styles.th}>Atılan Taş</th>
              <th className={styles.th}>Açılan Seriler</th>
              <th className={styles.th}>Çift Açılma</th>
              <th className={styles.th}>Açılma Tipi</th>
              <th className={styles.th}>Kazandı?</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={9} className={styles.empty}>
                  Sonuç bulunamadı.
                </td>
              </tr>
            ) : (
              sorted.map((row) => (
                <tr key={row.idx} className={`${styles.tr} ${row.isWon ? styles.winRow : ''}`}>
                  <td className={styles.td}>{row.sira}</td>
                  <td className={styles.td}>
                    <span className={styles.playerName}>{row.player}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.actionBadge} data-action={row.actionName}>
                      {row.label}
                    </span>
                  </td>
                  <td className={styles.td}>
                    {row.drawnTile ? <TileThumb tile={row.drawnTile} /> : <span className={styles.dash}>—</span>}
                  </td>
                  <td className={styles.td}>
                    {row.discardedTile ? <TileThumb tile={row.discardedTile} /> : <span className={styles.dash}>—</span>}
                  </td>
                  <td className={styles.td}>
                    {row.regularGroups.length > 0 ? (
                      <div className={styles.groupList}>
                        {row.regularGroups.map((g, i) => (
                          <TileGroupRow key={i} group={g} />
                        ))}
                      </div>
                    ) : (
                      <span className={styles.dash}>—</span>
                    )}
                  </td>
                  <td className={styles.td}>
                    {row.pairGroups.length > 0 ? (
                      <div className={styles.groupList}>
                        {row.pairGroups.map((g, i) => (
                          <TileGroupRow key={i} group={g} />
                        ))}
                      </div>
                    ) : (
                      <span className={styles.dash}>—</span>
                    )}
                  </td>
                  <td className={styles.td}>
                    {row.openingType ? (
                      <span className={styles.openingTypeBadge}>{row.openingType}</span>
                    ) : (
                      <span className={styles.dash}>—</span>
                    )}
                  </td>
                  <td className={styles.td}>
                    {row.isWon ? (
                      <span className={styles.wonBadge}>🏆 Kazandı</span>
                    ) : (
                      <span className={styles.dash}>—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovesTable;
