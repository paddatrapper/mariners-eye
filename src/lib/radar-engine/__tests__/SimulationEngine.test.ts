import { describe, it, expect, vi } from "vitest";
import { SimulationEngine } from "../SimulationEngine";
import { RadarScenario, RadarTrack } from "../types";

const mockScenario: RadarScenario = {
  id: "test-solent",
  name: "Solent Exercise",
  datum: { lat: 50.8, lon: -1.0 },
  landmasses: [],
  tracks: [
    {
      id: "atlantic-85",
      type: "own-ship",
      name: "Lifeboat",
      position: { x: 0, y: 0 },
      velocity: { x: 25, y: 0 },
      heading: 90,
    },
  ],
};

describe("SimulationEngine Kinematics", () => {
  it("should advance the vessel accurately after 1 second (20 ticks)", () => {
    vi.useFakeTimers();
    const engine = new SimulationEngine(mockScenario);

    let updatedTracks: RadarTrack[] = [];
    engine.onUpdate((tracks) => {
      updatedTracks = tracks;
    });

    engine.start();
    vi.advanceTimersByTime(1000);
    engine.stop();

    const lifeboat = updatedTracks.find((t) => t.id == "atlantic-85");
    expect(lifeboat.position.x).toBeCloseTo(25.0 / (60 * 60), 5);
    expect(lifeboat.position.y).toBe(0);

    vi.useRealTimers();
  });
});
