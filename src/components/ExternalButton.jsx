import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

/** A button link that opens in a new tab and says so to screen readers. */
export default function ExternalButton({ href, children, ...props }) {
  const { t } = useTranslation();
  return (
    <Button href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <Box component="span" sx={visuallyHidden}>
        {' '}
        {t('a11y.opensInNewTab')}
      </Box>
    </Button>
  );
}

ExternalButton.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
