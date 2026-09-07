import rawData from "./jobs.json";

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
}

/**
 * jobs.json is the actual data source — plain, serializable content with no
 * code in it, so it's a straightforward drop-in swap for a real admin API
 * response later (the same pattern used by services.json/ts).
 */
export const jobs: Job[] = rawData.jobs;
