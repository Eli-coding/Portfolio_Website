import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import WorkOutline from '@mui/icons-material/WorkOutline';
import Section from './Section';
import TechChips from './TechChips';

export default function Experience({ jobs }) {
  const { t, i18n } = useTranslation();

  const formatDate = (ym) => {
    if (!ym) return t('experience.present');
    const [year, month] = ym.split('-').map(Number);
    if (!month) return String(year);
    return new Intl.DateTimeFormat(i18n.resolvedLanguage, { month: 'short', year: 'numeric' }).format(
      new Date(year, month - 1),
    );
  };

  return (
    <Section
      id="experience"
      title={t('nav.experience')}
      icon={<WorkOutline />}
      file={t('sections.files.experience')}
      extraTabs={['standup_notes.md', 'jira-4521']}
    >
      <Timeline
        sx={{
          p: 0,
          m: 0,
          // Left-aligned timeline: drop the empty "opposite" column.
          [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0 },
        }}
      >
        {jobs.map((job, index) => {
          const key = `experience.items.${job.id}`;
          const points = t(`${key}.points`, { returnObjects: true });
          return (
            <TimelineItem key={job.id}>
              <TimelineSeparator>
                <TimelineDot
                  sx={(theme) => ({
                    bgcolor: theme.palette.secondary.main,
                    border: `3px solid ${theme.palette.outline}`,
                    boxShadow: 'none',
                    width: 20,
                    height: 20,
                  })}
                />
                {index < jobs.length - 1 && <TimelineConnector sx={{ bgcolor: 'divider', width: 4 }} />}
              </TimelineSeparator>
              <TimelineContent sx={{ pb: 4, pr: 0 }}>
                <Card>
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={0.5}>
                      <Typography variant="h3" sx={{ fontSize: '1.3rem' }}>
                        {t(`${key}.role`)}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>
                        {formatDate(job.start)} – {formatDate(job.end)}
                      </Typography>
                    </Stack>
                    <Typography sx={(theme) => ({ color: theme.palette.secondary.main, fontWeight: 700, mb: 1.5 })}>
                      {job.company} · {t(`${key}.location`)}
                    </Typography>
                    <Box component="ul" sx={{ pl: 2.5, mt: 0, mb: job.tech.length > 0 ? 2 : 0 }}>
                      {Array.isArray(points) &&
                        points.map((point) => (
                          <Typography component="li" key={point} sx={{ mb: 0.5 }}>
                            {point}
                          </Typography>
                        ))}
                    </Box>
                    {job.tech.length > 0 && <TechChips items={job.tech} />}
                  </CardContent>
                </Card>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Section>
  );
}

Experience.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      start: PropTypes.string.isRequired,
      end: PropTypes.string,
      tech: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
};
