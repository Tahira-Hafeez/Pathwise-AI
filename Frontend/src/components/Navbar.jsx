import Button from "./Button";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "26px 8vw",
        backdropFilter: "blur(10px)",
        background: "rgba(15,28,46,0.6)",
      }}
    >
      <div style={{ fontFamily: "var(--font-d)", fontWeight: 700, fontSize: "19px" }}>
        PathWise<span style={{ color: "var(--complete)" }}>AI</span>
      </div>
      <Button variant="primary">Find My Path</Button>
    </nav>
  );
}
