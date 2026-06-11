import React from "react";
import "./DefaultPage.css";
import clubdata from "../resources.json";

const DefaultPage = () => {
  const clubs = clubdata.clubs;
  
  return (
    // <div className="hero">
    //   <h1 className='navbar'><u>FOOTBALL PROGNOSTIC APP</u></h1>
    //   <div className="vs-box">
    //     <div className="team">
    //       <img src="" alt="" />
    //     </div>
    //     <div className="choose-score-box">
    //       <div className="score">
    //         <button>+</button>
    //         -
    //         <button>-</button>
    //       </div>
    //       <span className="vs">Vs</span>
    //       <div className="score">
    //         <button>+</button>
    //         -
    //         <button>-</button>
    //       </div>
    //     </div>
    //     <div className="team">
    //       <img src="" alt="" />
    //     </div>
    //   </div>

    //   <div className="search-box">
    //     <form action="submit">
    //       <input type="text" placeholder="Enter your club or nation" />
    //     </form>
    //     <button className="img"><img src="./search.png" alt="" /></button>
    //   </div>
      
    //   <div className="competitor">
    //     <ul className="grid-list">
    //       {clubs.map((club, index) => (
    //         <li key={index}>
    //           <img src={club.url} alt="" />
    //           <p>{club.name}</p>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>
    <>
    <div className="bg-[#F5F5F5] min-h-screen">
    <section className="sticky top-0 backdrop-blur-[7px]">
      <nav className="flex px-[10%] py-4 justify-between border-b border-[#00000027] ">
        <div>
          <h1 className="text-2xl font-semibold">Football Prognostic Faking App</h1>
        <p className="text-[#00000088]">Compose and export fake football match scores</p>
        </div>
        <button className="flex h-10 border border-[#00000028] font-semibold px-6 py-2 rounded-sm gap-2 hover:bg-[#00000028]">
          <img className="" src="./reset.svg" alt="" />
          <span>Reset</span>
          </button>
      </nav>
    </section>

    <section className="flex px-6 justify-center items-center">
      <div className="flex bg-[#000000b9] gap-4 items-center p-4 mx-6 px-6 border border-gray-400 my-4 rounded-2xl">
        <div className="flex flex-col items-center">
          <div className="w-30 h-30 border border-gray-500 bg-white rounded-full"></div>
          <span className="text-white">Home Team</span>
        </div>
        <span className="flex items-center justify-center border bg-white text-4xl rounded-sm h-15 w-8">2</span>
        <span>-</span>
        <span className="flex items-center justify-center border bg-white text-4xl rounded-sm h-15 w-8">1</span>
        <div className="flex flex-col items-center">
          <div className="w-30 h-30 border border-gray-500 bg-white rounded-full"></div>
          <span className="text-white">Away Team</span>
        </div>
      </div>
    </section>

    <section className="flex flex-col px-6 py-5 mx-20 border border-gray-400 my-4 rounded-2xl">
      <p className="font-semi text-xl bold my">Match Settings</p>
      <div className="leading-10 grid grid-cols-2 gap-10">
        <div className="">
          <p className="font-semibold">Home Team</p>
          <button
          className="flex justify-between items-center px-2 h-12 border border-gray-400 text-gray-800 hover:bg-[#00000010] rounded-xl w-full">
            <span>Select home team</span>
            <img src="./select.svg" alt="" />
          </button>
          <p className="font-semibold">Home Score</p>
          <input className="border border-gray-500 rounded-xl w-full px-2" type="number" placeholder="0" />
        </div>
        <div className="">
          <p className="font-semibold">Away Team</p>
           <button
          className="flex justify-between items-center px-2 h-12 border border-gray-400 text-gray-800 hover:bg-[#00000010] rounded-xl w-full">
            <span>Select away team</span>
            <img src="./select.svg" alt="" />
          </button>
          <p className="font-semibold">Away Score</p>
          <input className="border border-gray-500 rounded-xl px-2 w-full" type="number" placeholder="0" />
        </div>
      </div>
      <button className="flex gap-2 justify-center items-center border h-12 mt-3 rounded-[10px] text-white bg-[#0000003f] hover:bg-[#00000086]">
        <img src="./download-white.svg" alt="" />
        <span className="flex justify-center items-center">Download as Image</span></button>
      <p className="text-center text-[#000000ab]">Please select both teams to download</p>
    </section>
    </div>
    </>
  );
};

export default DefaultPage;
