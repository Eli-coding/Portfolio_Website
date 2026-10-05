import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import data from './data/portfolio.json';
import { useSectionScroll } from './hooks/useSectionNavigation';
import SkipLink from './components/SkipLink';
import NavBar from './components/NavBar';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';

export default function App() {
  const { t, i18n } = useTranslation();
  const { profile, experience, projects, skills } = data;

  useSectionScroll();

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage;
    document.title = t('meta.title', { name: profile.name });
  }, [t, i18n.resolvedLanguage, profile.name]);

  return (
    <>
      <SkipLink />
      <NavBar name={profile.name} />
      <Box component="main" id="main" tabIndex={-1} sx={{ pt: { xs: 7, sm: 8 }, outline: 'none' }}>
        {/* About window; Contact lives in its second tab. */}
        <About profile={profile} />
        <Experience jobs={experience} />
        <Projects projects={projects} />
        <Skills skills={skills} />
      </Box>
      <Footer profile={profile} />
    </>
  );
}
