import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CATEGORIES = ['fullstack', 'frontend', 'backend'];

export const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const projectTags = (p) => [p.category, ...p.tech.map(slug)];

/**
 * Project filter state, stored in the URL (#/projects?tags=react,backend)
 * so filtered views can be deep-linked. A project is shown if it matches
 * ANY selected tag; no selection shows everything.
 */
export function useProjectFilters(projects) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const tags = useMemo(() => {
    const categories = CATEGORIES.filter((c) => projects.some((p) => p.category === c)).map((c) => ({
      id: c,
      kind: 'category',
    }));
    const techs = [...new Set(projects.flatMap((p) => p.tech))]
      .sort((a, b) => a.localeCompare(b))
      .map((name) => ({ id: slug(name), kind: 'tech', label: name }));
    return [...categories, ...techs];
  }, [projects]);

  const selected = useMemo(() => {
    const valid = new Set(tags.map((t) => t.id));
    return new Set((searchParams.get('tags') ?? '').split(',').filter((t) => valid.has(t)));
  }, [searchParams, tags]);

  const setSelected = (next) => {
    const search = next.size ? `?tags=${[...next].join(',')}` : '';
    navigate({ pathname: '/projects', search }, { replace: true, state: { noScroll: true } });
  };

  const toggle = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const clear = () => setSelected(new Set());

  const visible = selected.size
    ? projects.filter((p) => projectTags(p).some((t) => selected.has(t)))
    : projects;

  return { tags, selected, toggle, clear, visible };
}
