import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { FORM_CONFIGS, getFormLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "For High School Students | SolveSprint™ In-Person Event",
  description:
    "SolveSprint gives high school students the opportunity to tackle real organizational problems, collaborate in teams, and pitch to professional judges."
};

const studentFaqs = [
  {
    question: "Do I need prior competition experience to participate?",
    answer: "No. SolveSprint is designed for high school students of all experience levels who are eager to collaborate, think creatively, and learn how to present ideas effectively."
  },
  {
    question: "Can I register by myself or do I need a complete team?",
    answer: "You can register either as part of a pre-formed team of high school classmates or individually. Individual registrants will be given the opportunity to connect with teammates during pre-event prep."
  },
  {
    question: "What should I bring on event day?",
    answer: "Bring a notebook or tablet/laptop for drafting ideas, presentation slides, or research, along with a positive attitude and willingness to present your team's ideas."
  },
  {
    question: "Does submitting the interest form guarantee a confirmed seat?",
    answer: "Submitting the student interest form registers your interest for upcoming events. Venue capacity and challenge seat confirmations are finalized when official event registration opens."
  },
  {
    question: "What do judges look for during presentations?",
    answer: "Judges evaluate originality, practical feasibility, research evidence, clarity of explanation, and quality of pitch presentation based on explicit event rubrics."
  }
] as const;

