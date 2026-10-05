import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import OpenInNew from '@mui/icons-material/OpenInNew';
import GitHub from '@mui/icons-material/GitHub';
import TechChips from './TechChips';
import ExternalButton from './ExternalButton';
import ProjectTile from './ProjectTile';

export const projectShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  category: PropTypes.oneOf(['frontend', 'backend', 'fullstack']).isRequired,
  status: PropTypes.oneOf(['inDevelopment']),
  tech: PropTypes.arrayOf(PropTypes.string).isRequired,
  demo: PropTypes.string,
  repo: PropTypes.string,
  thumbnail: PropTypes.string,
  tile: PropTypes.oneOf(['terminal', 'braces', 'cloud', 'database']),
});

export default function ProjectCard({ project, index }) {
  const { t } = useTranslation();
  const title = t(`projects.items.${project.id}.title`);

  return (
    // Wide card: image/tile on the left, details on the right (stacked on phones).
    <Card component="article" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      {/* One thumbnail max; falls back to a decorative symbol tile. Decorative
          images leave thumbnailAlt out (alt=""); screenshots should describe what they show. */}
      {project.thumbnail ? (
        <CardMedia
          component="img"
          image={project.thumbnail}
          alt={t(`projects.items.${project.id}.thumbnailAlt`, { defaultValue: '' })}
          loading="lazy"
          width="400"
          height="140"
          sx={(theme) => ({
            width: { xs: '100%', md: 170 },
            height: { xs: 110, md: 'auto' },
            flexShrink: 0,
            objectFit: 'cover',
            borderBottom: { xs: `2px solid ${theme.palette.badge.border}`, md: 0 },
            borderRight: { md: `2px solid ${theme.palette.badge.border}` },
          })}
        />
      ) : (
        <ProjectTile symbol={project.tile} index={index} />
      )}
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1, p: 2.5 }}>
          <Typography variant="h3" sx={{ fontSize: '1.15rem' }}>
            {title}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
            flexWrap="wrap"
            sx={{ order: -1 }}
          >
            <Typography sx={(theme) => ({ color: theme.palette.secondary.main, fontWeight: 700, fontSize: '0.9rem' })}>
              {t(`projects.categories.${project.category}`)}
            </Typography>
            {project.status && <Chip label={t(`projects.status.${project.status}`)} size="small" color="secondary" />}
          </Stack>
          <Typography sx={{ color: 'text.secondary', maxWidth: '68ch', fontSize: '0.95rem' }}>
            {t(`projects.items.${project.id}.description`)}
          </Typography>
          <TechChips items={project.tech} />
        </CardContent>
        {(project.demo || project.repo) && (
          <CardActions sx={{ px: 2.5, pb: 2.5, pt: 0.5, gap: 1, flexWrap: 'wrap' }}>
            {project.demo && (
              <ExternalButton href={project.demo} variant="contained" size="small" startIcon={<OpenInNew />}>
                {t('projects.liveDemo')}
                <Box component="span" sx={visuallyHidden}>
                  : {title}
                </Box>
              </ExternalButton>
            )}
            {project.repo && (
              <ExternalButton href={project.repo} variant="outlined" size="small" startIcon={<GitHub />}>
                {t('projects.code')}
                <Box component="span" sx={visuallyHidden}>
                  : {title}
                </Box>
              </ExternalButton>
            )}
          </CardActions>
        )}
      </Box>
    </Card>
  );
}

ProjectCard.propTypes = {
  project: projectShape.isRequired,
  index: PropTypes.number.isRequired,
};
