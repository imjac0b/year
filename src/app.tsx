import { computed, signal } from "@preact/signals";
import { cn } from "./lib/utils";

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
  const year = computed(() => new Date().getFullYear());
  const daysInYear = computed(() => (isLeapYear(year.value) ? 366 : 365));
  const daysPassed = computed(() => getDayOfYear(new Date()));
  const daysLeft = computed(() => daysInYear.value - daysPassed.value);

  return (
    <main className="flex flex-col items-center justify-center h-screen p-8 gap-8">
      <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-8">
        {Array.from({ length: daysInYear.value }, (_, i) => (
          <div
            key={i}
            className={cn(
              "w-1 h-1 rounded-full",
              i < daysPassed.value ? "bg-white" : "bg-muted"
            )}
          ></div>
        ))}
      </div>
      <div className={"flex justify-between w-full"}>
        <p>{year}</p>
        <button onClick={() => (showDaysPassed.value = !showDaysPassed.value)}>
          <span>
            {showDaysPassed.value ? daysLeft.value : daysPassed.value}
          </span>
          <span className="text-muted-foreground">
            {" "}
            days {showDaysPassed.value ? "left" : "passed"}
          </span>
        </button>
      </div>
    </main>
  );
}
