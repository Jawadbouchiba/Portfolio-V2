"use client";
import LiquidEther from "@/components/LiquidEther";
import BlurText from "@/components/BlurText";

export default function Home() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        position: "relative",
      }}
    >
      {/* Liquid background */}
      <LiquidEther
        colors={["#27ffa5ff", "#ffffffff", "#f0f0f0ff"]}
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
        style={{ width: "100%", height: "100%" }}
      />

      {/* Animated text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          color: "white",
          fontSize: "3rem",
          fontWeight: "bold",
        }}
      >
        <BlurText
          text="Jawad Bouchiba"
          animateBy="words"
          direction="bottom"
          onAnimationComplete={() => console.log("Animation complete")}
        />
      </div>
    </div>
  );
}
