import { ExampleLineChart } from "app/components/ExampleLineChart";
import { ExamplePieChart } from "app/components/ExamplePieChart";
import "styles/globals.css";

export default function Page() {
  return (
    <>
      <ExampleLineChart />
      <ExamplePieChart />
    </>
  );
}
