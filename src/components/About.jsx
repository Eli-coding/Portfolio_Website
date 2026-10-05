import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import PlaceOutlined from '@mui/icons-material/PlaceOutlined';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import CodeRounded from '@mui/icons-material/CodeRounded';
import Section from './Section';
import Contact from './Contact';
import { TabClose, TabStrip, tabSx, windowFrame } from './WindowChrome';

const TABS = [
  { id: 'about', titleKey: 'about.windowTitle', Icon: DescriptionOutlined },
  { id: 'contact', titleKey: 'contact.windowTitle', Icon: CodeRounded },
];

/** The About window's tabs are real, keyboard-accessible tabs (WAI-ARIA tabs pattern). */
function WindowTabs({ active, onSelect }) {
  const { t } = useTranslation();
  const tabRefs = useRef({});

  // Arrow keys / Home / End move between tabs (automatic activation).
  const onKeyDown = (event) => {
    const index = TABS.findIndex((tab) => tab.id === active);
    const moves = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: TABS.length - 1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = TABS[(moves[event.key] + TABS.length) % TABS.length].id;
    onSelect(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Stack direction="row" alignItems="flex-end" gap={0.5} role="tablist" onKeyDown={onKeyDown} sx={{ minWidth: 0 }}>
      {TABS.map(({ id, titleKey, Icon }) => {
        const selected = id === active;
        return (
          <ButtonBase
            key={id}
            ref={(el) => (tabRefs.current[id] = el)}
            disableRipple
            role="tab"
            id={`tab-${id}`}
            aria-selected={selected}
            aria-controls={`panel-${id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(id)}
            sx={(theme) => ({
              ...tabSx(theme, selected),
              '&.Mui-focusVisible': { outline: `3px solid ${theme.palette.primary.main}`, outlineOffset: 2 },
            })}
          >
            <Icon aria-hidden="true" sx={{ fontSize: 17, color: selected ? 'primary.main' : 'inherit' }} />
            <Box component="span" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {t(titleKey)}
            </Box>
            <TabClose />
          </ButtonBase>
        );
      })}
    </Stack>
  );
}

WindowTabs.propTypes = {
  active: PropTypes.oneOf(TABS.map((tab) => tab.id)).isRequired,
  onSelect: PropTypes.func.isRequired,
};

const tabFromPath = (pathname) => (pathname === '/contact' ? 'contact' : 'about');

export default function About({ profile }) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState(() => tabFromPath(location.pathname));

  // Nav links / deep links to #/about or #/contact pick the matching tab.
  useEffect(() => {
    if (location.pathname === '/about' || location.pathname === '/contact') {
      setTab(tabFromPath(location.pathname));
    }
  }, [location.pathname, location.key]);

  const selectTab = (id) => {
    setTab(id);
    navigate({ pathname: `/${id}`, search: location.search }, { replace: true, state: { noScroll: true } });
  };

  return (
    <Section id="about" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Retro pop-up window. data-also lets #/contact scroll here too. */}
      <Box data-also="contact" sx={(theme) => ({ ...windowFrame(theme), scrollMarginTop: { xs: 72, sm: 88 } })}>
        <TabStrip>
          <WindowTabs active={tab} onSelect={selectTab} />
        </TabStrip>

        {/* Both panels share one grid cell so the window keeps the same height when switching tabs. */}
        <Box sx={{ display: 'grid', p: { xs: 3, md: 5 } }}>
          <Box
            role="tabpanel"
            id="panel-about"
            aria-labelledby="tab-about"
            sx={{ gridArea: '1 / 1', visibility: tab === 'about' ? 'visible' : 'hidden' }}
          >
            <Typography
              id="about-title"
              variant="h1"
              tabIndex={-1}
              sx={{ fontSize: { xs: '2.4rem', md: '3.6rem' }, mb: 1.5, outline: 'none' }}
            >
              {t('about.greeting')}{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                {profile.name.split(' ')[0]}
              </Box>
            </Typography>
            <Typography sx={{ fontSize: { xs: '1.15rem', md: '1.3rem' }, fontWeight: 700, maxWidth: '40ch' }}>
              {t('about.tagline')}
            </Typography>
            {profile.location && (
              <Stack
                direction="row"
                alignItems="center"
                gap={0.75}
                sx={{ mt: 1, fontWeight: 700, color: 'text.secondary' }}
              >
                <PlaceOutlined aria-hidden="true" fontSize="small" />
                <span>{profile.location}</span>
              </Stack>
            )}
            <Typography sx={{ fontSize: '1.1rem', maxWidth: '68ch', mt: 3, mb: 0 }}>{t('about.intro')}</Typography>
          </Box>
          <Box
            role="tabpanel"
            id="panel-contact"
            aria-labelledby="tab-contact"
            sx={{ gridArea: '1 / 1', visibility: tab === 'contact' ? 'visible' : 'hidden' }}
          >
            <Contact profile={profile} />
          </Box>
        </Box>
      </Box>
    </Section>
  );
}

About.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string,
  }).isRequired,
};
