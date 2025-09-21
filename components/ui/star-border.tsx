import { ElementType, ComponentPropsWithoutRef } from "react"

interface StarBorderProps<T extends ElementType> {
  as?: T
  color?: string
  speed?: string
  children: React.ReactNode
}

export function StarBorder<T extends ElementType = "button">({
  as,
  color,
  speed = "6s",
  children,
  ...props
}: StarBorderProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof StarBorderProps<T>>) {
  const Component = as || "button"
  const defaultColor = color || "hsl(180, 100%, 50%)"

  return (
    <Component
      {...props}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.5rem 1.5rem",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.2)",
        color: "white",
        background: "rgba(255,255,255,0.05)",
        cursor: "pointer",
        overflow: "hidden",
        transition: "all 0.3s ease",
        fontWeight: 500,
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget
        target.style.transform = "scale(1.05) translateY(-2px)"
        target.style.boxShadow = `0 0 20px ${defaultColor}50`
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget
        target.style.transform = "scale(1) translateY(0)"
        target.style.boxShadow = "none"
      }}
    >
      {/* Subtle pulse + float */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "12px",
          background: `radial-gradient(circle, ${defaultColor}20, transparent 70%)`,
          animation: `pulseGlow ${speed} infinite, floatY 4s ease-in-out infinite`,
          pointerEvents: "none",
        }}
      />
      {/* Shimmer highlight */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "-50%",
          width: "50%",
          height: "100%",
          background: `linear-gradient(120deg, transparent, ${defaultColor}30, transparent)`,
          transform: "skewX(-20deg)",
          animation: `shimmer 2s linear infinite`,
          pointerEvents: "none",
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>

      {/* Animations */}
      <style>
        {`
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.5; }
          }

          @keyframes floatY {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }

          @keyframes shimmer {
            0% { left: -50%; }
            100% { left: 100%; }
          }
        `}
      </style>
    </Component>
  )
}
