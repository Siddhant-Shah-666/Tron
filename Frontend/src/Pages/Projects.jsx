import {React, useState,useEffect} from 'react'
import ProjectTable from '../Components/ProjectTable'
import StatsCard from '../Components/Dashboard/StatsCard'
import ProjectCard from '../Components/ProjectCard'

function Projects() {

  const [company,setcompany] = useState(null)

  const [projects,setProjects] = useState(null)

  useEffect(()=>{
   fetch("https://tron-bug-tracking.onrender.com/projects/getproject",{
    method:"GET",
    credentials:"include"
   }).then((res)=>res.json())
   .then((data)=>{
    if(data.company){
      setcompany(data?.company?._id)
      
      setProjects(data.company?.projects)
      
    }
   }).catch((err)=>{
    console.error(err);
    
   })

  },[])

  return (
    <>
    <div className='h-[100vh] w-[100vw]  md:h-[80vh] md:w-[80vw]  flex flex-col justify-start md:items-center text-white'>
      <div className="stats w-full h-auto md:h-[23vh] md:w-[75vw] px-4 py-6 grid  grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 bg-red-40">
        <StatsCard title="Total Projects" stats={projects?.length} />
        <StatsCard title="Active Project" stats={projects?.filter(project=>project.status === "Active").length} />
           <StatsCard title="High Priority" stats={projects?.filter(project=>project.priority === "High").length} />
        <StatsCard title="Completed Project" stats={projects?.filter(project => project.status === "Completed").length} />
        
      </div>
      <div>
        {projects && <ProjectTable projects = {projects} company={company}/>}
         {projects && <ProjectCard projects = {projects} company={company}/>}
        
      </div>
      
      
    </div>
    </>
  )
}

export default Projects
