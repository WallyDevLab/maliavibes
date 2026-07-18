import { useState } from 'react';
import { Camera, Play, X, Image as ImageIcon, Video, Eye, Filter } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryProps {
  items: GalleryItem[];
}

type FilterType = 'all' | 'photo' | 'video' | 'live' | 'studio' | 'tour';

export default function Gallery({ items }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filterOptions: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All Media' },
    { value: 'photo', label: 'Photos Only' },
    { value: 'video', label: 'Videos' },
    { value: 'live', label: 'Live Stages' },
    { value: 'studio', label: 'In Studio' },
    { value: 'tour', label: 'On Tour' }
  ];

  const filteredItems = items.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'photo') return item.type === 'photo';
    if (activeFilter === 'video') return item.type === 'video';
    return item.category === activeFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-12 animate-fade-in" id="gallery-section">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-earth-gold">MEDIA JOURNAL</span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-earth-linen uppercase tracking-wider">Visual Gallery</h2>
        <div className="w-12 h-[1.5px] bg-earth-terracotta mx-auto" />
        <p className="max-w-xl mx-auto font-serif italic text-earth-linen-dark text-xs md:text-sm leading-relaxed opacity-80">
          "Capturing sunbeams, analog tape reels, acoustic moments, and stage-lit smiles."
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 pb-4 border-b border-earth-linen/10">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setActiveFilter(opt.value)}
            className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-none border cursor-pointer ${
              activeFilter === opt.value
                ? 'bg-earth-terracotta text-earth-moss-dark border-earth-terracotta font-bold'
                : 'bg-[#161412] border-earth-linen/10 text-earth-linen-dark hover:text-earth-linen hover:border-earth-terracotta'
            }`}
            id={`gallery-filter-${opt.value}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Gallery Bento / Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative aspect-video sm:aspect-square md:aspect-video overflow-hidden rounded-none border border-earth-linen/10 bg-[#161412] shadow-xl cursor-pointer transition-all duration-300 hover:border-earth-terracotta"
            id={`gallery-item-${item.id}`}
          >
            {/* Gallery Image */}
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />

            {/* Dark overlay with dynamic content on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-earth-moss-dark/95 via-earth-moss-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <div className="space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center space-x-2 text-earth-gold">
                  {item.type === 'video' ? <Video className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em]">
                    {item.type} • {item.category}
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-earth-linen">{item.title}</h4>
                <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-earth-gold uppercase tracking-widest font-mono">
                  <Eye className="h-3.5 w-3.5" />
                  <span>View media</span>
                </span>
              </div>
            </div>

            {/* Icon Indicators on top corner */}
            <div className="absolute top-3 right-3 p-2 bg-[#0F0E0D]/95 border border-earth-linen/10 text-earth-linen shadow-md">
              {item.type === 'video' ? <Play className="h-3.5 w-3.5 text-earth-terracotta" /> : <Camera className="h-3.5 w-3.5" />}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-[#161412] border border-earth-linen/10 rounded-none">
          <ImageIcon className="h-10 w-10 text-earth-linen-dark mx-auto mb-4" />
          <h4 className="font-serif text-lg font-bold text-earth-linen uppercase tracking-wider">No media found</h4>
          <p className="text-xs text-earth-linen-dark mt-1 opacity-80">This corner is currently waiting for new uploads.</p>
        </div>
      )}

      {/* Lightbox / Media Modal overlay */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 z-50 animate-fade-in" id="gallery-lightbox">
          <div className="relative max-w-5xl w-full h-full max-h-[85vh] flex flex-col justify-center">
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute -top-12 right-0 md:-right-12 text-earth-linen hover:text-earth-gold transition-colors flex items-center space-x-1.5 font-mono text-xs border border-earth-moss-light px-3 py-1.5 rounded"
            >
              <X className="h-4.5 w-4.5" />
              <span>CLOSE</span>
            </button>

            {/* Content box */}
            <div className="bg-earth-moss-dark border border-earth-moss-light/50 rounded-lg overflow-hidden flex flex-col justify-between max-h-full shadow-2xl">
              {/* Media viewer */}
              <div className="flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[350px] md:min-h-[500px]">
                {selectedItem.type === 'video' ? (
                  <iframe
                    src={selectedItem.mediaUrl}
                    title={selectedItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full aspect-video border-0"
                    id="lightbox-iframe"
                  />
                ) : (
                  <img
                    src={selectedItem.mediaUrl}
                    alt={selectedItem.title}
                    className="max-w-full max-h-[70vh] object-contain"
                    referrerPolicy="no-referrer"
                    id="lightbox-image"
                  />
                )}
              </div>

              {/* Media Details */}
              <div className="p-4 bg-earth-moss border-t border-earth-moss-light/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-earth-gold block">
                    {selectedItem.type} / {selectedItem.category}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-earth-linen mt-1">{selectedItem.title}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
