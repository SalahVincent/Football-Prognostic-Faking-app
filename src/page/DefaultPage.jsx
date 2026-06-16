import React, { useState } from "react";
import "./DefaultPage.css";
import clubdata from "../resources.json";
import Overlay from "../components/Team";

const DefaultPage = () => {
  const clubs = clubdata.clubs || [];
  
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  
  const [selectionTarget, setSelectionTarget] = useState(null); 
  
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);

  const openSelection = (target) => {
    setSelectionTarget(target);
    setIsOverlayOpen(true);
  };

  const handleSelectTeam = (club) => {
    if (selectionTarget === 'home') {
      setHomeTeam(club);
    } else if (selectionTarget === 'away') {
      setAwayTeam(club);
    }
    setIsOverlayOpen(false);
  };

  return (
    <>
      <div className="bg-[#F5F5F5] min-h-screen">
        <section className="sticky top-0 backdrop-blur-[7px]">
          <nav className="flex px-[10%] py-4 justify-between border-b border-[#00000027]">
            <div>
              <h1 className="text-2xl font-semibold">Football Prognostic Faking App</h1>
              <p className="text-[#00000088]">Compose and export fake football match scores</p>
            </div>
            <button 
              onClick={() => { setHomeTeam(null); setAwayTeam(null); }} 
              className="flex h-10 border border-[#00000028] font-semibold px-6 py-2 rounded-sm gap-2 hover:bg-[#00000028]"
            >
              <img src="./reset.svg" alt="" />
              <span>Reset</span>
            </button>
          </nav>
        </section>

        <section className="flex px-6 justify-center items-center">
          <div className="flex bg-[#000000b9] gap-4 items-center p-4 mx-6 px-6 border border-gray-400 my-4 rounded-2xl">
            <div className="flex flex-col items-center">
              {homeTeam ? (
                <img src={homeTeam.url} alt={homeTeam.name} className="w-[120px] h-[120px] border border-gray-500 bg-white rounded-full object-contain p-2" />
              ) : (
                <div className="w-[120px] h-[120px] border border-gray-500 bg-white rounded-full"></div>
              )}
              <span className="text-white mt-2">{homeTeam ? homeTeam.name : "Home Team"}</span>
            </div>
            
            <span className="flex items-center justify-center border bg-white text-4xl rounded-sm h-15 w-8">2</span>
            <span className="text-white text-4xl">-</span>
            <span className="flex items-center justify-center border bg-white text-4xl rounded-sm h-15 w-8">1</span>
            
            <div className="flex flex-col items-center">
              {awayTeam ? (
                <img src={awayTeam.url} alt={awayTeam.name} className="w-[120px] h-[120px] border border-gray-500 bg-white rounded-full object-contain p-2" />
              ) : (
                <div className="w-[120px] h-[120px] border border-gray-500 bg-white rounded-full"></div>
              )}
              <span className="text-white mt-2">{awayTeam ? awayTeam.name : "Away Team"}</span>
            </div>
          </div>
        </section>

        <section className="flex flex-col px-6 py-5 mx-20 border border-gray-400 my-4 rounded-2xl bg-white">
          <p className="font-semibold text-xl mb-4">Match Settings</p>
          <div className="grid-flow-row-dense leading-10 grid grid-cols-2 gap-8">
            <div className="">
              <p className="font-semibold">Home Team</p>
              <button
                onClick={() => openSelection('home')}
                className="flex justify-between items-center px-4 h-12 border border-gray-400 text-gray-800 hover:bg-[#00000010] rounded-xl w-full"
              >
                <span>{homeTeam ? homeTeam.name : "Select home team"}</span>
                <img src="./select.svg" alt="" />
              </button>
              <p className="font-semibold mt-4">Home Score</p>
              <input className="border border-gray-500 rounded-xl w-full px-4 h-12" type="number" placeholder="0" />
            </div>
            
            <div className="">
              <p className="font-semibold">Away Team</p>
              <button
                onClick={() => openSelection('away')}
                className="flex justify-between items-center px-4 h-12 border border-gray-400 text-gray-800 hover:bg-[#00000010] rounded-xl w-full"
              >
                <span>{awayTeam ? awayTeam.name : "Select away team"}</span>
                <img src="./select.svg" alt="" />
              </button>
              <p className="font-semibold mt-4">Away Score</p>
              <input className="border border-gray-500 rounded-xl px-4 h-12 w-full" type="number" placeholder="0" />
            </div>
          </div>
          <button className="flex gap-2 justify-center items-center border h-12 mt-6 rounded-[10px] text-white bg-[#0000003f] hover:bg-[#00000086]">
            <img src="./download-white.svg" alt="" />
            <span className="flex justify-center items-center">Download as Image</span>
          </button>
          <p className="text-center text-[#000000ab] mt-2">Please select both teams to download</p>
        </section>
      </div>

      <Overlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)}>
        <div className="flex flex-col w-full h-[80vh] bg-white p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Select {selectionTarget === 'home' ? 'Home' : 'Away'} Team
            </h2>
          </div>
          
          <hr className="border-gray-200 w-full mb-4" />
          
          <div className="overflow-y-auto pr-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            {clubs.map((club, index) => (
              <div 
                key={index} 
                onClick={() => handleSelectTeam(club)}
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <img 
                  src={club.url} 
                  alt={club.name} 
                  className="w-16 h-16 object-contain mb-3" 
                />
                <p className="text-center font-medium text-sm">{club.name}</p>
              </div>
            ))}
          </div>
        </div>
      </Overlay>
    </>
  );
};

export default DefaultPage;