// import { Graphs } from "app/components/Graphs";
import { PaymentMethodsSection } from "app/components/PaymentMethodsSection";
import { WalletsSection } from "app/components/WalletsSection";
import { ZeroConfSection } from "app/components/ZeroConfSection";
import "styles/globals.css";

export default function Page() {
  return (
    <>
      <WalletsSection />
      <PaymentMethodsSection />
      <ZeroConfSection />
    </>
  );
}
