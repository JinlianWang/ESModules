function add(a, b) {
  return a + b;
}
function sumThree(a, b, c) {
  return add(add(a, b), c);
}
const globalScope = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : {};
globalScope.__MY_MATH_LOAD_COUNT__ = (globalScope.__MY_MATH_LOAD_COUNT__ ?? 0) + 1;
function getLoadCount() {
  return globalScope.__MY_MATH_LOAD_COUNT__;
}
export {
  getLoadCount,
  sumThree
};
