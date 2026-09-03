export default function ProcessCard({ num, title, desc }) {
  return (
    <div className="process-card reveal">
      <div className="process-num">{num}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
