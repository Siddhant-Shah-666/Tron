import React from 'react'
import {Link }from 'react-router-dom'

function ProjectTable({projects,company}) {
  // console.log("projects",projects);
  
  return (
   <>
   <table className='hidden md:block border-separate border-spacing-y-2 text-white'>
    <thead>
    <tr className='h-[7vh]  bg-cyan-400/40 backdrop-blur-md  m-3'>
      <th className='w-[20vw] p-1 rounded-l-xl '>Project</th>
      <th className='w-[15vw] p-1 '>Proj. Manager</th>
      <th className='w-[7vw] p-1 '>Priority</th>
      <th className='w-[7vw] p-1 '>Status</th>
      <th className='w-[15vw] p-1 '>Start Date</th>
      <th className='w-[10vw] p-1 rounded-r-xl'>Action</th>
    </tr>
    </thead>
    <tbody>
      {projects && projects.map((project)=>{
        return(   <tr key={project?._id} className=' h-[7vh]  mb-3  border bg-slate-950/40 backdrop-blur-md  border-cyan-400 text-cyan-300 
      shadow-lg shadow-cyan-400/30 font-bold'>
      <td  className=' max-w-[25vw] rounded-l-xl overflow-hidden whitespace-nowrap truncate p-1 text-center ' >{project?.name}</td>
      <td className=' max-w-[15vw]  overflow-hidden whitespace-nowrap truncate p-1 text-center' > {project?.manager?.name}</td>
      <td className='text-center'>
         <span className='h-[5vh]  px-2 p-1 rounded-md  border text-white  border-white shadow-md shadow-white/30'>{project?.priority}</span> 
      </td>
      <td className='text-center'>
         <span className='h-[5vh]  px-2 p-1  rounded-md  border text-white  border-white shadow-md shadow-white/30'>{project?.status}</span> 
      </td>
      <td className=' max-w-[15vw] overflow-hidden whitespace-nowrap truncate p-1 text-center'>{new Date(project?.createdAt).toLocaleDateString("en-IN")}</td>
      <td  className=' rounded-r-xl text-center'>
        <Link to={`/alltickets/${company}/${project?._id}`}>
          <button className='h-[5vh] w-[8vw]  rounded-xl  text-white rounded hover:bg-cyan-500 border bg-cyan-800  border-cyan-400 shadow-lg shadow-cyan-400/30'>View</button>
          </Link>
        </td>
    </tr>)

 
      })}

    
</tbody>
   </table>
   </>
  )
}

export default ProjectTable
