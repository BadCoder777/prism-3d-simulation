import { useAtom } from 'jotai'
import { useEffect, useMemo, useRef } from 'react'
import uPlot from 'uplot'
import 'uplot/dist/uPlot.min.css'
import { chartArguments, currentPlayingFile, themeAtom } from '../state/state'
import { calcIMoments } from '../utils/calcIMoments'
import { eulerSolver } from '../utils/eulerSolver'

export const CompareChart = () => {
  const [currentFile] = useAtom(currentPlayingFile)
  const [args] = useAtom(chartArguments)
  const [theme] = useAtom(themeAtom)

  const myDivRef = useRef<HTMLDivElement>(null)
  const compareChartRef = useRef<HTMLDivElement>(null)
  const compareUPlotInst = useRef<uPlot | null>(null)

  const [I_x, I_y, I_z] = useMemo(() => {
    if (!args) return [0, 0, 0]
    // @ts-ignore
    return calcIMoments([args.a, args.b, args.c, args.m])
  }, [args])

  const chartData = useMemo(() => {
    if (!args) return [[], [], [], []]
    return eulerSolver(
      I_x,
      I_y,
      I_z,
      // @ts-ignore
      args.wx,
      // @ts-ignore
      args.wy,
      // @ts-ignore
      args.wz,
      // @ts-ignore
      args.dt,
      // @ts-ignore
      args.time
    )
  }, [args, I_x, I_y, I_z])

  useEffect(() => {
    if (!compareChartRef.current || !myDivRef.current || !args) return

    if (compareUPlotInst.current) compareUPlotInst.current.destroy()

    const isDark = theme === 'dark'
    const axisColor = isDark ? '#94A3B8' : '#475569'
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'
    
    // Premium neon theme-responsive strokes
    const strokeX = isDark ? '#FF2E93' : '#E11D48' // Rose / Neon Pink
    const strokeY = isDark ? '#00F0FF' : '#2563EB' // Cyan / Blue
    const strokeZ = isDark ? '#39FF14' : '#16A34A' // Lime Green / Green

    const opts: uPlot.Options = {
      width: compareChartRef.current.clientWidth || 300,
      height: Math.max(120, myDivRef.current.clientHeight - 48),
      cursor: {
        drag: { x: true, y: false }
      },
      scales: {
        x: { time: false },
        y: { range: [-100, 100] }
      },
      series: [
        {},
        {
          label: 'wx (rad/s)',
          stroke: strokeX,
          width: 1
        },
        {
          label: 'wy (rad/s)',
          stroke: strokeY,
          width: 1
        },
        {
          label: 'wz (rad/s)',
          stroke: strokeZ,
          width: 1
        }
      ],
      axes: [
        {
          stroke: axisColor,
          grid: { stroke: gridColor }
        },
        {
          stroke: axisColor,
          grid: { stroke: gridColor }
        }
      ]
    }

    // @ts-ignore
    compareUPlotInst.current = new uPlot(opts, chartData, compareChartRef.current)
  }, [theme, chartData, args])

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      if (compareUPlotInst.current && compareChartRef.current && myDivRef.current) {
        compareUPlotInst.current.setSize({
          width: compareChartRef.current.clientWidth,
          height: myDivRef.current.clientHeight - 48
        })
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      ref={myDivRef}
      className="flex-1 min-w-0 bg-[#121625]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-4 shadow-2xl flex flex-col h-full"
    >
      <div className="text-[10px] font-bold tracking-wider uppercase text-zinc-400 select-none pb-1.5 border-b border-white/5 mb-2">
        Theoretical Euler Model Plot
      </div>
      <div ref={compareChartRef} className="w-full flex-grow min-h-0"></div>
    </div>
  )
}
