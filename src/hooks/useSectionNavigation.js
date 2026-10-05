import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Links to a section as a hash route (#/projects), keeping any active
 * filters in the query string so they survive navigation.
 */
export function useSectionLink() {
  const navigate = useNavigate();
  const { search } = useLocation();

  return useCallback(
    (id, onNavigate) => ({
      href: `#/${id}${search}`,
      onClick: (event) => {
        event.preventDefault();
        onNavigate?.();
        navigate({ pathname: `/${id}`, search });
      },
    }),
    [navigate, search],
  );
}

/** Scrolls to the section named in the route whenever the route changes. */
export function useSectionScroll() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.noScroll) return;
    const id = location.pathname.replace(/^\//, '');
    if (!id) return;
    // Sections that live inside another (e.g. the contact tab) mark their container with data-also.
    const target = document.getElementById(id) ?? document.querySelector(`[data-also~="${id}"]`);
    target?.scrollIntoView();
    // Wait a frame so a tab switched by this same navigation is visible before focusing.
    requestAnimationFrame(() => document.getElementById(`${id}-title`)?.focus({ preventScroll: true }));
  }, [location]);
}
