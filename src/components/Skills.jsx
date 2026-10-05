import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Stack, Typography } from '@mui/material';
import BuildOutlined from '@mui/icons-material/BuildOutlined';
import Section from './Section';
import { skillIcon } from './skillIcons';

function SkillBadge({ name }) {
  const Icon = skillIcon(name);
  return (
    <Box
      component="li"
      sx={(theme) => ({
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        px: 1.5,
        py: 0.75,
        borderRadius: 1,
        bgcolor: theme.palette.badge.background,
        border: `2px solid ${theme.palette.badge.border}`,
        fontWeight: 700,
      })}
    >
      <Icon aria-hidden="true" sx={(theme) => ({ fontSize: '1.1rem', color: theme.palette.primary.main })} />
      {name}
    </Box>
  );
}

SkillBadge.propTypes = {
  name: PropTypes.string.isRequired,
};

export default function Skills({ skills }) {
  const { t } = useTranslation();

  return (
    <Section
      id="skills"
      title={t('nav.skills')}
      icon={<BuildOutlined />}
      file={t('sections.files.skills')}
      extraTabs={['stackoverflow.com', 'docs.react.dev']}
    >
      <Stack gap={4}>
        {Object.entries(skills).map(([group, items]) => (
          <Box key={group}>
            <Typography
              variant="h3"
              sx={(theme) => ({
                display: 'inline-block',
                mb: 1.5,
                px: 1.25,
                py: 0.25,
                borderRadius: 1,
                fontSize: '0.95rem',
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              })}
            >
              {t(`skills.groups.${group}`)}
            </Typography>
            <Stack component="ul" direction="row" flexWrap="wrap" gap={1.5} sx={{ listStyle: 'none', m: 0, p: 0 }}>
              {items.map((name) => (
                <SkillBadge key={name} name={name} />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Section>
  );
}

Skills.propTypes = {
  skills: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};
