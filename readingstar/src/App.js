import React, { useState, useEffect, useRef, Fragment } from 'react';

// SVGs as strings
const starSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="#FFD700" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
</svg>`;
const closeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d0021b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
const deleteSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d0021b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`;
const createFolderSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0078d4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 21H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h5l2 3h9a2 2 0 0 1 2 2v2M19 15v6M16 18h6"/></svg>`;
const fullscreenSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" /></svg>`;
const settingsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.14,12.94c0.04,-0.3 0.06,-0.61 0.06,-0.94c0,-0.32 -0.02,-0.64 -0.07,-0.94l2.03,-1.58c0.18,-0.14 0.23,-0.41 0.12,-0.61l-1.92,-3.32c-0.12,-0.22 -0.39,-0.29 -0.61,-0.22l-2.39,0.96c-0.5,-0.38 -1.03,-0.7 -1.62,-0.94L14.4,2.81c-0.04,-0.24 -0.24,-0.41 -0.48,-0.41h-3.84c-0.24,0 -0.43,0.17 -0.47,0.41L9.25,5.35C8.66,5.59 8.12,5.92 7.63,6.29L5.24,5.33c-0.22,-0.08 -0.49,0 -0.61,0.22L2.62,8.87C2.52,9.08 2.57,9.34 2.75,9.48l2.03,1.58C4.84,11.36 4.8,11.69 4.8,12s0.02,0.64 0.07,0.94l-2.03,1.58c-0.18,0.14 -0.23,0.41 -0.12,0.61l1.92,3.32c0.12,0.22 0.39,0.29 0.61,0.22l2.39,-0.96c0.5,0.38 1.03,0.7 1.62,0.94l0.36,2.54c0.05,0.24 0.24,0.41 0.48,0.41h3.84c0.24,0 0.44,-0.17 0.47,-0.41l0.36,-2.54c0.59,-0.24 1.13,-0.56 1.62,-0.94l2.39,0.96c0.22,0.08 0.49,0 0.61,-0.22l1.92,-3.32c0.12,-0.22 0.07,-0.47 -0.12,-0.61L19.14,12.94zM12,15.6c-1.98,0 -3.6,-1.62 -3.6,-3.6s1.62,-3.6 3.6,-3.6s3.6,1.62 3.6,3.6S13.98,15.6 12,15.6z"/></svg>`;
const contributionSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>`;

function SvgXml({ xml, width, height, style, onClick }) {
    return (
        <span
            style={{ display: 'inline-block', width, height, ...style, cursor: onClick ? 'pointer' : undefined }}
            onClick={onClick}
            dangerouslySetInnerHTML={{ __html: xml }}
        />
    );
}

export default function App() {
    // State variables
    const [score, setScore] = useState(0);
    const [finalScore, setFinalScore] = useState(-1);
    const [selectedSong, setSelectedSong] = useState('');
    const [difficulty, setDifficulty] = useState('Medium');
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [embedUrl, setEmbedUrl] = useState('');
    const [lyrics, setLyrics] = useState([]);
    const [currentLyric, setCurrentLyric] = useState('');
    const [inputUrl, setInputUrl] = useState('');
    const [currentTime, setCurrentTime] = useState(-1);
    const [videoStartTime, setVideoStartTime] = useState(0);
    const [videoUnavailable, setVideoUnavailable] = useState(false);
    const [songTitle, setSongTitle] = useState('');
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [showStar, setShowStar] = useState(false);
    const [videoPlaying, setVideoPlaying] = useState(false);
    const [playlist, setPlaylist] = useState([
        { id: 0, name: 'Humpty Dumpty', url: 'https://www.youtube.com/watch?v=nrv495corBc' },
        { id: 1, name: 'The Hokey Cokey', url: 'https://www.youtube.com/watch?v=YAMYsNe7DMQ' },
    ]);
    const [playlistName, setPlaylistName] = useState('Classic Nursery Rhymes');
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [allPlaylistNames, setAllPlaylistNames] = useState(['Classic Nursery Rhymes']);
    const [allPlaylistsGetter, setAllPlaylistsGetter] = useState({
        'Classic Nursery Rhymes': [
            { id: 0, name: 'Humpty Dumpty', url: 'https://www.youtube.com/watch?v=nrv495corBc' },
            { id: 1, name: 'The Hokey Cokey', url: 'https://www.youtube.com/watch?v=YAMYsNe7DMQ' },
        ]
    });
    const [playlistLoaded, setPlaylistLoaded] = useState(true);
    const [isScored, setIsScored] = useState(true);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [showContributionModal, setShowContributionModal] = useState(false);

    const [lyricsSettings, setLyricsSettings] = useState({
        fontSize: 32,
        fontColor: '#005bb5',
        fontStyle: 'normal',
        fontWeight: 'normal',
        lineSpacing: 16,
        fontFamily: 'System',
        background: 'curtain',
    });

    // Remove bracketed text utility
    function removeBracketedText(lyric) {
        if (!lyric) return '';
        return lyric.replace(/\[.*?\]/g, '').replace(/\(.*?\)/g, '').replace(/\n/g, ' ');
    }

    // YouTube embed logic
    function getYoutubeEmbedUrl(url) {
        const videoId = url.split('v=')[1]?.split('&')[0];
        setEmbedUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`);
        setVideoPlaying(true);
        setSongTitle(playlist.find(s => s.url === url)?.name || '');
        setCurrentLyric(lyrics[0]?.lyric || '');
        setFinalScore(-1);
    }

    // Playlist switching
    function switchPlaylist(name) {
        setPlaylistLoaded(false);
        setPlaylistName(name);
        setPlaylist(allPlaylistsGetter[name] || []);
        setPlaylistLoaded(true);
    }

    // Difficulty switching
    function switchDifficulty(level) {
        setDifficulty(level);
    }

    return (
        <div style={{ fontFamily: 'sans-serif', background: '#faf9f6', minHeight: '100vh' }}>
            {/* Header */}
            <header style={{ display: 'flex', alignItems: 'center', padding: 16, background: '#fff', borderBottom: '1px solid #eee' }}>
                <h1 style={{ margin: 0, fontSize: 28, color: '#005bb5', flex: 1 }}>ReadingStar</h1>
                <SvgXml xml={starSvg} width={24} height={24} />
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 24 }}>
                    <span style={{ marginRight: 8 }}>Scoring on?</span>
                    <input
                        type="checkbox"
                        checked={isScored}
                        onChange={() => setIsScored(!isScored)}
                        style={{ width: 24, height: 24, accentColor: isScored ? '#00b533' : '#dc2626' }}
                    />
                    <button onClick={() => setShowContributionModal(true)} style={{ background: 'none', border: 'none', marginLeft: 16 }}>
                        <SvgXml xml={contributionSvg} width={24} height={24} />
                    </button>
                    <button onClick={() => setShowSettingsModal(true)} style={{ background: 'none', border: 'none', marginLeft: 8 }}>
                        <SvgXml xml={settingsSvg} width={24} height={24} />
                    </button>
                    <button
                        onClick={() => setIsFocusMode(!isFocusMode)}
                        style={{
                            background: isFocusMode ? '#005bb5' : '#eee',
                            color: isFocusMode ? '#fff' : '#005bb5',
                            border: 'none',
                            borderRadius: 4,
                            marginLeft: 8,
                            padding: '4px 12px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <SvgXml xml={fullscreenSvg} width={20} height={20} style={{ marginRight: 4 }} />
                        Focus Mode
                    </button>
                </div>
            </header>

            {/* Contribution Modal */}
            {showContributionModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
                }}>
                    <div style={{ background: '#fff', borderRadius: 8, width: 400, maxWidth: '90vw', padding: 24, position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ margin: 0 }}>Special Thanks to</h2>
                            <button onClick={() => setShowContributionModal(false)} style={{ background: 'none', border: 'none' }}>
                                <SvgXml xml={closeSvg} width={24} height={24} />
                            </button>
                        </div>
                        <div style={{ marginTop: 16 }}>
                            <h4>Contributors</h4>
                            <p>• Yusuf Afifi<br />• Anthony Nkyi<br />• Ediz Cinbas<br />• Jerry Wu</p>
                            <h4>Sponsors</h4>
                            <p>• Intel<br />• National Autistic Society</p>
                            <h4>Supervisor</h4>
                            <p>• Dean Mohamedally (University College London)</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Settings Modal */}
            {showSettingsModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
                }}>
                    <div style={{ background: '#fff', borderRadius: 8, width: 400, maxWidth: '90vw', padding: 24, position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ margin: 0 }}>Settings</h2>
                            <button onClick={() => setShowSettingsModal(false)} style={{ background: 'none', border: 'none' }}>
                                <SvgXml xml={closeSvg} width={24} height={24} />
                            </button>
                        </div>
                        <div style={{ marginTop: 16 }}>
                            <div style={{ marginBottom: 16 }}>
                                <label>Font Size: </label>
                                <input
                                    type="range"
                                    min={16}
                                    max={64}
                                    value={lyricsSettings.fontSize}
                                    onChange={e => setLyricsSettings({ ...lyricsSettings, fontSize: Number(e.target.value) })}
                                />
                                <span style={{ marginLeft: 8 }}>{lyricsSettings.fontSize}px</span>
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <label>Font Color: </label>
                                <input
                                    type="color"
                                    value={lyricsSettings.fontColor}
                                    onChange={e => setLyricsSettings({ ...lyricsSettings, fontColor: e.target.value })}
                                />
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <label>Font Style: </label>
                                <select
                                    value={lyricsSettings.fontStyle}
                                    onChange={e => setLyricsSettings({ ...lyricsSettings, fontStyle: e.target.value })}
                                >
                                    <option value="normal">Normal</option>
                                    <option value="italic">Italic</option>
                                </select>
                                <select
                                    value={lyricsSettings.fontWeight}
                                    onChange={e => setLyricsSettings({ ...lyricsSettings, fontWeight: e.target.value })}
                                    style={{ marginLeft: 8 }}
                                >
                                    <option value="normal">Normal</option>
                                    <option value="bold">Bold</option>
                                </select>
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <label>Line Spacing: </label>
                                <input
                                    type="range"
                                    min={8}
                                    max={32}
                                    value={lyricsSettings.lineSpacing}
                                    onChange={e => setLyricsSettings({ ...lyricsSettings, lineSpacing: Number(e.target.value) })}
                                />
                                <span style={{ marginLeft: 8 }}>{lyricsSettings.lineSpacing}px</span>
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <label>Font Family: </label>
                                <select
                                    value={lyricsSettings.fontFamily}
                                    onChange={e => setLyricsSettings({ ...lyricsSettings, fontFamily: e.target.value })}
                                >
                                    <option value="System">System Default</option>
                                    <option value="Arial">Arial</option>
                                    <option value="Helvetica">Helvetica</option>
                                    <option value="Verdana">Verdana</option>
                                    <option value="Times New Roman">Times New Roman</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Courier New">Courier New</option>
                                    <option value="Trebuchet MS">Trebuchet MS</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main layout */}
            <main style={{ display: 'flex', marginTop: 32 }}>
                {!isFocusMode && (
                    <aside style={{ width: 260, background: '#f5f5f5', padding: 16, borderRight: '1px solid #eee', minHeight: '80vh' }}>
                        <h3>{playlistName}</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {playlistLoaded && playlist.map(song => (
                                <li key={song.id} style={{ marginBottom: 8 }}>
                                    <button
                                        style={{
                                            background: selectedSong === song.name ? '#005bb5' : '#fff',
                                            color: selectedSong === song.name ? '#fff' : '#005bb5',
                                            border: '1px solid #005bb5',
                                            borderRadius: 4,
                                            padding: '4px 8px',
                                            width: '100%',
                                            textAlign: 'left',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => {
                                            setSelectedSong(song.name);
                                            setYoutubeUrl(song.url);
                                            getYoutubeEmbedUrl(song.url);
                                        }}
                                    >
                                        {song.name}
                                        <span
                                            style={{ float: 'right', cursor: 'pointer' }}
                                            onClick={e => {
                                                e.stopPropagation();
                                                setPlaylist(playlist.filter(s => s.id !== song.id));
                                            }}
                                        >
                                            <SvgXml xml={deleteSvg} width={20} height={20} />
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </aside>
                )}
                <section style={{
                    flex: 1,
                    padding: 32,
                    background: isFocusMode ? '#222' : '#faf9f6',
                    minHeight: '80vh',
                    position: 'relative'
                }}>
                    {/* Score Box */}
                    {isScored && (
                        <div style={{
                            background: '#005bb5',
                            color: '#fff',
                            padding: '12px 24px',
                            borderRadius: 8,
                            fontWeight: 'bold',
                            fontSize: 24,
                            marginBottom: 24,
                            display: 'inline-block'
                        }}>
                            Score: {score}
                        </div>
                    )}

                    {/* YouTube Link Input */}
                    <div style={{ display: 'flex', marginBottom: 24, gap: 8 }}>
                        <input
                            type="text"
                            value={inputUrl}
                            onChange={e => setInputUrl(e.target.value)}
                            placeholder="Paste YouTube link here"
                            style={{
                                flex: 1,
                                padding: 8,
                                fontSize: 16,
                                border: '1px solid #ccc',
                                borderRadius: 4
                            }}
                        />
                        <button
                            onClick={() => {
                                if (inputUrl.length > 0 && inputUrl.includes('youtube.com')) {
                                    setYoutubeUrl(inputUrl);
                                    getYoutubeEmbedUrl(inputUrl);
                                    setInputUrl('');
                                }
                            }}
                            style={{
                                background: '#0078d4',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 4,
                                padding: '8px 16px',
                                fontSize: 16,
                                cursor: 'pointer'
                            }}
                        >
                            Go
                        </button>
                    </div>

                    {showStar && (
                        <div style={{ position: 'absolute', top: 40, right: 40 }}>
                            <SvgXml xml={starSvg} width={100} height={100} />
                        </div>
                    )}
                    <div style={{
                        fontSize: lyricsSettings.fontSize,
                        color: lyricsSettings.fontColor,
                        fontStyle: lyricsSettings.fontStyle,
                        fontWeight: lyricsSettings.fontWeight,
                        lineHeight: `${lyricsSettings.lineSpacing}px`,
                        fontFamily: lyricsSettings.fontFamily === 'System' ? undefined : lyricsSettings.fontFamily,
                        background: isFocusMode ? '#111' : undefined,
                        borderRadius: 8,
                        padding: 24,
                        minHeight: 200
                    }}>
                        {youtubeUrl ? (
                            <div style={{ marginBottom: 24 }}>
                                <iframe
                                    width="100%"
                                    height="360"
                                    src={embedUrl}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{ borderRadius: 8, marginBottom: 16 }}
                                />
                                <h2 style={{ color: lyricsSettings.fontColor }}>{songTitle}</h2>
                                <p style={{ marginTop: 16 }}>{removeBracketedText(currentLyric) || 'Lyrics will appear here...'}</p>
                            </div>
                        ) : (
                            <p>Select a song to begin.</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}