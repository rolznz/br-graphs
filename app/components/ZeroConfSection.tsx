import { Breakdown } from "app/components/Breakdown";
import { Section } from "app/components/Section";
import { Tab } from "app/components/Tab";
import { TabGroup } from "app/components/TabGroup";
import { Trends } from "app/components/Trends";
import { graphData } from "lib/graphData";

const walletTabs = ["trends", "breakdown"] as const;

export function ZeroConfSection() {
  return (
    <Section title="Zero Conf vs Onchain Transactions" theme="valentine">
      <TabGroup tabs={walletTabs} initialTab="trends">
        <Tab description="The below chart shows which confirmation type was used for purchases, and how confirmation type usage has changed over time.">
          <Trends data={graphData.walletTimeTrendsData} />
        </Tab>
        <Tab description="The below chart shows how often zero-conf was used for purchases, compared to on-chain transactions">
          <Breakdown data={graphData.walletsBreakdownData} />
        </Tab>
      </TabGroup>
    </Section>
  );
}
