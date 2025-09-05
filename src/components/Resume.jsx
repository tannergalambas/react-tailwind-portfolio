// src/components/Resume.jsx
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

/* ----------------------------- tiny utils ----------------------------- */
function monthName(m) {
  const names = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return names[Number(m) - 1] || "";
}
function formatRange(start, end) {
  const fmt = (s) => {
    if (!s || s === null) return "Present";
    if (typeof s !== "string") return String(s);
    const [y, m] = s.split("-");
    if (!y) return s;
    return m ? `${monthName(m)} ${y}` : y;
  };
  return `${fmt(start)} – ${fmt(end)}`;
}

/* --------------------------- data fetch hook -------------------------- */
function useResumeData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch(`${import.meta.env.BASE_URL}resume.json`, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load resume.json (${r.status})`);
        return r.json();
      })
      .then((json) => mounted && setData(json))
      .catch((e) => mounted && setErr(e))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  return { data, loading, err };
}

/* ---------------------------- UI primitives --------------------------- */
function Section({ title, children }) {
  return (
    <section className="mb-10 break-inside-avoid">
      <h2 className="text-xl font-semibold tracking-tight mb-4 text-slate-100">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Card({ children }) {
  return (
    <article className="rounded-lg border border-slate-600 bg-slate-800/70 p-4 shadow-sm hover:shadow transition">
      {children}
    </article>
  );
}

function Pill({ children }) {
  return (
    <span className="text-xs leading-tight px-2 py-1 rounded-full border border-slate-500 bg-slate-700/60 text-slate-200">
      {children}
    </span>
  );
}

/* ------------------------------ subviews ------------------------------ */
function WorkItem({ item }) {
  return (
    <Card>
      <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
        <div>
          <h3 className="font-medium">
            {item.position} •{" "}
            <span className="text-slate-300">{item.company}</span>
          </h3>
          {item.location && <p className="text-sm text-slate-300">{item.location}</p>}
        </div>
        <time className="text-sm tabular-nums text-slate-300">
          {formatRange(item.startDate, item.endDate)}
        </time>
      </header>

      {Array.isArray(item.highlights) && item.highlights.length > 0 && (
        <ul className="mt-3 list-disc pl-5 space-y-1 marker:text-slate-400">
          {item.highlights.map((h, i) => <li key={i}>{h}</li>)}
        </ul>
      )}

      {Array.isArray(item.tech) && item.tech.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tech.map((t) => <Pill key={t}>{t}</Pill>)}
        </div>
      )}
    </Card>
  );
}

function EducationItem({ item }) {
  return (
    <Card>
      <h3 className="font-medium">{item.institution}</h3>
      {(item.studyType || item.area) && (
        <p className="text-sm text-slate-300">
          {[item.studyType, item.area].filter(Boolean).join(", ")}
        </p>
      )}
      {(item.startDate || item.endDate) && (
        <p className="text-sm text-slate-300 mt-1">
          {formatRange(item.startDate, item.endDate)}
        </p>
      )}
    </Card>
  );
}

function SkillGroup({ s }) {
  return (
    <div className="rounded-lg border border-slate-600 bg-slate-800/70 p-4">
      <div className="font-medium text-slate-100">{s.name}</div>
      {Array.isArray(s.keywords) && s.keywords.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {s.keywords.map((k) => (
            <span
              key={k}
              className="text-xs leading-tight px-2 py-1 rounded-full border border-slate-500 bg-slate-700/60 text-slate-200"
            >
              {k}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfileLinks({ profiles = [] }) {
  if (!profiles.length) return null;
  return (
    <div className="mt-2 text-sm text-slate-300 flex flex-wrap gap-x-3 gap-y-1">
      {profiles.map((p) => (
        <a
          key={p.url}
          href={p.url}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-2 underline-offset-2 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-sm"
          aria-label={p.network}
        >
          {p.network}
        </a>
      ))}
    </div>
  );
}

function Certifications({ certs = [] }) {
  if (!certs.length) return null;
  return (
    <Section title="Certifications">
      {certs.map((c, i) => (
        <Card key={`${c.title}-${i}`}>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <div>
              <h3 className="font-medium">{c.title}</h3>
              <p className="text-sm text-slate-300">{c.issuer}</p>
            </div>
            <time className="text-sm tabular-nums text-slate-300">
              {formatRange(c.date, null)}
            </time>
          </div>
        </Card>
      ))}
    </Section>
  );
}

/* ------------------------------ main view ----------------------------- */
export default function Resume() {
  const { data, loading, err } = useResumeData();

  if (loading) return <p className="py-8 text-center">Loading resume…</p>;
  if (err) return <p className="py-8 text-center text-red-600">Failed to load resume.</p>;
  if (!data) return null;

  const {
    basics = {},
    work = [],
    education = [],
    skills = [],
    profiles = [],
    certifications = [],
    // projects = []
  } = data;

  return (
    <>
      {/* Skip link for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only absolute left-2 top-2 z-[100] bg-white text-black px-3 py-1 rounded shadow
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Skip to content
      </a>

      <Navbar />

      <div
        id="main"
        role="main"
        className="pt-20 resume mx-auto max-w-3xl px-4 print:mx-auto text-slate-200 leading-relaxed"
        itemScope
        itemType="https://schema.org/Person"
      >
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-100" itemProp="name">
            {basics.name}
          </h1>
          {basics.label && (
            <p className="text-slate-200/90" itemProp="jobTitle">
              {basics.label}
            </p>
          )}

          <div className="mt-2 text-sm text-slate-300 flex flex-wrap gap-x-3 gap-y-1">
            {basics.location && <span itemProp="address">{basics.location}</span>}
            {basics.email && (
              <a
                className="underline decoration-2 underline-offset-2 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-sm"
                href={`mailto:${basics.email}`}
                itemProp="email"
              >
                {basics.email}
              </a>
            )}
            {basics.phone && <span itemProp="telephone">{basics.phone}</span>}
            {basics.url && (
              <a
                className="underline decoration-2 underline-offset-2 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-sm"
                href={basics.url}
                target="_blank"
                rel="noreferrer"
                itemProp="url"
              >
                Website
              </a>
            )}
          </div>

          <ProfileLinks profiles={profiles} />

          {basics.summary && (
            <p className="mt-4 max-w-prose">
              {basics.summary}
            </p>
          )}

          {/* Buttons row */}
<div className="mt-4 flex flex-wrap items-center gap-3">
  {/* Download PDF: mobile only */}
  <a
    href={`${import.meta.env.BASE_URL}resume.pdf`}
    target="_blank"
    rel="noreferrer"
    className="inline-flex md:hidden items-center gap-2 rounded border border-blue-600 bg-blue-600 text-white px-3 py-1 text-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
    aria-label="Download PDF resume"
  >
    Download PDF
  </a>

  {/* Print button: desktop only */}
  <button
    onClick={() => window.print()}
    className="hidden md:inline-flex items-center gap-2 rounded border border-slate-500 bg-slate-800/60 px-3 py-1 text-sm hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
    aria-label="Print or save resume as PDF"
  >
    Print / Save as PDF
  </button>

  {/* Developer easter egg */}
  <a
    href={`${import.meta.env.BASE_URL}resume.json`}
    className="ml-auto text-xs text-slate-400 hover:text-slate-200 underline decoration-dotted focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-sm"
    aria-label="View resume JSON"
  >
    For developers: JSON résumé →
  </a>
</div>
        </header>

        {/* Experience */}
        {work.length > 0 && (
          <Section title="Experience">
            {work.map((w, i) => <WorkItem key={i} item={w} />)}
          </Section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <Section title="Skills">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((s, i) => <SkillGroup key={s.name ?? i} s={s} />)}
            </div>
          </Section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <Section title="Education">
            {education.map((e, i) => <EducationItem key={i} item={e} />)}
          </Section>
        )}

        {/* Certifications */}
        <Certifications certs={certifications} />

        {/* Projects (optional)… */}
      </div>
    </>
  );
}
