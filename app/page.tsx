"use client";
import Image from "next/image";
import grad from "../public/artistic-blurry-colorful-wallpaper-background.jpg";
import { ArrowUp, CircleCheck, LoaderCircle, Sun, Moon, FolderPlus, Link2, Rocket, LogIn, GraduationCap, Code2, Briefcase, Presentation } from "lucide-react";
import auranetLogo from "../public/signatureLogoSimple.jpg";
import Link from "next/link";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import glasspanebg from "../public/blurglasspane.jpg";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Home() {
  const { data: session } = useSession();
  const [signinLoader, setSinginLoader] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // Problems & Solutions accordion state
  const [openProblem, setOpenProblem] = useState<number | null>(null);

  const problems = [
    {
      question: "Why do my free-tier servers go to sleep?",
      answer:
        "Free-tier hosting platforms like Runway, Render, Railway, and Vercel automatically spin down your servers after just 15 minutes of inactivity to save resources.",
    },
    {
      question:
        "What happens when someone visits my project after it's been sleeping?",
      answer: `When someone visits your project after it's been sleeping, they face:\n1. Cold starts taking 30-60 seconds\n2. Poor user experience with loading delays\n3. Missed opportunities when recruiters or clients visit\n4. Professional embarrassment from slow responses`,
    },
    {
      question: "How does LazyPing solve this problem?",
      answer: `LazyPing solves this with intelligent ping scheduling:\n1. Random Selection: Picks one of your 5 endpoints randomly every 10 minutes\n2. Smart Timing: Stays well under the 15-minute sleep threshold\n3. Bot Detection Avoidance: Random intervals and endpoints prevent triggering security systems\n4. Zero Configuration: Just add your endpoints and forget about it\n5. Free Forever: No credit cards, no hidden fees, no premium tiers`,
    },
  ];

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div className="w-full bg-background font-['Poppins'] relative overflow-x-hidden">
      {/* Navbar is here */}
      <div className="w-full flex justify-center">
        <div className="fixed top-0 w-2xl p-[10px] z-[5] max-sm:w-full max-sm:p-2">
          <div className="flex w-full- p-[10px] rounded-[10px] justify-between items-center bg-card backdrop-blur-[40px] border-2 border-border max-sm:p-2 max-sm:rounded-[6px]">
            <Link href="/">
              <Image
                src={auranetLogo}
                className="h-[45px] w-[45px] object-cover object-center rounded-[5px] border border-border p-[5px] bg-card max-sm:h-[32px] max-sm:w-[32px]"
                alt=""
              />
            </Link>

            <div className="flex items-center gap-[10px] max-sm:gap-[4px]">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="bg-card rounded-[10px] transition-all duration-[0.3s] h-[45px] w-[45px] flex items-center justify-center border border-border text-foreground hover:scale-[0.9] active:scale-[0.94] hover:cursor-pointer max-sm:h-[32px] max-sm:w-[32px]"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </Button>

              {session && (
                <Link href="/dashboard">
                  <Button className="bg-card p-[10px_15px] text-[15px] rounded-[6px] border border-border transition-all duration-[0.3s] h-[45px] text-foreground hover:bg-accent hover:border-2 hover:border-accent-foreground cursor-pointer max-sm:h-[32px] max-sm:text-[12px] max-sm:px-2">
                    Dashboard
                  </Button>
                </Link>
              )}
              {!session && (
                <Button
                  loading={signinLoader}
                  onClick={() => {
                    setSinginLoader(true);
                    signIn("google", { callbackUrl: "/dashboard" });
                  }}
                  className="bg-card p-[10px_15px] text-[15px] rounded-[6px] border border-border transition-all duration-[0.3s] h-[45px] text-foreground hover:bg-accent hover:border-2 hover:border-accent-foreground cursor-pointer max-sm:h-[32px] max-sm:text-[12px] max-sm:px-2"
                >
                  Sign in
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Image
        className="absolute z-[-1] top-0 left-0 h-screen w-screen invert max-sm:h-[100vh] max-sm:w-[100vw]"
        src={grad}
        alt=""
      />
      <Image
        className="absolute top-0 left-0 w-[100%] h-[100vh] object-cover opacity-[0.1] max-sm:h-[100vh] max-sm:w-[100vw]"
        src={glasspanebg}
        alt=""
        unoptimized
      />

      <div className="flex flex-col gap-[10px] min-h-screen justify-center mx-auto items-center max-w-[700px] relative px-[10px] max-sm:max-w-full max-sm:px-2 max-sm:h-auto">
        <h1 className="text-6xl whitespace-nowrap mt-20 uppercase font-[600] text-center leading-[1.2em] max-sm:text-3xl max-sm:mt-8 max-sm:whitespace-normal">
          Keep Your Free-Tier Servers Alive
        </h1>
        <p className="opacity-[0.9] text-center my-10 max-w-[600px] mx-auto max-sm:text-base max-sm:my-4 max-sm:max-w-full">
          Stop your Runway, Render, and other free-tier deployments from going
          to sleep after 15 minutes of inactivity. LazyPing sends smart, random
          requests to keep your servers warm without triggering bot detection.
        </p>

        {session && (
          <Link href="/dashboard">
            <Button className="group text-[28px] rounded-[40px] bg-primary text-primary-foreground p-[5px_20px] h-[50px] transition-all duration-[0.2s] mt-[20px] flex text-center items-center gap-[0px] min-w-[100px] hover:scale-105 max-sm:text-base max-sm:h-[38px] max-sm:p-[4px_10px] max-sm:mt-4">
              Dashboard
              <ArrowUp className="pl-[6px] transition-all duration-[0.3s] w-[0px] group-hover:w-[30px] group-hover:h-[30px] group-hover:rotate-[45deg] group-hover:scale-200 group-hover:pb-1 group-hover:pl-1 max-sm:group-hover:w-[18px] max-sm:group-hover:h-[18px]" />
            </Button>
          </Link>
        )}
        {signinLoader && (
          <div className="flex items-center justify-center text-[28px] rounded-[40px] bg-primary text-primary-foreground p-[5px_20px] h-[50px] transition-all duration-[0.2s] mt-[20px] text-center gap-[0px] min-w-[100px] max-sm:text-base max-sm:h-[38px] max-sm:p-[4px_10px] max-sm:mt-4">
            <LoaderCircle className="animate-spin" />
          </div>
        )}
        {!session && !signinLoader && (
          <Button
            onClick={() => {
              setSinginLoader(true);
              signIn("google", { callbackUrl: "/dashboard" });
            }}
            className="group text-[28px] rounded-[40px] bg-primary text-primary-foreground p-[5px_20px] h-[50px] transition-all duration-[0.2s] mt-[20px] flex text-center items-center gap-[0px] min-w-[100px] hover:cursor-pointer hover:scale-105 max-sm:text-base max-sm:h-[38px] max-sm:p-[4px_10px] max-sm:mt-4"
          >
            Activate
            <ArrowUp className="pl-[6px] transition-all duration-[0.3s] w-[0px] group-hover:w-[30px] group-hover:h-[30px] group-hover:rotate-[45deg] group-hover:scale-200 group-hover:pb-1 group-hover:pl-1 max-sm:group-hover:w-[18px] max-sm:group-hover:h-[18px]" />
          </Button>
        )}
      </div>

      <div className="w-full h-[100px] bg-gradient-to-t backdrop-blur-2xl from-white/30 dark:from-black/30 to-transparent max-sm:h-[40px]" />

      <div className="mt-[30px] flex flex-col gap-[80px] max-sm:gap-[36px] max-sm:mt-4">
        <div className="flex flex-col gap-[10px] w-full mb-[40px] pt-[30px]  items-center max-sm:mb-[16px] max-sm:pt-[10px]">
          <h1 className="text-[35px] font-[Inter] mx-auto mb-6 max-sm:text-xl max-sm:mb-2">Problems & Solutions</h1>
          <div className="w-full max-w-2xl flex flex-col gap-4 px-2 max-sm:max-w-full max-sm:px-1">
            {problems.map((item, idx) => (
              <div
                key={idx}
                className="bg-card rounded-lg p-2 cursor-pointer items-center flex justify-center mx-3 flex-col transition-all duration-200"
              >
                <button
                  className="w-full flex justify-between items-center text-left font-semibold text-sm focus:outline-none"
                  onClick={() =>
                    setOpenProblem(openProblem === idx ? null : idx)
                  }
                  aria-expanded={openProblem === idx}
                >
                  <span>{item.question}</span>
                  <span className="ml-2">
                    {openProblem === idx ? (
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 sm:text-base text-sm font-light opacity-80 ml-2 mt-4 ${
                    openProblem === idx ? "max-h-full" : "max-h-0"
                  }`}
                >
                  {openProblem === idx && <div>{item.answer}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center flex-col min-w-[300px] w-full max-sm:min-w-0">
          <h1 className="text-[45px] font-[Inter] text-center mb-8 max-sm:text-2xl max-sm:mb-3">How to use?</h1>
          <div className="relative flex flex-col items-center w-full max-w-xl mx- max-sm:max-w-full">
            <div className="absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-1 bg-gradient-to-b from-primary/60 to-accent/40 max-sm:hidden" />
            {[
              {
                title: 'Sign up with Google',
                desc: 'No credit card required',
                icon: <LogIn className="ml-3 text-primary p-1 border border-border" size={36} />, 
              },
              {
                title: 'Create up to 10 projects',
                desc: 'Give each project a memorable name, add optional descriptions, each gets a default thumbnail',
                icon: <FolderPlus className=" ml-3 text-primary  p-1 border border-border" size={36} />, 
              },
              {
                title: 'Add your API endpoints',
                desc: 'Up to 5 endpoints per project. Just paste your Runway/Render URLs. No complex configuration needed.',
                icon: <Link2 className=" ml-3 text-primary p-1 border border-border" size={36} />, 
              },
              {
                title: 'Activate and forget about it!',
                desc: 'LazyPing automatically starts pinging. Your servers stay warm 24/7. Monitor uptime in your dashboard.',
                icon: <Rocket className=" ml-3 text-primary p-1 border border-border" size={36} />, 
              },
            ].map((step, idx, arr) => (
              <div key={idx} className="relative flex items-center w-full">
              
                <div className="flex flex-col items-center mr-4">
                  <div className="z-10">{step.icon}</div>
                  {idx !== arr.length - 1 && (
                    <div className=" ml-3 w-1 h-8 bg-gradient-to-b from-primary/60 to-accent/40" />
                  )}
            </div>
                <div className="bg-card  rounded-lg shadow sm:p-4 p-2 my-4 mr-3 flex-1">
                  <div className="font-bold text-xl mb-1">Step {idx + 1}:</div>
                  <div className="sm:text-lg text-sm font-semibold mb-1">{step.title}</div>
                  <div className="sm:text-sm text-xs opacity-80">{step.desc}</div>
            </div>
            </div>
            ))}
            </div>
        </div>

        <div className="flex gap-[20px] p-[10px_20px] flex-wrap max-[700px]:flex-col-reverse max-sm:gap-2 max-sm:p-2">
          <div className="flex-[3_3_0%] min-w-[350px] my-auto flex flex-col items-center max-w-[100vw] max-sm:min-w-0 max-sm:p-0">
            <h1 className="text-[45px] font-[Inter] text-center mb-8 max-sm:text-2xl max-sm:mb-3">Smart Ping Strategy</h1>
            <div className="w-full flex flex-col items-center max-sm:px-1">
              <div className="flex flex-row items-center justify-center w-full gap-6 max-w-[1200px] min-h-[180px] min-w-[60vw] max-lg:flex-col max-sm:gap-2 max-sm:min-w-0 max-sm:min-h-0">
               
                <div className="flex flex-col items-center text-center min-w-[140px]">
                  <FolderPlus className="text-primary p-2 border border-border mb-2" size={56} />
                  <span className="font-semibold text-lg">Random Selection</span>
                  <span className="text-primary opacity-70">Every 10 min, pick 1 endpoint</span>
                </div>
                <div className="h-1 w-16 lg:block hidden  bg-gradient-to-r from-primary to-primary/90 mx-4 rounded-full" />
                <div className="h-8 w-1 lg:hidden block  bg-gradient-to-b from-primary to-primary/90 mx-4 rounded-full" />

                
                <div className="flex flex-col items-center text-center min-w-[140px]">
                  <LoaderCircle className="text-primary p-2 border border-border mb-2" size={56} />
                  <span className="font-semibold text-lg">10-min Interval</span>
                  <span className="text-primary opacity-70">Keeps under 15-min sleep</span>
                </div>
                <div className="h-1 w-16 lg:block hidden bg-gradient-to-r from-primary to-primary/60 mx-4 rounded-full" />
                <div className="h-8 w-1 lg:hidden block  bg-gradient-to-b from-primary to-primary/60  mx-4 rounded-full" />
          
                <div className="flex flex-col items-center text-center min-w-[140px]">
                  <Rocket className="text-primary p-2 border border-border mb-2" size={56} />
                  <span className="font-semibold text-lg">Bot Avoidance</span>
                  <span className="text-primary opacity-70">Random, unpredictable</span>
                </div>
                <div className="h-1 w-16 lg:block hidden  bg-gradient-to-r from-primary/50 to-primary/10 mx-4 rounded-full" />
                <div className="h-8 w-1 lg:hidden block  bg-gradient-to-b from-primary/50 to-primary/10 mx-4 rounded-full" />
                
                <div className="flex flex-col items-center text-center min-w-[140px]">
                  <CircleCheck className="text-primary p-2 border border-border mb-2" size={56} />
                  <span className="font-semibold text-lg">Low Impact</span>
                  <span className="text-primary opacity-70">Lightweight, safe</span>
                </div>
              </div>
              <div className="mt-20 text-center text-base opacity-80 max-w-xl max-sm:mt-16 max-sm:px-10 max-sm:text-sm max-sm:max-w-full">
                <strong>Why This Approach?</strong>
                <br />Efficient, stealthy, reliable, and safe for all major free-tier platforms.
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-[20px] p-[10px_20px] flex-wrap max-sm:gap-2 max-sm:p-2">
          <div className="flex-1 min-w-[300px] my-[auto] max-sm:min-w-0">
            <h1 className="text-[45px] font-[Inter] text-center mb-8 max-sm:text-2xl max-sm:mb-3">Perfect for Students & Indie Devs</h1>
       
            <div className="flex flex-row flex-wrap gap-6 justify-center mt-10 mb-10 max-sm:gap-2 max-sm:mt-4 max-sm:mb-4">
          
              <div className="flex flex-col w-sm items-center rounded-lg p-4 min-w-[140px] shadow">
                <GraduationCap className="text-primary p-2 mb-2 opacity-50" size={80} />
                <span className="font-semibold text-lg">Students</span>
                <span className="text-primary opacity-70 text-center">Showcase projects to recruiters, no credit card needed</span>
              </div>
              <div className="flex flex-col w-sm items-center rounded-lg p-4 min-w-[140px] shadow ">
                <Code2 className="text-primary p-2 mb-2 opacity-50" size={80} />
                <span className="font-semibold text-lg">Indie Devs</span>
                <span className="text-primary opacity-70 text-center">Keep portfolio and demo apps always live</span>
              </div>
              <div className="flex flex-col w-sm items-center rounded-lg p-4 min-w-[140px] shadow">
                <Briefcase className="text-primary p-2 mb-2 opacity-50" size={80} />
                <span className="font-semibold text-lg">Job Seekers</span>
                <span className="text-primary opacity-70 text-center">Impress with instant project response times</span>
              </div>
              <div className="flex flex-col w-sm items-center rounded-lg p-4 min-w-[140px] shadow">
                <Presentation className="text-primary p-2 mb-2 opacity-50" size={80} />
                <span className="font-semibold text-lg">Client Demos</span>
                <span className="text-primary opacity-70 text-center">No embarrassing cold starts during presentations</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Supported Platforms Section */}
      <div className="flex gap-[20px] p-[10px_20px] flex-wrap max-sm:gap-2 max-sm:p-2">
        <div className="flex-1 min-w-[300px] max-sm:min-w-0">
          <h1 className="text-[45px] font-[Inter] text-center mb-8 max-sm:text-2xl max-sm:mb-3">Supported Platforms</h1>
          <div className="mx-[10px] text-lg leading-relaxed opacity-80 max-sm:text-base max-sm:mx-1">
              <ul className="flex flex-wrap gap-4 text-base font-semibold items-center justify-center max-sm:gap-2 max-sm:text-sm">
                <li className="border-1 border-primary rounded-3xl px-4 py-2">Runway</li>
                <li className="border-1 border-primary rounded-3xl px-4 py-2">Render</li>
                <li className="border-1 border-primary rounded-3xl px-4 py-2">Railway</li>
                <li className="border-1 border-primary rounded-3xl px-4 py-2">Vercel</li>
                <li className="border-1 border-primary rounded-3xl px-4 py-2">Netlify</li>
                <li className="border-1 border-primary rounded-3xl px-4 py-2">Heroku</li>
              </ul>
          </div>
        </div>
   
      </div>

      <div className="flex flex-col gap-[10px] w-full mt-[40px] pt-[30px] max-sm:mt-[16px] max-sm:pt-[10px] p-6">
        <h1 className="text-[35px] font-[Inter] mx-auto max-sm:text-xl">Plans & Pricing</h1>

        <div className="flex flex-wrap gap-[10px] px-[10px] justify-center my-10 max-sm:gap-2 max-sm:px-1 max-sm:my-4">
          <div
            className="bg-card rounded-[16px] flex flex-col gap-[16px] w-full max-w-[440px] shadow-lg p-10 max-sm:max-w-full max-sm:p-1 m-2"
            style={{ background: 'linear-gradient(135deg, var(--muted) 0%, var(--card) 100%)' }}
          >
            <div className="bg-muted rounded-[8px] p-[10px] flex flex-col gap-[6px] w-full pt-[45px] relative max-sm:p-[6px] max-sm:pt-[28px]">
              <Image
                src={auranetLogo}
                className="absolute bg-[white] p-[4px] h-[26px] w-[26px] top-[10px] left-[10px] rounded-[50%] max-sm:h-[18px] max-sm:w-[18px] max-sm:top-[4px] max-sm:left-[4px]"
                alt=""
              />
              <p className="text-[18px] font-semibold text-primary max-sm:text-base">Premium</p>
              <h1 className="text-[40px] leading-[1em] font-bold text-primary max-sm:text-2xl">Free</h1>
              {session && (
                <Link href="/dashboard">
                  <Button className="mt-[24px] bg-[#855bf0] w-full bg-gradient-to-b from-[rgba(133,91,240,1)] to-[rgba(96,40,234,1)] text-lg py-3 max-sm:text-base max-sm:py-2 max-sm:mt-3">
                    Choose this plan
                  </Button>
                </Link>
              )}
              {!session && (
                <Button
                  onClick={() => {
                    signIn();
                  }}
                  className="mt-[24px] bg-[#855bf0] w-full bg-gradient-to-b from-[rgba(133,91,240,1)] to-[rgba(96,40,234,1)] text-lg py-3 max-sm:text-base max-sm:py-2 max-sm:mt-3"
                >
                  Choose this plan
                </Button>
              )}
            </div>
            <div className="opacity-[0.9] p-2">
              <h2 className="text-[22px] font-semibold text-primary mb-2 max-sm:text-lg">Free Plan Includes</h2>
              <div className="text-[18px] mt-[2px] text-foreground max-sm:text-base">
                <p className="flex items-center gap-[10px] mb-1 max-sm:gap-[6px] max-sm:text-sm">
                  <CircleCheck size={20} color="white" fill="#6229f3" /> 10 projects per account
                </p>
                <p className="flex items-center gap-[10px] mb-1 max-sm:gap-[6px] max-sm:text-sm">
                  <CircleCheck size={20} color="white" fill="#6229f3" /> 5 API endpoints per project
                </p>
                <p className="flex items-center gap-[10px] mb-1 max-sm:gap-[6px] max-sm:text-sm">
                  <CircleCheck size={20} color="white" fill="#6229f3" /> Smart ping scheduling
                </p>
                <p className="flex items-center gap-[10px] mb-1 max-sm:gap-[6px] max-sm:text-sm">
                  <CircleCheck size={20} color="white" fill="#6229f3" /> Uptime monitoring
                </p>
                <p className="flex items-center gap-[10px] mb-1 max-sm:gap-[6px] max-sm:text-sm">
                  <CircleCheck size={20} color="white" fill="#6229f3" /> No credit card required
                </p>
              </div>
            </div>
          </div>

          {/* another pricing page */}
          <div
            className="bg-gradient-to-br from-[#8155F0] to-[#652feb] rounded-[16px] flex flex-col gap-[16px] w-full max-w-[440px] p-2 shadow-lg max-sm:max-w-full max-sm:p-1 m-2"
          >
            <div className="text-white rounded-[8px] p-[10px] flex flex-col gap-[6px] w-full pt-[45px] relative max-sm:p-[6px] max-sm:pt-[28px]">
              <Image
                src={auranetLogo}
                className="absolute bg-[white] p-[4px] h-[26px] w-[26px] top-[10px] left-[10px] rounded-[50%] max-sm:h-[18px] max-sm:w-[18px] max-sm:top-[4px] max-sm:left-[4px]"
                alt=""
              />
              <p className="text-[18px] font-semibold text-white max-sm:text-base">Turbo premium</p>
              <h1 className="text-[40px] leading-[1em] font-bold text-white max-sm:text-2xl">Also Free</h1>
              <Link
                href="https://x.com/abhraneeldhar"
                className="w-[100%]"
                target="_blank"
              >
                <Button className="mt-[24px] bg-[#f1edfe] text-black w-full text-lg py-3 max-sm:text-base max-sm:py-2 max-sm:mt-3">
                  Choose this plan
                </Button>
              </Link>
            </div>
            <div className="opacity-[0.95] p-2">
              <h2 className="text-[22px] font-semibold text-white mb-2 max-sm:text-lg">Premium plan include</h2>
              <div className="text-[18px] mt-[2px] text-white max-sm:text-base">
                <p className="flex items-center gap-[10px] mb-1 max-sm:gap-[6px] max-sm:text-sm">
                  <CircleCheck size={20} color="white" fill="#6229f3" /> Yeah that's pretty much it
                </p>
                <p className="flex items-center gap-[10px] mb-1 max-sm:gap-[6px] max-sm:text-sm">
                  <CircleCheck size={20} color="white" fill="#6229f3" /> It would be very based
                </p>
                <p className="flex items-center gap-[10px] mb-1 max-sm:gap-[6px] max-sm:text-sm">
                  <CircleCheck size={20} color="white" fill="#6229f3" /> If you follow my twitter tho
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

        <Footer />
    </div>
  );
}
