import { computed, signal } from "@preact/signals";
import { cn } from "./lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";

const isLeapYear = (year: number): boolean => {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};

const getDayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

const showDaysPassed = signal(false);

export function App() {
  const year = computed(() => {
    const year = new Date().getFullYear();
    document.title = `${year} - Year`;
    return year;
  });
  const daysInYear = computed(() => (isLeapYear(year.value) ? 366 : 365));
  const daysPassed = computed(() => getDayOfYear(new Date()));
  const daysLeft = computed(() => daysInYear.value - daysPassed.value);

  return (
    <TooltipProvider>
      <main className="flex flex-col items-center justify-center h-screen p-8 gap-8">
        <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-8">
          {Array.from({ length: daysInYear.value }, (_, i) => (
            <Tooltip key={i}>
              <TooltipTrigger>
                <div
                  className={cn(
                    "w-1 h-1 rounded-full",
                    i < daysPassed.value ? "bg-white" : "bg-muted"
                  )}
                ></div>
              </TooltipTrigger>
              <TooltipContent>
                {new Intl.DateTimeFormat("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                }).format(new Date(year.value, 0, i + 1))}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <div className={"flex justify-between w-full"}>
          <p>{year}</p>
          <button
            onClick={() => (showDaysPassed.value = !showDaysPassed.value)}
          >
            <span>
              {showDaysPassed.value ? daysPassed.value : daysLeft.value}
            </span>
            <span className="text-muted-foreground">
              {" "}
              days {showDaysPassed.value ? "passed" : "left"}
            </span>
          </button>
        </div>
      </main>
    </TooltipProvider>
  );
}