export default function ForStudentsPage() {
  const studentForm = FORM_CONFIGS.student;
  const formLink = getFormLink("student");

  return (
    <div className="bg-[#FFF9F0] min-h-screen text-slate-900">
      {/* 1. Image-led Editorial Hero */}
      <section className="relative border-b border-slate-900/10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">
                FOR HIGH SCHOOL STUDENTS
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Real Experience Before College
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl">
                SolveSprint brings high school students together for an in-person problem-solving competition. Tackle real challenges provided by local organizations, build practical solutions, and pitch your ideas to professional judges.
              </p>

              <div className="mt-8">
                {formLink.isAvailable ? (
                  <a
                    href={formLink.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-orange-600 px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-orange-700 shadow-sm"
                  >
                    {studentForm.buttonText} (Google Form) ↗
                  </a>
                ) : (
                  <div className="inline-flex flex-col items-start gap-2">
                    <button
                      disabled
                      className="cursor-not-allowed rounded-xl bg-slate-300 px-6 py-3 text-[15px] font-semibold text-slate-600"
                    >
                      Student Interest Form Coming Soon
                    </button>
                    <p className="text-sm text-slate-500">Form links will be enabled as soon as event date details are finalized.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-slate-900/10 shadow-lg aspect-[4/3]">
                <Image
                  src="/images/home/students-building.png"
                  alt="High school student team brainstorming and collaborating"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What You Will Actually Do */}
      <section className="py-20 lg:py-28 border-b border-slate-900/10 bg-[#FFFDF9]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">HANDS-ON INNOVATION</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              What You Will Actually Do
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              SolveSprint is hands-on team innovation—not online lectures or passive attendance.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div className="border-t-2 border-orange-500 pt-6">
              <span className="text-sm font-mono font-bold text-orange-600">01</span>
              <h3 className="mt-2 text-xl font-bold text-slate-900">Analyze a Real Prompt</h3>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Read through an authentic operational or strategic challenge supplied by a local business, startup, or nonprofit.
              </p>
            </div>
            <div className="border-t-2 border-orange-500 pt-6">
              <span className="text-sm font-mono font-bold text-orange-600">02</span>
              <h3 className="mt-2 text-xl font-bold text-slate-900">Collaborate & Prototype</h3>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Brainstorm with your teammates, conduct targeted research, and build slide decks or visual prototypes.
              </p>
            </div>
            <div className="border-t-2 border-orange-500 pt-6">
              <span className="text-sm font-mono font-bold text-orange-600">03</span>
              <h3 className="mt-2 text-xl font-bold text-slate-900">Pitch to Professional Judges</h3>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Present your team&apos;s recommendations live, answer judge questions, and receive constructive professional feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Example Challenge Categories */}
      <section className="py-20 lg:py-28 border-b border-slate-900/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">CHALLENGE FIELDS</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Example Challenge Categories
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Challenges are structured across multiple disciplines so every student can contribute their strengths.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-l-2 border-slate-900/20 pl-6">
              <h3 className="text-xl font-bold text-slate-900">Business & Strategy</h3>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Market analysis, business model design, product launch planning, and operational strategy.
              </p>
            </div>
            <div className="border-l-2 border-slate-900/20 pl-6">
              <h3 className="text-xl font-bold text-slate-900">Technology & Product</h3>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Software concepts, app mockups, AI integration ideas, and user experience design.
              </p>
            </div>
            <div className="border-l-2 border-slate-900/20 pl-6">
              <h3 className="text-xl font-bold text-slate-900">Marketing & Outreach</h3>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Brand campaigns, social media strategies, audience messaging, and community outreach.
              </p>
            </div>
            <div className="border-l-2 border-slate-900/20 pl-6">
              <h3 className="text-xl font-bold text-slate-900">Sustainability & Impact</h3>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Environmental sustainability initiatives, civic impact projects, and nonprofit growth ideas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What You Gain From Participating */}
      <section className="py-20 lg:py-28 border-b border-slate-900/10 bg-[#FFFDF9]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">STUDENT BENEFITS</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              What You Gain From Participating
            </h2>
          </div>

          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            <div className="flex items-start gap-4">
              <span className="h-3 w-3 rounded-full bg-orange-500 mt-2 shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Real Project Portfolio Material</h3>
                <p className="mt-2 text-base text-slate-600 leading-relaxed">
                  Walk away with a documented, practical solution you can discuss in college applications or interviews.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="h-3 w-3 rounded-full bg-orange-500 mt-2 shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Direct Professional Feedback</h3>
                <p className="mt-2 text-base text-slate-600 leading-relaxed">
                  Hear real insight from industry professionals, local business leaders, and judges who review your work.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="h-3 w-3 rounded-full bg-orange-500 mt-2 shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Team Collaboration Skills</h3>
                <p className="mt-2 text-base text-slate-600 leading-relaxed">
                  Gain hands-on experience delegating responsibilities, working under event deadlines, and refining pitch decks.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="h-3 w-3 rounded-full bg-orange-500 mt-2 shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Certificates & Recognition</h3>
                <p className="mt-2 text-base text-slate-600 leading-relaxed">
                  Receive official event participation certificates and category awards for outstanding work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="py-20 lg:py-28 border-b border-slate-900/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-600">QUESTIONS & ANSWERS</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-14 divide-y divide-slate-900/15 max-w-4xl">
            {studentFaqs.map((faq) => (
              <div key={faq.question} className="py-8 first:pt-0 last:pb-0">
                <h3 className="text-xl font-bold text-slate-900">{faq.question}</h3>
                <p className="mt-3 text-base lg:text-lg text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Form CTA */}
      <section className="py-20 lg:py-28 bg-[#101828] text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase text-orange-400">READY TO JOIN?</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Student Interest Registration
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
              Submit your interest to receive announcements when event dates, challenge briefs, and team registration open.
            </p>

            <div className="mt-10">
              {formLink.isAvailable ? (
                <a
                  href={formLink.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-orange-600 px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-orange-700 shadow-sm"
                >
                  {studentForm.buttonText} (Google Form) ↗
                </a>
              ) : (
                <div className="inline-flex flex-col items-start gap-2">
                  <button
                    disabled
                    className="cursor-not-allowed rounded-xl bg-slate-700 px-6 py-3 text-[15px] font-semibold text-slate-400"
                  >
                    Student Interest Form Coming Soon
                  </button>
                  <p className="text-sm text-slate-400">{studentForm.privacyNote}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
