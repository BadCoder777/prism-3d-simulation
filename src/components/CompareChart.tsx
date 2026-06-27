import { useAtom } from "jotai";
import { useEffect, useMemo, useRef } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
import { GRUVBOX_COLORS } from "../constants/colors";
import {
  chartArguments,
  currentPlayingFile,
  solverMethod,
} from "../state/state";
import { solve } from "../utils/tools/solve";

export const CompareChart = () => {
  const [currentFile] = useAtom(currentPlayingFile);
  const [args] = useAtom(chartArguments);
  const [method] = useAtom(solverMethod);

  const myDivRef = useRef<HTMLDivElement>(null);
  const compareChartRef = useRef<HTMLDivElement>(null);
  const compareUPlotInst = useRef<uPlot | null>(null);

  const chartData = useMemo(() => {
    if (!args) return [[], [], [], []];
    return solve(args, method);
  }, [args, method]);

  useEffect(() => {
    if (!compareChartRef.current || !myDivRef.current || !args) return;

    if (compareUPlotInst.current) compareUPlotInst.current.destroy();

    const axisColor = GRUVBOX_COLORS.chartAxis;
    const gridColor = GRUVBOX_COLORS.chartGrid;
    const strokeX = GRUVBOX_COLORS.chartTraceX;
    const strokeY = GRUVBOX_COLORS.chartTraceY;
    const strokeZ = GRUVBOX_COLORS.chartTraceZ;

    const opts: uPlot.Options = {
      width: compareChartRef.current.clientWidth || 300,
      height: Math.max(120, myDivRef.current.clientHeight - 48),
      cursor: {
        drag: { x: true, y: false },
      },
      scales: {
        x: { time: false },
      },
      series: [
        {},
        {
          label: "wx (rad/s)",
          stroke: strokeX,
          width: 1,
        },
        {
          label: "wy (rad/s)",
          stroke: strokeY,
          width: 1,
        },
        {
          label: "wz (rad/s)",
          stroke: strokeZ,
          width: 1,
        },
      ],
      axes: [
        {
          stroke: axisColor,
          grid: { stroke: gridColor },
        },
        {
          stroke: axisColor,
          grid: { stroke: gridColor },
        },
      ],
    };

    // @ts-ignore
    compareUPlotInst.current = new uPlot(
      opts,
      chartData as any,
      compareChartRef.current,
    );
  }, [chartData, args]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      if (
        compareUPlotInst.current &&
        compareChartRef.current &&
        myDivRef.current
      ) {
        compareUPlotInst.current.setSize({
          width: compareChartRef.current.clientWidth,
          height: myDivRef.current.clientHeight - 48,
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={myDivRef}
      className="flex-1 min-w-0 bg-[#3c3836]/60 backdrop-blur-xl border border-[#504945]/60 rounded-2xl p-4 shadow-2xl flex flex-col h-full"
    >
      <div className="text-[10px] font-bold tracking-wider uppercase text-[#bdae93] select-none pb-1.5 border-b border-[#504945]/50 mb-2">
        Theoretical {method} Model Plot
      </div>
      <div ref={compareChartRef} className="w-full flex-grow min-h-0"></div>
    </div>
  );
};
