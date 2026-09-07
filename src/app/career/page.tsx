import { Navbar } from "@/components/Navbar";
import { SecondaryHero } from "@/components/SecondaryHero";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { OpenPositions } from "@/components/OpenPositions";
import { TrackApplication } from "@/components/TrackApplication";
import { jobs } from "@/data/jobs";

export default function CareersPage() {
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
        />

        {/* ─── OPEN ROLES ─── */}
        <OpenPositions openRoles={jobs} />

        {/* ─── TRACK APPLICATION ─── */}
        <TrackApplication />

        <CTA />
      </main>
      <Footer />
    </>
  );
}
