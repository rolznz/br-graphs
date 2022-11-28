import { Breakdown } from "app/components/Breakdown";
import { Section } from "app/components/Section";
import { Tab } from "app/components/Tab";
import { TabGroup } from "app/components/TabGroup";
import { Trends } from "app/components/Trends";
import { graphData } from "lib/graphData";

const walletTabs = ["trends", "breakdown"] as const;

export function PaymentMethodsSection() {
  return (
    <Section title="Payment Methods" className="bg-[#A8A]">
      <TabGroup tabs={walletTabs} initialTab="trends">
        <Tab description="The below chart shows which currency users made purchases with, and how user preferences have changed over time.">
          <Trends data={graphData.paymentMethodTrendsData} />
        </Tab>
        <Tab description="The below chart shows the popularity of different currencies used to make purchases.">
          <Breakdown data={graphData.paymentMethodsBreakdownData} />
        </Tab>
      </TabGroup>
    </Section>
  );
}
