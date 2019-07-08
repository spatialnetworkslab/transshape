/*
  Taken from flubber:
  https://github.com/veltman/flubber
*/

import { neighbors, mergeArcs, feature } from 'topojson-client'

// TODO clean up and actually return GeoJSON Polygons (or one MultiPolygon?)
export default function collapseTopology(topology, numPieces) {
  const geometries = topology.objects.triangles.geometries,
    bisect = bisector(d => d.area).left;

  while (geometries.length > numPieces) {
    mergeSmallestFeature();
  }

  if (numPieces > geometries.length) {
    throw new RangeError("Can't collapse topology into " + numPieces + " pieces.");
  }

  return feature(topology, topology.objects.triangles).features.map(f => {
    f.geometry.coordinates[0].pop();
    return f.geometry.coordinates[0];
  });

  function mergeSmallestFeature() {
    const smallest = geometries[0],
      neighborIndex = neighbors(geometries)[0][0],
      neighbor = geometries[neighborIndex],
      merged = mergeArcs(topology, [smallest, neighbor]);

    // MultiPolygon -> Polygon
    merged.area = smallest.area + neighbor.area;
    merged.type = "Polygon";
    merged.arcs = merged.arcs[0];

    // Delete smallest and its chosen neighbor
    geometries.splice(neighborIndex, 1);
    geometries.shift();

    // Add new merged shape in sorted order
    geometries.splice(bisect(geometries, merged.area), 0, merged);
  }
}