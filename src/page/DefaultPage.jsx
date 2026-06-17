import React, { useState } from "react";
import "./DefaultPage.css";
import clubdata from "../resources.json";
import Overlay from "../components/Team";

const DefaultPage = () => {
  const clubs = clubdata.clubs || [];
  const countries = clubdata.countries || [];
  
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectionTarget, setSelectionTarget] = useState(null);
  
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);

  const [activeTab, setActiveTab] = useState("clubs");
  const [searchQuery, setSearchQuery] = useState("");

  const openSelection = (target) => {
    setSelectionTarget(target);
    setSearchQuery(""); 
    setActiveTab("clubs"); 
    setIsOverlayOpen(true);
  };

  const handleSelectTeam = (team) => {
    const normalizedTeam = activeTab === "clubs" 
      ? { name: team.name, url: team.url }
      : { name: team.country, url: team.flag };

    if (selectionTarget === 'home') {
      setHomeTeam(normalizedTeam);
    } else if (selectionTarget === 'away') {
      setAwayTeam(normalizedTeam);
    }
    setIsOverlayOpen(false);
  };

  const currentList = activeTab === "clubs" ? clubs : countries;
  const filteredTeams = currentList.filter((team) => {
    const searchField = activeTab === "clubs" ? team.name : team.country;
    return searchField?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <div className="bg-[#F5F5F5] min-h-screen">
        <section className="sticky top-0 backdrop-blur-[7px] z-10">
          <nav className="flex px-[10%] py-4 justify-between border-b border-[#00000027] bg-white/80">
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
              <span className="text-white mt-2 font-medium">{homeTeam ? homeTeam.name : "Home Team"}</span>
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
              <span className="text-white mt-2 font-medium">{awayTeam ? awayTeam.name : "Away Team"}</span>
            </div>
          </div>
        </section>

        <section className="flex flex-col px-6 py-5 mx-20 border border-gray-400 my-4 rounded-2xl bg-white">
          <p className="font-semibold text-xl mb-4">Match Settings</p>
          <div className="grid grid-cols-2 gap-8 leading-10">
            <div>
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
            
            <div>
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
        <div className="flex flex-col w-full max-h-[85vh] bg-white">
          
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Select Team</h2>
            <button 
              onClick={() => setIsOverlayOpen(false)} 
              className="text-gray-400 hover:text-gray-600 text-2xl font-light"
            >
              &times;
            </button>
          </div>
          
          <div className="p-6 flex flex-col overflow-hidden">
            
            <div className="relative mb-5">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 h-12 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-base"
              />
            </div>
            
            <div className="flex gap-4 border-b border-gray-100 pb-3 mb-4">
              <button
                onClick={() => { setActiveTab("clubs"); setSearchQuery(""); }}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                  activeTab === "clubs" ? "bg-[#05050a] text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Clubs ({clubs.length})
              </button>
              <button
                onClick={() => { setActiveTab("countries"); setSearchQuery(""); }}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                  activeTab === "countries" ? "bg-[#05050a] text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Countries ({countries.length})
              </button>
            </div>
            
            <div className="overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[45vh]">
              {filteredTeams.length > 0 ? (
                filteredTeams.map((team, index) => {
                  const displayName = activeTab === "clubs" ? team.name : team.country;
                  const displayImg = activeTab === "clubs" ? team.url : team.flag;

                  return (
                    <div
                      key={index}
                      onClick={() => handleSelectTeam(team)}
                      className="flex items-center gap-4 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={displayImg}
                          alt=""
                          className="w-full h-full object-contain p-0.5"
                          onError={(e) => { e.target.src = "./fallback-logo.svg"; }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-800 truncate">
                        {displayName}
                      </span>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-400 text-sm py-4 col-span-2 text-center">
                  No matching items found.
                </p>
              )}
            </div>
            
          </div>
        </div>
      </Overlay>
    </>
  );
};

export default DefaultPage;