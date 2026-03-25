import {
  useState,
  useRef,
  useCallback,
  KeyboardEvent,
  MouseEvent,
  useEffect,
} from "react";

const SLIDER_MAX = 100;
const SLIDER_MIN = 0;

interface SliderWithTooltipProps {
  defaultValue?: [number];
  max?: number;
  min?: number;
  step?: number;
  onValueChange?: (values: [number]) => void;
}

function SliderWithTooltip({
  defaultValue = [75],
  max = SLIDER_MAX,
  min = SLIDER_MIN,
  step = 1,
  onValueChange,
}: SliderWithTooltipProps) {
  const [value, setValue] = useState<number>(defaultValue[0]);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const percent = ((value - min) / (max - min)) * 100;

  const updateValue = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const ratio = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width),
      );
      const raw = min + ratio * (max - min);
      const stepped = Math.round(raw / step) * step;
      const clamped = Math.max(min, Math.min(max, stepped));
      setValue(clamped);
      onValueChange?.([clamped]);
    },
    [min, max, step, onValueChange],
  );

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    updateValue(e.clientX);

    const onMove = (e: globalThis.MouseEvent) =>
      isDragging.current && updateValue(e.clientX);
    const onUp = () => {
      isDragging.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    let next = value;
    if (e.key === "ArrowRight" || e.key === "ArrowUp")
      next = Math.min(max, value + step);
    if (e.key === "ArrowLeft" || e.key === "ArrowDown")
      next = Math.max(min, value - step);
    if (next !== value) {
      setValue(next);
      onValueChange?.([next]);
    }
  };

  return (
    <div className='relative w-full pt-1.5 pb-2'>
      {/* Track */}
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        className='relative h-1.5 rounded-full bg-slate-200 cursor-pointer select-none'
      >
        {/* Fill */}
        <div
          className='absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#235789] to-[#235789]'
          style={{ width: `${percent}%`, transition: "width 0.05s" }}
        />

        {/* Thumb */}
        <div
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className='absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-[#235789] cursor-grab outline-none z-10 shadow-md focus:ring-4 focus:ring-indigo-200'
          style={{ left: `${percent}%` }}
        >
          {/* Tooltip */}
          <div className='absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 bg-[#235789] text-white text-xs font-semibold rounded px-2 py-0.5 whitespace-nowrap pointer-events-none shadow-lg tracking-wide'>
            {value} miles
            {/* Arrow */}
            <div className='absolute top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-indigo-600' />
          </div>
        </div>
      </div>
    </div>
  );
}

interface SearchRangeProps {
  radiusValue: number[];
  setRadiusValue: (value: number[]) => void;
}

export default function SearchRange({
  radiusValue,
  setRadiusValue,
}: SearchRangeProps) {
  const [radius, setRadius] = useState<[number]>([75]);

  useEffect(() => {
    setRadiusValue([radius[0]]);
  }, [radius, setRadiusValue]);

  return (
    <div className='flex flex-col items-center justify-center bg-transparent font-sans'>
      <div className='bg-transparent rounded-2xl p-1 w-full'>
        <SliderWithTooltip
          defaultValue={[75]}
          max={500}
          step={1}
          onValueChange={(values) => setRadius([values[0]])}
        />

        <div className='flex justify-between mt-1 text-xs text-slate-400'>
          <span>0 miles</span>
          <span>500 miles</span>
        </div>
      </div>
    </div>
  );
}
