import ImperviousShield from "../assets/logos/impervious-shield.webp";

/**
 * Full-screen loading overlay used during React Router page transitions.
 * The gold ring rotates independently while the centered logo gently hops.
 */
export default function PageLoader({ visible = true }) {
  return (
    <div
      className={`page-loader${visible ? " page-loader--visible" : ""}`}
      role={visible ? "status" : undefined}
      aria-live={visible ? "polite" : undefined}
      aria-label={visible ? "Loading page" : undefined}
      aria-hidden={!visible}
    >
      <div className="page-loader__content">
        <div className="page-loader__visual" aria-hidden="true">
          <div className="page-loader__spinner" />
          <img
            className="page-loader__logo"
            src={ImperviousShield}
            alt=""
            draggable="false"
          />
        </div>

        <p className="page-loader__label">LOADING...</p>
      </div>
    </div>
  );
}
