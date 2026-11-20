function Card({ children, className = "", id }) {
  return (
    <div
      id={id}
      className={`rounded-3xl bg-white/5 backdrop-blur-xl${className}`}
    >
      {children}
    </div>
  );
}

export default Card;