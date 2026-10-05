import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import CloudOutlined from '@mui/icons-material/CloudOutlined';
import StorageOutlined from '@mui/icons-material/StorageOutlined';

// Symbol per tile. Short code glyphs use a monospace face; everything else is an icon.
const SYMBOLS = {
  terminal: { text: '>_' },
  braces: { text: '{ }' },
  cloud: { Icon: CloudOutlined },
  database: { Icon: StorageOutlined },
};

/** Decorative colored tile with a code symbol, used when a project has no thumbnail. */
export default function ProjectTile({ symbol = 'braces', index }) {
  const { text, Icon } = SYMBOLS[symbol] ?? SYMBOLS.braces;

  return (
    <Box
      aria-hidden="true"
      sx={(theme) => {
        const tile = theme.palette.tiles[index % theme.palette.tiles.length];
        return {
          // Full-width banner on phones; a block on the card's left on wider screens.
          width: { xs: '100%', md: 170 },
          minHeight: { xs: 110, md: 0 },
          flexShrink: 0,
          display: 'grid',
          placeItems: 'center',
          bgcolor: tile.background,
          borderBottom: { xs: `2px solid ${theme.palette.badge.border}`, md: 0 },
          borderRight: { md: `2px solid ${theme.palette.badge.border}` },
          color: tile.symbol,
        };
      }}
    >
      {Icon ? (
        <Icon sx={{ fontSize: '2.75rem' }} />
      ) : (
        <Box
          component="span"
          sx={{
            fontFamily: 'ui-monospace, "Cascadia Code", Consolas, monospace',
            fontWeight: 700,
            fontSize: '2.4rem',
            lineHeight: 1,
            letterSpacing: '0.04em',
          }}
        >
          {text}
        </Box>
      )}
    </Box>
  );
}

ProjectTile.propTypes = {
  symbol: PropTypes.oneOf(Object.keys(SYMBOLS)),
  index: PropTypes.number.isRequired,
};
