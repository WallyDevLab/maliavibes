import { Album, Product, TourDate, NewsPost, GalleryItem, BioData } from './types';

export const INITIAL_ALBUMS: Album[] = [
  {
    id: 'if-im-being-honest',
    title: "If I'm Being Honest",
    type: 'album',
    releaseDate: '2026-07-03',
    coverUrl: '/src/assets/images/If-Im-Being-Honest.jpg', // Using generated vinyl
    description: "An intimate, raw exploration of vulnerability, self-discovery, and relational truth. Rooted in warm guitar riffs, sweet vocal stacks, and rich organic R&B instrumentation, this record represents MALIA's most honest creative chapter yet.",
    spotifyUrl: 'https://open.spotify.com/album/2sCfkr7RWvA1It0b2lckAW',
    appleMusicUrl: 'https://music.apple.com/us/album/if-im-being-honest/1698243110',
    isLatest: true,
    tracks: [
      {
        id: 'iibh-1',
        title: 'Not a Love Song',
        duration: '3:04',
        previewUrl: '',
        lyrics: "Sitting in my room, staring at the ceiling...\nYou became the only one, the one that got me feeling...\nEverything I buried deep, everything I hide,\nNow I'm standing open wide.\n\n[Chorus]\n'Cause you're the only one,\nYeah, you're the only one,\nThat makes me feel alright,\nIn the middle of the night..."
      },
      {
        id: 'iibh-2',
        title: 'Masquerade',
        duration: '3:07',
        previewUrl: '',
        lyrics: "Rather be alone than in a crowded room with you...\nRather take my time and do the things I want to do...\nI won't sacrifice my peace to keep you in my space,\nI am moving on and stepping out of this embrace.\n\n[Chorus]\nI'd rather be alone, alone,\nWalking on my own, my own,\nBuilding up my home, my home,\nYeah, I'm better on my own..."
      },
      {
        id: 'iibh-3',
        title: 'Touch',
        duration: '3:39',
        previewUrl: '',
        lyrics: "Petals of a rose falling to the floor,\nI don't have to keep my guard up anymore.\nWatch me unfolding, piece by piece,\nFinding my healing, finding my release."
      },
      {
        id: 'iibh-4',
        title: 'Getaway Driver',
        duration: '3:19',
        previewUrl: '',
        lyrics: "If I'm being honest, I was scared of the fall,\nIf I'm being honest, I almost gave it all.\nBut the truth will set you free, that's what they say,\nNow I'm finally walking in my own light today."
      },
      {
        id: 'iibh-5',
        title: 'Shallow',
        duration: '2:40',
        previewUrl: '',
        lyrics: "If I'm being honest, I was scared of the fall,\nIf I'm being honest, I almost gave it all.\nBut the truth will set you free, that's what they say,\nNow I'm finally walking in my own light today."
      },
      {
        id: 'iibh-6',
        title: 'Party',
        duration: '2:58',
        previewUrl: '',
        lyrics: "If I'm being honest, I was scared of the fall,\nIf I'm being honest, I almost gave it all.\nBut the truth will set you free, that's what they say,\nNow I'm finally walking in my own light today."
      },
      {
        id: 'iibh-7',
        title: 'Masquerade',
        duration: '3:00',
        previewUrl: '',
        lyrics: "If I'm being honest, I was scared of the fall,\nIf I'm being honest, I almost gave it all.\nBut the truth will set you free, that's what they say,\nNow I'm finally walking in my own light today."
      }
    ]
  },
  {
    id: 'back-in-my-body',
    title: "Back In My Body",
    type: 'album',
    releaseDate: '2024-08-15',
    coverUrl: '/src/assets/images/back-in-my-body.jpg',
    description: "A profoundly vulnerable and raw EP exploring unspoken truths, hidden desires, and quiet revelations. Features delicate acoustic production, rich vocal layers, and hauntingly beautiful melodies.",
    spotifyUrl: 'https://open.spotify.com/album/4Os9KMlONkZVJfzjLJ9X5u',
    appleMusicUrl: 'https://music.apple.com/us/album/whats-not-spoken-ep/1614040989',
    tracks: [
      {
        id: 'bimb-1',
        title: 'Genesis',
        duration: '3:01',
        previewUrl: '',
        lyrics: "It's in the way you look at me...\nSomething that science can't explain...\nWe don't need a guarantee,\nBut we are more than words, more than words."
      },
      {
        id: 'bimb-2',
        title: 'Do it Out of Love',
        duration: '3:34',
        previewUrl: '',
        lyrics: "Could this be the final chapter?\nCould this be the end of the line?\nOr are you the one I am after,\nFor the rest of my life..."
      },
      {
        id: 'bimb-3',
        title: 'Cruise Control',
        duration: '3:30',
        previewUrl: '',
        lyrics: "Love is the only currency we need,\nIn a world filled with selfishness and greed.\nSpend your time, spend your soul with me..."
      },
      {
        id: 'bimb-4',
        title: 'Everything I Am',
        duration: '4:01',
        previewUrl: '',
        lyrics: "I love you simply, with no strings attached,\nIn a universe where we are perfectly matched.\nJust you and me, simply as we are..."
      },
      {
        id: 'bimb-5',
        title: 'Minding My Own',
        duration: '3:05',
        previewUrl: '',
        lyrics: "I love you simply, with no strings attached,\nIn a universe where we are perfectly matched.\nJust you and me, simply as we are..."
      },
      {
        id: 'bimb-6',
        title: 'Deep Green',
        duration: '2:10',
        previewUrl: '',
        lyrics: "I love you simply, with no strings attached,\nIn a universe where we are perfectly matched.\nJust you and me, simply as we are..."
      },
      {
        id: 'bimb-7',
        title: 'Feels So Good',
        duration: '3:18',
        previewUrl: '',
        lyrics: "I love you simply, with no strings attached,\nIn a universe where we are perfectly matched.\nJust you and me, simply as we are..."
      },
      {
        id: 'bimb-8',
        title: 'Bad Manners',
        duration: '3:33',
        previewUrl: '',
        lyrics: "I love you simply, with no strings attached,\nIn a universe where we are perfectly matched.\nJust you and me, simply as we are..."
      },
      {
        id: 'bimb-9',
        title: 'Jasmine in Bloom',
        duration: '4:05',
        previewUrl: '',
        lyrics: "I love you simply, with no strings attached,\nIn a universe where we are perfectly matched.\nJust you and me, simply as we are..."
      },
      {
        id: 'bimb-10',
        title: 'Oxytocin',
        duration: '2:27',
        previewUrl: '',
        lyrics: "I love you simply, with no strings attached,\nIn a universe where we are perfectly matched.\nJust you and me, simply as we are..."
      },
      {
        id: 'bimb-11',
        title: 'Back in My Body',
        duration: '3:42',
        previewUrl: '',
        lyrics: "I love you simply, with no strings attached,\nIn a universe where we are perfectly matched.\nJust you and me, simply as we are..."
      }
    ]
  },
  {
    id: 'whats-after-i-love-you',
    title: "What's After I Love You",
    type: 'album',
    releaseDate: '2022-03-04',
    coverUrl: '/src/assets/images/whats-after-i-love-you.jpg',
    description: "A gorgeous collection of acoustic-infused alternative soul. Crafted during a period of introspection, 'Clean' represents a washing away of old habits and an embrace of spiritual and emotional clarity.",
    spotifyUrl: 'https://open.spotify.com/album/3qdX8WDC7VXsMle6FTC7q6',
    appleMusicUrl: 'https://music.apple.com/us/album/clean-ep/1567284450',
    tracks: [
      {
        id: 'waily-1',
        title: 'Falling Fast (Interlude)',
        duration: '0:33',
        previewUrl: '',
        lyrics: "Washed my hands of the expectation...\nFound myself in a quiet meditation...\nNow my heart is waily, yeah it's waily."
      },
      {
        id: 'waily-2',
        title: 'More Than Love',
        duration: '3:32',
        previewUrl: '',
        lyrics: "Love is such a simple thing, why we make it hard?\nBuilding up these giant walls, always on our guard..."
      },
      {
        id: 'waily-3',
        title: 'Currency',
        duration: '3:11',
        previewUrl: '',
        lyrics: "Late night, cruise down the highway,\nListening to the radio play,\nLet's just drive..."
      },
      {
        id: 'waily-4',
        title: 'Drive Me To Think (Interlude 2)',
        duration: '0:39',
        previewUrl: '',
        lyrics: "Late night, cruise down the highway,\nListening to the radio play,\nLet's just drive..."
      },
      {
        id: 'waily-5',
        title: 'Hung Up',
        duration: '2:49',
        previewUrl: '',
        lyrics: "Late night, cruise down the highway,\nListening to the radio play,\nLet's just drive..."
      },
      {
        id: 'waily-6',
        title: 'Only One',
        duration: '3:38',
        previewUrl: '',
        lyrics: "Late night, cruise down the highway,\nListening to the radio play,\nLet's just drive..."
      },
      {
        id: 'waily-7',
        title: 'Everything and Nothing (Interlude 3)',
        duration: '0:32',
        previewUrl: '',
        lyrics: "Late night, cruise down the highway,\nListening to the radio play,\nLet's just drive..."
      },
      {
        id: 'waily-8',
        title: 'Undone',
        duration: '2:49',
        previewUrl: '',
        lyrics: "Late night, cruise down the highway,\nListening to the radio play,\nLet's just drive..."
      }
    ]
  },
  {
    id: 'ripe-ep',
    title: 'Unpolished',
    type: 'album',
    releaseDate: '2021-04-06',
    coverUrl: '/src/assets/images/unpolished.jpg',
    description: "A lush, sensuous R&B exploration of emotional growth and self-discovery. Filled with organic guitar textures, rich warm basslines, and deeply intimate vocal performances.",
    spotifyUrl: 'https://open.spotify.com/album/4EfYCKhe9BfBuZhy3M5MfV',
    appleMusicUrl: 'https://music.apple.com/us/album/ripe-ep/1519782582',
    tracks: [
      {
        id: 'unp-1',
        title: 'Part Time Girl',
        duration: '3:07',
        previewUrl: '',
        lyrics: "Finding pleasure in the simple things you do,\nLost in the rhythm, floating in the blue...\nWe don't need to rush this, take our sweet sweet time."
      },
      {
        id: 'unp-2',
        title: 'Deep Blue',
        duration: '3:01',
        previewUrl: '',
        lyrics: "We are the free ones, running in the wild,\nEvery single memory of a happy child...\nNo chains can hold us, we are born to fly."
      },
      {
        id: 'unp-3',
        title: 'Coast 2 Coast',
        duration: '3:52',
        previewUrl: '',
        lyrics: "Ready for the picking, sweet upon the vine,\nEverything is healing, everything is fine.\nWe are unp, yeah we are unp."
      },
      {
        id: 'unp-4',
        title: 'Closer',
        duration: '2:32',
        previewUrl: '',
        lyrics: "Ready for the picking, sweet upon the vine,\nEverything is healing, everything is fine.\nWe are unp, yeah we are unp."
      },
      {
        id: 'unp-5',
        title: 'Lucid Dream',
        duration: '3:07',
        previewUrl: '',
        lyrics: "Ready for the picking, sweet upon the vine,\nEverything is healing, everything is fine.\nWe are unp, yeah we are unp."
      },
      {
        id: 'unp-6',
        title: 'Better Together',
        duration: '2:58',
        previewUrl: '',
        lyrics: "Ready for the picking, sweet upon the vine,\nEverything is healing, everything is fine.\nWe are unp, yeah we are unp."
      },
      {
        id: 'unp-7',
        title: 'Future Love',
        duration: '3:48',
        previewUrl: '',
        lyrics: "Ready for the picking, sweet upon the vine,\nEverything is healing, everything is fine.\nWe are unp, yeah we are unp."
      },
      {
        id: 'unp-8',
        title: 'Borrowed Time',
        duration: '3:09',
        previewUrl: '',
        lyrics: "Ready for the picking, sweet upon the vine,\nEverything is healing, everything is fine.\nWe are unp, yeah we are unp."
      },
      {
        id: 'unp-9',
        title: 'Here We Are',
        duration: '2:47',
        previewUrl: '',
        lyrics: "Ready for the picking, sweet upon the vine,\nEverything is healing, everything is fine.\nWe are unp, yeah we are unp."
      },
      {
        id: 'unp-10',
        title: 'Ammunition',
        duration: '2:59',
        previewUrl: '',
        lyrics: "Ready for the picking, sweet upon the vine,\nEverything is healing, everything is fine.\nWe are unp, yeah we are unp."
      },
      {
        id: 'unp-11',
        title: 'Misfit',
        duration: '3:09',
        previewUrl: '',
        lyrics: "Ready for the picking, sweet upon the vine,\nEverything is healing, everything is fine.\nWe are unp, yeah we are unp."
      }
    ]
  },
  {
    id: 'late-bloomer-ep',
    title: 'Late Bloomer',
    type: 'album',
    releaseDate: '2017-12-19',
    coverUrl: '/src/assets/images/late-bloomer.jpg',
    description: "MALIA's breakthrough debut EP. A soul-stirring, sun-drenched R&B project exploring early twenties growing pains, self-acceptance, and the beauty of blooming on your own timeline.",
    spotifyUrl: 'https://open.spotify.com/album/4xcloNEXKxdyaVn5jtL5GJ',
    appleMusicUrl: 'https://music.apple.com/us/album/late-bloomer-ep/1294821034',
    tracks: [
      {
        id: 'lb-1',
        title: 'Simple Things',
        duration: '3:28',
        previewUrl: '',
        lyrics: "Meet me at the playground where we used to run...\nUnderneath the golden light, soaking up the sun...\nNo worries in our heads, just laughing all day long."
      },
      {
        id: 'lb-2',
        title: 'Sleepin',
        duration: '3:27',
        previewUrl: '',
        lyrics: "Airing our dirty laundry out on the screen,\nThings are never simple, never quite what they seem...\nBut we will wash it away, wash it clean."
      },
      {
        id: 'lb-3',
        title: "Naked",
        duration: '2:47',
        previewUrl: '',
        lyrics: "I don't wanna know who you're talking to late at night,\nI don't wanna know if you think that she is alright...\nJust let me be in my peace."
      },
      {
        id: 'lb-4',
        title: "Helpless",
        duration: '1:14',
        previewUrl: '',
        lyrics: "I don't wanna know who you're talking to late at night,\nI don't wanna know if you think that she is alright...\nJust let me be in my peace."
      },
      {
        id: 'lb-5',
        title: "Small Talk",
        duration: '3:02',
        previewUrl: '',
        lyrics: "I don't wanna know who you're talking to late at night,\nI don't wanna know if you think that she is alright...\nJust let me be in my peace."
      },
      {
        id: 'lb-6',
        title: "Way of The World",
        duration: '4:33',
        previewUrl: '',
        lyrics: "I don't wanna know who you're talking to late at night,\nI don't wanna know if you think that she is alright...\nJust let me be in my peace."
      },
      {
        id: 'lb-7',
        title: "Dirty Lauundry",
        duration: '3:07',
        previewUrl: '',
        lyrics: "I don't wanna know who you're talking to late at night,\nI don't wanna know if you think that she is alright...\nJust let me be in my peace."
      },
    ]
  },
  {
    id: 'all-that-i-need',
    title: 'All That I Need',
    type: 'ep',
    releaseDate: '2025-09-21',
    coverUrl: '/src/assets/images/all-that-i-need.jpg',
    description: "MALIA's breakthrough debut EP. A soul-stirring, sun-drenched R&B project exploring early twenties growing pains, self-acceptance, and the beauty of blooming on your own timeline.",
    spotifyUrl: 'https://open.spotify.com/album/5IXNqq1zvFMQxCQME0BjDF',
    appleMusicUrl: 'https://music.apple.com/us/album/all-that-i-need/1294821034',
    tracks: [
      {
        id: 'atin-1',
        title: 'Vacation Home',
        duration: '2:44',
        previewUrl: '',
        lyrics: "Meet me at the playground where we used to run...\nUnderneath the golden light, soaking up the sun...\nNo worries in our heads, just laughing all day long."
      },
      {
        id: 'atin-2',
        title: 'All That I Need',
        duration: '3:27',
        previewUrl: '',
        lyrics: "Airing our dirty laundry out on the screen,\nThings are never simple, never quite what they seem...\nBut we will wash it away, wash it clean."
      },
      {
        id: 'atin-3',
        title: "Eatin' Good",
        duration: '2:47',
        previewUrl: '',
        lyrics: "I don't wanna know who you're talking to late at night,\nI don't wanna know if you think that she is alright...\nJust let me be in my peace."
      },
      {
        id: 'atin-4',
        title: "We Are",
        duration: '1:14',
        previewUrl: '',
        lyrics: "I don't wanna know who you're talking to late at night,\nI don't wanna know if you think that she is alright...\nJust let me be in my peace."
      },
    ]
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'honest-vinyl',
    name: "If I'm Being Honest - 12\" Gatefold Vinyl (Limited Edition)",
    category: 'vinyl',
    price: 34.99,
    description: "180g heavyweight clear amber vinyl housed in a premium matte gatefold sleeve. Includes a 12-page booklet with exclusive studio photos and handwritten lyrics. Personally signed by MALIA.",
    imageUrl: '/src/assets/images/malia_vinyl_mockup_1784336212268.jpg', // Using generated vinyl
    stock: 45,
    isFeatured: true
  },
  {
    id: 'honest-hoodie',
    name: "If I'm Being Honest - Terracotta Organic Hoodie",
    category: 'merch',
    price: 65.00,
    description: "Oversized, ultra-soft, 100% organic cotton French terry hoodie in our signature terracotta color. Embroidered with 'If I'm Being Honest' in cream script on the chest. Fair-trade made and pre-shrunk.",
    imageUrl: '/src/assets/images/malia_merch_hoodie_1784336226098.jpg', // Using generated merch
    stock: 80,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    isFeatured: true
  },
  {
    id: 'clean-cd',
    name: 'Clean EP - Autographed Digipak CD',
    category: 'cd',
    price: 14.99,
    description: "Four-panel environment-friendly cardboard digipak CD of the Clean EP. Features beautiful watercolor artwork and a special hand-signed dedication on the inside cover.",
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80',
    stock: 120,
    isFeatured: false
  },
  {
    id: 'vibe-cap',
    name: 'MALIA Signature Vibes Dad Hat',
    category: 'merch',
    price: 28.00,
    description: "Unstructured 6-panel dad hat made of 100% washed cotton twill. Features delicate white 'vibes.' embroidery on the front and an adjustable brass buckle closure at the back.",
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&auto=format&fit=crop&q=80',
    stock: 150,
    sizes: ['One Size'],
    isFeatured: true
  },
  {
    id: 'digital-discography',
    name: 'Complete Digital Discography (High-Res WAV)',
    category: 'digital',
    price: 24.99,
    description: "Instant download of MALIA's entire catalog (If I'm Being Honest, Clean, Late Bloomer) in pristine high-resolution 24-bit/44.1kHz WAV and FLAC formats, plus high-res digital booklets.",
    imageUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&auto=format&fit=crop&q=80',
    stock: 999999, // Infinite digital downloads
    isFeatured: false
  },
  {
    id: 'milestone-poster',
    name: "Late Bloomer - 18\"x24\" Screenprinted Tour Poster",
    category: 'collectible',
    price: 20.00,
    description: "Hand-screenprinted on heavy French paper stock. Designed by Portland-based visual artist. Limited run of 200, hand-numbered and autographed.",
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=80',
    stock: 15,
    isFeatured: false
  }
];

