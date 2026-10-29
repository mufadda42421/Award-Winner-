/**
 * Centralized Configuration for Khadija's Romantic Experience
 * Everything is fully customizable in this single file.
 */

export interface TimelineEntry {
  id: string;
  phase: string;
  title: string;
  tagline: string;
  description: string;
  highlight: string;
  iconName: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  dateOrMoment: string;
  imageSrc: string;
  altText: string;
  location: string;
}

export interface StarMessage {
  id: number;
  name: string;
  constellation: string;
  message: string;
  x: number; // percentage in constellation canvas
  y: number;
  color: string;
  detail: string;
}

export interface ReasonCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  symbol: string;
  accentGlow: string;
}

export const romanticConfig = {
  // 1. Personal Names & Dedication
  recipient: {
    name: "Khadija",
    nickname: "My Star",
    pronounPossessive: "Her",
  },

  // 2. Cinematic Intro Screen
  intro: {
    leadText: "I made a little universe just for you...",
    revealTitle: "For Khadija, With Love ♡",
    subtitle: "A digital sanctuary woven from memories, stars, and feelings that words could never completely hold.",
    enterButtonText: "Enter My Heart ✨",
  },

  // 3. Hero Section
  hero: {
    preTitle: "A DEDICATION TO MY FAVORITE PERSON",
    headline: "Out of all the people in this world, my heart chose you.",
    subheadline: "And if I could give you one thing in life, I'd give you the ability to see yourself through my eyes.",
    ctaSurprise: "Discover Your Surprise 💌",
    ctaStory: "Our Little Story ↓",
    floatingWhisper: "Tap the glowing heart above to hear a quiet truth.",
  },

  // 4. The Interactive Love Letter
  loveLetter: {
    envelopeSealLetter: "K",
    salutation: "Dear Khadija,",
    paragraphs: [
      "I don't know if words will ever be enough to explain what you mean to me, but I still want to try.",
      "You have a way of making ordinary moments feel special. Sometimes, just the thought of you is enough to make me smile.",
      "If I could create a little world just for you, it would be filled with all the happiness you deserve, all the beautiful things you love, and a thousand little reminders of how special you are to me.",
      "I made this website because I wanted to give you something a little different. Something that isn't just a gift, but a small piece of the feelings I sometimes struggle to put into words.",
      "No matter how many stars light up the night sky, you will always be my favorite kind of magic.",
    ],
    closing: "With all my heart,",
    signature: "Yours, always. ❤️",
  },

  // 5. Our Little Universe (5 Interactive Stars + 1 Secret Polaris Star)
  universe: {
    heading: "If I could name every star after something I love about you...",
    subheading: "Click upon each glowing star in Khadija's constellation to reveal a quiet truth kept close to my heart.",
    stars: [
      {
        id: 1,
        name: "Lumina",
        constellation: "The Radiant Star",
        message: "Your smile makes ordinary days feel extraordinary.",
        detail: "Whenever the world feels chaotic or heavy, the simple warmth of your smile has this quiet power to reset everything into place.",
        x: 20,
        y: 35,
        color: "#f472b6",
      },
      {
        id: 2,
        name: "Aethel",
        constellation: "The Memory Keeper",
        message: "You make little moments worth remembering.",
        detail: "A shared laugh, a quiet gaze, an unhurried conversation over tea—the simplest moments turn into treasures just because you are there.",
        x: 40,
        y: 65,
        color: "#fbbf24",
      },
      {
        id: 3,
        name: "Caelia",
        constellation: "The Inner Sanctum",
        message: "You have a place in my heart that nobody else could fill.",
        detail: "A gentle space crafted exclusively for you, where your laughter echoes and your gentle soul feels forever safe and cherished.",
        x: 52,
        y: 25,
        color: "#ec4899",
      },
      {
        id: 4,
        name: "Seraphina",
        constellation: "The Wishing Star",
        message: "You deserve more happiness than words can describe.",
        detail: "If happiness could be gathered by the handful, I would spend every waking hour filling your sky with it until your heart overflows.",
        x: 72,
        y: 70,
        color: "#fb7185",
      },
      {
        id: 5,
        name: "Astraea",
        constellation: "The Eternal Star",
        message: "If I had to choose again, I'd still hope to find you.",
        detail: "Across a million lifetimes, alternate timelines, and distant galaxies, my wandering heart would still instinctively look for you.",
        x: 82,
        y: 32,
        color: "#f59e0b",
      },
    ] as StarMessage[],
    secretStar: {
      id: 6,
      name: "Polaris · Khadija's Guiding Light",
      constellation: "The Secret Heart Node",
      message: "No matter how vast the universe, my heart will always point to you.",
      detail: "You unlocked the secret sixth star of Khadija's sky! You are my compass, my safe harbor, and the brightest constant in my life.",
      x: 50,
      y: 84,
      color: "#ffffff",
    } as StarMessage,
  },

  // 6. A Timeline of Us (4 Beautiful Cards)
  timeline: {
    title: "Little Moments, Big Feelings.",
    subtitle: "A journey not measured in passing days, but in how deeply you've colored my entire world.",
    cards: [
      {
        id: "beginning",
        phase: "Chapter I",
        title: "The Beginning",
        tagline: "When our story started.",
        description: "That serendipitous turning point when you stepped into my life, completely unaware that you were about to become the best thing in it.",
        highlight: "The exact moment ordinary life quietly turned into something breathtaking.",
        iconName: "Sparkles",
      },
      {
        id: "little-things",
        phase: "Chapter II",
        title: "The Little Things",
        tagline: "The moments that mean more than they seem.",
        description: "Your sweet gestures, the warmth in your voice, the gentle way you listen, and how time seems to dissolve whenever we talk.",
        highlight: "Quiet seconds that leave loud, beautiful echoes in my heart.",
        iconName: "HeartHandshake",
      },
      {
        id: "favorite-person",
        phase: "Chapter III",
        title: "My Favorite Person",
        tagline: "Why you are so special to me.",
        description: "Because with you, vulnerability is ease, joy is effortless, and home isn't a physical place—it's right by your side.",
        highlight: "My confidante, my peaceful anchor, and my brightest muse.",
        iconName: "Heart",
      },
      {
        id: "days-ahead",
        phase: "Chapter IV",
        title: "The Days Ahead",
        tagline: "All the beautiful memories still waiting for us.",
        description: "Sunsets we haven't seen yet, cities we haven't walked through, and gentle laughter waiting for us in tomorrow's light.",
        highlight: "Every tomorrow is something to look forward to because you'll be in it.",
        iconName: "Compass",
      },
    ] as TimelineEntry[],
  },

  // 7. Memory Gallery (5 Customizable Photo Slots)
  gallery: {
    heading: "Our Memory Gallery",
    subtitle: "A digital scrapbook capturing the warmth of our connection. Hover, click to open in cinema mode, or swap with real photographs whenever you wish.",
    photos: [
      {
        id: "photo-1",
        title: "Candlelit Evenings",
        caption: "Where time paused and the whole room faded into the warmth of our conversations.",
        dateOrMoment: "An unforgettable evening",
        imageSrc: "/src/assets/images/gallery_first_date_1793279616510.jpg",
        altText: "Candlelit romantic dinner table with gentle hands intertwined and rose petals",
        location: "Our Quiet Bistro",
      },
      {
        id: "photo-2",
        title: "Golden Hour Waves",
        caption: "Walking side-by-side as the sun dipped into champagne and rose hues.",
        dateOrMoment: "Chasing sunsets",
        imageSrc: "/src/assets/images/gallery_golden_hour_1793279615257.jpg",
        altText: "Lovers silhouettes strolling along a warm glowing beach shoreline at sunset",
        location: "The Serene Shore",
      },
      {
        id: "photo-3",
        title: "Underneath The Stars",
        caption: "Wrapped in warmth, discovering constellations and whispering quiet dreams.",
        dateOrMoment: "Midnight stargazing",
        imageSrc: "/src/assets/images/gallery_stargazing_1793279617165.jpg",
        altText: "Two people sitting on a scenic hill under a vibrant starry night sky",
        location: "Starlight Overlook",
      },
      {
        id: "photo-4",
        title: "Morning Peonies & Lattes",
        caption: "Slow mornings, handwritten thoughts, and the cozy calm you bring into my mornings.",
        dateOrMoment: "Sweet slow morning",
        imageSrc: "/src/assets/images/gallery_coffee_morning_1793279616904.jpg",
        altText: "Two morning coffee cups with heart latte art, pink peonies, and sweet notes",
        location: "Cozy Breakfast Table",
      },
      {
        id: "photo-5",
        title: "City Lights & Gentle Whispers",
        caption: "Standing above a city of millions, knowing my whole world was right in my arms.",
        dateOrMoment: "Midnight glow",
        imageSrc: "/src/assets/images/gallery_city_lights_1793279618127.jpg",
        altText: "Couple embracing softly on an overlook terrace with city bokeh lights",
        location: "Skyline Terrace",
      },
    ] as GalleryPhoto[],
  },

  // 8. The Reasons I Choose You (6 Cards)
  reasons: {
    heading: "A Few Reasons You're So Special",
    subheading: "I could write a library of reasons, but these six shine like lighthouses in my heart.",
    cards: [
      {
        id: 1,
        title: "Your Smile",
        subtitle: "Pure, radiant light",
        description: "It has this infectious warmth that disarms any gloomy day. The moment you smile genuinely, it feels like sunlight breaking through thick clouds.",
        symbol: "✨",
        accentGlow: "rgba(244, 114, 182, 0.4)",
      },
      {
        id: 2,
        title: "Your Kindness",
        subtitle: "Gentle and sincere",
        description: "The softness with which you treat others, the empathy that radiates naturally from you, and the way you care deeply without needing applause.",
        symbol: "🕊️",
        accentGlow: "rgba(251, 191, 36, 0.4)",
      },
      {
        id: 3,
        title: "Your Beautiful Heart",
        subtitle: "Rare and golden",
        description: "A heart that holds compassion, loyalty, and deep sincerity. In a hurried world, your heart feels like sacred sanctuary.",
        symbol: "💖",
        accentGlow: "rgba(244, 63, 94, 0.4)",
      },
      {
        id: 4,
        title: "How You Make Moments Matter",
        subtitle: "Finding wonder in the quiet",
        description: "You have a rare gift for finding beauty in the little things: a warm drink, a song, a shared glance. You turn everyday routine into poetry.",
        symbol: "🌿",
        accentGlow: "rgba(236, 72, 153, 0.4)",
      },
      {
        id: 5,
        title: "The Happiness You Bring",
        subtitle: "A breath of pure peace",
        description: "Being near you feels like taking off heavy armor. You bring a quiet, profound happiness that makes everything feel right with the world.",
        symbol: "🌸",
        accentGlow: "rgba(251, 146, 60, 0.4)",
      },
      {
        id: 6,
        title: "Simply Being You",
        subtitle: "Unapologetically authentic",
        description: "With your quirks, your laughter, your expressions, and your unique grace. I wouldn't change a single brushstroke of who you are.",
        symbol: "👑",
        accentGlow: "rgba(245, 158, 11, 0.4)",
      },
    ] as ReasonCard[],
  },

  // 9. The Big Surprise
  surprise: {
    teaserHeading: "One Last Little Surprise, Khadija...",
    teaserSubheading: "A special gift waiting inside this glowing keepsake box. Tap to unlock what's inside.",
    boxLabel: "A Gift For Khadija",
    revealedTitle: "A Message From My Heart To Yours",
    messageBody: [
      "If this little website could tell you one thing, I hope it would be this:",
      "You are loved.",
      "You are appreciated.",
      "You are special.",
      "And somewhere in this big, complicated world, there is a heart that wanted to create something beautiful just to make you smile.",
      "That heart is mine. ❤️",
    ],
    dedicationFooter: "Made with love, especially for Khadija. ♡",
    replayButtonText: "Replay Surprise 🎁",
  },

  // 10. Background Ambience & Audio
  audio: {
    trackTitle: "A Gentle Melody For Khadija",
    localAudioFallbackPath: "/music/romantic.mp3",
    description: "Relaxing ambient romantic harmony generated procedurally with Web Audio API, or toggle your own song.",
  },

  // 11. Secret Whispers & Hidden Easter Eggs
  // (Discoverable by tapping decorative charms, the navbar brand, or the secret whisper bottle)
  secretWhispers: [
    "Whenever I think of what peace feels like, my thoughts instantly wander to you.",
    "You don't just brighten my day, Khadija; you bring a quiet stillness into my whole soul.",
    "If I had one wish for you every single morning, it would be that you wake up knowing just how deeply you are loved.",
    "Your laugh is, without question, my favorite melody in this world.",
    "Even across the busiest hours, the simple thought of your smile resets my entire mood.",
    "You possess a rare and gentle grace that makes everything around you softer and kinder.",
    "My heart doesn't just choose you in grand moments—it chooses you in every quiet second in between.",
    "Thank you for being the sweetest, most genuine part of my life.",
    "No matter how dark the night sky gets, you will always be my steady, radiant star.",
    "Every line of code and every pixel on this page was crafted with one hope: to make you feel loved, Khadija.",
    "Some people look at stars to make wishes; I just look at you.",
    "With you, even silence is comfortable and beautiful.",
  ],

  // Interactive Easter Egg Tooltips
  easterEggs: {
    brandWordmarkNote: "You found a hidden secret! Did you know my heart smiles every time I hear your name, Khadija? ♡",
    celestialHeartNote: "You tapped the celestial heart! A gentle reminder that you are forever cherished.",
    waxSealEasterEgg: "A private seal, meant to be opened only by your hands.",
    filmReelEasterEgg: "Every memory here is just the opening chapter of a lifetime of happiness together.",
    constellationSecretUnlocked: "Secret discovery: You found the hidden North Star of Khadija's constellation!",
  },
};
