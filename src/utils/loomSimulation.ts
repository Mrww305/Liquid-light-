/**
 * Automated Loom Textile Simulation Engine
 * Simulates real-time mechanical loom cycles:
 * 1. Warp take-up and continuous weave pattern advancement
 * 2. Heddle harness shedding (alternating warp yarn elevation to expose under/over threads)
 * 3. Reed beat-up harmonic impulse wave across the fabric mesh
 * 4. Micro-pore tension dilatation revealing 3D material depth
 */

export interface LoomSimulationState {
  active: boolean;
  speed: number;
  accumulatedPhase: number;
  shedState: number; // -1.0 to 1.0 (alternating harness lift)
  beatImpulse: number; // 0.0 to 1.0 (reed impact wave)
  weftInsertionShift: number; // Micro lateral traversal
  statusLabel: string;
}

export function updateLoomSimulation(
  deltaSeconds: number,
  currentPhase: number,
  speed: number,
  active: boolean
): LoomSimulationState {
  if (!active) {
    return {
      active: false,
      speed,
      accumulatedPhase: currentPhase,
      shedState: 0.0,
      beatImpulse: 0.0,
      weftInsertionShift: 0.0,
      statusLabel: 'Loom Idle (Manual Inspection)',
    };
  }

  // Phase advances based on loom speed (1 cycle ≈ 2.8 seconds at 1.0x)
  const newPhase = currentPhase + deltaSeconds * speed * 2.2;

  // Shedding alternation between harness frame 1 & 2
  const shedState = Math.sin(newPhase);

  // Reed beat-up occurs twice per full cycle when shed reaches maximum separation
  const beatCycle = Math.abs(Math.sin(newPhase * 2.0));
  const beatImpulse = Math.pow(beatCycle, 6.0); // Sharp mechanical strike

  // Micro lateral shift of weft yarns during pick insertion
  const weftInsertionShift = Math.sin(newPhase * 0.5) * 0.008;

  // Determine realistic status text for mill HUD
  const modCycle = (newPhase / Math.PI) % 2;
  let statusLabel = 'Loom Weaving';
  if (beatImpulse > 0.6) {
    statusLabel = 'Reed Beat-Up · Fell Compacting';
  } else if (modCycle < 0.5) {
    statusLabel = 'Shed Phase 1 · Harness A Lift (Odd)';
  } else if (modCycle < 1.0) {
    statusLabel = 'Weft Shuttle Insertion · Pick Advance';
  } else if (modCycle < 1.5) {
    statusLabel = 'Shed Phase 2 · Harness B Lift (Even)';
  } else {
    statusLabel = 'Warp Take-Up · Continuous Cloth Feed';
  }

  return {
    active: true,
    speed,
    accumulatedPhase: newPhase,
    shedState,
    beatImpulse,
    weftInsertionShift,
    statusLabel,
  };
}
