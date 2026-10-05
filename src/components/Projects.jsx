import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import FolderOpenOutlined from '@mui/icons-material/FolderOpenOutlined';
import Section from './Section';
import ProjectCard, { projectShape } from './ProjectCard';
import { useProjectFilters } from '../hooks/useProjectFilters';

export default function Projects({ projects }) {
  const { t } = useTranslation();
  const { tags, selected, toggle, clear, visible } = useProjectFilters(projects);

  return (
    <Section
      id="projects"
      title={t('nav.projects')}
      icon={<FolderOpenOutlined />}
      file={t('sections.files.projects')}
      extraTabs={['node_modules/', 'README.md']}
    >
      <Box role="group" aria-labelledby="project-filter-label" sx={{ mb: 4 }}>
        <Typography id="project-filter-label" sx={{ fontWeight: 700, mb: 1 }}>
          {t('projects.filterLabel')}
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1} alignItems="center">
          {tags.map((tag) => {
            const isOn = selected.has(tag.id);
            return (
              <Chip
                key={tag.id}
                label={tag.kind === 'category' ? t(`projects.categories.${tag.id}`) : tag.label}
                onClick={() => toggle(tag.id)}
                color={isOn ? 'primary' : 'default'}
                variant={isOn ? 'filled' : 'outlined'}
                aria-pressed={isOn}
                sx={(theme) => ({ height: 40, borderWidth: 2, borderColor: theme.palette.outline })}
              />
            );
          })}
          {selected.size > 0 && (
            <Button onClick={clear} sx={{ color: 'text.primary', textDecoration: 'underline' }}>
              {t('projects.showAll')}
            </Button>
          )}
        </Stack>
        <Typography role="status" aria-live="polite" sx={{ color: 'text.secondary', mt: 1.5, minHeight: '1.6em' }}>
          {selected.size > 0 ? t('projects.showing', { count: visible.length, total: projects.length }) : ''}
        </Typography>
      </Box>

      {visible.length > 0 ? (
        <Stack component="ul" gap={3} sx={{ listStyle: 'none', p: 0, m: 0 }}>
          {visible.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} index={projects.indexOf(project)} />
            </li>
          ))}
        </Stack>
      ) : (
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography>{t('projects.empty')}</Typography>
          </CardContent>
        </Card>
      )}
    </Section>
  );
}

Projects.propTypes = {
  projects: PropTypes.arrayOf(projectShape).isRequired,
};
