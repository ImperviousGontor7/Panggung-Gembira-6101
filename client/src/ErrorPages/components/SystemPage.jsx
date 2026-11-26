import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiAlertTriangle, FiArrowLeft, FiArrowUpRight, FiHome, FiRefreshCw } from "react-icons/fi";

import MasterLogo from "../../assets/images/support_logo/Master Logo.webp";

function ActionIcon({ type }) {
  if (type === "retry") return <FiRefreshCw aria-hidden="true" />;
  if (type === "back") return <FiArrowLeft aria-hidden="true" />;
  if (type === "external" || type === "login") return <FiArrowUpRight aria-hidden="true" />;
  return <FiHome aria-hidden="true" />;
}

function SystemAction({ action, secondary = false }) {
  const navigate = useNavigate();
  if (!action) return null;

  const className = secondary
    ? "ig-system-action ig-system-action--secondary"
    : "ig-system-action ig-system-action--primary";

  const handleClick = () => {
    if (action.type === "retry") window.location.reload();
    else if (action.type === "back") navigate(-1);
    else if (action.type === "home") navigate("/");
  };

  const content = (
    <>
      <span>{action.label}</span>
      <ActionIcon type={action.type || (action.to === "/login" ? "login" : action.to === "/" ? "home" : undefined)} />
    </>
  );

  if (action.to) return <Link className={className} to={action.to}>{content}</Link>;
  if (action.href) return <a className={className} href={action.href} target={action.external ? "_blank" : undefined} rel={action.external ? "noreferrer" : undefined}>{content}</a>;
  return <button className={className} type="button" onClick={handleClick}>{content}</button>;
}

export default function SystemPage({
  marker = "!",
  eyebrow = "SYSTEM NOTICE",
  title,
  description,
  detail,
  variant = "error",
  primaryAction = { label: "Kembali ke Beranda", type: "home" },
  secondaryAction = { label: "Halaman Sebelumnya", type: "back" },
  reference,
}) {
  useEffect(() => {
    const previousTitle = document.title;
    const existingRobots = document.querySelector('meta[name="robots"]');
    const previousRobotsContent = existingRobots?.getAttribute("content");
    const robotsMeta = existingRobots || document.createElement("meta");
    robotsMeta.setAttribute("name", "robots");
    robotsMeta.setAttribute("content", "noindex, nofollow");
    if (!existingRobots) document.head.appendChild(robotsMeta);
    document.title = `${title} | Impervious Generation`;

    return () => {
      document.title = previousTitle;
      if (existingRobots) {
        if (previousRobotsContent === null) robotsMeta.removeAttribute("content");
        else robotsMeta.setAttribute("content", previousRobotsContent);
      } else {
        robotsMeta.remove();
      }
    };
  }, [title]);

  return (
    <main className={`ig-system-page ig-system-page--${variant}`}>
      <div className="ig-system-background-orb ig-system-background-orb--one" />
      <div className="ig-system-background-orb ig-system-background-orb--two" />
      <div className="ig-system-grid" />
      <div className="ig-system-shell">
        <header className="ig-system-header">
          <Link className="ig-system-brand" to="/" aria-label="Impervious Generation — Beranda">
            <span className="ig-system-brand-mark"><img src={MasterLogo} alt="" /></span>
            <span className="ig-system-brand-copy"><strong>IMPERVIOUS</strong><small>GENERATION · GONTOR 7</small></span>
          </Link>
          <span className="ig-system-header-label"><span className="ig-system-live-dot" />SYSTEM RESPONSE</span>
        </header>
        <section className="ig-system-main">
          <div className="ig-system-visual" aria-hidden="true">
            <div className="ig-system-orbit ig-system-orbit--outer" />
            <div className="ig-system-orbit ig-system-orbit--inner" />
            <div className="ig-system-visual-glow" />
            <div className="ig-system-marker">{marker}</div>
            <div className="ig-system-visual-caption"><span>IG / 2027</span><span>GOLDEN AGE CATALYST</span></div>
          </div>
          <div className="ig-system-content">
            <div className="ig-system-eyebrow"><FiAlertTriangle aria-hidden="true" /><span>{eyebrow}</span></div>
            <h1>{title}</h1>
            <p className="ig-system-description">{description}</p>
            {detail ? <div className="ig-system-detail"><span className="ig-system-detail-line" /><p>{detail}</p></div> : null}
            <div className="ig-system-actions"><SystemAction action={primaryAction} /><SystemAction action={secondaryAction} secondary /></div>
            {reference ? <p className="ig-system-reference">REFERENCE · {reference}</p> : null}
          </div>
        </section>
        <footer className="ig-system-footer"><span>© 2027 IMPERVIOUS GENERATION</span><span>ONE GENERATION · ONE LEGACY</span></footer>
      </div>
    </main>
  );
}
