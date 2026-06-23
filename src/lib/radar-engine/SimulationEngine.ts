import type {
  RadarScenario,
  RadarTrack,
  Landmass,
  GeodeticCoord,
} from "./types";

export class SimulationEngine {
  private scenario: RadarScenario;
  private isRunning: boolean = false;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private updateCallbacks: Array<(tracks: RadarTrack[]) => void> = [];

  private static readonly TICK_RATE_MS = 50; // 20 updates per second
  private static readonly MS_PER_HOUR = 1000 * 60 * 60;
  // Tick rate in hours for knot calculations
  private static readonly DT =
    SimulationEngine.TICK_RATE_MS / SimulationEngine.MS_PER_HOUR;
  private static readonly MAXIMUM_RADIUS = 50; // nM

  constructor(initialScenario: RadarScenario) {
    this.scenario = JSON.parse(JSON.stringify(initialScenario));
  }

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;

    this.intervalId = setInterval(() => {
      this.tick();
    }, SimulationEngine.TICK_RATE_MS);
  }

  public stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
  }

  private tick() {
    this.updatePositions();
    this.notifySubscribers();
  }

  private updatePositions() {
    for (const track of this.scenario.tracks) {
      track.position.x += track.velocity.x * SimulationEngine.DT;
      track.position.y += track.velocity.y * SimulationEngine.DT;

      const distanceFromCenter = Math.sqrt(
        track.position.x ** 2 + track.position.y ** 2,
      );
      if (distanceFromCenter > SimulationEngine.MAXIMUM_RADIUS) {
        track.velocity = { x: 0, y: 0 };
      }
    }
  }

  public onUpdate(callback: (tracks: RadarTrack[]) => void) {
    this.updateCallbacks.push(callback);
  }

  private notifySubscribers() {
    const tracksSnapshot = this.scenario.tracks.map((t) => ({
      ...t,
      position: { ...t.position },
    }));
    for (const callback of this.updateCallbacks) {
      callback(tracksSnapshot);
    }
  }

  public getLandmasses(): Landmass[] {
    return this.scenario.landmasses;
  }

  public getDatum(): GeodeticCoord {
    return this.scenario.datum;
  }
}
