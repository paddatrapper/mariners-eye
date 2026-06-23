export interface Vector2D {
  x: number; // Nautical miles relative to center
  y: number; // Nautical miles relative to center
}

export interface GeodeticCoord {
  lat: number;
  lon: number;
}

export type TrackType = "own-ship" | "vessel" | "buoy";

export interface RadarTrack {
  id: string;
  type: TrackType;
  name: string;
  position: Vector2D;
  velocity: Vector2D; // Knots broken into X/Y vectors
  heading: number; // In degrees from North
}

export interface Landmass {
  id: string;
  name: string;
  polygon: Vector2D[]; // Closed loop of points defining the coast
}

export interface RadarScenario {
  id: string;
  name: string;
  datum: GeodeticCoord;
  tracks: RadarTrack[];
  landmasses: Landmass[];
}
