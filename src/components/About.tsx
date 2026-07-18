import { Award, Music, BookOpen, Star, Compass } from 'lucide-react';
import { BioData } from '../types';

interface AboutProps {
  bioData: BioData;
}

export default function About({ bioData }: AboutProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-20 animate-fade-in" id="about-section">
      {/* Editorial Profile Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Professional Portrait Frame */}
        <div className="lg:col-span-5 relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-earth-terracotta/10 to-earth-gold/10 rounded-none -rotate-2 group-hover:rotate-0 transition-transform duration-500 ease-out" />
          <div className="relative border border-earth-linen/10 rounded-none overflow-hidden bg-[#161412] shadow-2xl">
            <img
              src={bioData.portraitUrl}
              alt="Malia Portrait"
              className="w-full aspect-[4/5] object-cover scale-100 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-earth-moss-dark/95 to-transparent p-6 pt-16">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-earth-gold">Acoustic Soul Artist</span>
              <h3 className="font-serif text-2xl font-bold text-earth-linen uppercase mt-1">MALIA</h3>
            </div>
          </div>
        </div>

        {/* Right: Detailed Storyteller */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-earth-gold flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-earth-terracotta" />
              <span>THE BIO STORY</span>
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-earth-linen uppercase tracking-tight">
              Inward Echoes
            </h2>
            <div className="w-12 h-[1.5px] bg-earth-terracotta" />
          </div>

          <div className="font-serif text-sm md:text-base text-earth-linen-dark leading-relaxed whitespace-pre-line space-y-6">
            {bioData.story}
          </div>
        </div>
      </div>

      {/* Influences & Achievements Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-[#161412] border border-earth-linen/10 p-8 md:p-12 rounded-none relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-earth-gold/5 to-transparent pointer-events-none" />

        {/* Musical Inspirations */}
        <div className="space-y-5">
          <h3 className="font-serif text-lg font-bold text-earth-linen uppercase tracking-wider flex items-center gap-2">
            <Compass className="h-5 w-5 text-earth-gold" />
            <span>Inspirations & Roots</span>
          </h3>
          <p className="font-sans text-xs text-earth-linen-dark max-w-sm opacity-85">
            Grounded in the acoustic purity of songwriters and alternative neo-soul pioneers, her music is directly informed by:
          </p>
          <div className="flex flex-wrap gap-2.5">
            {bioData.influences.map((inf) => (
              <span
                key={inf}
                className="px-4 py-2 border border-earth-linen/10 bg-[#1A1816] rounded-none font-serif text-xs italic text-earth-linen hover:border-earth-terracotta hover:text-earth-gold transition-colors"
              >
                {inf}
              </span>
            ))}
          </div>
        </div>

        {/* Achievements / Credentials */}
        <div className="space-y-5">
          <h3 className="font-serif text-lg font-bold text-earth-linen uppercase tracking-wider flex items-center gap-2">
            <Award className="h-5 w-5 text-earth-terracotta" />
            <span>Career Milestones</span>
          </h3>
          <div className="space-y-3.5">
            {bioData.achievements.map((ach, idx) => (
              <div key={idx} className="flex items-start space-x-3 text-xs md:text-sm text-earth-linen-dark">
                <Star className="h-4.5 w-4.5 text-earth-gold flex-shrink-0 mt-0.5" />
                <span className="font-sans leading-relaxed opacity-90">{ach}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chronological Timeline */}
      <div className="space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-earth-gold">THE TIMELINE</span>
          <h3 className="font-serif text-3xl font-bold text-earth-linen uppercase tracking-wide">Creative Chronology</h3>
          <p className="max-w-lg mx-auto font-sans text-xs text-earth-linen-dark opacity-80">
            Tracing her evolution from self-produced bedroom demos to international, independent stages.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto border-l-2 border-earth-linen/10 ml-4 md:ml-0 md:left-1/2 md:-translate-x-1/2 md:border-l-2 space-y-12 py-4">
          {bioData.milestones.map((ms, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={ms.year}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                } md:justify-between`}
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[10px] md:left-1/2 md:-translate-x-[10px] top-1.5 w-4.5 h-4.5 bg-[#161412] border border-earth-terracotta rounded-none z-10" />

                {/* Content Box */}
                <div className={`w-full md:w-[45%] pl-6 md:pl-0 ${isEven ? 'md:text-right md:pr-8' : 'md:pl-8'}`}>
                  <span className="inline-block px-3 py-1 bg-earth-terracotta/10 border border-earth-terracotta/20 text-earth-terracotta font-mono text-[10px] font-bold rounded-none mb-2">
                    {ms.year}
                  </span>
                  <h4 className="font-serif text-base font-bold text-earth-linen leading-snug">{ms.title}</h4>
                  <p className="font-sans text-xs text-earth-linen-dark leading-relaxed mt-1 opacity-85">{ms.description}</p>
                </div>

                {/* Empty column for balancing in desktop */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
