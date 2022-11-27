import { Breakdown } from "app/components/Breakdown";
import { Section } from "app/components/Section";
import { Tab } from "app/components/Tab";
import { TabGroup } from "app/components/TabGroup";
import { Trends } from "app/components/Trends";
import { graphData } from "lib/graphData";

const walletTabs = ["trends", "breakdown"] as const;

export function PaymentMethodsSection() {
  return (
    <Section title="Payment Methods" theme="emerald">
      <TabGroup tabs={walletTabs} initialTab="trends">
        <Tab description="The below chart shows which currency users made purchases with, and how user preferences have changed over time.">
          <Trends data={graphData.paymentMethodTrendsData} />
        </Tab>
        <Tab description="The below chart shows the popularity of different currencies, based on how many purchases were made per currency.">
          <Breakdown data={graphData.paymentMethodsBreakdownData} />
        </Tab>
      </TabGroup>
    </Section>
  );
}
