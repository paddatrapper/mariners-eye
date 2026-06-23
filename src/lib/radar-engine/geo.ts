import type { Vector2D, GeodeticCoord } from "./types";

const NM_PER_DEGREE_LAT = 60.0;

export function localToGeodetic(
  local: Vector2D,
  datum: GeodeticCoord,
): GeodeticCoord {
  const lat = datum.lat + local.y / NM_PER_DEGREE_LAT;
  // Account for longitude convergence based on latitude
  const lon_per_degree =
    NM_PER_DEGREE_LAT * Math.cos(datum.lat * (Math.PI / 180));
  const lon = datum.lon + local.x / lon_per_degree;

  return { lat, lon };
}
