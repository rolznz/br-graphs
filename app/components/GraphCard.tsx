export function GraphCard({ children }: React.PropsWithChildren) {
  return (
    <div className="shadow-lg p-4 rounded-xl bg-zinc-100 h-full md:min-h-[65vh] max-md:min-h-[40vh] relative">
      <div
        className="absolute w-full h-full p-4 -z-1 flex top-0 left-0"
        style={{
          animation: "fadeOut 3s forwards",
        }}
      >
        <div className="flex-1 bg-slate-300 rounded-xl" />
      </div>
      {children}
    </div>
  );
}
