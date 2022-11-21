export function GraphCard({ children }: React.PropsWithChildren) {
  return (
    <div className="shadow-lg p-4 rounded-xl bg-zinc-100 h-full md:min-h-[65vh] max-md:min-h-[40vh]">
      {children}
    </div>
  );
}
