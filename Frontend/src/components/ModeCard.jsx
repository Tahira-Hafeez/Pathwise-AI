export default function ModeCard({ tag, title, desc, onClick }) {
  return (
    <div className="mode-card reveal" onClick={onClick}>
      <div className="mtag">{tag}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
