/**
 * High-quality Mock Data Fallbacks for Cricbuzz RapidAPI Endpoints
 */

const mockMatches = {
  live: {
    type: "live",
    matches: [
      { id: "41881", seriesName: "India tour of Australia, 2026", matchDesc: "1st Test", status: "Day 3: India lead by 180 runs", team1: "India", team2: "Australia", venue: "WACA, Perth" },
      { id: "41882", seriesName: "West Indies tour of England, 2026", matchDesc: "2nd ODI", status: "WI need 45 runs from 32 balls", team1: "England", team2: "West Indies", venue: "Lord's, London" }
    ]
  },
  upcoming: {
    type: "upcoming",
    matches: [
      { id: "41883", seriesName: "T20 World Cup, 2026", matchDesc: "Match 1", startDate: "2026-10-12T14:30:00+05:30", team1: "Australia", team2: "New Zealand", venue: "MCG, Melbourne" },
      { id: "41884", seriesName: "T20 World Cup, 2026", matchDesc: "Match 2", startDate: "2026-10-12T19:00:00+05:30", team1: "India", team2: "Pakistan", venue: "MCG, Melbourne" },
      { id: "41885", seriesName: "South Africa tour of Sri Lanka, 2026", matchDesc: "1st T20I", startDate: "2026-11-01T18:00:00+05:30", team1: "Sri Lanka", team2: "South Africa", venue: "Colombo" }
    ]
  },
  recent: {
    type: "recent",
    matches: [
      { id: "40381", seriesName: "Ireland tour of USA, 2021", matchDesc: "2nd T20I", status: "Ireland won by 9 runs", team1: "Ireland", team2: "United States", venue: "Florida" },
      { id: "40380", seriesName: "Ireland tour of USA, 2021", matchDesc: "1st T20I", status: "USA won by 26 runs", team1: "United States", team2: "Ireland", venue: "Florida" },
      { id: "50112", seriesName: "Australia tour of India, 2023", matchDesc: "3rd ODI", status: "India won by 66 runs", team1: "India", team2: "Australia", venue: "Rajkot" }
    ]
  }
};

const mockCommentary = {
  "41881": [
    { over: "44.6", comm: "Hazlewood to Virat Kohli, FOUR, gorgeous shot! Full on off stump, Kohli drives it straight past the bowler with high-class presentation. No chance for mid-on." },
    { over: "44.5", comm: "Hazlewood to Virat Kohli, no run, defensive push back to the bowler." },
    { over: "44.4", comm: "Hazlewood to Virat Kohli, TWO runs, flicked off the pads through deep mid-wicket for a brace." },
    { over: "44.3", comm: "Hazlewood to KL Rahul, 1 run, guided down to third man for a single." },
    { over: "44.2", comm: "Hazlewood to KL Rahul, no run, beaten! Short and wide, Rahul slashes but misses." },
    { over: "44.1", comm: "Hazlewood to KL Rahul, FOUR, short delivery pulled away elegantly in front of square! Outstanding shot." }
  ]
};

const mockOvers = {
  "41881": {
    overNumber: "45",
    runs: "11",
    balls: ["4", "0", "1", "2", "0", "4"],
    bowler: "Josh Hazlewood",
    batsmen: [{ name: "Virat Kohli", runs: "48(62)" }, { name: "KL Rahul", runs: "74(110)" }]
  }
};

const mockMatchDetail = {
  "41881": {
    matchId: "41881",
    seriesName: "India tour of Australia, 2026",
    matchDesc: "1st Test",
    venue: "WACA, Perth",
    toss: "India won the toss and elected to bat",
    umpire1: "Richard Kettleborough",
    umpire2: "Kumar Dharmasena",
    referee: "Javagal Srinath",
    team1: { name: "India", shortName: "IND", squad: ["KL Rahul", "Yashasvi Jaiswal", "Shubman Gill", "Virat Kohli", "Rishabh Pant", "Ravindra Jadeja", "Ravichandran Ashwin", "Jasprit Bumrah", "Mohammed Siraj", "Akash Deep", "Washington Sundar"] },
    team2: { name: "Australia", shortName: "AUS", squad: ["Usman Khawaja", "Nathan McSweeney", "Marnus Labuschagne", "Steve Smith", "Travis Head", "Mitchell Marsh", "Alex Carey", "Pat Cummins", "Mitchell Starc", "Nathan Lyon", "Josh Hazlewood"] }
  }
};

const mockRankings = [
  { rank: "1", name: "Kane Williamson", country: "New Zealand", rating: "864" },
  { rank: "2", name: "Joe Root", country: "England", rating: "852" },
  { rank: "3", name: "Yashasvi Jaiswal", country: "India", rating: "810" },
  { rank: "4", name: "Steve Smith", country: "Australia", rating: "795" },
  { rank: "5", name: "Virat Kohli", country: "India", rating: "775" }
];