export const INITIAL_TOURS: TourDate[] = [
  {
    id: 'tour-1',
    date: '2026-09-12',
    venue: 'The Roxy Theatre',
    city: 'Los Angeles',
    country: 'USA',
    ticketStatus: 'available',
    ticketUrl: '#tickets'
  },
  {
    id: 'tour-2',
    date: '2026-09-15',
    venue: 'The Independent',
    city: 'San Francisco',
    country: 'USA',
    ticketStatus: 'low-stock',
    ticketUrl: '#tickets'
  },
  {
    id: 'tour-3',
    date: '2026-09-18',
    venue: 'Neumos',
    city: 'Seattle',
    country: 'USA',
    ticketStatus: 'available',
    ticketUrl: '#tickets'
  },
  {
    id: 'tour-4',
    date: '2026-09-22',
    venue: 'Lincoln Hall',
    city: 'Chicago',
    country: 'USA',
    ticketStatus: 'available',
    ticketUrl: '#tickets'
  },
  {
    id: 'tour-5',
    date: '2026-09-26',
    venue: 'Bowery Ballroom',
    city: 'New York',
    country: 'USA',
    ticketStatus: 'sold-out',
    ticketUrl: '#tickets'
  },
  {
    id: 'tour-6',
    date: '2026-10-02',
    venue: 'Jazz Cafe',
    city: 'London',
    country: 'UK',
    ticketStatus: 'available',
    ticketUrl: '#tickets'
  },
  {
    id: 'tour-7',
    date: '2026-10-05',
    venue: 'Le Pop-Up du Label',
    city: 'Paris',
    country: 'France',
    ticketStatus: 'available',
    ticketUrl: '#tickets'
  },
  // Past Tours Archive
  {
    id: 'past-1',
    date: '2024-05-14',
    venue: 'Troubadour',
    city: 'Los Angeles',
    country: 'USA',
    ticketStatus: 'sold-out',
    ticketUrl: '#',
    isPast: true
  },
  {
    id: 'past-2',
    date: '2024-05-18',
    venue: 'The Vera Project',
    city: 'Seattle',
    country: 'USA',
    ticketStatus: 'sold-out',
    ticketUrl: '#',
    isPast: true
  },
  {
    id: 'past-3',
    date: '2024-05-22',
    venue: 'Baby\'s All Right',
    city: 'Brooklyn',
    country: 'USA',
    ticketStatus: 'sold-out',
    ticketUrl: '#',
    isPast: true
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    type: 'video',
    title: 'Malia - "Only One" (Official Music Video)',
    category: 'live',
    mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder or youtube embed url
    thumbnailUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal-2',
    type: 'photo',
    title: 'If I\'m Being Honest Studio Sessions',
    category: 'studio',
    mediaUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal-3',
    type: 'video',
    title: 'Malia - "Clean" (Live at Troubadour)',
    category: 'live',
    mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal-4',
    type: 'photo',
    title: 'Sunset Acoustic Live Performance',
    category: 'live',
    mediaUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal-5',
    type: 'photo',
    title: 'Official Press Portrait (If I\'m Being Honest)',
    category: 'portrait',
    mediaUrl: '/src/assets/images/malia_hero_banner_1784336198067.jpg', // Using generated portrait
    thumbnailUrl: '/src/assets/images/malia_hero_banner_1784336198067.jpg'
  },
  {
    id: 'gal-6',
    type: 'photo',
    title: 'Analog Backstage Chronicles',
    category: 'tour',
    mediaUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80'
  }
];

