"use client"
import Link from "next/link";
import styles from "./db.module.css"
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronLeft, ChevronsUpDown, LoaderCircle, LogOut, Plus, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import auranetLogo from "../../public/signatureLogoSimple.jpg"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { testingSB } from "../actions/test";
import { getUserDetails } from "../actions/supabaseFunctions";
import { useStore } from "@/lib/store";
import { projectType } from "@/lib/types";
import Footer from "@/components/footer";

export default function DashboardPage() {
    const [displayScreen, setDisplayScreen] = useState<"projects" | "newProject" | "apiEndpoints">("projects");


    const [showTooltip, setTooltip] = useState(true);
    const { data: session } = useSession();

    const userDetails = useStore((state) => state.userDetails);

    const [newProjectDetails, setnewProjectDetails] = useState<projectType | null>(null)

    useEffect(() => {
        setnewProjectDetails(null);

    }, [displayScreen])

    const [newProjectLoader, setnewProjectLoader] = useState(false)


    const ProjectsDisplay = () => {
        return (<div className={styles.projectsDisplay}>
            <div className="flex items-center gap-[10px]">
                <h1 className="text-[26px]">Your projects</h1>
                <Tooltip defaultOpen={showTooltip}>
                    <TooltipTrigger asChild>
                        <Button className="h-[40px] w-[40px] p-[5px] rounded-[12px]" onClick={() => {
                            setDisplayScreen("newProject")
                            setTooltip(false)
                        }}>
                            <Plus size={20} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Click here dumbass
                    </TooltipContent>
                </Tooltip>
            </div>

        </div>)
    }
    const NewProjectDisplay = () => {
        return (<div className={styles.newProjDisplay}>
            <Button className={styles.gobackBtn} onClick={() => { setDisplayScreen("projects") }}>
                <ChevronLeft />
            </Button>
            <h1 className="text-[26px]">Add a new Project</h1>

            <div className="flex flex-col gap-[2px]">
                <label className="text-[15px] opacity-[0.9]" htmlFor="newProjName">Project Name</label>
                <Input id="newProjName" placeholder="Name of your project" defaultValue={newProjectDetails?.name || ""} onChange={(e) => {
                    setnewProjectDetails(
                        (newProjectDetails) => {
                            if (!newProjectDetails) return newProjectDetails;
                            return ({
                                ...newProjectDetails,
                                name: e.target.value
                            })
                        }
                    )
                }} />
            </div>
            <div className="flex flex-col gap-[2px]">
                <label className="text-[15px] opacity-[0.9]" htmlFor="newProjDesc">Project Descripion</label>
                <Textarea id="newProjDesc" placeholder="Something to remind you what this project is about bcoz I'm not adding no thumbnail support" defaultValue={newProjectDetails?.description || ""} onChange={(e) => {
                    setnewProjectDetails(
                        (newProjectDetails) => {
                            if (!newProjectDetails) return newProjectDetails;
                            return ({
                                ...newProjectDetails,
                                description: e.target.value
                            })
                        })
                }} />
            </div>

            <div className="flex gap-[10px] justify-end">
                <Button variant="outline" onClick={() => { setDisplayScreen("projects") }}>
                    Cancel
                </Button>
                <Button loading={newProjectLoader} variant="outline" className="bg-[#10B981] text-[white]" onClick={() => { setDisplayScreen("apiEndpoints") }}>
                    Save
                </Button>
            </div>
        </div>)
    }


    const ProjectEndpointDisplay = () => {
        return (
            <div className={styles.projectEndpointDisplay}>
                <Button className={styles.gobackBtn} onClick={() => { setDisplayScreen("projects") }}>
                    <ChevronLeft />
                </Button>
                <h1 className={"text-[26px]"}>
                    Add Endpoints
                </h1>

                <div className="flex gap-[10px] items-center">
                    <Input className="h-[40px]" placeholder="https://avengers-tower.stark/api/v1/threats/" />
                    <Button className="h-[40px] w-[40px] bg-[#10B981]">
                        <Check />
                    </Button>
                </div>
                <div className="flex flex-col gap-[10px]">
                    <h1 className="text-[16px] opacity-[0.8]">Response</h1>
                    <ScrollArea className={styles.responseDiv}>
                        "hero": "Iron Man",
                        "status": "Suiting up",
                        "suitPower": 85
                    </ScrollArea>

                </div>

                <h1 className="text-[16px] opacity-[0.8]">Active endpoints</h1>

                <div className="flex flex-col gap-[6px]">
                    <div className="flex gap-[10px] items-center">
                        <Input className="h-[40px]" defaultValue="https://avengers-tower.stark" />
                        <Switch />
                    </div>
                    <div className="flex gap-[10px] items-center">
                        <Input className="h-[40px]" defaultValue="https://avengers-tower.stark" />
                        <Switch />
                    </div>
                    <div className="flex gap-[10px] items-center">
                        <Input className="h-[40px]" defaultValue="https://avengers-tower.stark" />
                        <Switch />
                    </div>
                </div>
            </div >)
    }

    return (<div className={styles.main}>
        <div className={styles.tabMain}>
            <div className={styles.tabDiv}>
                <Link href="/">
                    <Image src={auranetLogo} className="h-[45] w-[45] object-cover object-center rounded-[5px]" alt="" />
                </Link>

                <div className="flex items-center gap-[10px]">
                    {userDetails &&
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button>{userDetails.name.split(" ")[0]}<ChevronsUpDown /></Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-[5px]">
                                <Button variant="outline" className="w-[100%] text-[red]" onClick={() => { signOut() }}>
                                    <LogOut /> Log out

                                </Button>
                            </PopoverContent>
                        </Popover>
                    }
                    {!userDetails &&
                        <Button><LoaderCircle className="animate-spin" /><ChevronsUpDown /></Button>
                    }

                </div>
            </div>
        </div>

        <div className={styles.mainContent}>
            {displayScreen == "projects" &&
                <ProjectsDisplay />
            }
            {displayScreen == "newProject" &&
                <NewProjectDisplay />
            }
            {displayScreen == "apiEndpoints" &&
                <ProjectEndpointDisplay />
            }
        </div>


        <div className="mt-[50px]">
            <Footer />
        </div>
    </div>);
}