const mockStandings = [
  { pos: "1", team: "India", matches: "12", won: "8", lost: "3", draw: "1", points: "96", pct: "66.67" },
  { pos: "2", team: "Australia", matches: "11", won: "7", lost: "3", draw: "1", points: "88", pct: "60.61" },
  { pos: "3", team: "South Africa", matches: "10", won: "6", lost: "4", draw: "0", points: "72", pct: "60.00" },
  { pos: "4", team: "New Zealand", matches: "12", won: "6", lost: "6", draw: "0", points: "72", pct: "50.00" },
  { pos: "5", team: "England", matches: "13", won: "6", lost: "7", draw: "0", points: "72", pct: "46.15" }
];

const mockTrendingPlayers = [
  { id: "8733", name: "Virat Kohli", country: "India", role: "Batsman", rating: "Trending #1" },
  { id: "6635", name: "Pat Cummins", country: "Australia", role: "Bowler/Captain", rating: "Trending #2" },
  { id: "9580", name: "Yashasvi Jaiswal", country: "India", role: "Batsman", rating: "Trending #3" },
  { id: "10120", name: "Saurabh Netravalkar", country: "USA", role: "Bowler", rating: "Trending #4" }
];

const mockPlayerProfiles = {
  "8733": {
    id: "8733",
    name: "Virat Kohli",
    fullName: "Virat Kohli",
    born: "November 5, 1988 (Delhi)",
    age: "37",
    role: "Top-order Batsman",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm medium",
    career: {
      batting: [
        { format: "Tests", matches: "115", runs: "8848", avg: "49.15", hs: "254*", hundreds: "29" },
        { format: "ODIs", matches: "295", runs: "13848", avg: "58.67", hs: "183", hundreds: "50" },
        { format: "T20Is", matches: "125", runs: "4188", avg: "48.69", hs: "122*", hundreds: "1" }
      ],
      bowling: [
        { format: "Tests", matches: "115", wickets: "0", econ: "2.87" },
        { format: "ODIs", matches: "295", wickets: "5", econ: "5.28" },
        { format: "T20Is", matches: "125", wickets: "4", econ: "8.05" }
      ]
    }
  },
  "6635": {
    id: "6635",
    name: "Pat Cummins",
    fullName: "Patrick James Cummins",
    born: "May 8, 1993 (Westmead, NSW)",
    age: "33",
    role: "Bowler & Captain",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm fast",
    career: {
      batting: [
        { format: "Tests", matches: "62", runs: "1254", avg: "16.45", hs: "63", hundreds: "0" }
      ],
      bowling: [
        { format: "Tests", matches: "62", wickets: "269", econ: "2.85", fiveWickets: "12" }
      ]
    }
  }
};

const mockVenues = {
  "45": { id: "45", name: "WACA Ground", city: "Perth", capacity: "24,500", ends: ["Prindiville Stand End", "Lillee-Marsh Stand End"], matches: ["IND vs AUS 1st Test 2026", "WA vs NSW Shield Final"] },
  "24": { id: "24", name: "Melbourne Cricket Ground", city: "Melbourne", capacity: "100,024", ends: ["Members End", "Great Southern Stand End"] }
};

const mockTeams = {
  international: [
    { id: "1", name: "India", shortName: "IND", rank: "1" },
    { id: "2", name: "Australia", shortName: "AUS", rank: "2" },
    { id: "3", name: "England", shortName: "ENG", rank: "3" },
    { id: "4", name: "South Africa", shortName: "SA", rank: "4" },
    { id: "5", name: "New Zealand", shortName: "NZ", rank: "5" }
  ],
  "2": {
    schedule: [
      { opponent: "India", matchType: "1st Test", date: "2026-11-22", venue: "Perth" },
      { opponent: "India", matchType: "2nd Test", date: "2026-12-03", venue: "Adelaide" }
    ],
    results: [
      { opponent: "England", matchType: "5th Test", outcome: "Australia won by 140 runs", date: "2026-01-18", venue: "Sydney" }
    ],
    stats: {
      mostRuns: [{ name: "Steve Smith", value: "9640" }, { name: "Travis Head", value: "5420" }],
      mostWickets: [{ name: "Pat Cummins", value: "269" }, { name: "Nathan Lyon", value: "530" }]
    }
  }
};

const mockNews = {
  series: {
    "3636": [
      { title: "Kohli and Rahul rebuild after early jolts on Day 3", summary: "A resilient 120-run partnership between Virat Kohli and KL Rahul keeps India ahead at the WACA.", date: "2026-07-23" },
      { title: "Cummins targets early wickets to restrict India's lead", summary: "Pat Cummins feels a quick burst tomorrow morning can bring Australia back into the Perth Test.", date: "2026-07-23" }
    ]
  },
  player: {
    "8733": [
      { title: "Virat Kohli registers yet another fifty-plus score in Australia", summary: "Kohli's love affair with Perth continues as he leads the charge on Day 3.", date: "2026-07-23" }
    ]
  },
  team: {
    "2": [
      { title: "Australia name un-changed squad for Test Series", summary: "National selectors show full faith in the senior unit despite recent away losses.", date: "2026-07-20" }
    ]
  }
};

/**
 * Returns dummy/fallback structure corresponding to Cricbuzz RapidAPI response schema
 */
