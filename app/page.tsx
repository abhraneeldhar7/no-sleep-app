import Image from "next/image";
import styles from "./rootPage.module.css"
import grad from "../public/artistic-blurry-colorful-wallpaper-background.jpg"
import { ArrowUp, ArrowUp01, ArrowUpAZ } from "lucide-react";
import auranetLogo from "../public/signatureLogoSimple.jpg"
import Link from "next/link";
import Footer from "@/components/footer";

export default function Home() {

  return (
    <div className={styles.main}>
      <div className={styles.tabMain}>
        <div className={styles.tabDiv}>
          <Link href="/">
            <Image src={auranetLogo} className="h-[45] w-[45] object-cover object-center rounded-[5px]" alt="" />
          </Link>
          <Link href="/">
            <button>Dashboard</button>
          </Link>
        </div>
      </div>
      <Image className={styles.gradientBg} src={grad} alt="" />
      <div className={styles.heroDiv}>
        <h1 className="text-[40px] font-[600]">
          Doesn't let your free tiers sleep
        </h1>
        <p className="opacity-[0.9]">Pretend here is a sick landing page</p>
        <button>
          Activate
          <ArrowUp />
        </button>
      </div>


      <Footer />
    </div>
  );
}
