function Card({ children, className = "", id }) {
  return (
    <div
      id={id}
      className={`bg-white/5 backdrop-blur-xl${className}`}
    >
      {children}
    </div>
  );
}

export default Card;