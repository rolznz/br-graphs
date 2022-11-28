import clsx from "clsx";

type GraphCardProps = {
  square?: boolean;
};

export function GraphCard({
  square,
  children,
}: React.PropsWithChildren<GraphCardProps>) {
  return (
    <div
      className={clsx(
        "shadow-lg p-4 rounded-xl relative h-[70vh] w-full",
        square ? "max-sm:h-[50vh] sm:max-w-[50vw]" : "max-sm:h-[70vh]"
      )}
    >
      {children}
    </div>
  );
}
