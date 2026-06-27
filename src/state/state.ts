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

export const getDatasetKeys = (): string[] => {
  const reserved = ["compare_args", "chart_args", "is_compare_chart_open", "theme", "current_playing_file"];
  return Object.keys(localStorage).filter((key) => {
    if (reserved.includes(key)) return false;
    try {
      const item = localStorage.getItem(key);
      if (!item) return false;
      const parsed = JSON.parse(item);
      return parsed && typeof parsed === "object" && "data" in parsed;
    } catch (e) {
      return false;
    }
  });
};

const initialCurrentPlayingFile = (() => {
  const saved = localStorage.getItem("current_playing_file");
  const availableKeys = getDatasetKeys();
  if (saved && availableKeys.includes(saved)) {
    return saved;
  }
  return availableKeys.length > 0 ? availableKeys[0] : "";
})();

export const isOpenDropZone = atom(true);
export const speed = atom(1);
export const simTime = atom(0);
export const isPlaying = atom(true);

const baseCurrentPlayingFile = atom<string>(initialCurrentPlayingFile);
export const currentPlayingFile = atom(
  (get) => get(baseCurrentPlayingFile),
  (get, set, update) => {
    const nextValue =
      typeof update === "function"
        ? update(get(baseCurrentPlayingFile))
        : update;
    set(baseCurrentPlayingFile, nextValue);
    if (nextValue) {
      localStorage.setItem("current_playing_file", nextValue);
    } else {
      localStorage.removeItem("current_playing_file");
    }
  },
);

const baseKeyList = atom<string[]>(getDatasetKeys());
export const keyList = atom(
  (get) => get(baseKeyList),
  (get, set, update) => {
    const nextValue =
      typeof update === "function" ? update(get(baseKeyList)) : update;
    set(baseKeyList, nextValue);
  },
);

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
