import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { SECTIONS } from '../sections';
import { useActiveSection } from '../hooks/useActiveSection';
import { useSectionLink } from '../hooks/useSectionNavigation';
import { useThemeMode } from '../hooks/useThemeMode';
import { useLanguage } from '../hooks/useLanguage';

export default function NavBar({ name }) {
  const { t } = useTranslation();
  const sectionLink = useSectionLink();
  const { pathname } = useLocation();
  const inView = useActiveSection(SECTIONS);
  // Contact is a tab inside the About window, so highlight it when that tab is open.
  const active = inView === 'about' && pathname === '/contact' ? 'contact' : inView;
  const { mode, toggleMode } = useThemeMode();
  const { toggleLanguage } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => setDrawerOpen(false);
  const themeLabel = mode === 'dark' ? t('a11y.switchToLight') : t('a11y.switchToDark');
  const activeSx = {
    bgcolor: 'primary.main',
    color: 'primary.contrastText',
    '&:hover': { bgcolor: 'primary.dark' },
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 1 }}>
          <Typography
            component="a"
            variant="h6"
            {...sectionLink('about')}
            sx={{ mr: 'auto', fontWeight: 700, color: 'text.primary', textDecoration: 'none' }}
          >
            <Box component="span" aria-hidden="true" sx={{ color: 'primary.main' }}>
              &lt;
            </Box>
            {name}
            <Box component="span" aria-hidden="true" sx={{ color: 'primary.main' }}>
              /&gt;
            </Box>
          </Typography>

          <Box component="nav" aria-label={t('a11y.mainNav')} sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
            {SECTIONS.map((id) => (
              <Button
                key={id}
                {...sectionLink(id)}
                aria-current={active === id ? 'location' : undefined}
                sx={{ borderRadius: 999, px: 1.75, color: 'text.primary', ...(active === id && activeSx) }}
              >
                {t(`nav.${id}`)}
              </Button>
            ))}
          </Box>

          <Tooltip title={t('a11y.switchLanguage')} describeChild>
            <Button variant="outlined" onClick={toggleLanguage} sx={{ minWidth: 48, px: 1 }}>
              {t('language.toggleLabel')}
              <Box component="span" sx={visuallyHidden} lang={t('language.toggleLang')}>
                {' '}
                {t('a11y.switchLanguage')}
              </Box>
            </Button>
          </Tooltip>

          <Tooltip title={themeLabel}>
            <IconButton onClick={toggleMode} aria-label={themeLabel} sx={{ color: 'text.primary' }}>
              {mode === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>
          </Tooltip>

          <IconButton
            onClick={() => setDrawerOpen(true)}
            aria-label={t('a11y.openMenu')}
            aria-controls="mobile-nav"
            aria-expanded={drawerOpen}
            sx={{ display: { md: 'none' }, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
        <Box component="nav" id="mobile-nav" aria-label={t('a11y.mainNav')} sx={{ width: 260, pt: 2 }}>
          <List>
            {SECTIONS.map((id) => (
              <ListItemButton
                key={id}
                component="a"
                {...sectionLink(id, closeDrawer)}
                selected={active === id}
                aria-current={active === id ? 'location' : undefined}
              >
                <ListItemText primary={t(`nav.${id}`)} primaryTypographyProps={{ fontWeight: 500 }} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

NavBar.propTypes = {
  name: PropTypes.string.isRequired,
};
