"use client";

export function ViewStatisticsButton() {
  return (
    <button
      className="btn btn-accent"
      onClick={() =>
        document
          .getElementById("layout-children")
          ?.scrollIntoView({ behavior: "smooth" })
      }
    >
      View Statistics
    </button>
  );
}
