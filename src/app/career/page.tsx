import { Navbar } from "@/components/Navbar";
import { SecondaryHero } from "@/components/SecondaryHero";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { OpenPositions } from "@/components/OpenPositions";

export const dynamic = 'force-dynamic';

async function getJobs() {
  try {
    const apiUrl = process.env.ADMIN_API_URL || "http://localhost:3001";
    const res = await fetch(`${apiUrl}/api/jobs?is_active=true`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      console.warn("API responded with an error, falling back to empty array.");
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error("Failed to fetch jobs from API, falling back to empty array:", error);
    return [];
  }
}

export default async function CareersPage() {
  const openRoles = await getJobs();

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background" id="careers">
        
        {/* ─── HERO SECTION ─── */}
        <SecondaryHero
          eyebrow="Join The Collective"
          title={
            <>
              Build The Future With<br />
              <span className="text-primary">Vibe Venture</span>
            </>
          }
          subtitle="We are a syndicate of elite engineers, designers, and strategists. We don't hire employees; we partner with relentless problem solvers."
          ctas={[{ text: "View Open Roles", href: "#open-roles" }]}
        />

        {/* ─── OPEN ROLES ─── */}
        <OpenPositions openRoles={openRoles} />



        <CTA />
      </main>
      <Footer />
    </>
  );
}
