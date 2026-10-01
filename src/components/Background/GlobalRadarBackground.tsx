import Radar from './Radar';

export default function GlobalRadarBackground() {
  return (
    <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none overflow-hidden bg-black">
      <Radar
        speed={0.35}
        scale={0.45}
        ringCount={8}
        spokeCount={8}
        ringThickness={0.035}
        spokeThickness={0.008}
        sweepSpeed={0.4}
        sweepWidth={2.5}
        sweepLobes={1}
        color="#4F8CFF"
        backgroundColor="#050505"
        falloff={2.5}
        brightness={0.35}
        enableMouseInteraction={true}
        mouseInfluence={0.04}
      />
    </div>
  );
}
