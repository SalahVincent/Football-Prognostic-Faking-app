import React, { useState } from "react";
import "./DefaultPage.css";
import clubdata from "../resources.json";
import Overlay from "../components/Team";

const DefaultPage = () => {
  const clubs = clubdata.clubs || [];
  const countries = clubdata.countries || [];
  
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectionTarget, setSelectionTarget] = useState(null); 
  
  // Selected Team States (Normalized to { name, url })
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);

  // Score States
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  // Overlay States
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

  const handleReset = () => {
    setHomeTeam(null);
    setAwayTeam(null);
    setHomeScore(0);
    setAwayScore(0);
  };

  const currentList = activeTab === "clubs" ? clubs : countries;
  const filteredTeams = currentList.filter((team) => {
    const searchField = activeTab === "clubs" ? team.name : team.country;
    return searchField?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const isReadyToDownload = homeTeam && awayTeam;

  return (
    <>
      <div className="bg-[#F5F5F5] min-h-screen pb-10">
        {/* Navbar */}
        <section className="sticky top-0 backdrop-blur-[7px] z-10 bg-white/80">
          <nav className="flex px-4 sm:px-[10%] py-4 justify-between items-center border-b border-[#00000027] gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Football Prognostic Faking App</h1>
              <p className="text-xs sm:text-sm text-[#00000088]">Compose and export fake football match scores</p>
            </div>
            <button 
              onClick={handleReset} 
              className="flex h-10 border border-[#00000028] font-semibold px-4 sm:px-6 py-2 rounded-sm gap-2 hover:bg-[#00000015] transition-colors cursor-pointer items-center shrink-0"
            >
              <img src="./reset.svg" alt="" className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </nav>
        </section>

        <section className="flex px-4 justify-center items-center mt-6">
          <div className="flex bg-[#000000b9] gap-3 sm:gap-6 items-center p-4 sm:p-6 border border-gray-400 my-4 rounded-2xl max-w-full w-125 justify-center shadow-md">
            
            <div className="flex flex-col items-center w-20 sm:w-28 shrink-0">
              {homeTeam ? (
                <img 
                  src={homeTeam.url} 
                  alt={homeTeam.name} 
                  className="w-16 h-16 sm:w-25 sm:h-25 border border-gray-500 bg-white rounded-full object-contain p-1.5" 
                />
              ) : (
                <div className="w-16 h-16 sm:w-25 sm:h-25 border border-gray-500 bg-white rounded-full"></div>
              )}
              <span className="text-white text-xs sm:text-sm text-center mt-2 font-medium line-clamp-2 w-full">
                {homeTeam ? homeTeam.name : "Home Team"}
              </span>
            </div>
            
            <span className="flex items-center justify-center border bg-white text-2xl sm:text-4xl font-bold rounded-sm h-12 w-8 sm:h-15 sm:w-10 text-gray-900 shadow-sm select-none">
              {homeScore}
            </span>
            <span className="text-white font-bold text-xl sm:text-2xl">-</span>
            <span className="flex items-center justify-center border bg-white text-2xl sm:text-4xl font-bold rounded-sm h-12 w-8 sm:h-15 sm:w-10 text-gray-900 shadow-sm select-none">
              {awayScore}
            </span>
            
            <div className="flex flex-col items-center w-20 sm:w-28 shrink-0">
              {awayTeam ? (
                <img 
                  src={awayTeam.url} 
                  alt={awayTeam.name} 
                  className="w-16 h-16 sm:w-25 sm:h-25 border border-gray-500 bg-white rounded-full object-contain p-1.5" 
                />
              ) : (
                <div className="w-16 h-16 sm:w-25 sm:h-25 border border-gray-500 bg-white rounded-full"></div>
              )}
              <span className="text-white text-xs sm:text-sm text-center mt-2 font-medium line-clamp-2 w-full">
                {awayTeam ? awayTeam.name : "Away Team"}
              </span>
            </div>

          </div>
        </section>

        <section className="flex flex-col px-4 sm:px-6 py-5 mx-4 sm:mx-10 md:mx-20 lg:mx-40 border border-gray-400 my-4 rounded-2xl bg-white shadow-sm">
          <p className="font-semibold text-xl mb-4 text-gray-800">Match Settings</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 leading-10">
            <div>
              <p className="font-semibold text-sm text-gray-700">Home Team</p>
              <button
                onClick={() => openSelection('home')}
                className="flex justify-between items-center px-3 h-12 border border-gray-400 text-gray-800 hover:bg-gray-50 rounded-xl w-full cursor-pointer transition-colors text-left"
              >
                <span className="truncate">{homeTeam ? homeTeam.name : "Select home team"}</span>
                <img src="./select.svg" alt="" className="w-4 h-4 ml-2 shrink-0" />
              </button>
              <p className="font-semibold text-sm text-gray-700 mt-2">Home Score</p>
              <input 
                className="border border-gray-500 rounded-xl w-full px-3 h-12 focus:outline-none focus:border-gray-700 transition-colors" 
                type="number" 
                min="0"
                placeholder="0" 
                value={homeScore}
                onChange={(e) => setHomeScore(Math.max(0, parseInt(e.target.value) || 0))}
              />
            </div>
            
            <div>
              <p className="font-semibold text-sm text-gray-700">Away Team</p>
              <button
                onClick={() => openSelection('away')}
                className="flex justify-between items-center px-3 h-12 border border-gray-400 text-gray-800 hover:bg-gray-50 rounded-xl w-full cursor-pointer transition-colors text-left"
              >
                <span className="truncate">{awayTeam ? awayTeam.name : "Select away team"}</span>
                <img src="./select.svg" alt="" className="w-4 h-4 ml-2 shrink-0" />
              </button>
              <p className="font-semibold text-sm text-gray-700 mt-2">Away Score</p>
              <input 
                className="border border-gray-500 rounded-xl px-3 h-12 w-full focus:outline-none focus:border-gray-700 transition-colors" 
                type="number" 
                min="0"
                placeholder="0" 
                value={awayScore}
                onChange={(e) => setAwayScore(Math.max(0, parseInt(e.target.value) || 0))}
              />
            </div>
          </div>
          
          <button 
            disabled={!isReadyToDownload}
            className={`flex gap-2 justify-center items-center border h-12 mt-5 rounded-[10px] text-white font-medium transition-all duration-200 outline-none ${
              isReadyToDownload 
                ? "bg-black hover:bg-gray-800 cursor-pointer shadow-md active:scale-[0.995]" 
                : "bg-gray-300 border-transparent text-gray-400 cursor-not-allowed"
            }`}
          >
            <img src="./download-white.svg" alt="" className={`w-5 h-5 ${!isReadyToDownload && "opacity-40"}`} />
            <span>Download as Image</span>
          </button>
          <p className={`text-center text-sm mt-2 transition-colors duration-200 ${isReadyToDownload ? "text-green-600 font-medium" : "text-gray-400"}`}>
            {isReadyToDownload ? "Ready to export!" : "Please select both teams to download"}
          </p>
        </section>
      </div>

      <Overlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)}>
        <div className="flex flex-col w-full max-h-[85vh] bg-white">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Select Team</h2>
            <button onClick={() => setIsOverlayOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl font-light cursor-pointer">&times;</button>
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
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors cursor-pointer ${
                  activeTab === "clubs" ? "bg-[#05050a] text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Clubs ({clubs.length})
              </button>
              <button
                onClick={() => { setActiveTab("countries"); setSearchQuery(""); }}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors cursor-pointer ${
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
                      className="flex items-center gap-4 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 hover:border-gray-400"
                    >
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full overflow-hidden shrink-0">
                        <img src={displayImg} alt="" className="w-full h-full object-contain p-0.5" onError={(e) => { e.target.src = "./fallback-logo.svg"; }} />
                      </div>
                      <span className="text-sm font-medium text-gray-800 truncate">{displayName}</span>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-400 text-sm py-4 col-span-2 text-center">No matching items found.</p>
              )}
            </div>
          </div>
        </div>
      </Overlay>
    </>
  );
};

export default DefaultPage;