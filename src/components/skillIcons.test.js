import { describe, expect, it } from 'vitest';
import DataObjectOutlined from '@mui/icons-material/DataObjectOutlined';
import HubOutlined from '@mui/icons-material/HubOutlined';
import StorageOutlined from '@mui/icons-material/StorageOutlined';
import LocalOfferOutlined from '@mui/icons-material/LocalOfferOutlined';
import { skillIcon } from './skillIcons';

describe('skillIcon', () => {
  it('returns the icon mapped to a known skill', () => {
    expect(skillIcon('JavaScript')).toBe(DataObjectOutlined);
    expect(skillIcon('PostgreSQL')).toBe(StorageOutlined);
  });

  it('ignores letter case', () => {
    expect(skillIcon('REACT')).toBe(HubOutlined);
    expect(skillIcon('vue.js')).toBe(HubOutlined);
  });

  it('matches on the name before a parenthetical note', () => {
    expect(skillIcon('SQL (Azure Data Studio, DBeaver)')).toBe(StorageOutlined);
  });

  it('falls back to a tag icon for unknown skills', () => {
    expect(skillIcon('Cobol')).toBe(LocalOfferOutlined);
    expect(skillIcon('')).toBe(LocalOfferOutlined);
  });
});
