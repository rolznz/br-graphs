import { DraggableComponent } from "app/components/DragabbleComponent";
import { GraphCard } from "app/components/GraphCard";
import { LineChart } from "app/components/LineChart";
import { PieChart } from "app/components/PieChart";
import { graphsData } from "lib/graphsData";

export function SandboxGraphs() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="md:col-span-3 h-full relative">
          <div
            className="absolute z-10 p-4"
            style={{
              animation: "fadeIn 3s forwards",
            }}
          >
            <DraggableComponent>
              <div className="shadow-lg rounded-xl cursor-pointer">
                <div className="rounded-t-xl px-4 py-2 -z-10 w-full flex justify-center bg-white">
                  <p className="font-sans pointer-events-none">
                    Wallet Breakdown
                  </p>
                </div>
                <div
                  style={{
                    width: "min(60vw, 60vh, 400px)",
                    height: "min(60vw, 60vh, 400px)",
                    background: "#0004",
                  }}
                  className="p-4 rounded-b-xl"
                >
                  <PieChart
                    data={graphsData.walletsBreakdownPieData}
                    options={{
                      ...graphsData.walletsBreakdownPieOptions,
                      plugins: {
                        title: {
                          display: false,
                        },
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </DraggableComponent>
          </div>
          <GraphCard>
            <LineChart
              data={graphsData.walletTrendsData}
              options={{
                ...graphsData.walletTrendsOptions,
                plugins: {
                  legend: {
                    display: true,
                  },
                },
              }}
            />
          </GraphCard>
        </div>
        <div className="md:col-span-2 h-full">
          <GraphCard>
            <LineChart
              data={graphsData.paymentMethodTrendsData}
              options={graphsData.paymentMethodTrendsOptions}
            />
          </GraphCard>
        </div>
        <div className="col-span-1 h-full">
          <GraphCard>
            <PieChart
              data={graphsData.zeroConfBreakdownData}
              options={graphsData.zeroConfBreakdownOptions}
              formatPercent
            />
          </GraphCard>
        </div>
      </div>
    </>
  );
}
