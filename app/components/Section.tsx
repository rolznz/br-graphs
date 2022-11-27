type SectionProps = {
  theme: string;
  title: string;
};

export function Section({
  theme,
  title,
  children,
}: React.PropsWithChildren<SectionProps>) {
  return (
    <div
      data-theme={theme}
      className="bg-gradient-to-b from-base-100 to-base-300 min-h-screen flex flex-col items-center pb-8"
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
