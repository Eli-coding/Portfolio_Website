import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Button, Stack, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import GitHub from '@mui/icons-material/GitHub';
import LinkedIn from '@mui/icons-material/LinkedIn';
import DownloadOutlined from '@mui/icons-material/DownloadOutlined';
import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import ExternalButton from './ExternalButton';
import { mono } from './WindowChrome';

/**
 * Shows the email address with a Copy button. mailto: links only work when the visitor has a
 * mail app set up, so this is the reliable path (e.g. for Gmail-in-the-browser users).
 */
function CopyEmail({ email }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const addressRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked: select the address so it can be copied by hand.
      const range = document.createRange();
      range.selectNodeContents(addressRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
    }
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" flexWrap="wrap" gap={1}>
      <Box
        component="span"
        ref={addressRef}
        sx={{ fontFamily: mono, fontWeight: 700, fontSize: '0.95rem', color: 'text.secondary', userSelect: 'all' }}
      >
        {email}
      </Box>
      <Button
        variant="outlined"
        size="small"
        onClick={copy}
        startIcon={copied ? <CheckRounded /> : <ContentCopyRounded />}
        aria-label={t('contact.copyEmail')}
      >
        {copied ? t('contact.copied') : t('contact.copy')}
      </Button>
      <Box component="span" role="status" sx={visuallyHidden}>
        {copied ? t('contact.copiedAnnouncement') : ''}
      </Box>
    </Stack>
  );
}

CopyEmail.propTypes = {
  email: PropTypes.string.isRequired,
};

/** Contents of the "contact_me.js" tab in the About window. */
export default function Contact({ profile }) {
  const { t } = useTranslation();

  return (
    <Stack alignItems="center" justifyContent="center" gap={3} sx={{ textAlign: 'center', height: '100%' }}>
      <Typography
        id="contact-title"
        variant="h2"
        tabIndex={-1}
        sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, m: 0, outline: 'none' }}
      >
        {t('contact.title')}
      </Typography>
      <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={1.5}>
        <ExternalButton href={profile.github} variant="outlined" size="large" startIcon={<GitHub />}>
          GitHub
        </ExternalButton>
        <ExternalButton href={profile.linkedin} variant="outlined" size="large" startIcon={<LinkedIn />}>
          LinkedIn
        </ExternalButton>
        <Button variant="outlined" size="large" href={`mailto:${profile.email}`} startIcon={<EmailOutlined />}>
          {t('contact.email')}
          <Box component="span" sx={visuallyHidden}>
            {' '}
            {t('contact.emailTo', { name: profile.name.split(' ')[0] })}
          </Box>
        </Button>
        {profile.resume && (
          <Button variant="contained" size="large" href={profile.resume} download startIcon={<DownloadOutlined />}>
            {t('contact.resume', { size: profile.resumeSize })}
          </Button>
        )}
      </Stack>
      <CopyEmail email={profile.email} />
    </Stack>
  );
}

Contact.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    github: PropTypes.string.isRequired,
    linkedin: PropTypes.string.isRequired,
    resume: PropTypes.string,
    resumeSize: PropTypes.string,
  }).isRequired,
};
