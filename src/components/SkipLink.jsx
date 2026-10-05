import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

export default function SkipLink() {
  const { t } = useTranslation();

  // Handled in JS: a plain "#main" href would be read as a route by HashRouter.
  const skip = (event) => {
    event.preventDefault();
    document.getElementById('main')?.focus();
  };

  return (
    <Box
      component="a"
      href="#main"
      onClick={skip}
      sx={{
        position: 'absolute',
        left: 16,
        top: -100,
        zIndex: (theme) => theme.zIndex.appBar + 1,
        px: 2,
        py: 1,
        borderRadius: 2,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        fontWeight: 700,
        '&:focus': { top: 12 },
      }}
    >
      {t('a11y.skipToContent')}
    </Box>
  );
}
