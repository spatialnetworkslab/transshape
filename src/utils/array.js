/*
  Why this weird map function when there is Array.map?
  Well, usually premature optimization is the root of all evil,
  but Array.map is just really really slow.

  See, for example,  https://jsperf.com/map-reduce-named-functions/2
  Array.map is more than 6x slower than a classical for loop,
  and almost 4x slower than a custom implementation like this one.
*/
export function map (array, callback) {
  const result = []

  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i))
  }

  return result
}
