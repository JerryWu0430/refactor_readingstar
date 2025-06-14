"use client"

import { useState, useEffect, useRef } from "react"

// SVG icons as components
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
  </svg>
)
 
const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
    <path
      fill="#FFD700"
      d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
    />
  </svg>
)

const AccountIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M6,17C6,15 10,13.9 12,13.9C14,13.9 18,15 18,17V18H6M15,9A3,3 0 0,1 12,12A3,3 0 0,1 9,9A3,3 0 0,1 12,6A3,3 0 0,1 15,9M3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3H5C3.89,3 3,3.9 3,5Z" />
  </svg>
)

const MicrophoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
  </svg>
)

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#d0021b"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
)

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#d0021b"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
)

const CreateFolderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#0078d4"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 21H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h5l2 3h9a2 2 0 0 1 2 2v2M19 15v6M16 18h6" />
  </svg>
)

const FullscreenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
    <path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" />
  </svg>
)

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M19.14,12.94c0.04,-0.3 0.06,-0.61 0.06,-0.94c0,-0.32 -0.02,-0.64 -0.07,-0.94l2.03,-1.58c0.18,-0.14 0.23,-0.41 0.12,-0.61l-1.92,-3.32c-0.12,-0.22 -0.39,-0.29 -0.61,-0.22l-2.39,0.96c-0.5,-0.38 -1.03,-0.7 -1.62,-0.94L14.4,2.81c-0.04,-0.24 -0.24,-0.41 -0.48,-0.41h-3.84c-0.24,0 -0.43,0.17 -0.47,0.41L9.25,5.35C8.66,5.59 8.12,5.92 7.63,6.29L5.24,5.33c-0.22,-0.08 -0.49,0 -0.61,0.22L2.62,8.87C2.52,9.08 2.57,9.34 2.75,9.48l2.03,1.58C4.84,11.36 4.8,11.69 4.8,12s0.02,0.64 0.07,0.94l-2.03,1.58c-0.18,0.14 -0.23,0.41 -0.12,0.61l1.92,3.32c0.12,0.22 0.39,0.29 0.61,0.22l2.39,-0.96c0.5,0.38 1.03,0.7 1.62,0.94l0.36,2.54c0.05,0.24 0.24,0.41 0.48,0.41h3.84c0.24,0 0.44,-0.17 0.47,-0.41l0.36,-2.54c0.59,-0.24 1.13,-0.56 1.62,-0.94l2.39,0.96c0.22,0.08 0.49,0 0.61,-0.22l1.92,-3.32c0.12,-0.22 0.07,-0.47 -0.12,-0.61L19.14,12.94zM12,15.6c-1.98,0 -3.6,-1.62 -3.6,-3.6s1.62,-3.6 3.6,-3.6s3.6,1.62 3.6,3.6S13.98,15.6 12,15.6z" />
  </svg>
)

const ContributionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
  </svg>
)

// Helper function to make API calls with proper error handling
const makeApiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Only try to parse JSON if the response has content
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      return await response.json()
    }
    return response
  } catch (error) {
    console.error(`API call failed for ${url}:`, error)
    throw error
  }
}

