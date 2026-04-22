'use client';

import { useEffect, useState } from 'react';
import adminApi from '../../../lib/adminApi';
import { Save, ChevronDown, ChevronUp } from 'lucide-react';

interface ContentBlock {
  key:     string;
  label:   string;
  section: string;
}

const CONTENT_BLOCKS: ContentBlock[] = [

  // ── HOME — Hero ─────────────────────────────────────────────────────────
  { key: 'home.hero.tagline',         label: 'Home → Hero → Tagline (small text above heading)',          section: 'Home — Hero' },
  { key: 'home.hero.heading',         label: 'Home → Hero → Main Heading (large h1)',                     section: 'Home — Hero' },
  { key: 'home.hero.sub',             label: 'Home → Hero → Subtitle paragraph',                          section: 'Home — Hero' },
  { key: 'home.hero.cta',             label: 'Home → Hero → Primary button text',                         section: 'Home — Hero' },
  { key: 'home.hero.cta2',            label: 'Home → Hero → Secondary button text',                       section: 'Home — Hero' },

  // ── HOME — Stats bar ────────────────────────────────────────────────────
  { key: 'home.stats.foundedVal',     label: 'Home → Stats → Founded value (e.g. 2004)',                  section: 'Home — Stats' },
  { key: 'home.stats.founded',        label: 'Home → Stats → Founded label (e.g. Founded)',               section: 'Home — Stats' },
  { key: 'home.stats.casesVal',       label: 'Home → Stats → Cases Won value (e.g. 99%)',                 section: 'Home — Stats' },
  { key: 'home.stats.cases',          label: 'Home → Stats → Cases Won label',                            section: 'Home — Stats' },
  { key: 'home.stats.areasVal',       label: 'Home → Stats → Practice Areas value (e.g. 100+)',           section: 'Home — Stats' },
  { key: 'home.stats.areas',          label: 'Home → Stats → Practice Areas label',                       section: 'Home — Stats' },
  { key: 'home.stats.countriesVal',   label: 'Home → Stats → Countries value (e.g. 9+)',                  section: 'Home — Stats' },
  { key: 'home.stats.countries',      label: 'Home → Stats → Countries label',                            section: 'Home — Stats' },
  { key: 'home.stats.clientsVal',     label: 'Home → Stats → Happy Clients value (e.g. 30K+)',            section: 'Home — Stats' },
  { key: 'home.stats.clients',        label: 'Home → Stats → Happy Clients label',                        section: 'Home — Stats' },

  // ── HOME — About Teaser ─────────────────────────────────────────────────
  { key: 'home.about.label',          label: 'Home → About Teaser → Section label (e.g. About Us)',       section: 'Home — About Teaser' },
  { key: 'home.about.heading',        label: 'Home → About Teaser → Heading (h2)',                        section: 'Home — About Teaser' },
  { key: 'home.about.body',           label: 'Home → About Teaser → Body paragraph',                      section: 'Home — About Teaser' },
  { key: 'home.about.mission',        label: 'Home → About Teaser → Mission quote (blockquote)',           section: 'Home — About Teaser' },
  { key: 'home.about.val1',           label: 'Home → About Teaser → Value pill 1 (e.g. Integrity)',       section: 'Home — About Teaser' },
  { key: 'home.about.val2',           label: 'Home → About Teaser → Value pill 2 (e.g. Excellence)',      section: 'Home — About Teaser' },
  { key: 'home.about.val3',           label: 'Home → About Teaser → Value pill 3 (e.g. Results)',         section: 'Home — About Teaser' },
  { key: 'home.about.cta',            label: 'Home → About Teaser → Button text',                         section: 'Home — About Teaser' },
  { key: 'home.about.experienceNum',  label: 'Home → About Teaser → Experience badge number (e.g. 20+)', section: 'Home — About Teaser' },
  { key: 'home.about.experienceLbl',  label: 'Home → About Teaser → Experience badge label',              section: 'Home — About Teaser' },

  // ── HOME — Services Grid ────────────────────────────────────────────────
  { key: 'home.services.label',       label: 'Home → Services Grid → Section label',                      section: 'Home — Services Grid' },
  { key: 'home.services.heading',     label: 'Home → Services Grid → Heading (h2)',                       section: 'Home — Services Grid' },
  { key: 'home.services.sub',         label: 'Home → Services Grid → Subtitle paragraph',                 section: 'Home — Services Grid' },
  { key: 'home.services.cta',         label: 'Home → Services Grid → "View All Services" button',         section: 'Home — Services Grid' },
  { key: 'home.services.s1',          label: 'Home → Services → Card 1 title (Commercial Law)',           section: 'Home — Services Grid' },
  { key: 'home.services.s1d',         label: 'Home → Services → Card 1 description',                     section: 'Home — Services Grid' },
  { key: 'home.services.s2',          label: 'Home → Services → Card 2 title (Litigation)',               section: 'Home — Services Grid' },
  { key: 'home.services.s2d',         label: 'Home → Services → Card 2 description',                     section: 'Home — Services Grid' },
  { key: 'home.services.s3',          label: 'Home → Services → Card 3 title (Real Estate)',              section: 'Home — Services Grid' },
  { key: 'home.services.s3d',         label: 'Home → Services → Card 3 description',                     section: 'Home — Services Grid' },
  { key: 'home.services.s4',          label: 'Home → Services → Card 4 title (Family Law)',               section: 'Home — Services Grid' },
  { key: 'home.services.s4d',         label: 'Home → Services → Card 4 description',                     section: 'Home — Services Grid' },
  { key: 'home.services.s5',          label: 'Home → Services → Card 5 title (Employment)',               section: 'Home — Services Grid' },
  { key: 'home.services.s5d',         label: 'Home → Services → Card 5 description',                     section: 'Home — Services Grid' },
  { key: 'home.services.s6',          label: 'Home → Services → Card 6 title (IP)',                       section: 'Home — Services Grid' },
  { key: 'home.services.s6d',         label: 'Home → Services → Card 6 description',                     section: 'Home — Services Grid' },
  { key: 'home.services.s7',          label: 'Home → Services → Card 7 title (Criminal)',                 section: 'Home — Services Grid' },
  { key: 'home.services.s7d',         label: 'Home → Services → Card 7 description',                     section: 'Home — Services Grid' },
  { key: 'home.services.s8',          label: 'Home → Services → Card 8 title (Estate)',                   section: 'Home — Services Grid' },
  { key: 'home.services.s8d',         label: 'Home → Services → Card 8 description',                     section: 'Home — Services Grid' },
  { key: 'home.services.s9',          label: 'Home → Services → Card 9 title (Consumer)',                 section: 'Home — Services Grid' },
  { key: 'home.services.s9d',         label: 'Home → Services → Card 9 description',                     section: 'Home — Services Grid' },

  // ── HOME — CTA Banner ───────────────────────────────────────────────────
  { key: 'home.cta.heading',          label: 'Home → CTA Banner → Heading',                               section: 'Home — CTA Banner' },
  { key: 'home.cta.sub',              label: 'Home → CTA Banner → Subtitle',                              section: 'Home — CTA Banner' },
  { key: 'home.cta.btn',              label: 'Home → CTA Banner → Button text',                           section: 'Home — CTA Banner' },

  // ── NAVBAR & FOOTER ─────────────────────────────────────────────────────
  { key: 'nav.home',                  label: 'Navbar → Home link',                                        section: 'Navbar & Footer' },
  { key: 'nav.about',                 label: 'Navbar → About link',                                       section: 'Navbar & Footer' },
  { key: 'nav.services',              label: 'Navbar → Services link',                                    section: 'Navbar & Footer' },
  { key: 'nav.blog',                  label: 'Navbar → Blog link',                                        section: 'Navbar & Footer' },
  { key: 'nav.joinUs',                label: 'Navbar → Join Us link',                                     section: 'Navbar & Footer' },
  { key: 'nav.contact',               label: 'Navbar → Contact Us link',                                  section: 'Navbar & Footer' },
  { key: 'nav.appointment',           label: 'Navbar → "Free Consultation" button',                       section: 'Navbar & Footer' },
  { key: 'footer.tagline',            label: 'Footer → Tagline below logo',                               section: 'Navbar & Footer' },
  { key: 'footer.rights',             label: 'Footer → Copyright text',                                   section: 'Navbar & Footer' },
  { key: 'footer.quickLinks',         label: 'Footer → "Quick Links" column heading',                     section: 'Navbar & Footer' },
  { key: 'footer.contactInfo',        label: 'Footer → "Contact Info" column heading',                    section: 'Navbar & Footer' },

  // ── ABOUT PAGE ──────────────────────────────────────────────────────────
  { key: 'about.hero.label',          label: 'About Page → Hero → Section label',                         section: 'About Page' },
  { key: 'about.hero.heading',        label: 'About Page → Hero → Main heading (h1)',                     section: 'About Page' },
  { key: 'about.hero.sub',            label: 'About Page → Hero → Subtitle paragraph',                    section: 'About Page' },
  { key: 'about.story.label',         label: 'About Page → Story → Section label',                        section: 'About Page' },
  { key: 'about.story.heading',       label: 'About Page → Story → Heading',                              section: 'About Page' },
  { key: 'about.story.body1',         label: 'About Page → Story → First paragraph',                      section: 'About Page' },
  { key: 'about.story.body2',         label: 'About Page → Story → Second paragraph',                     section: 'About Page' },
  { key: 'about.story.badgeNum',      label: 'About Page → Story → Year badge number (e.g. 2004)',        section: 'About Page' },
  { key: 'about.story.badgeLbl',      label: 'About Page → Story → Year badge label (e.g. Year Founded)', section: 'About Page' },
  { key: 'about.mission.label',       label: 'About Page → Mission → Section label',                      section: 'About Page' },
  { key: 'about.mission.heading',     label: 'About Page → Mission → Heading',                            section: 'About Page' },
  { key: 'about.mission.quote',       label: 'About Page → Mission → Quote text (blockquote)',            section: 'About Page' },
  { key: 'about.values.label',        label: 'About Page → Values → Section label',                       section: 'About Page' },
  { key: 'about.values.heading',      label: 'About Page → Values → Heading',                             section: 'About Page' },
  { key: 'about.values.v1title',      label: 'About Page → Values → Card 1 title (Integrity)',            section: 'About Page' },
  { key: 'about.values.v1desc',       label: 'About Page → Values → Card 1 description',                  section: 'About Page' },
  { key: 'about.values.v2title',      label: 'About Page → Values → Card 2 title (Excellence)',           section: 'About Page' },
  { key: 'about.values.v2desc',       label: 'About Page → Values → Card 2 description',                  section: 'About Page' },
  { key: 'about.values.v3title',      label: 'About Page → Values → Card 3 title (Partnership)',          section: 'About Page' },
  { key: 'about.values.v3desc',       label: 'About Page → Values → Card 3 description',                  section: 'About Page' },
  { key: 'about.values.v4title',      label: 'About Page → Values → Card 4 title (Innovation)',           section: 'About Page' },
  { key: 'about.values.v4desc',       label: 'About Page → Values → Card 4 description',                  section: 'About Page' },
  { key: 'about.team.label',          label: 'About Page → Team → Section label',                         section: 'About Page' },
  { key: 'about.team.heading',        label: 'About Page → Team → Heading',                               section: 'About Page' },
  { key: 'about.team.m1name',         label: 'About Page → Team → Member 1 name',                         section: 'About Page' },
  { key: 'about.team.m1role',         label: 'About Page → Team → Member 1 role/title',                   section: 'About Page' },
  { key: 'about.team.m1bio',          label: 'About Page → Team → Member 1 bio',                          section: 'About Page' },
  { key: 'about.team.m2name',         label: 'About Page → Team → Member 2 name',                         section: 'About Page' },
  { key: 'about.team.m2role',         label: 'About Page → Team → Member 2 role/title',                   section: 'About Page' },
  { key: 'about.team.m2bio',          label: 'About Page → Team → Member 2 bio',                          section: 'About Page' },
  { key: 'about.cta.heading',         label: 'About Page → CTA Banner → Heading',                         section: 'About Page' },
  { key: 'about.cta.sub',             label: 'About Page → CTA Banner → Subtitle',                        section: 'About Page' },

  // ── SERVICES PAGE ───────────────────────────────────────────────────────
  { key: 'services.hero.label',       label: 'Services Page → Hero → Section label',                      section: 'Services Page' },
  { key: 'services.hero.heading',     label: 'Services Page → Hero → Main heading (h1)',                  section: 'Services Page' },
  { key: 'services.hero.sub',         label: 'Services Page → Hero → Subtitle',                           section: 'Services Page' },
  { key: 'services.s1.title',         label: 'Services Page → Service 1 → Title (Commercial Law)',        section: 'Services Page' },
  { key: 'services.s1.desc',          label: 'Services Page → Service 1 → Short description',             section: 'Services Page' },
  { key: 'services.s1.d1',            label: 'Services Page → Service 1 → Detail bullet 1',               section: 'Services Page' },
  { key: 'services.s1.d2',            label: 'Services Page → Service 1 → Detail bullet 2',               section: 'Services Page' },
  { key: 'services.s1.d3',            label: 'Services Page → Service 1 → Detail bullet 3',               section: 'Services Page' },
  { key: 'services.s1.d4',            label: 'Services Page → Service 1 → Detail bullet 4',               section: 'Services Page' },
  { key: 'services.s2.title',         label: 'Services Page → Service 2 → Title (Litigation)',            section: 'Services Page' },
  { key: 'services.s2.desc',          label: 'Services Page → Service 2 → Short description',             section: 'Services Page' },
  { key: 'services.s3.title',         label: 'Services Page → Service 3 → Title (Real Estate)',           section: 'Services Page' },
  { key: 'services.s3.desc',          label: 'Services Page → Service 3 → Short description',             section: 'Services Page' },
  { key: 'services.s4.title',         label: 'Services Page → Service 4 → Title (Family Law)',            section: 'Services Page' },
  { key: 'services.s4.desc',          label: 'Services Page → Service 4 → Short description',             section: 'Services Page' },
  { key: 'services.s5.title',         label: 'Services Page → Service 5 → Title (Employment)',            section: 'Services Page' },
  { key: 'services.s5.desc',          label: 'Services Page → Service 5 → Short description',             section: 'Services Page' },
  { key: 'services.s6.title',         label: 'Services Page → Service 6 → Title (IP)',                    section: 'Services Page' },
  { key: 'services.s6.desc',          label: 'Services Page → Service 6 → Short description',             section: 'Services Page' },
  { key: 'services.s7.title',         label: 'Services Page → Service 7 → Title (Criminal)',              section: 'Services Page' },
  { key: 'services.s7.desc',          label: 'Services Page → Service 7 → Short description',             section: 'Services Page' },
  { key: 'services.s8.title',         label: 'Services Page → Service 8 → Title (Estate)',                section: 'Services Page' },
  { key: 'services.s8.desc',          label: 'Services Page → Service 8 → Short description',             section: 'Services Page' },
  { key: 'services.s9.title',         label: 'Services Page → Service 9 → Title (Consumer)',              section: 'Services Page' },
  { key: 'services.s9.desc',          label: 'Services Page → Service 9 → Short description',             section: 'Services Page' },
  { key: 'services.cta.heading',      label: 'Services Page → CTA Banner → Heading',                      section: 'Services Page' },
  { key: 'services.cta.sub',          label: 'Services Page → CTA Banner → Subtitle',                     section: 'Services Page' },

  // ── BLOG PAGE ───────────────────────────────────────────────────────────
  { key: 'blog.hero.label',           label: 'Blog Page → Hero → Section label',                          section: 'Blog Page' },
  { key: 'blog.hero.heading',         label: 'Blog Page → Hero → Main heading',                           section: 'Blog Page' },
  { key: 'blog.hero.sub',             label: 'Blog Page → Hero → Subtitle',                               section: 'Blog Page' },
  { key: 'blog.readMore',             label: 'Blog Page → Card → "Read More" link text',                  section: 'Blog Page' },
  { key: 'blog.noPosts',             label: 'Blog Page → Empty state message (no posts)',                 section: 'Blog Page' },
  { key: 'blog.backToBlog',           label: 'Blog Detail → "Back to Blog" link',                         section: 'Blog Page' },
  { key: 'blog.publishedOn',          label: 'Blog Detail → "Published on" label before date',            section: 'Blog Page' },
  { key: 'blog.sidebar.consult',      label: 'Blog Detail → Sidebar → "Free Consultation" heading',       section: 'Blog Page' },
  { key: 'blog.sidebar.consultSub',   label: 'Blog Detail → Sidebar → Consultation paragraph',           section: 'Blog Page' },
  { key: 'blog.sidebar.contact',      label: 'Blog Detail → Sidebar → "Contact" heading',                 section: 'Blog Page' },
  { key: 'blog.download.heading',     label: 'Blog Detail → PDF Download → Card heading',                 section: 'Blog Page' },
  { key: 'blog.download.sub',         label: 'Blog Detail → PDF Download → Card description',             section: 'Blog Page' },
  { key: 'blog.download.btn',         label: 'Blog Detail → PDF Download → Button text',                  section: 'Blog Page' },

  // ── CONTACT PAGE ────────────────────────────────────────────────────────
  { key: 'contact.hero.label',        label: 'Contact Page → Hero → Section label',                       section: 'Contact Page' },
  { key: 'contact.hero.heading',      label: 'Contact Page → Hero → Main heading (h1)',                   section: 'Contact Page' },
  { key: 'contact.hero.sub',          label: 'Contact Page → Hero → Subtitle',                            section: 'Contact Page' },
  { key: 'contact.info.heading',      label: 'Contact Page → Info panel → Heading',                       section: 'Contact Page' },
  { key: 'contact.info.sub',          label: 'Contact Page → Info panel → Subtitle paragraph',            section: 'Contact Page' },
  { key: 'contact.info.address',      label: 'Contact Page → Info panel → Address value',                 section: 'Contact Page' },
  { key: 'contact.info.phone',        label: 'Contact Page → Info panel → Phone number',                  section: 'Contact Page' },
  { key: 'contact.info.email',        label: 'Contact Page → Info panel → Email address',                 section: 'Contact Page' },
  { key: 'contact.info.hours',        label: 'Contact Page → Info panel → Working hours',                 section: 'Contact Page' },
  { key: 'contact.form.heading',      label: 'Contact Page → Form → "Send Us a Message" heading',         section: 'Contact Page' },
  { key: 'contact.form.name',         label: 'Contact Page → Form → Name field label',                    section: 'Contact Page' },
  { key: 'contact.form.email',        label: 'Contact Page → Form → Email field label',                   section: 'Contact Page' },
  { key: 'contact.form.phone',        label: 'Contact Page → Form → Phone field label',                   section: 'Contact Page' },
  { key: 'contact.form.subject',      label: 'Contact Page → Form → Subject field label',                 section: 'Contact Page' },
  { key: 'contact.form.message',      label: 'Contact Page → Form → Message field label',                 section: 'Contact Page' },
  { key: 'contact.form.send',         label: 'Contact Page → Form → Submit button text',                  section: 'Contact Page' },
  { key: 'contact.form.success',      label: 'Contact Page → Form → Success message after submit',        section: 'Contact Page' },
  { key: 'contact.form.error',        label: 'Contact Page → Form → Error message on failure',            section: 'Contact Page' },

  // ── JOIN US PAGE ────────────────────────────────────────────────────────
  { key: 'joinus.hero.label',         label: 'Join Us Page → Hero → Section label',                       section: 'Join Us Page' },
  { key: 'joinus.hero.heading',       label: 'Join Us Page → Hero → Main heading (h1)',                   section: 'Join Us Page' },
  { key: 'joinus.hero.sub',           label: 'Join Us Page → Hero → Subtitle',                            section: 'Join Us Page' },
  { key: 'joinus.why.label',          label: 'Join Us Page → Why Join → Section label',                   section: 'Join Us Page' },
  { key: 'joinus.why.heading',        label: 'Join Us Page → Why Join → Heading',                         section: 'Join Us Page' },
  { key: 'joinus.why.p1title',        label: 'Join Us Page → Why Join → Perk 1 title (Professional Growth)', section: 'Join Us Page' },
  { key: 'joinus.why.p1desc',         label: 'Join Us Page → Why Join → Perk 1 description',              section: 'Join Us Page' },
  { key: 'joinus.why.p2title',        label: 'Join Us Page → Why Join → Perk 2 title (Collaborative)',    section: 'Join Us Page' },
  { key: 'joinus.why.p2desc',         label: 'Join Us Page → Why Join → Perk 2 description',              section: 'Join Us Page' },
  { key: 'joinus.why.p3title',        label: 'Join Us Page → Why Join → Perk 3 title (Meaningful Work)',  section: 'Join Us Page' },
  { key: 'joinus.why.p3desc',         label: 'Join Us Page → Why Join → Perk 3 description',              section: 'Join Us Page' },
  { key: 'joinus.why.p4title',        label: 'Join Us Page → Why Join → Perk 4 title (Competitive)',      section: 'Join Us Page' },
  { key: 'joinus.why.p4desc',         label: 'Join Us Page → Why Join → Perk 4 description',              section: 'Join Us Page' },
  { key: 'joinus.form.heading',       label: 'Join Us Page → Form section → Heading',                     section: 'Join Us Page' },
  { key: 'joinus.form.name',          label: 'Join Us Page → Form → Name field label',                    section: 'Join Us Page' },
  { key: 'joinus.form.email',         label: 'Join Us Page → Form → Email field label',                   section: 'Join Us Page' },
  { key: 'joinus.form.phone',         label: 'Join Us Page → Form → Phone field label',                   section: 'Join Us Page' },
  { key: 'joinus.form.position',      label: 'Join Us Page → Form → Position field label',                section: 'Join Us Page' },
  { key: 'joinus.form.message',       label: 'Join Us Page → Form → Cover letter field label',            section: 'Join Us Page' },
  { key: 'joinus.form.cv',            label: 'Join Us Page → Form → CV upload label',                     section: 'Join Us Page' },
  { key: 'joinus.form.cvHint',        label: 'Join Us Page → Form → CV hint text (file types/size)',      section: 'Join Us Page' },
  { key: 'joinus.form.send',          label: 'Join Us Page → Form → Submit button text',                  section: 'Join Us Page' },
  { key: 'joinus.form.success',       label: 'Join Us Page → Form → Success message',                     section: 'Join Us Page' },
  { key: 'joinus.form.error',         label: 'Join Us Page → Form → Error message',                       section: 'Join Us Page' },
  { key: 'joinus.cta.heading',        label: 'Join Us Page → CTA Banner → Heading',                       section: 'Join Us Page' },
  { key: 'joinus.cta.sub',            label: 'Join Us Page → CTA Banner → Subtitle',                      section: 'Join Us Page' },
];

