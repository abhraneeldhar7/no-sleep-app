"use client"
import Image from "next/image";
import styles from "./rootPage.module.css"
import grad from "../public/artistic-blurry-colorful-wallpaper-background.jpg"
import { ArrowUp, CircleCheck, Sun } from "lucide-react";
import auranetLogo from "../public/signatureLogoSimple.jpg"
import Link from "next/link";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import glasspanebg from "../public/blurglasspane.jpg"
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { signIn, useSession } from "next-auth/react";


export default function Home() {
  const { data: session } = useSession();
  return (
    <div className={styles.main}>
      <div className={styles.tabMain}>
        <div className={styles.tabDiv}>
          <Link href="/">
            <Image src={auranetLogo} className="h-[45] w-[45] object-cover object-center rounded-[5px]" alt="" />
          </Link>

          <div className="flex items-center gap-[10px]">
            <Popover>
              <PopoverTrigger asChild>
                <div className={styles.themeSwitchBtn}>
                  <Sun size={18} />
                </div>
              </PopoverTrigger>
              <PopoverContent className="py-[5px] px-[10px]">
                <p>App works so good, I didn' make a darkmode.</p>
                <p>Just add the APIs and forget.</p>
              </PopoverContent>
            </Popover>

            {session &&
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            }
            {!session &&
              <Button onClick={() => { signIn("google",{ callbackUrl: '/dashboard' }) }}>Sign in</Button>}

          </div>
        </div>
      </div>
      <Image className={styles.gradientBg} src={grad} alt="" />
      <Image className="absolute top-0 left-0 w-[100%] h-[100vh] object-cover opacity-[0.1]" src={glasspanebg} alt="" unoptimized />
      <div className={styles.heroDiv}>
        <h1 className="text-[40px] font-[600] text-center leading-[1.2em]">
          Doesn't let your free tiers sleep
        </h1>
        <p className="opacity-[0.9]">Pretend here is a sick landing page</p>
        {session &&
          <Link href="/dashboard">
            <Button>
              Dashboard
              <ArrowUp />
            </Button>
          </Link>
        }
        {!session &&
          <Button onClick={() => { signIn("google",{ callbackUrl: '/dashboard' }) }}>
            Activate
            <ArrowUp />
          </Button>
        }
      </div>


      <div className={styles.subsCardsDiv}>
        <h1 className="text-[35px] font-[Inter] mx-auto">Plans & Pricing</h1>

        <div className="flex gap-[10px] mx-auto">

        </div>
        <div className="flex flex-wrap gap-[10px] px-[10px] justify-center">

          <div className={styles.card1}>
            <div className={styles.r1}>
              <Image src={auranetLogo} className="absolute bg-[white] p-[4px] h-[26px] w-[26px] top-[10px] left-[10px] rounded-[50%]" alt="" />
              <p>Premium</p>
              <h1>Free</h1>
              {session &&
                <Link href="/dashboard">
                  <Button>
                    Choose this plan
                  </Button>
                </Link>
              }
              {!session &&
                <Button onClick={()=>{signIn()}}>
                  Choose this plan
                </Button>
              }
            </div>
            <div className="opacity-[0.8]">
              <h2 className="text-[17px]">Premium plan include</h2>
              <div className="text-[15px] mt-[2px]">
                <p className="flex items-center gap-[7px]"><CircleCheck size={15} color="white" fill="#6229f3" /> 10 projects per account</p>
                <p className="flex items-center gap-[7px]"><CircleCheck size={15} color="white" fill="#6229f3" /> 5 APIs per project</p>
                <p className="flex items-center gap-[7px]"><CircleCheck size={15} color="white" fill="#6229f3" /> Monthly statements</p>
              </div>
            </div>
          </div>


          <div className={styles.card2}>
            <div className={styles.r1}>
              <Image src={auranetLogo} className="absolute bg-[white] p-[4px] h-[26px] w-[26px] top-[10px] left-[10px] rounded-[50%]" alt="" />
              <p>Turbo premium</p>
              <h1>Also Free</h1>
              <Link href="https://x.com/abhraneeldhar" className="w-[100%]" target="_blank">
                <Button>
                  Choose this plan
                </Button>
              </Link>
            </div>
            <div className="opacity-[0.8]">
              <h2 className="text-[17px]">Premium plan include</h2>
              <div className="text-[15px] mt-[2px]">
                <p className="flex items-center gap-[7px]"><CircleCheck size={15} color="white" fill="#6229f3" /> Yeah that's pretty much it</p>
                <p className="flex items-center gap-[7px]"><CircleCheck size={15} color="white" fill="#6229f3" /> It would be very based</p>
                <p className="flex items-center gap-[7px]"><CircleCheck size={15} color="white" fill="#6229f3" /> If you follow my twitter tho</p>
              </div>
            </div>
          </div>

        </div>
      </div>


      <div className="mt-[50px]">
        <Footer />
      </div>

    </div>
  );
}