function getFallback(apiPath, params = {}) {
  const path = apiPath.toLowerCase();

  // 1. Matches List
  if (path.includes("matches/v1/live")) return mockMatches.live;
  if (path.includes("matches/v1/upcoming")) return mockMatches.upcoming;
  if (path.includes("matches/v1/recent")) return mockMatches.recent;

  // 2. Match Center details
  if (path.includes("comm")) {
    const matchId = apiPath.split("/")[2] || "41881";
    return { data: mockCommentary[matchId] || mockCommentary["41881"] };
  }
  if (path.includes("overs")) {
    const matchId = apiPath.split("/")[2] || "41881";
    return { data: mockOvers[matchId] || mockOvers["41881"] };
  }
  if (path.includes("team/")) {
    // e.g. /mcenter/v1/35878/team/9
    return { data: { teamId: "9", players: mockMatchDetail["41881"].team1.squad } };
  }
  if (path.includes("scard")) {
    const matchId = apiPath.split("/")[2] || "40381";
    return { data: { status: "Match Complete", ismatchcomplete: true, scorecard: [] } };
  }
  if (path.startsWith("mcenter/v1/")) {
    const matchId = apiPath.split("/")[2] || "41881";
    return { data: mockMatchDetail[matchId] || mockMatchDetail["41881"] };
  }

  // 3. Stats & Rankings
  if (path.includes("rankings/batsmen")) return { data: mockRankings };
  if (path.includes("iccstanding/team/matchtype/")) {
    return { data: mockStandings };
  }
  if (path.includes("topstats/0") || path.includes("topstats/")) {
    return { data: mockTeams["2"].stats.mostRuns };
  }
  if (path.includes("topstats")) {
    return { categories: ["Most Runs", "Most Wickets", "Highest Scores", "Best Bowling Innings"] };
  }

  // 4. Player routes
  if (path.includes("player/trending")) return { data: mockTrendingPlayers };
  if (path.includes("player/search")) {
    const q = params.plrN || "Virat";
    const found = Object.values(mockPlayerProfiles).filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
    return { data: found.length ? found : [mockPlayerProfiles["8733"]] };
  }
  if (path.includes("career")) {
    const playerId = apiPath.split("/")[3] || "8733";
    return { data: mockPlayerProfiles[playerId]?.career || mockPlayerProfiles["8733"].career };
  }
  if (path.includes("batting")) {
    const playerId = apiPath.split("/")[3] || "8733";
    return { data: mockPlayerProfiles[playerId]?.career?.batting || mockPlayerProfiles["8733"].career.batting };
  }
  if (path.includes("bowling")) {
    const playerId = apiPath.split("/")[3] || "8733";
    return { data: mockPlayerProfiles[playerId]?.career?.bowling || mockPlayerProfiles["8733"].career.bowling };
  }
  if (path.startsWith("stats/v1/player/")) {
    const playerId = apiPath.split("/")[3] || "8733";
    return { data: mockPlayerProfiles[playerId] || mockPlayerProfiles["8733"] };
  }

  // 5. News routes
  if (path.includes("news/v1/series/")) {
    const seriesId = apiPath.split("/")[3] || "3636";
    return { data: mockNews.series[seriesId] || mockNews.series["3636"] };
  }
  if (path.includes("news/v1/player/")) {
    const playerId = apiPath.split("/")[3] || "8733";
    return { data: mockNews.player[playerId] || mockNews.player["8733"] };
  }
  if (path.includes("news/v1/team/")) {
    const teamId = apiPath.split("/")[3] || "2";
    return { data: mockNews.team[teamId] || mockNews.team["2"] };
  }

  // 6. Venue routes
  if (path.includes("matches")) {
    // /venues/v1/:venueId/matches
    const venueId = apiPath.split("/")[2] || "45";
    return { data: mockVenues[venueId]?.matches || mockVenues["45"].matches };
  }
  if (path.startsWith("venues/v1/")) {
    const venueId = apiPath.split("/")[2] || "45";
    return { data: mockVenues[venueId] || mockVenues["45"] };
  }
  if (path.includes("venue/")) {
    // /stats/v1/venue/:venueId
    const venueId = apiPath.split("/")[3] || "45";
    return { data: mockVenues[venueId] || mockVenues["45"] };
  }

  // 7. Team routes
  if (path.includes("international")) return { data: mockTeams.international };
  if (path.includes("schedule")) {
    const teamId = apiPath.split("/")[2] || "2";
    return { data: mockTeams[teamId]?.schedule || mockTeams["2"].schedule };
  }
  if (path.includes("results")) {
    const teamId = apiPath.split("/")[2] || "2";
    return { data: mockTeams[teamId]?.results || mockTeams["2"].results };
  }
  if (path.startsWith("stats/v1/team/")) {
    const teamId = apiPath.split("/")[3] || "2";
    return { data: mockTeams[teamId]?.stats || mockTeams["2"].stats };
  }

  return { message: "Mock response fallback for " + apiPath, data: {} };
}

module.exports = {
  getFallback
};
