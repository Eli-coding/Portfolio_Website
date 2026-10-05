import PropTypes from 'prop-types';
import { Box, Stack } from '@mui/material';

/** Small tech tags: same rounded-square shape as the Skills badges, without the shadow. */
export default function TechChips({ items }) {
  return (
    <Stack component="ul" direction="row" flexWrap="wrap" gap={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {items.map((item) => (
        <Box
          component="li"
          key={item}
          sx={(theme) => ({
            px: 1,
            py: 0.25,
            borderRadius: '8px',
            border: `1.5px solid ${theme.palette.badge.border}`,
            bgcolor: 'background.paper', // white so tags stand out on the soft-grey cards
            fontSize: '0.85rem',
            fontWeight: 700,
          })}
        >
          {item}
        </Box>
      ))}
    </Stack>
  );
}

TechChips.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};
