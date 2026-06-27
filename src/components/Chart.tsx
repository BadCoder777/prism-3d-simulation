import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
import { currentPlayingFile, isCompareChartOpen } from "../state/state";
import { converter } from "../utils/dataForChartConverter";
import { getData } from "../utils/getData";

interface IData {
  data: number[][];
}

export const Chart = ({ data }: IData) => {
  const [currentFile] = useAtom(currentPlayingFile);
  const [isComChartOpen] = useAtom(isCompareChartOpen);

  const uPlotInst = useRef<uPlot | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !divRef.current) return;

    if (uPlotInst.current) uPlotInst.current.destroy();

    const axisColor = "#a89984";
    const gridColor = "rgba(124, 111, 100, 0.15)";
    const strokeX = "#fb4934";
    const strokeY = "#83a598";
    const strokeZ = "#b8bb26";

    const opts: uPlot.Options = {
      width: chartRef.current.clientWidth || 300,
      height: Math.max(120, divRef.current.clientHeight - 48),
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
    uPlotInst.current = new uPlot(opts, data, chartRef.current);
  }, [isComChartOpen, data]);

  useEffect(() => {
    if (uPlotInst.current && currentFile) {
      try {
        uPlotInst.current.setData(converter(getData(currentFile)));
      } catch (e) {
        console.error("Error updating chart data:", e);
      }
    }
  }, [currentFile]);

  useEffect(() => {
    const handleResize = () => {
      if (uPlotInst.current && chartRef.current && divRef.current) {
        uPlotInst.current.setSize({
          width: chartRef.current.clientWidth,
          height: divRef.current.clientHeight - 48,
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={divRef}
      className="flex-1 min-w-0 bg-[#3c3836]/60 backdrop-blur-xl border border-[#504945]/60 rounded-2xl p-4 shadow-2xl flex flex-col h-full"
    >
      <div className="text-[10px] font-bold tracking-wider uppercase text-[#bdae93] select-none pb-1.5 border-b border-[#504945]/50 mb-2">
        Sensor Data Plot ({currentFile})
      </div>
      <div ref={chartRef} className="w-full flex-grow min-h-0"></div>
    </div>
  );
};
