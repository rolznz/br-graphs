import fs from "fs";
import { SampleData } from "types/SampleData";
export const sampleData = JSON.parse(
  fs
    .readFileSync(
      `data/sample-data${process.env.SAMPLE_DATA_SUFFIX || ""}.json`
    )
    .toString()
) as SampleData;
