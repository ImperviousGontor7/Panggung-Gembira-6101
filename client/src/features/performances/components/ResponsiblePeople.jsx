import PerformanceIcon from "./PerformanceIcon";

export default function ResponsiblePeople({ people = [] }) {
  const slots = [0, 1].map((index) => people[index] || {
    id: `responsible-${index + 1}`,
    name: "",
    role: "Penanggung Jawab Acara",
    photo: null,
  });

  return (
    <div className="pd-responsibles">
      <div className="pd-responsibles-heading">
        <span className="pd-mini-label">THE PEOPLE BEHIND THE EVENT</span>
        <span className="pd-responsibles-rule" />
      </div>
      <div className="pd-responsible-grid">
        {slots.map((person, index) => (
          <article className="pd-person-card" key={person.id || index}>
            <div className="pd-person-photo">
              {person.photo ? (
                <img src={person.photo} alt={person.name || `Penanggung jawab ${index + 1}`} loading="lazy" />
              ) : (
                <div className="pd-person-photo-empty">
                  <PerformanceIcon name="image" size={24} />
                  <span>PHOTO {String(index + 1).padStart(2, "0")}</span>
                </div>
              )}
            </div>
            <div className="pd-person-copy">
              <span className="pd-person-role">{person.role || "Penanggung Jawab Acara"}</span>
              <strong>{person.name || "Nama belum ditambahkan"}</strong>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
