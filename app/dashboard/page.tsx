"use client"
import Link from "next/link";
import styles from "./db.module.css"
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronLeft, ChevronsUpDown, Circle, Dot, LoaderCircle, LogOut, Pencil, Plus, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import auranetLogo from "../../public/signatureLogoSimple.jpg"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { createNewProject, getRandomThumbnailUrl, getUserProjects } from "../actions/supabaseFunctions";
import { useStore } from "@/lib/store";
import { projectType } from "@/lib/types";
import Footer from "@/components/footer";
import { v4 as uuidv4 } from "uuid";
import { ProjectEndpointDisplay } from "@/components/endpointDisplay/endpointDisplay";


export default function DashboardPage() {
    const [displayScreen, setDisplayScreen] = useState<"projects" | "newProject" | "apiEndpoints">("projects");



    const userDetails = useStore((state) => state.userDetails);

    const [newProjectDetails, setnewProjectDetails] = useState<projectType | null>(null)


    const [selectedProject, setSelectedProject] = useState<projectType | null>(null)

    const newProjectNameRef = useRef<HTMLInputElement>(null)
    const newProjectDescRef = useRef<HTMLTextAreaElement>(null)


    const [existingProjects, setExistingProjects] = useState<projectType[] | null>(null)
    useEffect(() => {
        const init = async () => {
            if (!userDetails || existingProjects) return
            const res = await getUserProjects(userDetails.user_id)
            setExistingProjects(res)
        }
        init();

    }, [userDetails])

    function upsertProject(newProjectDetails: projectType) {
        setExistingProjects((prev) => {
            if (!prev) return [newProjectDetails];
            const index = prev.findIndex(p => p.id === newProjectDetails.id);
            if (index === -1) {
                return [...prev, newProjectDetails];
            }
            const updated = [...prev];
            updated[index] = { ...updated[index], ...newProjectDetails };
            return updated;
        });
    }
    function removeProjectLocally(projectId: string) {
        setExistingProjects((prev) => {
            if (!prev) return prev;
            return prev.filter(project => project.id !== projectId);
        });
    }

    const ProjectsDisplay = () => {
        const [newProjectLoader, setnewProjectLoader] = useState(false)
        return (<div className={styles.projectsDisplay}>
            <div className="flex items-center gap-[10px]">
                <h1 className="text-[26px]">Your projects</h1>
                <Tooltip >
                    <TooltipTrigger asChild>
                        <Button loading={newProjectLoader} className="h-[40px] w-[40px] p-[5px] rounded-[12px]" onClick={async () => {
                            if (!userDetails) return;
                            setnewProjectLoader(true);
                            let newProj: projectType = {
                                id: uuidv4(),
                                name: "",
                                description: "",
                                created_at: Date.now(),
                                updated_at: Date.now(),
                                owner_id: userDetails.user_id,
                                thumbnail_url: null
                            }
                            const thUrl = await getRandomThumbnailUrl();
                            newProj.thumbnail_url = thUrl;

                            setnewProjectDetails(newProj);

                            setDisplayScreen("newProject");
                            setnewProjectLoader(false);
                        }}>
                            <Plus size={20} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Click here
                    </TooltipContent>
                </Tooltip>
            </div>

            {
                existingProjects === null &&
                <div className="w-[100%] h-[100px] flex items-center justify-center"><LoaderCircle size={40} className="animate-spin" /></div>
            }
            <div className={styles.projHolder}>
                {existingProjects?.slice()
                    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).map((proj, index) => (
                        <div className=" flex flex-col max-w-[500px]" key={index} onClick={() => {
                            setSelectedProject(proj);
                            setDisplayScreen("apiEndpoints");
                        }}>
                            <Image height={200} width={400} className="h-[250px] w-[100%] object-cover rounded-[10px] object-top" src={proj.thumbnail_url || "https://dzfgvcvebulrzwdvsvlv.supabase.co/storage/v1/object/public/default-thumbnails//87fba9cd53dbb0dea2f1b89b3d2a45cd.jpg"} alt="" unoptimized />
                            <div className="flex flex-col gap-[2px]">
                                <h1 className="ml-[15px] mt-[5px] text-[22px] max-h-[2.5em] overflow-y-hidden leading-[27px]">{proj.name}</h1>
                                <div className="ml-[15px] text-[14px] flex items-center gap-[5px] ">
                                    <Circle size={10} color="#10B981" fill="#10B981" />
                                    <p className="leading-[1.2em] opacity-[0.6]">Last pinged {""}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                <div></div>
                <div></div>
            </div>


        </div >)
    }
    const NewProjectDisplay = () => {
        const [newProjectLoader, setnewProjectLoader] = useState(false);
        const [errorMsg, setErrorMsg] = useState<string | null>(null);

        return (<div className={styles.newProjDisplay}>
            <Button className={styles.gobackBtn} onClick={() => { setDisplayScreen("projects") }}>
                <ChevronLeft />
            </Button>
            <h1 className="text-[26px]">Add a new Project</h1>

            {newProjectDetails?.thumbnail_url &&
                <Image height={200} width={300} className="h-[250px] w-[100%] object-cover rounded-[10px] object-top" src={newProjectDetails.thumbnail_url} alt="" unoptimized />
            }

            <div className="flex flex-col gap-[2px]">
                <label className="text-[15px] opacity-[0.9]" htmlFor="newProjName">Project Name</label>
                <Input id="newProjName" placeholder="Name of your project" ref={newProjectNameRef} />
            </div>
            <div className="flex flex-col gap-[2px]">
                <label className="text-[15px] opacity-[0.9]" htmlFor="newProjDesc">Project Descripion</label>
                <Textarea id="newProjDesc" placeholder="Something to remind you what this project is about bcoz I'm not adding no thumbnail support" ref={newProjectDescRef} />
            </div>

            <p className="text-[red] text-right">{errorMsg}</p>
            <div className="flex gap-[10px] justify-end">
                <Button variant="outline" onClick={() => { setDisplayScreen("projects") }}>
                    Cancel
                </Button>
                <Button loading={newProjectLoader} variant="outline" className="bg-[#10B981] text-[white]" onClick={async () => {
                    if (!newProjectNameRef.current || !newProjectDescRef.current) return;
                    setErrorMsg(null);

                    const projName = newProjectNameRef.current.value.trim();
                    const projDesc = newProjectDescRef.current.value.trim();
                    if (projName.length < 5 || projName.length > 30) {
                        setErrorMsg("Name should be between 5 and 30 charecters");
                        return;
                    }
                    if (projDesc.length > 100) {
                        setErrorMsg("Description should be within 100 charecters");
                        return;
                    }

                    setnewProjectLoader(true);
                    let tempProjDetail = newProjectDetails;
                    if (tempProjDetail) {
                        tempProjDetail.name = projName;
                        tempProjDetail.description = projDesc;
                        await createNewProject(tempProjDetail);
                        upsertProject(tempProjDetail);
                    }
                    setnewProjectLoader(false);
                    setSelectedProject(tempProjDetail);
                    setDisplayScreen("apiEndpoints");

                }}>
                    Save
                </Button>
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
                            <PopoverContent className="w-[100%] p-[5px]">
                                <Button variant="outline" className="w-[100%] text-[red] bg-[white] border-none" onClick={() => { signOut() }}>
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
                <ProjectEndpointDisplay setDisplayScreen={setDisplayScreen} removeProjectLocally={removeProjectLocally} upsertProject={upsertProject} initSelectedProject={selectedProject} />
            }
        </div>


        <div className="mt-[50px]">
            <Footer />
        </div>
    </div>);
}