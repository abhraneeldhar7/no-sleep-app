"use client"

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./endpoint.module.css"
import { Button } from "../ui/button";
import { Check, ChevronLeft, LoaderCircle, Pencil, Rss, Trash2, Wifi } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { endpointType, projectType } from "@/lib/types";
import { addProjectEndpoint, deleteProject, deleteProjectEndpoint, getProjectEndpoints, saveProjectDetails, updateProjectEndpoint } from "@/app/actions/supabaseFunctions";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { Switch } from "../ui/switch";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { v4 as uuidv4 } from "uuid";

export const ProjectEndpointDisplay = ({ initSelectedProject, setDisplayScreen, upsertProject, removeProjectLocally }: {
    initSelectedProject: projectType | null,
    setDisplayScreen: Dispatch<SetStateAction<"projects" | "apiEndpoints" | "newProject">>, upsertProject: (project: projectType) => void,
    removeProjectLocally: (projectId: string) => void

}) => {


    const [newSaveLoader, setSaveLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [editMode, setEditMode] = useState(false);

    const [newAPIurl, setNewApiUrl] = useState<string | null>(null);
    const newProjectNameRef = useRef<HTMLInputElement>(null)
    const newProjectDescRef = useRef<HTMLTextAreaElement>(null)

    const [apiResponse, setapiResponse] = useState<string | null>(null)

    const [selectedProject, setSelectedProject] = useState(initSelectedProject);
    const [fetchLoader, setFetchLoader] = useState(false);
    const [addingEndpointLoader, setaddingEndpointLoader] = useState(false);

    const [projectEndpointsArray, setProjectEndpointsArray] = useState<endpointType[] | null>(null);


    function upsertEndpoint(newEndpoint: endpointType) {
        setProjectEndpointsArray((prev) => {
            if (!prev) return [newEndpoint];

            const index = prev.findIndex(ep => ep.id === newEndpoint.id);

            if (index === -1) {
                return [...prev, newEndpoint]; // insert
            }

            // update
            const updated = [...prev];
            updated[index] = { ...updated[index], ...newEndpoint };
            return updated;
        });
    }
    function removeEndpointLocally(endpointId: string) {
        setProjectEndpointsArray((prev) => {
            if (!prev) return prev;
            return prev.filter(ep => ep.id !== endpointId);
        });
    }

    useEffect(() => {
        const initPage = async () => {
            if (!selectedProject || projectEndpointsArray) return;
            const res = await getProjectEndpoints(selectedProject.id);
            setProjectEndpointsArray(res);
            console.log(res)
        }
        initPage();
    }, [])


    const [editEndpoint, setEditEndpoint] = useState(false);

    return (
        <div className={styles.projectEndpointDisplay}>
            <Button className={styles.gobackBtn} onClick={() => { setDisplayScreen("projects") }}>
                <ChevronLeft />
            </Button>
            <h1 className={"text-[26px]"}>
                Add Endpoints
            </h1>

            {!editMode &&
                <div className="flex flex-col gap-[5px]">
                    <div className="flex gap-[10px] flex-wrap">
                        <p className="text-[20px] text-[white] bg-[#1778FB] w-[fit-content] px-[10px] rounded-[20px] flex items-center">{selectedProject?.name}</p>
                        <Button variant="outline" className="rounded-[50%] h-[40px] w-[40px]" onClick={() => { setEditMode(true) }}>
                            <Pencil />
                        </Button>
                    </div>
                    <p className="px-[10px]">{selectedProject?.description}</p>
                </div>
            }
            {editMode &&
                <div className="flex flex-col gap-[5px]">
                    <div className="flex flex-col gap-[2px]">
                        <label className="text-[15px] opacity-[0.9]" htmlFor="newProjName">Project Name</label>
                        <Input id="newProjName" placeholder="Name of your project" defaultValue={selectedProject?.name} ref={newProjectNameRef} />
                    </div>
                    <div className="flex flex-col gap-[2px]">
                        <label className="text-[15px] opacity-[0.9]" htmlFor="newProjDesc">Project Descripion</label>
                        <Textarea id="newProjDesc" placeholder="Something to remind you what this project is about bcoz I'm not adding no thumbnail support" defaultValue={selectedProject?.description} ref={newProjectDescRef} />
                    </div>

                    <p className="text-[red] text-right">{errorMsg}</p>
                    <div className="flex gap-[10px] justify-end">
                        <Button variant="outline" onClick={() => {
                            setEditMode(false);
                        }}>
                            Reset
                        </Button>
                        <Button loading={newSaveLoader} variant="outline" className="bg-[#10B981] text-[white]" onClick={async () => {
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

                            setSaveLoader(true);

                            let tempProject = selectedProject;
                            if (tempProject) {
                                tempProject.name = projName;
                                tempProject.description = projDesc;
                                tempProject.updated_at = Date.now();
                                await saveProjectDetails(tempProject);
                                setSelectedProject(tempProject);
                                upsertProject(tempProject);
                                setEditMode(false);
                                setDisplayScreen("apiEndpoints");
                            }

                            setSaveLoader(false);

                        }}>
                            Save
                        </Button>
                    </div>

                </div>}


            {selectedProject?.thumbnail_url &&
                <Image height={200} width={300} className="h-[250px] w-[100%] object-cover rounded-[10px] object-top" src={selectedProject.thumbnail_url} alt="" unoptimized />
            }

            {(projectEndpointsArray && projectEndpointsArray.length < 5) &&
                <div className="flex flex-col gap-[10px]">
                    <div className="flex gap-[10px] items-center">
                        <Input className="h-[40px]" placeholder="https://avengers-tower.stark/api/v1/threats/" value={newAPIurl || ""} onChange={(e) => { setNewApiUrl(e.target.value.trim()) }} spellCheck={false} />

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button loading={fetchLoader} className={`${newAPIurl?.length ? "bg-[black] text-[white]" : ""} h-[40px] w-[40px]`} variant="outline" onClick={async () => {
                                    if (!newAPIurl?.length) return;
                                    setFetchLoader(true);
                                    try {
                                        const res = await fetch(newAPIurl, {
                                            method: 'GET',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Cache-Control': 'no-cache'
                                            }
                                        });
                                        const apiRes = await res.json()
                                        setapiResponse(apiRes);
                                    }
                                    catch (error) {
                                        console.log(error)
                                    }
                                    setFetchLoader(false);
                                }}>
                                    <Rss />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Test connectivity
                            </TooltipContent>
                        </Tooltip>


                    </div>
                    <Button disabled={(projectEndpointsArray != null && (projectEndpointsArray.length >= 5))} loading={addingEndpointLoader} className={`${newAPIurl?.length ? "bg-[#10B981] text-[white]" : ""} w-[100%]`} variant="outline" onClick={async () => {
                        if (!selectedProject || !newAPIurl?.length || projectEndpointsArray === null) return;

                        if (projectEndpointsArray.length >= 5) {
                            return;
                        }
                        const newEndpoint: endpointType = {
                            id: uuidv4(),
                            project_id: selectedProject.id,
                            url: newAPIurl,
                            active: true,
                            created_at: Date.now(),
                            updated_at: Date.now()
                        }

                        setaddingEndpointLoader(true);
                        await addProjectEndpoint(newEndpoint);
                        upsertEndpoint(newEndpoint);
                        setNewApiUrl(null)
                        setaddingEndpointLoader(false);

                    }}>
                        Add to endpoints
                    </Button>



                    <div className="flex flex-col gap-[10px]">
                        <h1 className="text-[16px] opacity-[0.8]">Response</h1>
                        <ScrollArea className={styles.responseDiv}>
                            {!fetchLoader && JSON.stringify(apiResponse)}
                            {fetchLoader &&
                                <div className="h-[100%] w-[100%] flex items-center justify-center">
                                    <LoaderCircle size={30} className="animate-spin" />
                                </div>
                            }
                        </ScrollArea>

                    </div>
                </div>}


            {projectEndpointsArray && projectEndpointsArray.length > 0 && <div>
                <div className="flex justify-between items-center">
                    <h1 className="text-[16px] opacity-[0.8]">Active endpoints</h1>
                    {!editEndpoint && <Button onClick={() => { setEditEndpoint(true) }} className="h-[35px] w-[35px]">
                        <Pencil />
                    </Button>}
                    {editEndpoint && <Button variant="outline" onClick={() => { setEditEndpoint(false) }} className="h-[35px] w-[35px] bg-[#10B981] text-[white]">
                        <Check />
                    </Button>}
                </div>

                <div className="flex flex-col gap-[6px] mt-[5px]">
                    {projectEndpointsArray === null &&
                        <div className="h-[100%] w-[100%] flex items-center justify-center">
                            <LoaderCircle size={30} className="animate-spin" />
                        </div>
                    }
                    {projectEndpointsArray?.map((endpoint) => (
                        <div className="flex gap-[10px] items-center" key={endpoint.id}>
                            <Input
                                contentEditable={false}
                                disabled={!endpoint.active}
                                className="h-[40px]"
                                value={endpoint.url}
                                onChange={() => { }}
                            />
                            {!editEndpoint &&
                                <Switch
                                    checked={endpoint.active}
                                    onCheckedChange={(checked) => {
                                        setProjectEndpointsArray((prev) => {
                                            if (!prev) return prev;
                                            const updatedList = prev.map((ep) => {
                                                if (ep.id === endpoint.id) {
                                                    const updated = { ...ep, active: checked };
                                                    updateProjectEndpoint(updated);
                                                    return updated;
                                                }
                                                return ep;
                                            });
                                            return updatedList;
                                        });
                                    }} />}
                            {editEndpoint &&
                                <Button variant="destructive" className="h-[35px] w-[35px] p-[6]" onClick={async () => {
                                    deleteProjectEndpoint(endpoint.id);
                                    removeEndpointLocally(endpoint.id);
                                }}>
                                    <Trash2 />
                                </Button>
                            }
                        </div>
                    ))}
                </div>
            </div>}

            <p className="text-center opacity-[0.8] text-[15px] leading-[1.2em] my-[10px]">LazyPing pings your endpoints every 15mins preventing cold starts</p>
            <div className="mt-[40px] flex flex-col items-center">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="w-[100px] bg-[#FA003F] hover:bg-[red]">
                            Delete
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Deleting your project will also remove the APIs from the service.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={async () => {
                                if (!selectedProject) return;
                                await deleteProject(selectedProject);
                                removeProjectLocally(selectedProject.id);
                                setDisplayScreen("projects");
                            }}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <p className="mt-[5px] text-[15px] opacity-[0.5]">Delete your project</p>
            </div>
        </div >)
}