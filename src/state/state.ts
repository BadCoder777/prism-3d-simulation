import { atom } from "jotai";

const initialCompareArgs = (() => {
  const saved = localStorage.getItem("compare_args");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
  }
  return {
    a: "",
    b: "",
    c: "",
    m: "",
    wx: "",
    wy: "",
    wz: "",
    dt: "",
    time: "",
  };
})();

const initialChartArgs = (() => {
  const saved = localStorage.getItem("chart_args");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
  }
  return undefined;
})();

export const isOpenDropZone = atom(true);
export const speed = atom(1);
export const simTime = atom(0);
export const isPlaying = atom(true);
export const currentPlayingFile = atom("");
export const keyList = atom([]);
export const animationDuration = atom(0);
export const isComparePopupOpen = atom(false);

const baseIsCompareChartOpen = atom(
  localStorage.getItem("is_compare_chart_open") === "true",
);
export const isCompareChartOpen = atom(
  (get) => get(baseIsCompareChartOpen),
  (get, set, update) => {
    const nextValue =
      typeof update === "function"
        ? update(get(baseIsCompareChartOpen))
        : update;
    set(baseIsCompareChartOpen, nextValue);
    localStorage.setItem("is_compare_chart_open", String(nextValue));
  },
);

const baseChartArguments = atom(initialChartArgs);
export const chartArguments = atom(
  (get) => get(baseChartArguments),
  (get, set, update) => {
    const nextValue =
      typeof update === "function" ? update(get(baseChartArguments)) : update;
    set(baseChartArguments, nextValue);
    if (nextValue) {
      localStorage.setItem("chart_args", JSON.stringify(nextValue));
    } else {
      localStorage.removeItem("chart_args");
    }
  },
);

const baseCompareArguments = atom(initialCompareArgs);
export const compareArguments = atom(
  (get) => get(baseCompareArguments),
  (get, set, update) => {
    const nextValue =
      typeof update === "function" ? update(get(baseCompareArguments)) : update;
    set(baseCompareArguments, nextValue);
    localStorage.setItem("compare_args", JSON.stringify(nextValue));
  },
);
