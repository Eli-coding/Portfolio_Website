import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Stack, Tooltip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import RemoveRounded from '@mui/icons-material/RemoveRounded';
import CropSquareRounded from '@mui/icons-material/CropSquareRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';
import AddRounded from '@mui/icons-material/AddRounded';

// Shared pieces for the retro browser windows (About window and every section).

export const mono = 'ui-monospace, "Cascadia Code", Consolas, monospace';

const WINDOW_CONTROLS = [
  { Icon: RemoveRounded, note: 'minimize' },
  { Icon: CropSquareRounded, note: 'maximize' },
  { Icon: CloseRounded, note: 'close' },
];

/** Outer window: outline, rounded corners and the bold offset shadow. */
export const windowFrame = (theme) => ({
  bgcolor: 'background.paper',
  border: `2px solid ${theme.palette.outline}`,
  borderRadius: '14px',
  boxShadow: `8px 8px 0 ${theme.palette.outline}`,
  overflow: 'hidden',
});

/** Tab styles. The open tab is white and merges into the window body; the others sit flat on the pink bar. */
export const tabSx = (theme, selected) => ({
  display: 'inline-flex',
  alignItems: 'center',
  minWidth: 0,
  gap: 1,
  px: 1.5,
  py: 0.75,
  mb: '-2px',
  border: '2px solid',
  borderRadius: '10px 10px 0 0',
  fontFamily: mono,
  fontWeight: 700,
  fontSize: '0.9rem',
  lineHeight: 1.6,
  ...(selected
    ? {
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderColor: theme.palette.outline,
        borderBottomColor: theme.palette.background.paper,
      }
    : {
        bgcolor: 'transparent',
        color: 'inherit',
        borderColor: 'transparent',
        '&:hover': { bgcolor: alpha(theme.palette.background.paper, 0.45) },
      }),
});

/** Hover note for look-only controls. They're hidden from screen readers, so this is mouse/touch only. */
export function Decor({ title, children }) {
  return (
    <Tooltip title={title} arrow describeChild>
      {children}
    </Tooltip>
  );
}

Decor.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

/** The little "×" on a tab (decorative). */
export function TabClose() {
  const { t } = useTranslation();
  return (
    <Decor title={t('about.decor.closeTab')}>
      <CloseRounded aria-hidden="true" sx={{ fontSize: 15, ml: { xs: 0.5, sm: 1.5 }, cursor: 'default' }} />
    </Decor>
  );
}

/** Pink tab strip: the tabs passed as children, then a decorative "+" and — □ × controls. */
export function TabStrip({ children }) {
  const { t } = useTranslation();
  return (
    <Stack
      direction="row"
      alignItems="flex-end"
      gap={0.5}
      sx={(theme) => ({
        px: 1.5,
        pt: 1,
        bgcolor: theme.palette.window.bar,
        color: theme.palette.window.text,
        borderBottom: `2px solid ${theme.palette.outline}`,
      })}
    >
      {children}
      <Decor title={t('about.decor.newTab')}>
        <AddRounded aria-hidden="true" sx={{ fontSize: 22, alignSelf: 'center', ml: 0.5, cursor: 'default' }} />
      </Decor>
      <Box sx={{ flex: 1 }} />
      <Stack
        direction="row"
        gap={{ xs: 1.25, sm: 2.5 }}
        aria-hidden="true"
        sx={{ alignSelf: 'center', pr: 0.5, display: { xs: 'none', sm: 'flex' } }}
      >
        {WINDOW_CONTROLS.map(({ Icon, note }) => (
          <Decor key={note} title={t(`about.decor.${note}`)}>
            <Icon sx={{ fontSize: 19, cursor: 'default' }} />
          </Decor>
        ))}
      </Stack>
    </Stack>
  );
}

TabStrip.propTypes = {
  children: PropTypes.node.isRequired,
};
