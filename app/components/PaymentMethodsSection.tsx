import { Breakdown } from "app/components/Breakdown";
import { Section } from "app/components/Section";
import { Tab } from "app/components/Tab";
import { TabGroup } from "app/components/TabGroup";
import { Trends } from "app/components/Trends";
import { graphsData } from "lib/graphsData";

const walletTabs = ["trends", "breakdown"] as const;

export function PaymentMethodsSection() {
  return (
    <Section title="Payment Methods" theme="emerald">
      <TabGroup tabs={walletTabs} initialTab="trends">
        <Tab description="The below chart shows which currency users made purchases with, and how user preferences have changed over time.">
          <Trends data={graphsData.paymentMethodTrendsData} />
        </Tab>
        <Tab description="The below chart shows the popularity of different currencies, based on how many purchases were made per currency.">
          <Breakdown data={graphsData.paymentMethodsBreakdownData} />
        </Tab>
      </TabGroup>
    </Section>
  );
}
