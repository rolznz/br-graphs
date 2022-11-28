import clsx from "clsx";

type SectionProps = {
  title: string;
  className: string;
};

export function Section({
  title,
  children,
  className,
}: React.PropsWithChildren<SectionProps>) {
  return (
    <div
      className={clsx(
        "min-h-screen flex flex-col items-center pb-8",
        className
      )}
    >
      <div className="hero">
        <div className="hero-content pt-16 pb-4 text-center">
          <div className="max-w-md">
            <h2 className="text-4xl text-primary-content font-bold tracking-wide">
              {title}
            </h2>
          </div>
        </div>
      </div>
      <div className="w-full px-4 flex flex-col items-center">{children}</div>
    </div>
  );
}
