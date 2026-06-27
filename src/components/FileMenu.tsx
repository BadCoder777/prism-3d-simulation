import { useAtom } from "jotai";
import { Trash2, Play, ChevronDown, Check } from "lucide-react";
import { useMemo, useState, useRef, useEffect } from "react";
import {
  chartArguments,
  compareArguments,
  currentPlayingFile,
  isCompareChartOpen,
  keyList,
  solverMethod,
} from "../state/state";
import { FileUploader } from "./FileUploader";
import { InputData } from "./InputData";
import { SolvingMethods } from "../types/solvingMethods.type";

export const FileMenu = () => {
  const [keys, setKeys] = useAtom(keyList);
  const [currentFile, setCurrentFile] = useAtom(currentPlayingFile);

  const [comArguments, setArguments] = useAtom(compareArguments);
  const [, setChartArgs] = useAtom(chartArguments);
  const [isChartOpen, setIsChartOpen] = useAtom(isCompareChartOpen);
  const [method, setMethod] = useAtom(solverMethod);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArguments((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      comArguments.a !== "" &&
      comArguments.b !== "" &&
      comArguments.c !== "" &&
      comArguments.m !== "" &&
      comArguments.wx !== "" &&
      comArguments.wy !== "" &&
      comArguments.wz !== "" &&
      comArguments.dt !== "" &&
      comArguments.time !== ""
    ) {
      setChartArgs({
        a: +comArguments.a,
        b: +comArguments.b,
        c: +comArguments.c,
        m: +comArguments.m,
        wx: +comArguments.wx,
        wy: +comArguments.wy,
        wz: +comArguments.wz,
        dt: +comArguments.dt,
        time: +comArguments.time,
      });
      setIsChartOpen(true);
    } else {
      setChartArgs({
        a: null,
        b: null,
        c: null,
        m: null,
        wx: null,
        wy: null,
        wz: null,
        dt: null,
        time: null,
      });
    }
  };

  const inputArr = useMemo(() => {
    return [
      {
        name: "a",
        title: "a",
        value: comArguments.a,
        placeholder: "length (m)",
      },
      {
        name: "b",
        title: "b",
        value: comArguments.b,
        placeholder: "width (m)",
      },
      {
        name: "c",
        title: "c",
        value: comArguments.c,
        placeholder: "height (m)",
      },
      {
        name: "m",
        title: "m",
        value: comArguments.m,
        placeholder: "mass (kg)",
      },
      { name: "wx", title: "ωx", value: comArguments.wx, placeholder: "rad/s" },
      { name: "wy", title: "ωy", value: comArguments.wy, placeholder: "rad/s" },
      { name: "wz", title: "ωz", value: comArguments.wz, placeholder: "rad/s" },
      {
        name: "dt",
        title: "dt",
        value: comArguments.dt,
        placeholder: "step (s)",
      },
      {
        name: "time",
        title: "t",
        value: comArguments.time,
        placeholder: "total (s)",
      },
    ];
  }, [comArguments]);

  return (
    <div className="w-80 h-full flex flex-col justify-between bg-[#3c3836]/60 backdrop-blur-xl border border-[#504945]/60 rounded-2xl p-4 shadow-2xl flex-shrink-0 select-none transition-all duration-300 xl:w-72">
      <div className="flex-grow min-h-0 flex flex-col">
        {/* Section 1: Parameters */}
        <div className="pb-3.5 mb-3.5 border-b border-[#504945]/50 flex flex-col gap-2.5">
          <div className="flex items-center justify-between pb-1 border-b border-[#504945]">
            <h2 className="text-[10px] font-bold tracking-wider uppercase text-[#bdae93]">
              Model Parameters
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="grid grid-cols-1 gap-1.5">
              {inputArr.map((item, i) => (
                <InputData
                  key={i}
                  title={item.title}
                  handleChange={handleChange}
                  name={item.name}
                  placeholder={item.placeholder}
                  value={item.value}
                />
              ))}
            </div>

            {/* Split Button with Solver Algorithm Dropdown Menu */}
            <div className="relative w-full mt-1.5" ref={dropdownRef}>
              <div className="flex items-stretch w-full rounded-lg overflow-hidden shadow-md shadow-[#fe8019]/10">
                <button
                  type="submit"
                  className="comfortable-transition flex-grow py-1.5 px-3 bg-[#fe8019] hover:bg-[#d65d0e] text-[#282828] text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Solve {method} Model</span>
                </button>{" "}
                <button
                  type="button"
                  className="comfortable-transition px-2 bg-[#d65d0e] hover:bg-[#b54c0b] text-[#282828] border-l border-[#282828]/20 flex items-center justify-center cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  title="Select Integration Solver Algorithm"
                >
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              {/* Modern Floating Menu with Slide & Fade Animations */}
              <div
                className={`absolute left-0 right-0 bottom-full mb-1.5 z-50 bg-[#32302f]/95 border border-[#504945] rounded-lg shadow-2xl overflow-hidden backdrop-blur-xl transition-all duration-200 ease-out origin-bottom ${
                  isDropdownOpen
                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                    : "opacity-0 translate-y-2 scale-95 pointer-events-none"
                }`}
              >
                <div className="px-3 py-1.5 border-b border-[#504945]/50 text-[9px] font-bold uppercase tracking-wider text-[#a89984]">
                  Integration Algorithm
                </div>
                <div className="p-1 flex flex-col gap-0.5">
                  {Object.values(SolvingMethods).map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={`comfortable-transition w-full px-2.5 py-1.5 rounded-md text-xs font-mono text-left flex items-center justify-between cursor-pointer ${
                        method === m
                          ? "bg-[#504945] text-[#ebdbb2] font-semibold"
                          : "text-[#bdae93] hover:bg-[#3c3836] hover:text-[#ebdbb2]"
                      }`}
                      onClick={() => {
                        setMethod(m);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <span>{m}</span>
                      {method === m && (
                        <Check className="w-3.5 h-3.5 text-[#fe8019]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Section 2: Datasets */}
        <div className="flex-grow min-h-0 flex flex-col gap-2.5">
          <div className="flex items-center justify-between pb-1 border-b border-[#504945]">
            <h2 className="text-[10px] font-bold tracking-wider uppercase text-[#bdae93]">
              Sensor Datasets
            </h2>
          </div>

          {/* Scrollable File List */}
          <div className="flex-grow overflow-y-auto flex flex-col gap-2 pr-1">
            {keys.length > 0 ? (
              keys.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <button
                    className={`comfortable-transition text-left w-full px-3 py-2 rounded-lg text-xs font-mono border relative overflow-hidden flex-1 ${
                      currentFile === item
                        ? "bg-[#504945] border-[#7c6f64] text-[#ebdbb2] font-medium"
                        : "bg-[#32302f]/60 border-[#504945]/50 text-[#bdae93] hover:bg-[#3c3836] hover:text-[#ebdbb2]"
                    }`}
                    onClick={() => {
                      setCurrentFile(item);
                    }}
                  >
                    <span
                      className="truncate block max-w-[190px] xl:max-w-[150px]"
                      title={item}
                    >
                      {item}
                    </span>
                  </button>

                  <button
                    className="comfortable-transition p-2 rounded-lg border border-transparent bg-[#32302f]/40 text-[#a89984] hover:text-[#fb4934] hover:bg-[#fb4934]/15 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      localStorage.removeItem(item);
                      const nextKeys = keys.filter((value) => value !== item);
                      setKeys(nextKeys);
                      if (currentFile === item) {
                        setCurrentFile(nextKeys.length > 0 ? nextKeys[0] : "");
                      }
                    }}
                    title="Delete dataset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center text-[#a89984] gap-1.5">
                <span className="text-lg">📊</span>
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#bdae93]">
                  No datasets loaded
                </p>
                <p className="text-[9px] text-[#a89984] px-2 leading-relaxed">
                  Upload a CSV file to begin telemetry simulation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Integrated Drag & Drop Uploader */}
      <div className="pt-3 border-t border-[#504945]/50">
        <FileUploader />
      </div>
    </div>
  );
};
