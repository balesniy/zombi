export function solveInverse(center, target){
  const { endDirection, pathFunction } =  ymaps.coordSystem.geo.solveInverseProblem(center, target);
  return {
    direction: endDirection,
    pathFunction
  }
}

export function solveDirect(center, direction, dist) {
  const alpha = Math.atan2(dist, Math.sqrt(Math.pow(dist, 2) + Math.pow(dist, 2))) - Math.atan2(...direction);
  return ymaps.coordSystem.geo.solveDirectProblem(center, [Math.cos(alpha), Math.sin(alpha)], dist).endPoint
}

export function getDistance(a,b) {
  return ymaps.coordSystem.geo.getDistance(a, b)
}