interface ContentMap {
  [key: string]: { en: string; ar: string };
}

export default function PagesPage() {
  const [content,  setContent]  = useState<ContentMap>({});
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState<string | null>(null);
  const [saved,    setSaved]    = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>('home.hero');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await adminApi.get('/pages');
        setContent(data);
      } catch {}
      finally { setLoading(false); }
    };
    fetchContent();
  }, []);

  const handleSave = async (key: string) => {
    setSaving(key);
    try {
      await adminApi.put(`/pages/admin/${key}`, { content: content[key] ?? { en: '', ar: '' } });
      setSaved(key);
      setTimeout(() => setSaved(null), 2000);
    } catch {
      alert('Failed to save.');
    } finally {
      setSaving(null);
    }
  };

  const handleChange = (key: string, lang: 'en' | 'ar', value: string) => {
    setContent(prev => ({
      ...prev,
      [key]: { ...(prev[key] ?? { en: '', ar: '' }), [lang]: value },
    }));
  };

  const sections = [...new Set(CONTENT_BLOCKS.map(b => b.section))];

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem',
    background: '#0d1e24',
    border: '1px solid rgba(233,206,139,0.15)',
    borderRadius: '4px', color: 'white',
    fontFamily: "'Fira Code', monospace", fontSize: '0.85rem',
    outline: 'none', resize: 'vertical', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.68rem', fontWeight: 700,
    letterSpacing: '0.12em', textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem',
    fontFamily: "'Fira Code', monospace",
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.3)' }}>Loading...</div>
  );

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 600, color: 'white', marginBottom: '0.25rem' }}>
          Page Content
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem' }}>
          Edit bilingual content blocks for each page section.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {sections.map(section => (
          <div key={section}>
            <div style={{
              fontSize: '0.7rem', fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--color-accent)', marginBottom: '1rem',
              fontFamily: "'Fira Code', monospace",
            }}>
              {section}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {CONTENT_BLOCKS.filter(b => b.section === section).map(({ key, label }) => {
                const isOpen = expanded === key;
                return (
                  <div key={key} style={{
                    background: '#162830',
                    border: '1px solid rgba(233,206,139,0.1)',
                    borderRadius: '8px', overflow: 'hidden',
                  }}>
                    {/* Accordion header */}
                    <button
                      onClick={() => setExpanded(isOpen ? null : key)}
                      style={{
                        width: '100%', padding: '1rem 1.25rem',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: 'white', fontFamily: "'Fira Code', monospace", fontSize: '0.85rem',
                      }}>
                      <span>{label}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {content[key]?.en && (
                          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>
                            {content[key].en.slice(0, 40)}...
                          </span>
                        )}
                        {isOpen ? <ChevronUp size={15} color="rgba(255,255,255,0.4)" /> : <ChevronDown size={15} color="rgba(255,255,255,0.4)" />}
                      </div>
                    </button>

                    {/* Accordion body */}
                    {isOpen && (
                      <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid rgba(233,206,139,0.08)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginTop: '1.25rem' }}
                             className="content-row">
                          <div>
                            <label style={labelStyle}>English</label>
                            <textarea
                              value={content[key]?.en ?? ''}
                              onChange={e => handleChange(key, 'en', e.target.value)}
                              rows={4} style={inputStyle}
                            />
                          </div>
                          <div>
                            <label style={labelStyle}>Arabic</label>
                            <textarea
                              value={content[key]?.ar ?? ''}
                              onChange={e => handleChange(key, 'ar', e.target.value)}
                              rows={4} style={{ ...inputStyle, direction: 'rtl' }}
                            />
                          </div>
                        </div>
                        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                          <button onClick={() => handleSave(key)} disabled={saving === key} style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            background: saved === key ? 'rgba(46,160,87,0.8)' : 'var(--color-accent)',
                            color: 'var(--color-site-deep)', border: 'none', borderRadius: '4px',
                            padding: '0.6rem 1.25rem', cursor: 'pointer',
                            fontFamily: "'Fira Code', monospace", fontWeight: 700,
                            fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                            transition: 'all 0.2s',
                          }}>
                            <Save size={13} />
                            {saved === key ? 'Saved ✓' : saving === key ? 'Saving...' : 'Save'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 700px) { .content-row { grid-template-columns: 1fr !important; } }
        textarea:focus { border-color: rgba(233,206,139,0.4) !important; }
      `}</style>
    </div>
  );
}