// Add LoadingScreen component
const LoadingScreen = ({ attempts, maxAttempts }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f8f9fa",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "24px",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          color: "#333",
          marginRight: "16px",
        }}
      >
        Reading Star
      </h1>
      <StarIcon />
    </div>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "4px solid #e0e0e0",
          borderTop: "4px solid #0078d4",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <span
        style={{
          fontSize: "24px",
          color: "#666",
        }}
      >
        {attempts >= maxAttempts ? "Starting with offline mode..." : `Loading... (${attempts}/${maxAttempts})`}
      </span>
    </div>

    <p
      style={{
        fontSize: "16px",
        color: "#888",
        marginTop: "16px",
        textAlign: "center",
        maxWidth: "400px",
      }}
    >
      {attempts >= maxAttempts 
        ? "The speech recognition engine couldn't be reached, but you can still use the app with basic features."
        : "Starting up the speech recognition engine. This may take a moment."}
    </p>

    <style jsx>{`
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
)

export default function App() {
  // Add API loading state
  const [isApiReady, setIsApiReady] = useState(false)
  const [apiCheckAttempts, setApiCheckAttempts] = useState(0)
  const [apiAvailable, setApiAvailable] = useState(true) // Track if API is actually available

  const [score, setScore] = useState(0)
  const [finalScore, setFinalScore] = useState(-1)
  const [selectedSong, setSelectedSong] = useState("")
  const [difficulty, setDifficulty] = useState("Medium")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [embedUrl, setEmbedUrl] = useState("")
  const [lyrics, setLyrics] = useState([])
  const [currentLyric, setCurrentLyric] = useState("")
  const [inputUrl, setInputUrl] = useState("")
  const [currentTime, setCurrentTime] = useState(-1)
  const [videoStartTime, setVideoStartTime] = useState(0)
  const [videoUnavailable, setVideoUnavailable] = useState(false)
  const [videoLoading, setVideoLoading] = useState(false)
  const [songTitle, setSongTitle] = useState("")
  const [isFocusMode, setIsFocusMode] = useState(false)
  const [showStar, setShowStar] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [playlist, setPlaylist] = useState([])
  const [playlistName, setPlaylistName] = useState("Classic Nursery Rhymes")
  const [newPlaylistName, setNewPlaylistName] = useState("")
  const [allPlaylistNames, setAllPlaylistNames] = useState([])
  const [allPlaylistsGetter, setAllPlaylistsGetter] = useState({})
  const [playlistLoaded, setPlaylistLoaded] = useState(false)
  const [isScored, setIsScored] = useState(true)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showContributionModal, setShowContributionModal] = useState(false)

  const [lyricsSettings, setLyricsSettings] = useState({
    fontSize: 32,
    fontColor: "#005bb5",
    fontStyle: "normal",
    fontWeight: "normal",
    lineSpacing: 16,
    fontFamily: "System",
    background: "curtain",
  })

  const previousLyricRef = useRef("")
  const timeIntervalRef = useRef(null)

  // Add function to check API readiness
  const checkApiReadiness = async () => {
    const maxAttempts = 30 // 30 seconds maximum wait time
    const checkInterval = 1000 // Check every 1 second

    const attemptApiCall = async (attempt) => {
      try {
        console.log(`[API Check] Attempt ${attempt + 1}/${maxAttempts}`)
        setApiCheckAttempts(attempt + 1)

        const playlistData = await makeApiCall("http://localhost:8000/playlists", {
          method: "GET",
        })

        // If we get a valid response with playlists array, API is ready
        if (playlistData && playlistData.playlists && Array.isArray(playlistData.playlists)) {
          console.log("[API Check] API is ready!")
          setApiAvailable(true)
          setIsApiReady(true)
          return true
        } else {
          throw new Error("Invalid playlist response format")
        }
      } catch (error) {
        console.log(`[API Check] Attempt ${attempt + 1} failed:`, error.message)

        if (attempt < maxAttempts - 1) {
          // Wait before next attempt
          await new Promise((resolve) => setTimeout(resolve, checkInterval))
          return attemptApiCall(attempt + 1)
        } else {
          console.error("[API Check] Max attempts reached, proceeding with fallback data")
          setApiAvailable(false) // Mark API as unavailable
          setIsApiReady(true) // Still proceed to show the app
          return false
        }
      }
    }

    return attemptApiCall(0)
  }

  const fetchPlaylists = async () => {
    setPlaylistLoaded(false)
    try {
      const playlistData = await makeApiCall("http://localhost:8000/playlists", {
        method: "GET",
      })

      const allPlaylists = {}
      for (const playlist of playlistData.playlists) {
        allPlaylists[playlist?.name] = playlist.songs
      }

      setAllPlaylistsGetter(allPlaylists)
      setAllPlaylistNames(Object.keys(allPlaylists))
      if (!playlistName) setPlaylistName(Object.keys(allPlaylists)[0])
      setPlaylist(allPlaylists[playlistName] || [])
    } catch (error) {
      // Fallback data when backend is not available
      const allPlaylists = {
        "Nursery Rhymes OG": [
          { id: 0, name: "Humpty Dumpty", url: "https://www.youtube.com/watch?v=nrv495corBc" },
          { id: 1, name: "The Hokey Cokey", url: "https://www.youtube.com/watch?v=YAMYsNe7DMQ" },
          { id: 2, name: "Looby Loo", url: "https://www.youtube.com/watch?v=EHaoEKcuX0g" },
          { id: 3, name: "Twinkle, Twinkle...", url: "https://www.youtube.com/watch?v=yCjJyiqpAuU" },
          { id: 4, name: "Apples and Bananas", url: "https://www.youtube.com/watch?v=r5WLXZspD1M" },
          { id: 5, name: "Hush Little Baby", url: "https://www.youtube.com/watch?v=f_raDpgx_3M" },
        ],
      }
      setAllPlaylistsGetter(allPlaylists)
      setPlaylist(allPlaylists["Nursery Rhymes OG"])
      setPlaylistName("Nursery Rhymes OG")
      setAllPlaylistNames(Object.keys(allPlaylists))
      setIsScored(false)
      console.error("Failed to fetch playlists:", error)
    }
    setPlaylistLoaded(true)
  }

  function findFromPlaylist(url) {
    return playlist.find((item) => item.url === url) ?? {}
  }

  const onToggleSwitch = () => setIsScored(!isScored)

  const fetchTactiqTranscript = async (url) => {
    try {
      console.log("[Renderer] Attempting tactiq.io transcript fetch for:", url);
      
      const transcriptData = await window.electronAPI.fetchTactiqTranscript(url);
      console.log("[Renderer] Received response, type:", typeof transcriptData);
      console.log("[Renderer] Response length:", transcriptData ? transcriptData.length : 'null');
      console.log("[Renderer] Response preview:", transcriptData ? transcriptData.substring(0, 300) : 'null');
      console.log("[Renderer] FULL RAW TRANSCRIPT DATA:");
      console.log('='.repeat(60));
      console.log(transcriptData);
      console.log('='.repeat(60));
      
      let lyricsArray = [];
      
      if (typeof transcriptData === 'string') {
        // Try to parse as JSON first (for error responses)
        try {
          const jsonData = JSON.parse(transcriptData);
          console.log("[Renderer] Parsed as JSON:", jsonData);
          
          // Handle error responses
          if (jsonData.error) {
            console.warn("[Renderer] Tactiq.io error:", jsonData.message);
            console.log("[Renderer] Error details:", jsonData);
            
            if (jsonData.error === "PUPPETEER_NOT_AVAILABLE") {
              console.log("[Renderer] Install command:", jsonData.install_command);
            }
            
            setVideoUnavailable(true);
            return false;
          }
          
          // Handle tactiq.io API response format
          if (jsonData.captions && Array.isArray(jsonData.captions)) {
            console.log("[Renderer] Processing tactiq.io captions format...");
            lyricsArray = jsonData.captions.map((caption) => ({
              lyric: caption.text,
              time: parseFloat(caption.start),
              duration: parseFloat(caption.dur || 3) // Use dur if available, fallback to 3 seconds
            }));
            console.log("[Renderer] Converted", lyricsArray.length, "captions to lyrics");
          }
          // If it's a valid JSON response with transcript data
          else if (Array.isArray(jsonData)) {
            console.log("[Renderer] Processing array data...");
            lyricsArray = jsonData.map((item, index) => ({
              lyric: item.text || item.content || item.transcript || String(item),
              time: parseFloat(item.start || item.time || item.timestamp || index * 3),
              duration: parseFloat(item.dur || item.duration || 3)
            }));
          } else if (jsonData.transcript && Array.isArray(jsonData.transcript)) {
            console.log("[Renderer] Processing transcript array...");
            lyricsArray = jsonData.transcript.map((item, index) => ({
              lyric: item.text || item.content || String(item),
              time: parseFloat(item.start || item.time || item.timestamp || index * 3),
              duration: parseFloat(item.dur || item.duration || 3)
            }));
          }
          
        } catch (parseError) {
          console.log("[Renderer] Not JSON, processing as raw transcript text...");
          console.log("[Renderer] Parse error:", parseError.message);
          
          // Process raw transcript text from browser
          if (transcriptData.length > 100) {
            console.log("[Renderer] Processing raw transcript, length:", transcriptData.length);
            
            // Enhanced Method 1: Look for timestamp patterns and properly separate them
            console.log("[Renderer] Looking for timestamp patterns...");
            
            // Split by timestamp pattern and process each segment
            const segments = transcriptData.split(/(\d{2}:\d{2}:\d{2}\.\d{3})/);
            console.log("[Renderer] Split into", segments.length, "segments");
            
            for (let i = 1; i < segments.length; i += 2) {
              const timeStr = segments[i];
              const text = segments[i + 1];
              
              if (timeStr && text && text.trim().length > 5) {
                // Convert timestamp to seconds
                const timeParts = timeStr.split(':');
                const hours = parseInt(timeParts[0]);
                const minutes = parseInt(timeParts[1]);
                const secondsAndMs = parseFloat(timeParts[2]);
                const totalSeconds = hours * 3600 + minutes * 60 + secondsAndMs;
                
                // Clean the text
                const cleanText = text.replace(/\d{2}:\d{2}:\d{2}\.\d{3}/g, '').trim();
                
                if (cleanText.length > 3) {
                  console.log(`[Renderer] Segment ${i}:`, timeStr, "->", cleanText);
                  lyricsArray.push({
                    lyric: cleanText,
                    time: totalSeconds,
                    duration: 3 // Default duration
                  });
                }
              }
            }
            
            // Method 2: If no timestamps, split by sentences/lines
            if (lyricsArray.length === 0) {
              console.log("[Renderer] No timestamps found, splitting by sentences...");
              
              // Clean the text first
              let cleanText = transcriptData
                .replace(/Tactiq|YouTube Transcript Generator|Get started|Copy|Download|Privacy Policy|Terms of Service/gi, '')
                .replace(/\d{2}:\d{2}:\d{2}\.\d{3}/g, '') // Remove any remaining timestamps
                .replace(/\s+/g, ' ')
                .trim();
              
              console.log("[Renderer] Cleaned text length:", cleanText.length);
              console.log("[Renderer] Cleaned text preview:", cleanText.substring(0, 200));
              
              // Split by sentences or lines
              const sentences = cleanText
                .split(/[.!?]+|\n/)
                .map(s => s.trim())
                .filter(s => s.length > 10);
              
              console.log(`[Renderer] Split into ${sentences.length} sentences`);
              
              lyricsArray = sentences.map((sentence, index) => ({
                lyric: sentence,
                time: index * 3, // 3 seconds per sentence
                duration: 3
              }));
              
              console.log("[Renderer] First few sentences:", sentences.slice(0, 3));
            }
          }
        }
      }
      
      console.log("[Renderer] Final lyrics array length:", lyricsArray.length);
      if (lyricsArray.length > 0) {
        console.log("[Renderer] First few entries:", lyricsArray.slice(0, 3));
        
        setLyrics(lyricsArray);
        setVideoUnavailable(false);
        
        // Send to backend if available
        try {
          await makeApiCall("http://localhost:8000/full_lyric", {
            method: "POST",
            body: JSON.stringify({ lyric: lyricsArray }),
          });
        } catch (error) {
          console.log("Full lyric endpoint not available");
        }
        
        return true;
      } else {
        console.warn("[Renderer] No transcript data found");
        setVideoUnavailable(true);
        return false;
      }
      
    } catch (error) {
      console.error("[Renderer] Error fetching tactiq transcript:", error);
      return false;
    }
  };

  const fetchYoutubeSubtitles = async (url) => {
    console.log("[Renderer] Fetching subtitles using tactiq.io only...")
    
    try {
      const tactiqSuccess = await fetchTactiqTranscript(url);
      
      if (!tactiqSuccess) {
        console.error("[Renderer] Tactiq.io transcript fetch failed")
        setVideoUnavailable(true)
        return false;
      }
      return true;
    } catch (error) {
      console.error("[Renderer] Error in fetchYoutubeSubtitles:", error)
      setVideoUnavailable(true)
      return false;
    }
  }

  const getYoutubeEmbedUrl = async (url) => {
    const videoId = url.split("v=")[1]
    const ampersandPosition = videoId ? videoId.indexOf("&") : -1
    const finalVideoId = ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId
    
    getSongTitle(url)
    setVideoPlaying(false) // Don't start video immediately
    setVideoLoading(true) // Set loading state

    // Reset state for new video
    setLyrics([])
    setCurrentLyric("")
    setCurrentTime(0)
    setVideoUnavailable(false)
    previousLyricRef.current = ""

    console.log("[Renderer] Fetching transcript first...");
    
    // Fetch transcript first
    const transcriptSuccess = await fetchYoutubeSubtitles(url);
    
    if (transcriptSuccess) {
      console.log("[Renderer] Transcript loaded successfully, starting video now...");
      
      // Start video immediately after transcript is loaded
      console.log("[Renderer] Starting video now...");
      setEmbedUrl(`https://www.youtube.com/embed/${finalVideoId}?autoplay=1&controls=0&encrypted-media=1&enablejsapi=1`);
      setVideoPlaying(true);
      setVideoLoading(false); // Clear loading state
      
      setFinalScore(-1);
      const newStartTime = new Date().getTime();
      setVideoStartTime(newStartTime);

      // Start time tracking immediately
      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current);
      }

      timeIntervalRef.current = setInterval(() => {
        setCurrentTime((prev) => prev + 0.3);
      }, 300);
    } else {
      console.log("[Renderer] Failed to load transcript, not starting video");
      setVideoUnavailable(true);
      setVideoLoading(false); // Clear loading state
    }

    try {
      await makeApiCall("http://localhost:8000/close_microphone", {
        method: "GET",
      })
    } catch (error) {
      console.log("Microphone endpoint not available")
    }

    try {
      await makeApiCall("http://localhost:8000/transcribe", {
        method: "POST",
      })
    } catch (error) {
      console.log("Transcription endpoint not available")
    }
  }

  const startMatching = async (lyric) => {
    try {
      await makeApiCall("http://localhost:8000/update_lyric", {
        method: "POST",
        body: JSON.stringify({ lyric }),
      })
    } catch (error) {
      console.log("Update lyric endpoint not available")
    }
  }

  const checkMatch = async () => {
    try {
      const result = await makeApiCall("http://localhost:8000/match", {
        method: "GET",
      })

      if (result.match === "yes") {
        setShowStar(true)
        setScore((prevScore) => prevScore + Math.round(result.similarity * 100))
        setTimeout(() => setShowStar(false), 3000)
      }
    } catch (error) {
      console.log("Match endpoint not available")
    }
  }

  const updatePlaylistJson = async (playlist) => {
    try {
      await makeApiCall("http://localhost:8000/update_playlist", {
        method: "POST",
        body: JSON.stringify({ name: playlistName, songs: playlist, action: "update" }),
      })
    } catch (error) {
      console.log("Update playlist endpoint not available")
    }
  }

  const removePlaylistJson = async (name, song) => {
    try {
      await makeApiCall("http://localhost:8000/update_playlist", {
        method: "POST",
        body: JSON.stringify({ name: name, song: song, action: "remove" }),
      })
    } catch (error) {
      console.log("Remove playlist endpoint not available")
    }

    if (playlistName === name) {
      await switchPlaylist(Object.keys(allPlaylistsGetter)[0])
    }
    fetchPlaylists()
  }

  const createPlaylistJson = async (playlistName) => {
    try {
      await makeApiCall("http://localhost:8000/update_playlist", {
        method: "POST",
        body: JSON.stringify({
          id: Object.keys(allPlaylistsGetter).length,
          name: playlistName,
          songs: [],
          action: "create",
        }),
      })

      setAllPlaylistNames([...allPlaylistNames, playlistName])
      const newPlaylists = { ...allPlaylistsGetter }
      newPlaylists[playlistName] = []
      setAllPlaylistsGetter(newPlaylists)
      setPlaylistName(playlistName)
      setPlaylist([])
    } catch (error) {
      console.log("Create playlist endpoint not available")
    }
  }

  const getSongTitle = async (url) => {
    try {
      let title = findFromPlaylist(url).name ?? ""
      if (!title) {
        // Extract title from URL or use fallback
        const videoId = url.split("v=")[1]?.split("&")[0]
        title = `Video ${videoId || 'Unknown'}`

        const songItem = { id: playlist.length, name: title, url: url }
        const newPlaylist = [...playlist, songItem]
        setPlaylist(newPlaylist)

        const newPlaylists = { ...allPlaylistsGetter }
        newPlaylists[playlistName] = newPlaylist
        setAllPlaylistsGetter(newPlaylists)
        updatePlaylistJson(newPlaylist)
      }
      setScore(0)
      setSongTitle(title)
      setSelectedSong(title)
    } catch (error) {
      console.error("Error fetching song title:", error)
      setSongTitle("Unknown Song")
      setSelectedSong("Unknown Song")
    }
  }

  const playFromCurrentPlaylist = async (song) => {
    setSelectedSong(song)
    const songUrl = playlist.find((item) => item.name === song)?.url
    if (songUrl) {
      setYoutubeUrl(songUrl)
      getYoutubeEmbedUrl(songUrl)
    }
  }

  const switchPlaylist = (playlistName) => {
    if (allPlaylistsGetter[playlistName]) {
      setPlaylistLoaded(false)
      setPlaylistName(playlistName)
      setPlaylist(allPlaylistsGetter[playlistName])
      setPlaylistLoaded(true)
    } else {
      console.error("Playlist not found:", playlistName)
    }
  }

  const switchDifficulty = (difficulty) => {
    setDifficulty(difficulty)
  }

  useEffect(() => {
    if (currentTime > 0 && lyrics.length > 0) {
      const elapsedTime = currentTime

      // Find the current lyric by sorting and picking the highest start time that's <= currentTime
      const validLyrics = lyrics
        .filter(lyric => lyric && typeof lyric.time === "number" && lyric.time <= elapsedTime)
        .sort((a, b) => b.time - a.time) // Sort by time descending
      
      const currentLyricObj = validLyrics[0] || { lyric: "", time: 0 } // Get the most recent lyric

      // Safety check: ensure currentLyricObj exists and has lyric property
      const currentLyricText = currentLyricObj?.lyric || ""

      // Only update and call startMatching if the lyric has changed
      if (currentLyricText !== previousLyricRef.current) {
        previousLyricRef.current = currentLyricText
        setCurrentLyric(currentLyricText)
        startMatching(currentLyricText)
        checkMatch()
      }
    }
  }, [currentTime, lyrics])

  // Modified useEffect to check API readiness first
  useEffect(() => {
    const initializeApp = async () => {
      console.log("[App] Starting API readiness check...")
      await checkApiReadiness()
      console.log("[App] API check completed, fetching playlists...")
      fetchPlaylists()
    }

    initializeApp()
  }, [])

  useEffect(() => {
    const handleVisibilityChange = () => {
      // Only handle visibility changes if the API is ready and app is loaded
      if (!isApiReady || !apiAvailable) {
        console.log("Skipping visibility change handling - API not ready yet");
        return;
      }

      if (document.hidden) {
        // Remove timer stopping - let it continue running
        // if (timeIntervalRef.current) {
        //   clearInterval(timeIntervalRef.current)
        // }

        try {
          makeApiCall("http://localhost:8000/close_microphone", {
            method: "GET",
          })
        } catch (error) {
          console.log("Close microphone endpoint not available")
        }
      }
    }

    // Only add the event listener if the API is ready
    if (isApiReady) {
      document.addEventListener("visibilitychange", handleVisibilityChange)
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current)
      }
    }
  }, [isApiReady, apiAvailable]) // Add dependencies to re-run when API status changes

  const removeBracketedText = (lyric) => {
    if (lyric.includes("[") && lyric.includes("]")) {
      return lyric.replace(/\[.*?\]/g, "")
    }
    if (lyric.includes("(") && lyric.includes(")")) {
      return lyric.replace(/$$.*?$$/g, "")
    }
    if (lyric.includes("\n")) {
      return lyric.replace(/\n/g, " ")
    }
    return lyric
  }

  const backgroundImages = {
    curtain: "/assets/curtain.jpg",
    stage: "/assets/stage.jpg",
    concert: "/assets/concert.jpg",
  }

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      backgroundColor: "#f8f9fa",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    titleBar: {
      display: "flex",
      alignItems: "center",
      padding: "12px",
      backgroundColor: "#e0e0e0",
      borderBottom: "1px solid #c0c0c0",
      boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
    },
    titleText: {
      fontSize: "18px",
      fontWeight: "bold",
      marginLeft: "12px",
      marginRight: "8px",
      color: "#333",
      margin: 0,
    },
    emailText: {
      fontSize: "16px",
      color: "#333",
    },
    titleBarRight: {
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",
      gap: "12px",
    },
    content: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
    },
    sidebar: {
      width: "250px",
      backgroundColor: "#ffffff",
      borderRight: "1px solid #dcdcdc",
      padding: "16px",
    },
    playlistTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "16px",
      color: "#444",
    },
    playlistSubtitle: {
      fontSize: "16px",
      fontWeight: "bold",
      marginBottom: "16px",
      color: "#444",
    },
    playlistItem: {
      backgroundColor: "#e8f4ff",
      fontSize: "16px",
      padding: "8px",
      borderRadius: "4px",
      marginBottom: "4px",
      cursor: "pointer",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    playlistItemSelected: {
      backgroundColor: "#00008B",
    },
    playlistItemText: {
      fontSize: "14px",
      color: "#333",
    },
    playlistItemTextSelected: {
      color: "#FAF9F6",
      fontWeight: "bold",
    },
    mainContent: {
      flex: 1,
      padding: "16px",
      minWidth: "500px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: "#f8f9fa",
      position: "relative",
      overflow: "visible",
    },
    scoreContainer: {
      backgroundColor: "#005bb5",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #dcdcdc",
      textAlign: "center",
      marginBottom: "8px",
      boxShadow: "0 2px 3px rgba(0,0,0,0.2)",
    },
    scoreContainerFocus: {
      position: "absolute",
      top: "16px",
      right: "16px",
      zIndex: 4,
      marginBottom: 0,
      backgroundColor: "rgba(0, 91, 181, 0.9)",
    },
    scoreText: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#FAF9F6",
    },
    videoContainer: {
      aspectRatio: "16/9",
      backgroundColor: "#000",
      borderRadius: "8px",
      overflow: "hidden",
      position: "relative",
      width: "100%",
      maxWidth: "900px",
      maxHeight: "450px",
      alignSelf: "center",
      flex: 0,
      marginVertical: "2px",
      marginTop: "2px",
      marginBottom: "2px",
      zIndex: 3,
    },
    videoContainerFocus: {
      position: "relative",
      width: "100%",
      maxWidth: "1000px",
      maxHeight: "550px",
      alignSelf: "center",
      marginTop: "20px",
      marginBottom: "10px",
      borderRadius: "12px",
      overflow: "hidden",
      zIndex: 3,
      boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
    },
    iframe: {
      width: "100%",
      height: "100%",
      border: "none",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "transparent",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      textAlign: "center",
      padding: "20px",
    },
    lyricsContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "16px",
      marginTop: "16px",
      paddingLeft: "16px",
      paddingRight: "16px",
      paddingTop: "0px",
      paddingBottom: "0px",
    },
    lyricsContainerFocus: {
      marginTop: "10px",
      paddingLeft: "32px",
      paddingRight: "32px",
      paddingTop: "16px",
      paddingBottom: "16px",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      borderRadius: "16px",
      maxWidth: "90%",
      width: "90%",
      alignSelf: "center",
      zIndex: 3,
    },
    lyricsText: {
      fontSize: "32px",
      color: "#005bb5",
      fontStyle: "normal",
      fontWeight: "normal",
      lineHeight: "48px",
      fontFamily: "System",
      textAlign: "center",
      margin: 0,
    },
    lyricsTextLight: {
      color: "#FFFFFF",
      textShadow: "2px 2px 5px rgba(0, 0, 0, 0.75)",
    },
    rightPanel: {
      maxWidth: "250px",
      padding: "16px",
      backgroundColor: "#ffffff",
      borderLeft: "1px solid #dcdcdc",
      boxShadow: "0 2px 3px rgba(0,0,0,0.1)",
      overflowY: "auto",
    },
    difficultyContainer: {
      backgroundColor: "#f9f9f9",
      padding: "16px",
      borderRadius: "8px",
      border: "1px solid #dcdcdc",
      marginBottom: "16px",
      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
    },
    sectionTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "8px",
      color: "#444",
    },
    difficultyOption: {
      paddingTop: "8px",
      paddingBottom: "8px",
      paddingLeft: "6px",
      paddingRight: "6px",
      marginTop: "4px",
      marginBottom: "4px",
      marginLeft: "4px",
      marginRight: "4px",
      border: "1px solid #000",
      borderRadius: "8px",
      backgroundColor: "#f0f0f0",
      cursor: "pointer",
      minWidth: "60px",
    },
    difficultyText: {
      fontSize: "14px",
      fontWeight: "bold",
    },
    button: {
      backgroundColor: "#0078d4",
      padding: "12px",
      borderRadius: "4px",
      textAlign: "center",
      marginBottom: "8px",
      boxShadow: "0 2px 2px rgba(0,0,0,0.2)",
      cursor: "pointer",
      border: "none",
      width: "100%",
      position: "relative",
    },
    buttonText: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#fff",
    },
    inputContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
      paddingHorizontal: 0,
      width: "100%",
      maxWidth: "800px",
      alignSelf: "center",
    },
    textInput: {
      flex: 1,
      height: "40px",
      border: "1px solid #d1d1d1",
      borderRadius: "4px",
      paddingLeft: "12px",
      paddingRight: "12px",
      marginRight: "8px",
      backgroundColor: "#ffffff",
    },
    goButton: {
      height: "40px",
      paddingLeft: "16px",
      paddingRight: "16px",
      borderRadius: "4px",
      backgroundColor: "#0078d4",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
    },
    starContainer: {
      position: "absolute",
      top: "82%",
      left: "50%",
      zIndex: 10,
      width: "500px",
      height: "500px",
    },
    iconButton: {
      padding: "8px",
      borderRadius: "4px",
      backgroundColor: "#f0f0f0",
      border: "none",
      cursor: "pointer",
    },
    focusButton: {
      padding: "8px",
      borderRadius: "4px",
      backgroundColor: "#f0f0f0",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    focusButtonActive: {
      backgroundColor: "#0078d4",
      color: "#fff",
    },
    focusButtonText: {
      fontSize: "14px",
      color: "#333",
      fontWeight: "500",
    },
    mainContentFocus: {
      padding: 0,
      minWidth: "500px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: "transparent",
      position: "relative",
      overflow: "hidden",
    },
    fullscreenBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
    },
    solidBackground: {
      width: "100%",
      height: "100%",
    },
    backgroundImage: {
      width: "100%",
      height: "100%",
      position: "absolute",
      objectFit: "cover",
    },
    contentOverlay: {
      flex: 1,
      position: "relative",
      zIndex: 2,
    },
    contentOverlayFocus: {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      width: "80%",
      maxWidth: "500px",
      maxHeight: "80%",
      boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
    },
    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px",
      borderBottom: "1px solid #dcdcdc",
    },
    modalTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#333",
      margin: 0,
    },
    closeButton: {
      padding: "4px",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "transparent",
      cursor: "pointer",
    },
    modalScroll: {
      padding: "16px",
      maxHeight: "400px",
      overflowY: "auto",
    },
    switch: {
      position: "relative",
      display: "inline-block",
      width: "60px",
      height: "34px",
    },
    switchInput: {
      opacity: 0,
      width: 0,
      height: 0,
    },
    slider: {
      position: "absolute",
      cursor: "pointer",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#dc2626",
      transition: "0.4s",
      borderRadius: "34px",
    },
    sliderChecked: {
      backgroundColor: "#00b533",
    },
    sliderBefore: {
      position: "absolute",
      content: "",
      height: "26px",
      width: "26px",
      left: "4px",
      bottom: "4px",
      backgroundColor: "white",
      transition: "0.4s",
      borderRadius: "50%",
    },
    sliderBeforeChecked: {
      left: "30px",
    },
    iconTag: {
      position: "absolute",
      top: "8px",
      right: "-20px",
      zIndex: 100,
      width: "20px",
      height: "20px",
    },
    blockIcon: {
      position: "relative",
      display: "flex",
      marginRight: "20px",
    },
  }

  // Show loading screen if API is not ready
  if (!isApiReady) {
    return <LoadingScreen attempts={apiCheckAttempts} maxAttempts={30} />
  }

  return (
    <div style={styles.container}>
      {/* Title Bar */}
      <div style={styles.titleBar}>
        <h1 style={styles.titleText}>ReadingStar</h1>
        <StarIcon />

        <div style={styles.titleBarRight}>
          <span style={styles.emailText}>Scoring on?</span>
          <label style={styles.switch}>
            <input type="checkbox" checked={isScored} onChange={onToggleSwitch} style={styles.switchInput} />
            <span
              style={{
                ...styles.slider,
                ...(isScored ? styles.sliderChecked : {}),
              }}
            >
              <span
                style={{
                  ...styles.sliderBefore,
                  ...(isScored ? styles.sliderBeforeChecked : {}),
                }}
              />
            </span>
          </label>

          <button style={styles.iconButton} onClick={() => setShowContributionModal(true)}>
            <ContributionIcon />
          </button>

          <button style={styles.iconButton} onClick={() => setShowSettingsModal(true)}>
            <SettingsIcon />
          </button>

          <button
            style={{
              ...styles.focusButton,
              ...(isFocusMode ? styles.focusButtonActive : {}),
            }}
            onClick={() => setIsFocusMode(!isFocusMode)}
          >
            <FullscreenIcon />
            <span
              style={{
                ...styles.focusButtonText,
                color: isFocusMode ? "#fff" : "#333",
              }}
            >
              Focus Mode
            </span>
          </button>
        </div>
      </div>

      {/* Star Animation */}
      {showStar && (
        <div style={styles.starContainer}>
          <StarIcon />
        </div>
      )}

      {/* Contribution Modal */}
      {showContributionModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Special Thanks to</h2>
              <button style={styles.closeButton} onClick={() => setShowContributionModal(false)}>
                <CloseIcon />
              </button>
            </div>
            <div style={styles.modalScroll}>
              <div style={{ marginBottom: "12px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "4px",
                  }}
                >
                  Contributors
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#666",
                    lineHeight: "20px",
                    marginBottom: "8px",
                  }}
                >
                  • Yusuf Afifi
                  <br />• Anthony Nkyi
                  <br />• Ediz Cinbas
                  <br />• Jerry Wu
                </p>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "4px",
                  }}
                >
                  Sponsors
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#666",
                    lineHeight: "20px",
                    marginBottom: "8px",
                  }}
                >
                  • Intel
                  <br />• National Autistic Society
                </p>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "4px",
                  }}
                >
                  Supervisor
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#666",
                    lineHeight: "20px",
                    marginBottom: "8px",
                  }}
                >
                  • Professor Dean Mohamedally (University College London)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Settings</h2>
              <button style={styles.closeButton} onClick={() => setShowSettingsModal(false)}>
                <CloseIcon />
              </button>
            </div>
            <div style={styles.modalScroll}>
              {/* Font Size Setting */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "16px",
                  border: "1px solid #dcdcdc",
                }}
              >
                <label
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "12px",
                    display: "block",
                  }}
                >
                  Font Size
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <button
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "16px",
                      backgroundColor: "#0078d4",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                    onClick={() => {
                      const newValue = Math.max(16, lyricsSettings.fontSize - 4)
                      setLyricsSettings((prev) => ({
                        ...prev,
                        fontSize: newValue,
                      }))
                    }}
                  >
                    -
                  </button>
                  <span
                    style={{
                      width: "50px",
                      textAlign: "center",
                      color: "#666",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {Math.round(lyricsSettings.fontSize)}px
                  </span>
                  <button
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "16px",
                      backgroundColor: "#0078d4",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                    onClick={() => {
                      const newValue = Math.min(64, lyricsSettings.fontSize + 4)
                      setLyricsSettings((prev) => ({
                        ...prev,
                        fontSize: newValue,
                      }))
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Line Spacing Setting */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "16px",
                  border: "1px solid #dcdcdc",
                }}
              >
                <label
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "12px",
                    display: "block",
                  }}
                >
                  Line Spacing
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <button
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "16px",
                      backgroundColor: "#0078d4",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                    onClick={() => {
                      const newValue = Math.max(8, lyricsSettings.lineSpacing - 2)
                      setLyricsSettings((prev) => ({
                        ...prev,
                        lineSpacing: newValue,
                      }))
                    }}
                  >
                    -
                  </button>
                  <span
                    style={{
                      width: "50px",
                      textAlign: "center",
                      color: "#666",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {Math.round(lyricsSettings.lineSpacing)}px
                  </span>
                  <button
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "16px",
                      backgroundColor: "#0078d4",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                    onClick={() => {
                      const newValue = Math.min(32, lyricsSettings.lineSpacing + 2)
                      setLyricsSettings((prev) => ({
                        ...prev,
                        lineSpacing: newValue,
                      }))
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Font Style Setting */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "16px",
                  border: "1px solid #dcdcdc",
                }}
              >
                <label
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "12px",
                    display: "block",
                  }}
                >
                  Font Style
                </label>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {[
                    { style: "normal", weight: "normal", label: "Normal" },
                    { style: "italic", weight: "normal", label: "Italic" },
                    { style: "normal", weight: "bold", label: "Bold" },
                    { style: "italic", weight: "bold", label: "Bold Italic" },
                  ].map(({ style, weight, label }) => (
                    <button
                      key={label}
                      style={{
                        flex: 1,
                        minWidth: "45%",
                        padding: "12px",
                        borderRadius: "6px",
                        backgroundColor:
                          lyricsSettings.fontStyle === style && lyricsSettings.fontWeight === weight
                            ? "#0078d4"
                            : "#f0f0f0",
                        color:
                          lyricsSettings.fontStyle === style && lyricsSettings.fontWeight === weight ? "#fff" : "#666",
                        border: "1px solid #dcdcdc",
                        cursor: "pointer",
                        fontStyle: style,
                        fontWeight: weight,
                      }}
                      onClick={() =>
                        setLyricsSettings({
                          ...lyricsSettings,
                          fontStyle: style,
                          fontWeight: weight,
                        })
                      }
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Color Setting */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "16px",
                  border: "1px solid #dcdcdc",
                }}
              >
                <label
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "12px",
                    display: "block",
                  }}
                >
                  Font Color
                </label>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: "8px",
                    paddingHorizontal: "16px",
                  }}
                >
                  {[
                    "#000000",
                    "#FF0000",
                    "#FF4500",
                    "#FFA500",
                    "#FFD700",
                    "#32CD32",
                    "#00FF00",
                    "#00FFFF",
                    "#0000FF",
                    "#4B0082",
                    "#800080",
                  ].map((color) => (
                    <button
                      key={color}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "14px",
                        backgroundColor: color,
                        border: lyricsSettings.fontColor === color ? "2px solid #0078d4" : "2px solid transparent",
                        cursor: "pointer",
                        transform: lyricsSettings.fontColor === color ? "scale(1.1)" : "scale(1)",
                      }}
                      onClick={() => setLyricsSettings({ ...lyricsSettings, fontColor: color })}
                    />
                  ))}
                </div>
              </div>

              {/* Font Family Setting */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "16px",
                  border: "1px solid #dcdcdc",
                }}
              >
                <label
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "12px",
                    display: "block",
                  }}
                >
                  Font Family
                </label>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {[
                    { name: "System", label: "System Default" },
                    { name: "Arial", label: "Arial" },
                    { name: "Helvetica", label: "Helvetica" },
                    { name: "Verdana", label: "Verdana" },
                    { name: "Times New Roman", label: "Times New Roman" },
                    { name: "Georgia", label: "Georgia" },
                    { name: "Courier New", label: "Courier New" },
                    { name: "Trebuchet MS", label: "Trebuchet MS" },
                  ].map(({ name, label }) => (
                    <button
                      key={name}
                      style={{
                        flex: 1,
                        minWidth: "45%",
                        padding: "12px",
                        borderRadius: "6px",
                        backgroundColor: lyricsSettings.fontFamily === name ? "#0078d4" : "#f0f0f0",
                        color: lyricsSettings.fontFamily === name ? "#fff" : "#666",
                        border: "1px solid #dcdcdc",
                        cursor: "pointer",
                        fontFamily: name,
                        marginBottom: "8px",
                      }}
                      onClick={() => setLyricsSettings({ ...lyricsSettings, fontFamily: name })}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Setting */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "16px",
                  border: "1px solid #dcdcdc",
                }}
              >
                <label
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "12px",
                    display: "block",
                  }}
                >
                  Background
                </label>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    justifyContent: "space-between",
                  }}
                >
                  {[
                    { id: "black", label: "Black", color: "#000000" },
                    { id: "white", label: "White", color: "#FFFFFF" },
                    { id: "curtain", label: "Curtain", image: backgroundImages.curtain },
                    { id: "stage", label: "Stage", image: backgroundImages.stage },
                    { id: "concert", label: "Concert", image: backgroundImages.concert },
                  ].map((bg) => (
                    <button
                      key={bg.id}
                      style={{
                        width: "47%",
                        height: "120px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: lyricsSettings.background === bg.id ? "3px solid #0078d4" : "2px solid #dcdcdc",
                        marginBottom: "16px",
                        position: "relative",
                        backgroundColor: bg.color || "transparent",
                        cursor: "pointer",
                      }}
                      onClick={() => setLyricsSettings({ ...lyricsSettings, background: bg.id })}
                    >
                      {bg.image && (
                        <img
                          src={bg.image || "/placeholder.svg"}
                          alt={bg.label}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            position: "absolute",
                          }}
                        />
                      )}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          backgroundColor:
                            lyricsSettings.background === bg.id ? "rgba(0, 120, 212, 0.8)" : "rgba(0, 0, 0, 0.6)",
                          color: "#FFFFFF",
                          padding: "4px",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                      >
                        {bg.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

        {/* Main Content */}
        <div style={styles.content}>
          {/* Sidebar */}
          {!isFocusMode && (
            <div style={styles.sidebar}>
              <h2 style={styles.playlistTitle}>{playlistName}</h2>
              <div
                style={{
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                {playlistLoaded && playlist ? (
                  playlist.length > 0 ? (
                    playlist.map((song) => (
                      <div
                        key={song.id}
                        style={{
                          ...styles.playlistItem,
                          ...(song.name === selectedSong ? styles.playlistItemSelected : {}),
                        }}
                        onClick={() => playFromCurrentPlaylist(song.name)}
                      >
                        <span
                          style={{
                            ...styles.playlistItemText,
                            ...(song.name === selectedSong ? styles.playlistItemTextSelected : {}),
                          }}
                        >
                          {song.name}
                        </span>
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "4px",
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            removePlaylistJson(playlistName, song.name)
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p style={styles.playlistSubtitle}>Add some songs...</p>
                  )
                ) : (
                  <p>Playlist empty.</p>
                )}
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div
            style={{
              ...styles.mainContent,
              ...(isFocusMode ? styles.mainContentFocus : {}),
            }}
          >
            {/* Focus Mode Background */}
            {isFocusMode && (
              <div style={styles.fullscreenBackground}>
                {lyricsSettings.background === "black" ? (
                  <div
                    style={{
                      ...styles.solidBackground,
                      backgroundColor: "#000000",
                    }}
                  />
                ) : lyricsSettings.background === "white" ? (
                  <div
                    style={{
                      ...styles.solidBackground,
                      backgroundColor: "#FFFFFF",
                    }}
                  />
                ) : (
                  <img
                    src={backgroundImages[lyricsSettings.background]}
                    alt="Background"
                    style={styles.backgroundImage}
                  />
                )}
              </div>
            )}

            <div
              style={{
                ...styles.contentOverlay,
                ...(isFocusMode ? styles.contentOverlayFocus : {}),
              }}
            >
              {/* Score Container */}
              {isScored && (
                <div
                  style={{
                    ...styles.scoreContainer,
                    ...(isFocusMode ? styles.scoreContainerFocus : {}),
                  }}
                >
                  <span style={styles.scoreText}>Score: {score}</span>
                </div>
              )}

              {/* URL Input */}
              {!isFocusMode && (
                <div style={styles.inputContainer}>
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="Enter YouTube URL"
                    style={styles.textInput}
                  />
                  <button
                    style={styles.goButton}
                    onClick={() => {
                      if (inputUrl.length > 0 && inputUrl.includes("youtube.com")) {
                        let url = inputUrl
                        if (url.includes("&")) {
                          url = url.split("&")[0]
                        }
                        setYoutubeUrl(url)
                        getYoutubeEmbedUrl(url)
                        setInputUrl("")
                      }
                    }}
                  >
                    Go
                  </button>
                </div>
              )}

              {/* Video Container */}
              <div
                style={{
                  ...styles.videoContainer,
                  ...(isFocusMode ? styles.videoContainerFocus : {}),
                }}
              >
                {youtubeUrl ? (
                  videoPlaying ? (
                    <>
                      <iframe
                        src={embedUrl}
                        style={styles.iframe}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onLoad={() => {
                          // Check for video end after reasonable time
                          setTimeout(async () => {
                            setVideoPlaying(false)

                            // Clear time interval
                            if (timeIntervalRef.current) {
                              clearInterval(timeIntervalRef.current)
                            }

                            // Only close microphone when video actually ends
                            try {
                              await makeApiCall("http://localhost:8000/close_microphone", {
                                method: "GET",
                              })
                            } catch (error) {
                              console.log("Close microphone endpoint not available")
                            }

                            // Get final score
                            try {
                              const response = await makeApiCall("http://localhost:8000/final_score", {
                                method: "GET",
                              })
                              setFinalScore(response.final_score)
                            } catch (error) {
                              console.log("Final score endpoint not available")
                            }
                          }, 180000) // 3 minutes for demo
                        }}
                      />
                      {/* Transparent overlay to prevent user interaction */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: "transparent",
                          zIndex: 10,
                          cursor: "default",
                        }}
                      />
                    </>
                  ) : videoLoading ? (
                    <div style={styles.overlay}>
                      <p style={{ fontSize: "20px", marginBottom: "10px" }}>
                        Video Loading...
                      </p>
                      <p style={{ fontSize: "16px", color: "#ccc" }}>
                        We're processing the lyrics and preparing everything for you!
                      </p>
                    </div>
                  ) : (
                    <div style={styles.overlay}>
                      <p style={{ fontSize: "20px", marginBottom: "10px" }}>
                        Well done for completing the song "{songTitle}"!
                      </p>
                      {isScored && score > 0 && (
                        <p style={{ fontSize: "20px", marginBottom: "10px" }}>You won {score} points!</p>
                      )}
                      {isScored && finalScore > 0 && (
                        <p style={{ fontSize: "20px" }}>You were {Math.round(finalScore * 100)}% accurate!</p>
                      )}
                    </div>
                  )
                ) : (
                  <div style={styles.overlay}>
                    {videoUnavailable ? (
                      <>
                        <p style={{ fontSize: "20px", marginBottom: "10px" }}>
                          Unfortunately, this video could not be loaded, or had no captions.
                        </p>
                        <p style={{ fontSize: "20px", marginBottom: "10px" }}>
                          Use another song or Youtube link to try again.
                        </p>
                      </>
                    ) : (
                      <p style={{ fontSize: "20px" }}>Click the sidebar or enter a YouTube link to play a song!</p>
                    )}
                  </div>
                )}
              </div>

            {/* Lyrics Container */}
            <div
              style={{
                ...styles.lyricsContainer,
                ...( isFocusMode ? styles.lyricsContainerFocus : {}),
              }}
            >
              <p
                style={{
                  ...styles.lyricsText,
                  fontSize: `${lyricsSettings.fontSize}px`,
                  color: isFocusMode && lyricsSettings.background !== "white" ? "#FFFFFF" : lyricsSettings.fontColor,
                  fontStyle: lyricsSettings.fontStyle,
                  fontWeight: lyricsSettings.fontWeight,
                  lineHeight: `${lyricsSettings.lineSpacing + lyricsSettings.fontSize}px`,
                  fontFamily: lyricsSettings.fontFamily,
                  ...(isFocusMode && lyricsSettings.background !== "white" ? styles.lyricsTextLight : {}),
                }}
              >
                {removeBracketedText(currentLyric)}
              </p>

            </div>
          </div>
        </div>

        {/* Right Panel */}
        {!isFocusMode && (
          <div style={styles.rightPanel}>
            {/* Playlists Section */}
            <div style={styles.difficultyContainer}>
              <h3 style={styles.sectionTitle}>Playlists</h3>
              <div style={styles.inputContainer}>
                <input
                  type="text"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  placeholder="Create playlist:"
                  style={styles.textInput}
                />
                <button
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    if (newPlaylistName.length > 0) {
                      createPlaylistJson(newPlaylistName)
                      setNewPlaylistName("")
                    }
                  }}
                >
                  <CreateFolderIcon />
                </button>
              </div>
              <div style={{ height: "380px", overflowY: "auto" }}>
                {playlistLoaded ? (
                  allPlaylistNames.map((name) => (
                    <div key={name} style={styles.blockIcon}>
                      <div
                        style={{
                          ...styles.button,
                          backgroundColor: name === playlistName ? "#00b533" : "#0078d4",
                          cursor: "pointer",
                        }}
                        onClick={() => switchPlaylist(name)}
                      >
                        <button
                          style={{
                            position: "absolute",
                            top: "8px",
                            left: "0px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            zIndex: 100,
                            width: "20px",
                            height: "20px",
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            removePlaylistJson(name, "")
                          }}
                        >
                          <DeleteIcon />
                        </button>
                        <span style={styles.buttonText}>{name}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <p>Loading..</p>
                  </div>
                )}
              </div>
            </div>

            {/* Difficulty Section */}
            <div style={styles.difficultyContainer}>
              <h3 style={styles.sectionTitle}>AI Difficulty</h3>
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  overflowX: "auto",
                }}
              >
                {[
                  { label: "Easy", color: "#22c55e" },
                  { label: "Medium", color: "#f97316" },
                  { label: "Hard", color: "#dc2626" },
                ].map(({ label, color }) => (
                  <button
                    key={label}
                    style={{
                      ...styles.difficultyOption,
                      backgroundColor: difficulty === label ? color : "#f0f0f0",
                      borderColor: difficulty === label ? color : "#000",
                    }}
                    onClick={() => {
                      setDifficulty(label)
                      switchDifficulty(label)
                      try {
                        makeApiCall("http://localhost:8000/change_threshold", {
                          method: "POST",
                          body: JSON.stringify({ level: label }),
                        })
                      } catch (error) {
                        console.log("Change threshold endpoint not available")
                      }
                    }}
                  >
                    <span
                      style={{
                        ...styles.difficultyText,
                        color: difficulty === label ? "#fff" : color,
                      }}
                    >
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
