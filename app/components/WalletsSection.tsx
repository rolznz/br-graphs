import { Breakdown } from "app/components/Breakdown";
import { Section } from "app/components/Section";
import { Tab } from "app/components/Tab";
import { TabGroup } from "app/components/TabGroup";
import { Trends } from "app/components/Trends";
import { graphData } from "lib/graphData";

const walletTabs = ["trends", "breakdown"] as const;

export function WalletsSection() {
  return (
    <Section title="User Wallets" className="bg-[#88A]">
      <TabGroup tabs={walletTabs} initialTab="trends">
        <Tab
          showUnknownWarning
          description="The below chart shows which wallets users made purchases with, and how user preferences have changed over time."
        >
          <Trends data={graphData.walletTimeTrendsData} />
        </Tab>
        <Tab
          showUnknownWarning
          description="The below chart shows the popularity of different wallets, based on how many purchases were made per wallet."
        >
          <Breakdown data={graphData.walletsBreakdownData} />
        </Tab>
      </TabGroup>
    </Section>
  );
}
