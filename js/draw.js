import {getDistance} from './geo'
export default function draw({ target, route }) {
  const segmentsLengths = route.map((coordinates, i, arr) =>
    i ? getDistance(coordinates, arr[i - 1]) : 0
  );
  const segmentsDists = segmentsLengths.reduce((res, dist) => [...res, (res[res.length - 1] || 0) + dist], []);
  return function draw(progress) {
    const segment = segmentsDists.findIndex(i => i > progress);
    if (~segment) {
      const current = (progress - segmentsDists[segment - 1]) / (segmentsDists[segment] - segmentsDists[segment - 1]);
      const nextCoords = [
        (route[segment][0] - route[segment - 1][0]) * current + route[segment - 1][0],
        (route[segment][1] - route[segment - 1][1]) * current + route[segment - 1][1]
      ];
      target.geometry.setCoordinates(nextCoords);
      return [route[segment - 1], route[segment]]
    }
  }
}