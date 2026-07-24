import { useState, useEffect } from 'react';

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

const CricketApp = () => {
  const [activeTab, setActiveTab] = useState('matches');
  const [matchCategory, setMatchCategory] = useState('live');
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [scorecard, setScorecard] = useState(null);
  const [news, setNews] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Matches based on category
  const fetchMatches = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/matches/${category}`);
      const data = await response.json();
      
      // Real API structure usually has typeMatches array
      let matchData = [];
      const rawData = data.data || data;
      console.log('API Response:', rawData); // Debugging

      if (rawData.typeMatches) {
        rawData.typeMatches.forEach(type => {
          if (type.seriesMatches) {
            type.seriesMatches.forEach(series => {
              // The API can return seriesAdWrapper or just a series object depending on version
              const matches = series.seriesAdWrapper?.matches || series.matches;
              if (matches) {
                matches.forEach(m => {
                  const matchInfo = m.matchInfo;
                  if (matchInfo) {
                    matchData.push({
                      id: matchInfo.matchId,
                      seriesName: matchInfo.seriesName || series.seriesName,
                      matchDesc: matchInfo.matchDesc,
                      status: matchInfo.status,
                      team1: matchInfo.team1?.teamName || 'TBD',
                      team2: matchInfo.team2?.teamName || 'TBD',
                      venue: matchInfo.venueInfo?.ground || 'Unknown Venue'
                    });
                  }
                });
              }
            });
          }
        });
      } else if (rawData.matches) {
        matchData = rawData.matches.map(m => ({
          id: m.matchId || m.id,
          seriesName: m.seriesName || 'Series',
          matchDesc: m.matchDesc || m.matchDesc,
          status: m.status,
          team1: m.team1?.teamName || m.team1,
          team2: m.team2?.teamName || m.team2,
          venue: m.venueInfo?.ground || m.venue
        }));
      }
      setMatches(matchData);
    } catch {
      setError('Failed to fetch matches. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Match Details & Scorecard
  const fetchMatchDetails = async (matchId) => {
    setLoading(true);
    try {
      const [detailRes, scardRes] = await Promise.all([
        fetch(`${API_BASE_URL}/matches/detail/${matchId}`),
        fetch(`${API_BASE_URL}/matches/scorecard/${matchId}`)
      ]);
      const detailData = await detailRes.json();
      const scardData = await scardRes.json();
      
      // Merge squads into scorecard if needed for full 11 display
      const mergedScard = scardData.data || scardData;
      const details = detailData.data || detailData;
      
      setSelectedMatch(details);
      setScorecard(mergedScard);
      setActiveTab('detail');
    } catch {
      setError('Failed to fetch match details.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch News
  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/news/series/3636`); // Mocking series ID
      const data = await response.json();
      // RapidAPI News usually returns { storyList: [...] } or { newsList: [...] }
      const newsData = data.data?.storyList || data.data?.newsList || data.storyList || data.newsList || data.data || [];
      setNews(newsData);
    } catch {
      setError('Failed to fetch news.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Rankings
  const fetchRankings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/stats/rankings/batsmen?formatType=test`);
      const data = await response.json();
      // RapidAPI Rankings can be nested in rank[0].rankSelf (for current player) or just a rank array
      const rawRankings = data.data?.rank || data.data?.rankings || data.rank || data.rankings || data.data || [];
      setRankings(rawRankings);
    } catch {
      setError('Failed to fetch rankings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === 'matches') await fetchMatches(matchCategory);
      if (activeTab === 'news') await fetchNews();
      if (activeTab === 'rankings') await fetchRankings();
    };
    fetchData();
  }, [activeTab, matchCategory]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-12">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('matches')}>
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20">
              🏏
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">CricScore AI</h1>
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Premium Dashboard</p>
            </div>
          </div>
          
          <nav className="flex space-x-1">
            {['matches', 'news', 'rankings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab 
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Matches Tab */}
        {activeTab === 'matches' && (
          <div className="space-y-6">
            <div className="flex gap-2 bg-slate-900/50 p-1 rounded-xl w-fit border border-slate-800">
              {['live', 'upcoming', 'recent'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setMatchCategory(cat)}
                  className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    matchCategory === cat 
                    ? 'bg-slate-800 text-emerald-400 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="h-48 bg-slate-900 animate-pulse rounded-2xl border border-slate-800"></div>
                ))
              ) : (
                matches.map((match) => (
                  <div 
                    key={match.id}
                    onClick={() => fetchMatchDetails(match.id)}
                    className="group bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-all cursor-pointer hover:shadow-2xl hover:shadow-emerald-500/5 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">{match.seriesName}</div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-white">{match.team1}</span>
                        <span className="text-slate-600 text-xs font-black italic">VS</span>
                        <span className="text-lg font-bold text-white text-right">{match.team2}</span>
                      </div>
                      <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800/50">
                        <p className="text-emerald-400 text-sm font-semibold">{match.status || match.matchDesc}</p>
                        <p className="text-slate-500 text-[11px] mt-1 flex items-center gap-1">
                          📍 {match.venue}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Match Detail Tab */}
        {activeTab === 'detail' && selectedMatch && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <button 
              onClick={() => setActiveTab('matches')}
              className="text-slate-400 hover:text-emerald-400 text-sm flex items-center gap-2 mb-4 transition-colors"
            >
              ← Back to Matches
            </button>
            
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span> Live Match Center
                  </div>
                  <h2 className="text-3xl font-black text-white">{selectedMatch.seriesName}</h2>
                  <p className="text-slate-400 flex items-center gap-2">🏟️ {selectedMatch.venue}</p>
                </div>
                <div className="text-right space-y-2">
                  <div className="text-emerald-400 font-bold">{scorecard?.status}</div>
                  <div className="text-slate-500 text-sm italic">{selectedMatch.toss}</div>
                </div>
              </div>

              {/* Scorecard Display */}
              {scorecard?.innings && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                  {scorecard.innings.map((inning, idx) => (
                    <div key={idx} className="bg-slate-950/50 rounded-2xl border border-slate-800 overflow-hidden shadow-inner">
                      <div className="bg-slate-800/50 px-6 py-4 flex justify-between items-center border-b border-slate-800">
                        <span className="font-bold text-white">{inning.team}</span>
                        <span className="text-2xl font-black text-emerald-400">{inning.score}/{inning.wickets} <span className="text-xs text-slate-500 font-medium">({inning.overs})</span></span>
                      </div>
                      <div className="p-4">
                        <table className="w-full text-xs text-left">
                          <thead>
                            <tr className="text-slate-500 uppercase tracking-widest font-bold">
                              <th className="pb-3 px-2">Batter</th>
                              <th className="pb-3 text-right">R</th>
                              <th className="pb-3 text-right">B</th>
                              <th className="pb-3 text-right">SR</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/30">
                            {inning.batsmen.map((b, i) => (
                              <tr key={i} className="text-slate-300">
                                <td className="py-2.5 px-2 font-medium text-slate-100">{b.name}</td>
                                <td className="py-2.5 text-right font-bold text-emerald-400">{b.runs}</td>
                                <td className="py-2.5 text-right text-slate-500">{b.balls}</td>
                                <td className="py-2.5 text-right text-slate-400">{b.strikeRate}</td>
                              </tr>
                            ))}
                            {/* Display squad members who didn't bat yet or didn't score */}
                            {inning.batsmen.length < 11 && (
                                <tr>
                                    <td colSpan="4" className="py-4 text-[10px] text-slate-600 italic px-2">
                                        Showing active scorecard - full squad available in match details
                                    </td>
                                </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* News Tab */}
        {activeTab === 'news' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news.length > 0 ? news.map((item, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
                <div className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                  {item.story?.pubTime || item.pubTime ? new Date(parseInt(item.story?.pubTime || item.pubTime)).toLocaleDateString() : 'Recent'}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                  {item.story?.hline || item.hline || item.title || "Cricket News Update"}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.story?.intro || item.intro || item.summary || "Click to read the full story on the series..."}
                </p>
              </div>
            )) : (
              <div className="col-span-2 py-20 text-center text-slate-500">No news articles found for this series.</div>
            )}
          </div>
        )}

        {/* Rankings Tab */}
        {activeTab === 'rankings' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <div className="bg-slate-800/50 p-6 border-b border-slate-800">
              <h2 className="text-xl font-black text-white">ICC Men's Test Rankings</h2>
              <p className="text-slate-500 text-xs mt-1">Top Performers - Batsmen</p>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-950 text-slate-500 uppercase tracking-widest text-[10px] font-black">
                <tr>
                  <th className="px-8 py-4">Rank</th>
                  <th className="px-4 py-4">Player</th>
                  <th className="px-4 py-4">Country</th>
                  <th className="px-8 py-4 text-right">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {rankings.length > 0 ? rankings.map((player, idx) => (
                  <tr key={player.id || idx} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-8 py-5 font-black text-slate-500">#{player.rank || idx + 1}</td>
                    <td className="px-4 py-5 font-bold text-white">{player.name || player.playerName}</td>
                    <td className="px-4 py-5 text-slate-400 font-medium">{player.country}</td>
                    <td className="px-8 py-5 text-right font-black text-emerald-400">{player.rating || player.points}</td>
                  </tr>
                )) : (
                   <tr>
                     <td colSpan="4" className="py-20 text-center text-slate-500 font-medium">Loading rankings from database...</td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800 pt-10 text-center">
        <p className="text-slate-600 text-xs font-medium tracking-widest uppercase">
          Powered by Express Backend & CricScore AI Engine
        </p>
      </footer>
    </div>
  );
};

export default CricketApp;
