import { Graphs } from "app/components/Graphs";
import { WalletsSection } from "app/components/WalletsSection";
import "styles/globals.css";

export default function Page() {
  return (
    <>
      <WalletsSection />
      <div data-theme="cupcake">
        <Graphs />
      </div>
    </>
  );
}