export const NEWS_POSTS: NewsPost[] = [
  {
    id: 'news-1',
    title: "Announcing 'If I'm Being Honest' Autumn Tour 2026",
    summary: 'MALIA is hitting the road again! Catch her live across 10 major US cities and select European venues this autumn.',
    content: "We are thrilled to officially announce the Autumn Tour 2026 in support of the latest album 'If I'm Being Honest'. Starting September 12th at the legendary Roxy Theatre in Los Angeles, MALIA will be bringing her intimate acoustic-soul grooves, rich vocal harmonies, and raw storytelling to life.\n\n\"There is nothing quite like sharing space and exchanging energy with you all in a live room,\" says MALIA. \"These songs were written in quiet, vulnerable moments, and performing them live feels like a collective unfolding. I can't wait to see your faces and sing with you.\"\n\nTickets go on pre-sale this Wednesday, July 22nd at 10 AM local time. General sale starts Friday, July 24th. Sign up for our newsletter to get the exclusive pre-sale code!",
    date: '2026-07-16',
    imageUrl: '/src/assets/images/malia_hero_banner_1784336198067.jpg',
    category: 'announcement'
  },
  {
    id: 'news-2',
    title: 'Behind The Song: The Making of "Only One"',
    summary: 'Dive deep into the recording process, lyric writing, and creative inspirations behind the hit single.',
    content: "\"Only One\" was written on a rainy Tuesday evening on my porch in Portland. I had my vintage hollow-body guitar plugged into a small tube amp, and this repetitive, circular riff just started flowing out of my fingers. It felt hypnotic.\n\nThe song is about that terrifying and beautiful moment of realization where you let your guard completely down and acknowledge that someone has become the primary lens through which you see the world. Recording it in LA, we wanted to capture that intimate, late-night acoustic vibe, so we recorded the vocal in one single continuous take under very dim lights. We kept the background elements simple—just a warm upright bass, sparse keys, and soft brush drums—to let the vulnerability of the performance take center stage.",
    date: '2026-06-28',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1000&auto=format&fit=crop&q=80',
    category: 'behind-the-scenes'
  },
  {
    id: 'news-3',
    title: 'MALIA Receives Independent Soul Act Nomination',
    summary: 'Recognized for her incredible independent strides in alternative R&B and exceptional storytelling craft.',
    content: "We are incredibly proud to share that MALIA has been nominated for the Independent Soul Act of the Year. This nomination stands as a beautiful testament to the power of independent artistry, community support, and uncompromising creative integrity.\n\nThank you to every listener, curator, and partner who has supported MALIA's journey from her early days in Seattle to the recording studios of Los Angeles. Voting is now open to the public on the official awards portal. Let's make our voices heard and celebrate independent music together!",
    date: '2026-05-10',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1000&auto=format&fit=crop&q=80',
    category: 'announcement'
  }
];

