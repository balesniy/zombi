export default function getCoordinates(routes) {
  const routeIndex = ~~(Math.random() * routes.length);
  const paths = routes[routeIndex].getPaths();
  const coordinates = [].concat(...paths.map(({properties})=>properties.get('coordinates')));
  const routeLength = routes[routeIndex].properties.get('distance').value;
  return {coordinates, routeLength}
}