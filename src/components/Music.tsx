import { useState } from 'react';
import { Play, Pause, ExternalLink, Disc, Calendar, Eye, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { Album, Song } from '../types';

interface MusicProps {
  albums: Album[];
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayTrack: (track: Song, album: Album) => void;
  onPlayPause: () => void;
}

export default function Music({
  albums,
  currentSong,
  isPlaying,
  onPlayTrack,
  onPlayPause
}: MusicProps) {
  const [expandedAlbumId, setExpandedAlbumId] = useState<string | null>('if-im-being-honest');
  const [viewLyricsTrack, setViewLyricsTrack] = useState<Song | null>(null);
  const [selectedType, setSelectedType] = useState<'all' | 'album' | 'ep' | 'single'>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const toggleAlbum = (id: string) => {
    setExpandedAlbumId(expandedAlbumId === id ? null : id);
  };

  const handleTrackPlay = (track: Song, album: Album) => {
    if (currentSong?.id === track.id) {
      onPlayPause();
    } else {
      onPlayTrack(track, album);
    }
  };

  const filteredAndSortedAlbums = [...albums]
    .filter((album) => selectedType === 'all' || album.type === selectedType)
    .sort((a, b) => {
      const dateA = new Date(a.releaseDate).getTime();
      const dateB = new Date(b.releaseDate).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-12 animate-fade-in" id="music-section">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-earth-gold">THE CATALOG</span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-earth-linen uppercase tracking-wider">Music & Releases</h2>
        <div className="w-12 h-[1.5px] bg-earth-terracotta mx-auto" />
        <p className="max-w-xl mx-auto font-serif italic text-earth-linen-dark text-xs md:text-sm leading-relaxed opacity-80">
          "Every song is a confession, a quiet reflection recorded with warm microphones, vintage guitar pickups, and open hearts."
        </p>
      </div>

      {/* Filtering & Sorting Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-earth-linen/10">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {([
            { label: 'All Releases', value: 'all' },
            { label: 'Albums', value: 'album' },
            { label: 'EPs', value: 'ep' },
            { label: 'Singles', value: 'single' }
          ] as const).map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedType(cat.value)}
              className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-none border cursor-pointer ${
                selectedType === cat.value
                  ? 'bg-earth-terracotta text-earth-moss-dark border-earth-terracotta font-bold'
                  : 'bg-[#161412] border-earth-linen/10 text-earth-linen-dark hover:text-earth-linen hover:border-earth-terracotta'
              }`}
              id={`music-filter-${cat.value}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3 self-end sm:self-auto">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-earth-linen-dark">Sort by date</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'desc' | 'asc')}
            className="bg-[#161412] border border-earth-linen/10 text-earth-linen px-3 py-2 text-[10px] font-bold uppercase tracking-wider focus:outline-none focus:border-earth-terracotta rounded-none cursor-pointer"
            id="music-sort-select"
          >
            <option value="desc" className="bg-[#161412] text-earth-linen text-xs">Newest First</option>
            <option value="asc" className="bg-[#161412] text-earth-linen text-xs">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Albums list */}
      <div className="space-y-8">
        {filteredAndSortedAlbums.length > 0 ? (
          filteredAndSortedAlbums.map((album) => {
            const isExpanded = expandedAlbumId === album.id;
            return (
              <div
                key={album.id}
                className="bg-[#161412] border border-earth-linen/10 rounded-none overflow-hidden transition-all duration-300 hover:border-earth-terracotta shadow-xl"
                id={`album-card-${album.id}`}
              >
              {/* Card Header (Clickable toggler) */}
              <div
                onClick={() => toggleAlbum(album.id)}
                className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer hover:bg-[#1A1816]/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                  <img
                    src={album.coverUrl}
                    alt={album.title}
                    className="w-24 h-24 md:w-28 md:h-28 rounded-none object-cover border border-earth-linen/10 shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                      <span className="px-2 py-0.5 bg-[#1A1816] text-[10px] font-mono tracking-widest text-earth-gold uppercase border border-earth-linen/10 rounded-none">
                        {album.type}
                      </span>
                      {album.isLatest && (
                        <span className="px-2 py-0.5 bg-earth-terracotta/10 text-[10px] font-mono tracking-widest text-earth-terracotta uppercase border border-earth-terracotta/20 rounded-none">
                          LATEST RELEASES
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-earth-linen">{album.title}</h3>
                    <div className="flex items-center justify-center md:justify-start space-x-4 text-xs font-mono text-earth-linen-dark">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-earth-terracotta" />
                        {album.releaseDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Disc className="h-3 w-3 text-earth-gold" />
                        {album.tracks.length} Tracks
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="hidden md:inline text-xs font-mono tracking-widest text-earth-linen-dark uppercase">
                    {isExpanded ? 'Collapse tracks' : 'Expand tracks'}
                  </span>
                  <div className="p-2 rounded-none bg-[#1A1816] border border-earth-linen/10 text-earth-gold">
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </div>
              </div>

              {/* Expandable Tracks & Details */}
              {isExpanded && (
                <div className="border-t border-earth-linen/10 bg-[#1A1816]/30 p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
                  {/* Left Column: Album Details & Purchase buttons */}
                  <div className="lg:col-span-5 space-y-6">
                    <p className="font-sans text-sm text-earth-linen-dark leading-relaxed">
                      {album.description}
                    </p>

                    <div className="space-y-3">
                      <h4 className="text-[10px] font-mono uppercase text-earth-gold tracking-widest">Listen or Purchase</h4>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a
                          href={album.spotifyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 py-3 px-4 bg-[#1DB954] hover:bg-[#1ed760] text-black text-xs font-bold uppercase tracking-wider rounded-none transition-colors w-full cursor-pointer"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>Spotify</span>
                        </a>
                        <a
                          href={album.appleMusicUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 py-3 px-4 bg-[#FA243C] hover:bg-[#fc3c52] text-white text-xs font-bold uppercase tracking-wider rounded-none transition-colors w-full cursor-pointer"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>Apple Music</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Interactive Tracklist */}
                  <div className="lg:col-span-7 space-y-3">
                    <h4 className="text-[10px] font-mono uppercase text-earth-gold tracking-widest mb-4">Tracklist</h4>
                    <div className="divide-y divide-earth-linen/10">
                      {album.tracks.map((track, idx) => {
                        const isCurrentPlaying = currentSong?.id === track.id && isPlaying;
                        const isSelected = currentSong?.id === track.id;

                        return (
                          <div
                            key={track.id}
                            className={`py-3 flex items-center justify-between group transition-colors ${
                              isSelected ? 'bg-[#1A1816] px-3 rounded-none' : 'hover:bg-[#1A1816]/50'
                            }`}
                          >
                            <div className="flex items-center space-x-4 min-w-0">
                              <span className="font-mono text-xs text-earth-linen-dark w-6">
                                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                              </span>
                              <button
                                onClick={() => handleTrackPlay(track, album)}
                                className={`p-1.5 rounded-none transition-all border cursor-pointer ${
                                  isSelected
                                    ? 'bg-earth-terracotta border-earth-terracotta text-earth-moss-dark font-bold'
                                    : 'border-earth-linen/10 text-earth-linen-dark hover:text-earth-linen hover:border-earth-terracotta'
                                }`}
                              >
                                {isCurrentPlaying ? (
                                  <Pause className="h-3 w-3 fill-current" />
                                ) : (
                                  <Play className="h-3 w-3 fill-current pl-0.5" />
                                )}
                              </button>
                              <span className={`font-serif text-sm font-semibold truncate ${
                                isSelected ? 'text-earth-gold' : 'text-earth-linen'
                              }`}>
                                {track.title}
                              </span>
                            </div>

                            <div className="flex items-center space-x-4">
                              {track.lyrics && (
                                <button
                                  onClick={() => setViewLyricsTrack(viewLyricsTrack?.id === track.id ? null : track)}
                                  className="p-1 text-earth-linen-dark hover:text-earth-gold transition-colors cursor-pointer"
                                  title="View Lyrics"
                                >
                                  <FileText className="h-4 w-4" />
                                </button>
                              )}
                              <span className="font-mono text-xs text-earth-linen-dark">{track.duration}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="text-center py-16 space-y-4 bg-[#161412] border border-earth-linen/10 p-8">
          <Disc className="h-12 w-12 text-earth-linen-dark mx-auto animate-spin" style={{ animationDuration: '6s' }} />
          <h4 className="font-serif text-lg font-bold text-earth-linen uppercase tracking-wider">No Releases Found</h4>
          <p className="text-xs text-earth-linen-dark opacity-80 max-w-md mx-auto">
            There are currently no releases under this category. Check back later or try changing your filters.
          </p>
        </div>
      )}
      </div>

      {/* Embedded Spotify Live Embed (Highly elegant streaming module requested in Technical Considerations!) */}
      <div className="bg-[#161412] border border-earth-linen/10 rounded-none p-6 space-y-6 shadow-xl">
        <h3 className="font-serif text-xl font-bold text-earth-linen uppercase tracking-wider text-center md:text-left">
          Listen on Streaming Services
        </h3>
        <div className="w-full h-80 rounded-none overflow-hidden border border-earth-linen/10">
          <iframe
            src="https://open.spotify.com/embed/artist/5o6oaYrumOkkzsOmwZXJv6?utm_source=generator&theme=0"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="border-0"
            title="Spotify Player Embed"
          />
        </div>
      </div>

      {/* Lyrics Viewing Modal */}
      {viewLyricsTrack && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="lyrics-modal">
          <div className="bg-[#161412] border border-earth-linen/10 max-w-lg w-full max-h-[80vh] overflow-hidden rounded-none shadow-2xl flex flex-col">
            <div className="p-6 border-b border-earth-linen/10 flex justify-between items-center bg-[#1A1816]">
              <div>
                <h4 className="font-serif text-xl font-bold text-earth-linen">{viewLyricsTrack.title}</h4>
                <p className="text-[10px] font-mono text-earth-gold uppercase tracking-[0.2em] mt-1">Written by MALIA</p>
              </div>
              <button
                onClick={() => setViewLyricsTrack(null)}
                className="text-earth-linen hover:text-earth-terracotta font-mono text-[10px] tracking-widest border border-earth-linen/10 rounded-none px-3 py-1.5 cursor-pointer uppercase font-bold"
              >
                CLOSE
              </button>
            </div>
            <div className="p-6 overflow-y-auto text-center bg-[#161412]">
              <p className="font-serif italic text-base leading-relaxed text-earth-linen whitespace-pre-line leading-8">
                {viewLyricsTrack.lyrics}
              </p>
            </div>
            <div className="p-4 bg-[#1A1816] border-t border-earth-linen/10 flex justify-center text-[10px] font-mono text-earth-linen-dark tracking-wider">
              © MALIA MUSIC PUBLISHING ALL RIGHTS RESERVED
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
