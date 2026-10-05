import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import { slug, useProjectFilters } from './useProjectFilters';
import { makeWrapper } from '../test/utils';

const projects = [
  { id: 'quiz', category: 'frontend', tech: ['React', 'Vite'] },
  { id: 'weather', category: 'frontend', tech: ['React', 'OpenWeatherMap API'] },
  { id: 'etl', category: 'backend', tech: ['Node.js', 'SQL'] },
];

// Runs the hook and also exposes the router location, so URL updates can be checked.
function setup(route = '/') {
  return renderHook(
    () => ({ filters: useProjectFilters(projects), location: useLocation() }),
    { wrapper: makeWrapper(route) },
  );
}

const ids = (list) => list.map((p) => p.id);

describe('slug', () => {
  it('turns names into URL-safe ids', () => {
    expect(slug('Node.js')).toBe('node-js');
    expect(slug('OpenWeatherMap API')).toBe('openweathermap-api');
    expect(slug('  React!  ')).toBe('react');
  });
});

describe('useProjectFilters', () => {
  it('lists categories that are in use first, then technologies alphabetically', () => {
    const { result } = setup();
    expect(result.current.filters.tags.map((t) => t.id)).toEqual([
      'frontend',
      'backend',
      'node-js',
      'openweathermap-api',
      'react',
      'sql',
      'vite',
    ]);
    // "fullstack" is skipped because no project uses it.
    expect(result.current.filters.tags.find((t) => t.id === 'fullstack')).toBeUndefined();
  });

  it('shows every project when nothing is selected', () => {
    const { result } = setup();
    expect(result.current.filters.selected.size).toBe(0);
    expect(ids(result.current.filters.visible)).toEqual(['quiz', 'weather', 'etl']);
  });

  it('reads the selected tags from the URL', () => {
    const { result } = setup('/projects?tags=sql');
    expect([...result.current.filters.selected]).toEqual(['sql']);
    expect(ids(result.current.filters.visible)).toEqual(['etl']);
  });

  it('ignores unknown tags in the URL', () => {
    const { result } = setup('/projects?tags=cobol,vite');
    expect([...result.current.filters.selected]).toEqual(['vite']);
    expect(ids(result.current.filters.visible)).toEqual(['quiz']);
  });

  it('matches a category tag against the project category', () => {
    const { result } = setup('/projects?tags=backend');
    expect(ids(result.current.filters.visible)).toEqual(['etl']);
  });

  it('shows projects matching ANY selected tag', () => {
    const { result } = setup('/projects?tags=vite,sql');
    expect(ids(result.current.filters.visible)).toEqual(['quiz', 'etl']);
  });

  it('toggling a tag on writes it to the URL without scrolling', () => {
    const { result } = setup('/about');
    act(() => result.current.filters.toggle('react'));
    expect(result.current.location.pathname).toBe('/projects');
    expect(result.current.location.search).toBe('?tags=react');
    expect(result.current.location.state).toEqual({ noScroll: true });
    expect(ids(result.current.filters.visible)).toEqual(['quiz', 'weather']);
  });

  it('toggling a selected tag again removes it', () => {
    const { result } = setup('/projects?tags=react,sql');
    act(() => result.current.filters.toggle('react'));
    expect(result.current.location.search).toBe('?tags=sql');
  });

  it('clear() removes all filters from the URL', () => {
    const { result } = setup('/projects?tags=react,sql');
    act(() => result.current.filters.clear());
    expect(result.current.location.pathname).toBe('/projects');
    expect(result.current.location.search).toBe('');
    expect(result.current.filters.visible).toHaveLength(3);
  });
});
