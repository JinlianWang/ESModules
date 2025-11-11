function e(_, n) {
  return _ + n;
}
function u(_, n, t) {
  return e(e(_, n), t);
}
const o = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {};
o.__MY_MATH_LOAD_COUNT__ = (o.__MY_MATH_LOAD_COUNT__ ?? 0) + 1;
function d() {
  return o.__MY_MATH_LOAD_COUNT__;
}
export {
  d as getLoadCount,
  u as sumThree
};
