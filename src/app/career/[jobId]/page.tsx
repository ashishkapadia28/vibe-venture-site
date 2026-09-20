import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JobApplicationForm } from "@/components/JobApplicationForm";
import { getJobById } from "@/data/jobs";
import { ArrowLeft, Briefcase, MapPin, Clock, GraduationCap } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Job postings are managed through the admin panel now, so the set of valid
// jobId values isn't known at build time — this page renders per-request
// (with the 60s fetch cache in getJobs) instead of being statically generated.

export async function generateMetadata({ params }: { params: Promise<{ jobId: string }> }): Promise<Metadata> {
  const { jobId } = await params;
  const job = await getJobById(jobId);
  if (!job) return { title: "Apply | Vibe Venture" };

  return {
    title: `Apply — ${job.title} | Vibe Venture`,
    description: `Apply for the ${job.title} position at Vibe Venture.`,
  };
}

export default async function JobApplicationPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  const job = await getJobById(jobId);

  if (!job) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background" id="job-application">
        <section className="pt-32 pb-24 relative overflow-hidden">
          {/* Background element */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute bottom-0 left-0 w-150 h-150 bg-primary/5 rounded-full blur-[140px] -translate-x-1/2 translate-y-1/3" />
          </div>

          <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
            <AnimatedSection>
              <Link
                href="/career#open-roles"
                className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors mb-10"
              >
                <ArrowLeft size={16} />
                Back to Open Positions
              </Link>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Left Column: Job Context */}
              <div>
                <AnimatedSection>
                  <div className="mb-12">
                    <SectionHeader
                      badge="APPLY NOW"
                      title={<>Join Us As A <span className="text-primary">{job.title}</span></>}
                      subtitle="We're excited to see what you can bring to the team. Fill out the form and we'll get back to you shortly."
                    />
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center text-primary shrink-0 mr-2 mt-1">
                        <Briefcase size={32} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold font-heading mb-1 text-foreground">Department</h4>
                        <p className="text-muted-foreground text-sm">{job.department}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center text-primary shrink-0 mr-2 mt-1">
                        <MapPin size={32} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold font-heading mb-1 text-foreground">Location</h4>
                        <p className="text-muted-foreground text-sm">{job.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center text-primary shrink-0 mr-2 mt-1">
                        <Clock size={32} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold font-heading mb-1 text-foreground">Job Type</h4>
                        <p className="text-muted-foreground text-sm">{job.type}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center text-primary shrink-0 mr-2 mt-1">
                        <GraduationCap size={32} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold font-heading mb-1 text-foreground">Experience</h4>
                        <p className="text-muted-foreground text-sm">{job.experience}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* Right Column: Form */}
              <div className="relative">
                <AnimatedSection delay={0.2}>
                  <div className="bg-white shadow-xl border border-border/50 p-8 md:p-10 rounded-2xl relative z-10">
                    <JobApplicationForm job={job} />
                  </div>

                  {/* Decorative elements behind form */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl z-0" />
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-[50px] z-0" />
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
