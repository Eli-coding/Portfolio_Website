import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Container, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import FolderOutlined from '@mui/icons-material/FolderOutlined';
import PublicOutlined from '@mui/icons-material/PublicOutlined';
import { Decor, TabClose, TabStrip, tabSx, windowFrame } from './WindowChrome';

// Icon for a background tab, guessed from its name: websites, folders, everything else a file.
const tabIcon = (name) => {
  if (/\.(com|dev|org|io)$/.test(name)) return PublicOutlined;
  if (name.endsWith('/')) return FolderOutlined;
  return DescriptionOutlined;
};

/** Decorative "forgot to close it" tab next to the open one (the dev-with-too-many-tabs look). */
function BackgroundTab({ name }) {
  const { t } = useTranslation();
  const Icon = tabIcon(name);
  return (
    <Decor title={t('sections.forgottenTab')}>
      <Box
        aria-hidden="true"
        sx={(theme) => ({
          ...tabSx(theme, false),
          display: { xs: 'none', sm: 'inline-flex' },
          maxWidth: 210,
          cursor: 'default',
        })}
      >
        <Icon sx={{ fontSize: 17, flexShrink: 0 }} />
        <Box component="span" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {name}
        </Box>
        <PlainClose />
      </Box>
    </Decor>
  );
}

BackgroundTab.propTypes = {
  name: PropTypes.string.isRequired,
};

// Background tabs show a plain "×" (no extra tooltip; the whole tab already has one).
function PlainClose() {
  return (
    <Box component="span" aria-hidden="true" sx={{ ml: 1, fontSize: '1rem', lineHeight: 1 }}>
      ×
    </Box>
  );
}

/**
 * Section heading styled as the open tab of a browser window (same tab strip as the About
 * window): purple icon + monospace file name. Screen readers hear the plain section title.
 */
export function SectionTitle({ id, title, icon = null, file = null, extraTabs = [] }) {
  return (
    <TabStrip>
      <Typography
        id={`${id}-title`}
        variant="h2"
        tabIndex={-1}
        sx={(theme) => ({ ...tabSx(theme, true), m: 0, flexShrink: 0, maxWidth: '100%', outline: 'none' })}
      >
        {icon && (
          <Box
            component="span"
            aria-hidden="true"
            sx={{ display: 'flex', color: 'primary.main', '& svg': { fontSize: 17 } }}
          >
            {icon}
          </Box>
        )}
        {file ? (
          <>
            <Box
              component="span"
              aria-hidden="true"
              sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {file}
            </Box>
            <Box component="span" sx={visuallyHidden}>
              {title}
            </Box>
          </>
        ) : (
          title
        )}
        <TabClose />
      </Typography>
      {extraTabs.map((name) => (
        <BackgroundTab key={name} name={name} />
      ))}
    </TabStrip>
  );
}

SectionTitle.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
  file: PropTypes.string,
  extraTabs: PropTypes.arrayOf(PropTypes.string),
};

/** A page section with an anchor id. Pass `title` to render the tab heading. */
export default function Section({ id, title, icon = null, file = null, extraTabs = [], sx = [], children }) {
  return (
    <Box
      component="section"
      id={id}
      aria-labelledby={`${id}-title`}
      sx={[
        {
          scrollMarginTop: { xs: 56, sm: 64 },
          py: { xs: 4, md: 6 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Container maxWidth="lg">
        {title ? (
          // Browser window: tab strip on top, section content in the body.
          <Box sx={windowFrame}>
            <SectionTitle id={id} title={title} icon={icon} file={file} extraTabs={extraTabs} />
            <Box sx={{ p: { xs: 2.5, md: 4 } }}>{children}</Box>
          </Box>
        ) : (
          children
        )}
      </Container>
    </Box>
  );
}

Section.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  icon: PropTypes.node,
  file: PropTypes.string,
  extraTabs: PropTypes.arrayOf(PropTypes.string),
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.array]),
  children: PropTypes.node.isRequired,
};
