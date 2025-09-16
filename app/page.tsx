"use client";
import LiquidEther from "@/components/LiquidEther";
import ASCIIText from "@/components/ASCIIText";

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

      {/* ASCII animated text */}

    <ASCIIText
      text='Jawad Bouchiba'
      enableWaves={true}
      asciiFontSize={8}
    />
    </div>
  );
}
