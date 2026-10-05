import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import About from './About';
import data from '../data/portfolio.json';
import { renderWithProviders } from '../test/utils';

const { profile } = data;

function renderAbout(route = '/') {
  return renderWithProviders(<About profile={profile} />, { route });
}

const location = () => screen.getByTestId('location').textContent;

describe('About window', () => {
  it('greets with the first name and shows the title and location', () => {
    renderAbout();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Hi, I'm Elizabeth");
    expect(screen.getByText('Full-Stack Software Engineer')).toBeInTheDocument();
    expect(screen.getByText(profile.location)).toBeInTheDocument();
  });

  it('has two tabs with the About tab open by default', () => {
    renderAbout();
    const tabs = screen.getAllByRole('tab');
    expect(tabs.map((tab) => tab.textContent)).toEqual(['about_me.txt', 'contact_me.js']);

    const [aboutTab, contactTab] = tabs;
    expect(aboutTab).toHaveAttribute('aria-selected', 'true');
    expect(contactTab).toHaveAttribute('aria-selected', 'false');
    // Roving tabindex: only the open tab is in the Tab order.
    expect(aboutTab).toHaveAttribute('tabindex', '0');
    expect(contactTab).toHaveAttribute('tabindex', '-1');
  });

  it('links each tab to its panel', () => {
    renderAbout();
    const contactTab = screen.getByRole('tab', { name: /contact_me\.js/ });
    const panel = document.getElementById(contactTab.getAttribute('aria-controls'));
    expect(panel).toHaveAttribute('role', 'tabpanel');
    expect(panel).toHaveAttribute('aria-labelledby', contactTab.id);
  });

  it('clicking the contact tab opens it and updates the URL', async () => {
    const user = userEvent.setup();
    renderAbout();
    await user.click(screen.getByRole('tab', { name: /contact_me\.js/ }));

    expect(screen.getByRole('tab', { name: /contact_me\.js/ })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /about_me\.txt/ })).toHaveAttribute('aria-selected', 'false');
    expect(location()).toBe('/contact');
  });

  it('arrow keys move between tabs and wrap around', async () => {
    const user = userEvent.setup();
    renderAbout();
    const aboutTab = screen.getByRole('tab', { name: /about_me\.txt/ });
    const contactTab = screen.getByRole('tab', { name: /contact_me\.js/ });

    await user.tab(); // Tab lands on the open tab (the only tab in the Tab order)
    expect(aboutTab).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(contactTab).toHaveFocus();
    expect(contactTab).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{ArrowRight}'); // wraps back to the first tab
    expect(aboutTab).toHaveFocus();
    expect(aboutTab).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{End}');
    expect(contactTab).toHaveFocus();
    await user.keyboard('{Home}');
    expect(aboutTab).toHaveFocus();
  });

  it('opens straight to the contact tab from a #/contact link', () => {
    renderAbout('/contact');
    expect(screen.getByRole('tab', { name: /contact_me\.js/ })).toHaveAttribute('aria-selected', 'true');
  });

  it('the contact tab holds the contact links', () => {
    renderAbout('/contact');
    const panel = screen.getByRole('tabpanel', { name: /contact_me\.js/ });
    expect(within(panel).getByRole('heading', { level: 2 })).toHaveTextContent("Let's get in touch!");
    expect(within(panel).getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', profile.github);
    expect(within(panel).getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', profile.linkedin);
    expect(within(panel).getByRole('link', { name: 'Email Elizabeth' })).toHaveAttribute(
      'href',
      `mailto:${profile.email}`,
    );
    expect(within(panel).getByRole('link', { name: /Download Resume/ })).toHaveAttribute('href', profile.resume);
  });

  it('shows the email address and copies it to the clipboard', async () => {
    const user = userEvent.setup(); // provides a working test clipboard
    renderAbout('/contact');
    expect(screen.getByText(profile.email)).toBeInTheDocument();

    const copyButton = screen.getByRole('button', { name: 'Copy email address' });
    expect(copyButton).toHaveTextContent('Copy');
    await user.click(copyButton);

    expect(await navigator.clipboard.readText()).toBe(profile.email);
    expect(copyButton).toHaveTextContent('Copied!');
    expect(screen.getByRole('status')).toHaveTextContent('Email address copied to clipboard');
  });

  it('external contact links open in a new tab and say so', () => {
    renderAbout('/contact');
    const github = screen.getByRole('link', { name: /GitHub/ });
    expect(github).toHaveAttribute('target', '_blank');
    expect(github).toHaveAttribute('rel', expect.stringContaining('noopener'));
    expect(github).toHaveAccessibleName('GitHub (opens in a new tab)');
  });

  it('decorative window controls show their joke on hover', async () => {
    const user = userEvent.setup();
    renderAbout();
    await user.hover(screen.getByTestId('AddRoundedIcon'));
    expect(await screen.findByRole('tooltip')).toHaveTextContent('No new tabs, just me');
  });

  it('decorative window controls are hidden from screen readers', () => {
    renderAbout();
    // — □ × live in an aria-hidden group, so they never appear as buttons.
    expect(screen.queryByRole('button', { name: /minimize|maximize|close/i })).not.toBeInTheDocument();
    expect(screen.getByTestId('RemoveRoundedIcon').closest('[aria-hidden="true"]')).not.toBeNull();
  });
});
