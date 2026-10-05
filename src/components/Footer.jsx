import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Container, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import GitHub from '@mui/icons-material/GitHub';
import LinkedIn from '@mui/icons-material/LinkedIn';
import EmailOutlined from '@mui/icons-material/EmailOutlined';

export default function Footer({ profile }) {
  const { t } = useTranslation();
  const firstName = profile.name.split(' ')[0];

  // Always-visible contact links, since the full contact panel sits behind a tab.
  const links = [
    { label: 'GitHub', href: profile.github, Icon: GitHub, external: true },
    { label: 'LinkedIn', href: profile.linkedin, Icon: LinkedIn, external: true },
    { label: t('contact.emailLabel', { name: firstName }), href: `mailto:${profile.email}`, Icon: EmailOutlined },
  ];

  return (
    <Box component="footer" sx={{ py: 4, borderTop: '2px dashed', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
          gap={2}
        >
          <Typography sx={{ color: 'text.secondary' }}>
            {t('footer', { year: new Date().getFullYear(), name: profile.name })}
          </Typography>
          <Stack component="ul" direction="row" gap={1.5} sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {links.map(({ label, href, Icon, external }) => {
              const name = external ? `${label} ${t('a11y.opensInNewTab')}` : label;
              return (
                <li key={href}>
                  <Tooltip title={label} describeChild>
                    <IconButton
                      component="a"
                      href={href}
                      aria-label={name}
                      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                      sx={(theme) => ({
                        color: 'text.primary',
                        bgcolor: 'background.paper',
                        border: `2px solid ${theme.palette.outline}`,
                        borderRadius: '10px',
                        boxShadow: `3px 3px 0 ${theme.palette.outline}`,
                        '&:hover': { bgcolor: 'background.paper', color: 'primary.main' },
                      })}
                    >
                      <Icon />
                    </IconButton>
                  </Tooltip>
                </li>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

Footer.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    github: PropTypes.string.isRequired,
    linkedin: PropTypes.string.isRequired,
  }).isRequired,
};
