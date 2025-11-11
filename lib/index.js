const globalScope = typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : {});
globalScope.__MY_MATH_LOAD_COUNT__ = (globalScope.__MY_MATH_LOAD_COUNT__ ?? 0) + 1;

export function getLoadCount() {
    return globalScope.__MY_MATH_LOAD_COUNT__;
}

export { sumThree } from './advancedMath.js';
// If you later want to expose add/multiply too, re-export them here.
