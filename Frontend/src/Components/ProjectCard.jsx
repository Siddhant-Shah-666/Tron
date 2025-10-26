import React from 'react';
import {Link }from 'react-router-dom'

function ProjectCard({ projects ,companyId}) {
  // console.log(projects);
  
  return (
    <>
      {projects && projects.map((project, index) => (
        <div key={index} className='md:hidden h-[20vh] w-[90vw] md:h-[30vh] md:w-80 rounded-xl flex flex-col justify-center items-start p-3 md:px-8 gap-1 md:gap-2 m-2 ml-3  border bg-slate-950/40 backdrop-blur-md  border-cyan-400 text-cyan-300 
      shadow-lg shadow-cyan-400/30'>
          <h2 className='font-bold text-xl md:text-2xl'>Bug : {project.name}</h2>
          <h3 className='md:text-l'>Manager : {project.manager}</h3>
          <div className="w-[80vw] md:w-80 bg-red-60 flex gap-5">
            <h3 className='md:text-l'>
              <span>Priority : </span>
              <span className='h-2 px-1 md:px-2 py-[.2vw] ml-2 rounded-md  text-red-400 rounded  border  border-red-400 shadow-lg shadow-red-400/30'>{project.priority}</span>
            </h3>
            <h3 className='md:text-l'>
              <span>Status : </span>
              <span className='h-2  px-1 md:px-2 py-[.2vw] ml-2 rounded-md  text-red-400 rounded  border  border-red-400 shadow-lg shadow-red-400/30'>{project.status}</span>
            </h3>
          </div>
         <Link to={`/allprojects/${companyId}/${project._id}`}>
          <button className='h-[4vh] w-[80vw] md:h-[5vh] md:w-[8vw]  rounded-xl   text-white rounded hover:bg-cyan-500 border bg-cyan-800  border-cyan-400 shadow-lg shadow-cyan-400/30 '>View</button>
          </Link>
        </div>
      ))}
    </>
  );
}

export default ProjectCard