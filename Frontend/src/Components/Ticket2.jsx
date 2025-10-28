import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const initialFilterState = {
  name: '',
  status: '',
  priority: '',
  date: '', // This will now control sorting
};

function Ticket2({ tickets}) {
  const [filterInputs, setFilterInputs] = useState(initialFilterState);
  const [appliedFilters, setAppliedFilters] = useState(initialFilterState);
  // ✨ No longer need a separate sortBy state

  const handleFilterChange = (e) => {
    setFilterInputs({ ...filterInputs, [e.target.id]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setAppliedFilters(filterInputs);
  };

  const handleReset = () => {
    setFilterInputs(initialFilterState);
    setAppliedFilters(initialFilterState);
  };

  const displayedTickets = useMemo(() => {
    if (!tickets) return [];
    
    // 1. Filter tickets by name, priority, and status
    let processedTickets = tickets.filter((ticket) => {
      const matchName = appliedFilters.name
        ? ticket.name.toLowerCase().includes(appliedFilters.name.toLowerCase())
        : true;
      const matchPriority =
        appliedFilters.priority && appliedFilters.priority !== 'All'
          ? ticket.priority === appliedFilters.priority
          : true;
      const matchStatus =
        appliedFilters.status && appliedFilters.status !== 'All'
          ? ticket.status === appliedFilters.status
          : true;
      
      return matchName && matchPriority && matchStatus;
    });

    // ✨ 3. Sort the filtered list based on the 'date' filter's value
    if (appliedFilters.date === 'newest') {
      processedTickets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (appliedFilters.date === 'oldest') {
      processedTickets.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return processedTickets;
  }, [tickets, appliedFilters]);

  return (
    <>
      <div className='hidden md:block w-[75vw] p-2'>
        <form
          onSubmit={handleFilterSubmit}
          className='filters-container flex justify-center items-center gap-4 mb- p-1 bg-slate-950/80 backdrop-blur-md rounded-lg border-cyan-400 text-cyan-300 
      shadow-md shadow-cyan-400/30 font-bold'
        >
          <input
            id='name'
            type='text'
            placeholder='Search by name...'
            className='p-2 w-[20vw] rounded bg-gray-800 text-white border border-gray-600'
            value={filterInputs.name}
            onChange={handleFilterChange}
          />

          <select
            id='priority'
            className='p-2 w-[10vw] rounded bg-gray-800 text-white border border-gray-600'
            value={filterInputs.priority}
            onChange={handleFilterChange}
          >
            <option value=''>By Priority</option>
            <option value='All'>All</option>
            <option value='High'>High</option>
            <option value='Medium'>Medium</option>
            <option value='Low'>Low</option>
          </select>
          
          <select
            id='status'
            className='p-2 w-[10vw] rounded bg-gray-800 text-white border border-gray-600'
            value={filterInputs.status}
            onChange={handleFilterChange}
          >
            <option value=''>By Status</option>
            <option value='All'>All</option>
            <option value='Open'>Open</option>
            <option value='Progress'>In Progess</option>
            <option value='Resolved'>Resolved</option>
            <option value='Closed'>Closed</option>
          </select>
          
         <select 
            id="date" 
            value={filterInputs.date} 
            onChange={handleFilterChange}
            className='p-2 w-auto rounded bg-gray-800 text-white'
          >
            <option value=""> By Date</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          <button
            type='submit'
            className='h-10 w-[10vw] font-bold  bg-blue-600 text-white rounded hover:bg-cyan-300 border bg-cyan-800 border-cyan-400 shadow-lg shadow-cyan-400/30'
          >
            Apply
          </button>

          {/* ✨ 3. Add the reset button to the form */}
          <button
            type='button' // Important: Use type="button" to prevent form submission
            onClick={handleReset}
            className='h-10 px-4 font-bold  text-red-400 hover:text-white rounded hover:bg-red-500 border  border-red-400 shadow-lg shadow-red-400/30'
          >
            Reset
          </button>
        </form>
      </div>

      {/* ...your ticket table JSX remains the same... */}
      <table className='hidden md:block border-separate border-spacing-y-2 text-white'>
        {/* thead */}
        <thead>
          <tr className='h-[7vh] bg-cyan-400/40 backdrop-blur-md m-3 '>
            <th className='w-[20vw] p-1 rounded-l-xl'>Ticket</th>
            <th className='w-[15vw] p-1'>Reported by</th>
            <th className='w-[7vw] p-1'>Priority</th>
            <th className='w-[7vw] p-1'>Status</th>
            <th className='w-[15vw] p-1'>Assigned to</th>
            <th className='w-[10vw] p-1 rounded-r-xl'>Action</th>
          </tr>
        </thead>
        {/* tbody */}
        <tbody>
          {displayedTickets &&
            displayedTickets.map((ticket) => (
              <tr
                key={ticket?._id}
                className='h-[7vh]  mb-3 border bg-slate-950/40 backdrop-blur-md  border-cyan-400 text-cyan-300 
      shadow-lg shadow-cyan-400/30 font-bold'
              >
                <td className='max-w-[25vw] rounded-l-xl overflow-hidden whitespace-nowrap truncate p-1 text-center'>
                  {ticket?.name}
                </td>
                <td className='max-w-[15vw] overflow-hidden whitespace-nowrap truncate p-1 text-center'>
                  {ticket?.reportedBy?.name}
                </td>
                <td className='text-center'>
                  <span className='h-[5vh]  px-2 p-1 rounded-md border text-white  border-white shadow-md shadow-white/30'>
                    {ticket?.priority}
                  </span>
                </td>
                <td className='text-center'>
                  <span className='h-[5vh]  px-2 p-1 rounded-md border text-white  border-white shadow-md shadow-white/30'>
                    {ticket?.status}
                  </span>
                </td>
                <td className='max-w-[15vw] overflow-hidden whitespace-nowrap truncate p-1 text-center'>
                  {ticket?.assignedTo?.name}
                </td>
                <td className='rounded-r-xl text-center'>
                  <Link to={`/viewtickets/${ticket?._id}`}>
                    <button className='h-[5vh] w-[8vw]  rounded-xl  text-white rounded hover:bg-cyan-500 border bg-cyan-800  border-cyan-400 shadow-lg shadow-cyan-400/30'>
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Ticket2;