export default function Button({ children, variant = "primary", onClick }) {
  const base = {
    fontFamily: "var(--font-d)",
    fontWeight: 600,
    fontSize: "15px",
    borderRadius: "999px",
    cursor: "pointer",
    padding: "15px 26px",
    border: "none",
    transition: "transform .25s ease, box-shadow .25s ease",
  };

  const styles = {
    primary: {
      ...base,
      background: "var(--complete)",
      color: "#0F1C2E",
    },
    ghost: {
      ...base,
      background: "transparent",
      color: "var(--surface)",
      border: "1px solid var(--muted)",
      padding: "14px 22px",
      fontFamily: "var(--font-b)",
      fontWeight: 500,
    },
  };

  return (
    <button
      style={styles[variant]}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (variant === "primary") {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 10px 30px var(--complete-glow)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {children}
    </button>
  );
}
