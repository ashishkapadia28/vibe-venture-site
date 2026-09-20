export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-Time" | "Contract" | "Internship";
  experience: "Fresher" | "Mid-Level" | "Experienced";
}

const ADMIN_API_URL = process.env.ADMIN_API_URL || "http://localhost:3001";

/**
 * Job postings are now managed through the admin panel — this replaced the
 * old static jobs.json. Cached briefly (60s) via Next's fetch revalidation
 * so new/edited postings show up without a redeploy, without hitting the
 * backend on every single request either.
 */
export async function getJobs(): Promise<Job[]> {
  try {
    const res = await fetch(`${ADMIN_API_URL}/api/jobs`, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.error(`Failed to fetch jobs: ${res.status}`);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

export async function getJobById(id: string): Promise<Job | undefined> {
  const jobs = await getJobs();
  return jobs.find((job) => job.id === id);
}