export const BIOGRAPHY_DATA: BioData = {
  story: "MALIA is an independent singer, songwriter, and guitarist who has quietly carved out a sanctuary in the landscape of modern alternative R&B and Neo-Soul. Born in the Pacific Northwest and currently based in Los Angeles, she creates music that feels like a warm invitation—an intimate space where vulnerability is celebrated as strength and storytelling is handled with exquisite, tactile care.\n\nGrowing up surrounded by the towering pines of Washington state, MALIA was drawn early to the raw honesty of acoustic guitars and classic soul records. She taught herself guitar in her early teens, translating her private diaries into sun-drenched melodies. Her music effortlessly bridges the gap between acoustic warmth and contemporary electronic R&B, combining sweet, silky vocal cascades with organic, space-filled guitar loops that have become her sonic signature.\n\nHer breakthrough came with the release of her 2017 debut EP 'Late Bloomer', which captured the attention of music lovers worldwide with its breezy, relatable anthems of growth and self-acceptance. Since then, she has shared stages with R&B luminaries, collaborated with acclaimed producers, and built a dedicated global fan base entirely on her own terms. Her latest full-length record, 'If I'm Being Honest', represents her most daring and artistically complete statement yet—a deep-dive into relationship truths, emotional healing, and the beautiful, complex process of creative unfolding.",
  influences: ['Corinne Bailey Rae', 'Erykah Badu', 'Tracy Chapman', 'Lianne La Havas', 'D\'Angelo', 'Sade'],
  achievements: [
    'Over 25 million independent streams on Spotify and Apple Music',
    'Featured on Spotify\'s official editorial playlists including "Silk Sheets", "Acoustic Soul", and "Fresh Finds R&B"',
    'Nominated for Independent Soul Artist of the Year (2026)',
    'Sold-out headlining shows at the Troubadour (LA) and Bowery Ballroom (NYC)'
  ],
  milestones: [
    {
      year: '2017',
      title: 'Debut Release: Late Bloomer',
      description: 'Released breakthrough debut EP, securing global blog praise and landing over 5 million streams.'
    },
    {
      year: '2019',
      title: 'Collaborative Expansion',
      description: 'Worked with GRAMMY-nominated producers in LA, crafting a signature warm R&B guitar-led sound.'
    },
    {
      year: '2021',
      title: 'Clean EP Release',
      description: 'Dropped highly anticipated EP Clean, exploring emotional purity and acoustic-soul storytelling.'
    },
    {
      year: '2023',
      title: 'Album: If I\'m Being Honest',
      description: 'Released first self-produced vinyl album, touring internationally across 15 cities.'
    },
    {
      year: '2026',
      title: 'Indie Soul Recognition',
      description: 'Nominated for Independent Soul Act, announcing the highly anticipated Autumn 2026 World Tour.'
    }
  ],
  portraitUrl: '/src/assets/images/hero-banner.jpg' // Portrait using generated image
};
export const SOCIAL_LINKS = {
  spotify: 'https://open.spotify.com/artist/5o6oaYrumOkkzsOmwZXJv6',
  appleMusic: 'https://music.apple.com/us/artist/malia/1202271922',
  youtube: 'https://www.youtube.com/user/maliavibes',
  instagram: 'https://www.instagram.com/maliavibes/',
  tiktok: 'https://www.tiktok.com/@maliavibes',
  facebook: 'https://www.facebook.com/maliavibes',
  twitter: 'https://twitter.com/maliavibes',
  linktree: 'https://linktr.ee/MALIA_?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnpW0tNrP08sV0TfO5nE992SzIvGLJ5VN6pEnWHxQ819SMRoU0xUdvRoH7QHk_aem_n8R6SKMYV2ubqnf43pTAdg'
};
