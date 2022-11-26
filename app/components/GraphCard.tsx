import clsx from "clsx";

type GraphCardProps = {
  shrinkOnMobile?: boolean;
};

export function GraphCard({
  shrinkOnMobile,
  children,
}: React.PropsWithChildren<GraphCardProps>) {
  return (
    <div
      className={clsx(
        "shadow-lg p-4 rounded-xl bg-primary relative h-[70vh]",
        shrinkOnMobile ? "max-sm:h-[40vh]" : "max-sm:h-[90vh]"
      )}
    >
      {children}
    </div>
  );
}
