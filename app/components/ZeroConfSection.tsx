import { Breakdown } from "app/components/Breakdown";
import { Section } from "app/components/Section";
import { Tab } from "app/components/Tab";
import { TabGroup } from "app/components/TabGroup";
import { Trends } from "app/components/Trends";
import { graphData } from "lib/graphData";

const walletTabs = ["trends", "breakdown"] as const;

export function ZeroConfSection() {
  return (
    <Section title="Zero Conf vs On-Chain Transactions" className="bg-zinc-400">
      <TabGroup tabs={walletTabs} initialTab="trends">
        <Tab description="The below chart shows how purchases were confirmed, and how confirmation type usage has changed over time.">
          <Trends data={graphData.zeroConfTrendsData} />
        </Tab>
        <Tab description="The below chart shows how often zero-conf was used for purchases, compared to on-chain confirmation.">
          <Breakdown data={graphData.zeroConfBreakdownData} />
        </Tab>
      </TabGroup>
    </Section>
  );
}
