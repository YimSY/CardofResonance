// Deck Content Data
const decks = [
    {
        id: 'community',
        name: 'Community',
        description: 'Friends & First Impressions',
        theme: 'theme-community',
        mechanic: 'Perception Guessing',
        levels: {
            1: [
                { q: "What was the first thing you noticed about me?", sub: "Was it accurate?" },
                { q: "What vibe do you think I give off when you first meet me?", sub: "Intimidating, warm, chaotic?" },
                { q: "If you had to guess my job based only on how I show up, what would you say?", sub: "Why?" },
                { q: "Do I seem more like a morning person or a night owl?", sub: "What gives it away?" },
                { q: "Do I seem more like a creative, analytical, or something-else type?", sub: "Explain." },
                { q: "If you were buying me a small gift based only on what you know so far, what would you pick?", sub: "Why that?" },
                { q: "What about me intrigues you?", sub: "Be honest." },
                { q: "Do I remind you of anyone you know?", sub: "In a good way?" },
                { q: "What do you imagine I was like in school?", sub: "Teacher's pet or troublemaker?" },
                { q: "What compliment do you think I hear the most?", sub: "Do you agree with it?" },
                // Expansion
                { q: "If I were a fictional character, would I be the hero, the villain, or the comic relief?", sub: "Why?" },
                { q: "Do I seem like someone who follows the recipe exactly or throws things in the pot until it tastes right?", sub: "Chaos or Order?" },
                { q: "Based on my vibe, what genre of music do you think dominates my playlist?", sub: "Pop, Metal, Jazz?" },
                { q: "Do I strike you as someone who was popular in high school or someone who flew under the radar?", sub: "Why?" },
                { q: "If we were in a horror movie, would I be the first to die or the final survivor?", sub: "Be brutal." }
            ],
            2: [
                { q: "What kind of friend do you try to be most of the time?", sub: "Do you succeed?" },
                { q: "What makes you feel really cared for in a friendship?", sub: "Small things, not big gestures." },
                { q: "What do you think has kept your closest friendships going this long?", sub: "What's the secret?" },
                { q: "When you first join a new group, what role do you usually slip into?", sub: "Observer, organizer, clown?" },
                { q: "What’s something you wish friends would ask you about more often?", sub: "Why don't they?" },
                { q: "Where in your life right now do you feel the strongest sense of community?", sub: "Why there?" },
                // Expansion
                { q: "What is a 'small' loyalty test I unknowingly pass with you?", sub: "Did I pass?" },
                { q: "When you're venting, do you usually want me to offer solutions or just listen?", sub: "How can I tell?" },
                { q: "What is one thing you think we have in common that we haven't actually talked about yet?", sub: "Take a guess." }
            ],
            3: [
                { q: "What’s a moment in a friendship that quietly changed you?", sub: "For better or worse?" },
                { q: "What’s something a friend did that made you feel profoundly seen?", sub: "Why did it matter?" },
                { q: "What’s a friendship hurt that still influences how you show up now?", sub: "How does it show up?" },
                { q: "What do you think I bring out in you that other people don’t?", sub: "Is it good?" },
                { q: "If we stayed in each other’s lives for 5 years, what would you hope our friendship gives you?", sub: "Be specific." },
                // Expansion
                { q: "What is a quality I have that you wish you had more of?", sub: "Why?" },
                { q: "If our friendship had a 'terms and conditions' label, what would be the most important clause?", sub: "Warning label?" }
            ]
        }
    },
    {
        id: 'intimacy',
        name: 'Intimacy',
        description: 'Dating & Couples',
        theme: 'theme-intimacy',
        mechanic: 'Connection Timers',
        levels: {
            1: [
                { q: "What’s something small that makes you feel really attracted to someone?", sub: "A habit or gesture?" },
                { q: "What’s the easiest part of dating you, and what’s probably the hardest?", sub: "Be self-aware." },
                { q: "What do you think your past relationships taught you about what you need now?", sub: "Hard lessons?" },
                { q: "When do you feel most yourself on a date?", sub: "Doing what?" },
                { q: "What’s one green flag you look for that most people overlook?", sub: "Why is it important?" },
                // Expansion
                { q: "What is the most attractive non-physical thing a person can do on a first date?", sub: "Intellect, kindness, humor?" },
                { q: "Do you believe in 'right person, wrong time', or do you think the right person makes the time?", sub: "Why?" },
                { q: "What is a 'green flag' you've seen in me so far?", sub: "Don't be shy." }
            ],
            2: [
                { q: "What does a healthy relationship feel like in your body?", sub: "Calm, exciting, safe?", tags: ["#Values"] },
                { q: "What’s a small ritual you’d love to have with a partner?", sub: "Morning coffee, night walk?", tags: ["#Values"] },
                { q: "What’s one boundary you’re proud of holding in dating?", sub: "Was it hard?", tags: ["#Values"] },
                { q: "What’s a quality you’re actively trying to be for someone?", sub: "Not just find in someone.", tags: ["#Values"] },
                // Expansion
                { q: "In a relationship, is it more important to be deeply understood or deeply accepted?", sub: "Pick one.", tags: ["#Values"] },
                { q: "How much alone time do you realistically need in a week to feel sane?", sub: "Hours per day?", tags: ["#Values"] },
                { q: "What is a financial habit you have that you're proud of?", sub: "Saver or spender?", tags: ["#Values"] },
                { q: "When you're upset with a partner, is your instinct to fight for clarity or withdraw for safety?", sub: "Fight or flight?", tags: ["#Values"] },
                { q: "Stare into my eyes without speaking for 30 seconds.", sub: "What emotion do you see looking back?", type: "timer", duration: 30 }
            ],
            3: [
                { q: "If our connection were a 'chapter' in a book, what would the title be?", sub: "Genre?" },
                { q: "What’s one thing you’d want me to remember about you after tonight?", sub: "Just one." },
                // Expansion
                { q: "What is a fear you have about 'us' that you haven't voiced yet?", sub: "Safe space." },
                { q: "If we could only keep one memory we've made together, which one would you choose?", sub: "Why that one?" }
            ]
        }
    },
    {
        id: 'chaos',
        name: 'Chaos',
        description: 'Party & Groups',
        theme: 'theme-chaos',
        mechanic: 'Hot Seat',
        levels: {
            1: [
                { q: "What’s a wildly minor opinion you feel way too strongly about?", sub: "Defend it." },
                { q: "If your life right now had a tagline, what would it be?", sub: "Movie poster style." },
                { q: "What’s the most unhinged snack combo you secretly love?", sub: "Don't judge." },
                { q: "Most likely to end up famous for something ridiculous?", sub: "Who and why?" },
                { q: "Assign everyone here a reality-show role.", sub: "Villain, chaos agent, crybaby?" },
                // Expansion
                { q: "Who in this room would be the worst roommate and why?", sub: "Be honest." },
                { q: "What is the most embarrassing thing you've done to get a crush's attention?", sub: "Did it work?" },
                { q: "Show us the last photo in your camera roll or take a sip.", sub: "No cheating." },
                { q: "What is a rumor you've heard about yourself that was actually true?", sub: "Spill." },
                { q: "Who here do you think has the questionable search history?", sub: "Why them?" }
            ],
            2: [
                { q: "What’s the pettiest hill you’re willing to die on?", sub: "Why?" },
                { q: "If your search history became a museum exhibit, what would the title be?", sub: "Scary or sad?" },
                { q: "What’s the funniest reason you’ve ever cancelled plans?", sub: "Did they believe you?" },
                { q: "Tell a story that sounds fake but is 100% true.", sub: "Hot seat time." },
                { q: "Swap lives with someone at this table for a week.", sub: "Who and why?" },
                // Expansion
                { q: "If you had to delete one app from your phone forever, which one would hurt the most?", sub: "Addiction check." },
                { q: "What is the biggest lie you've told your parents that they still believe?", sub: "Are you taking it to the grave?" }
            ],
            3: [ // Hot Seat Pool
                { q: "Rank everyone in the room by who would survive a zombie apocalypse.", sub: "First to die?" },
                { q: "What is the pettiest reason you've ever ghosted someone?", sub: "Do you regret it?" },
                { q: "If you had to marry one person in this room for tax purposes, who?", sub: "Strictly business." }
            ]
        }
    },
    {
        id: 'mending',
        name: 'Mending',
        description: 'Healing & Empathy',
        theme: 'theme-mending',
        mechanic: 'Pass Protocol',
        levels: {
            1: [
                { q: "What feeling has been visiting you a lot lately?", sub: "Worry, hope, numbness?" },
                { q: "What do you wish people understood about what you’re carrying?", sub: "It's okay to say it." },
                { q: "When you’re having a hard day, what’s one small thing that helps?", sub: "Really helps." },
                // Expansion
                { q: "What is one thing you are doing today just for you?", sub: "Self-care check." },
                { q: "If your body could send you a text message right now, what would it say?", sub: "Listen to it." },
                { q: "What is a small comfort you can always rely on?", sub: "Tea, blanket, song?" }
            ],
            2: [
                { q: "What’s a story about yourself you’re slowly outgrowing?", sub: "Let it go." },
                { q: "What’s something you’ve survived that you want credit for?", sub: "Be proud." },
                { q: "What kind of support feels good when you're overwhelmed?", sub: "Advice or silence?" },
                { q: "What’s a boundary you’ve set to protect your peace?", sub: "Was it hard?" },
                // Expansion
                { q: "What is a feeling you are tired of carrying?", sub: "Put it down." },
                { q: "Who taught you that you had to be 'strong' all the time?", sub: "Was it true?" },
                { q: "What is a boundary you need to set but feel guilty about?", sub: "Why the guilt?" },
                { q: "If you could go back and hug a younger version of yourself, what age?", sub: "Why then?" },
                { q: "What is something you are grieving that isn't a death?", sub: "Loss takes many forms.", tags: ["#Heavy"] }
            ],
            3: [
                { q: "Where in your life do you feel the safest to be fully yourself?", sub: "Who makes it safe?" },
                { q: "What’s one grief that deserves more tenderness?", sub: "Be gentle." },
                { q: "What’s a tiny sign that you’re healing?", sub: "Look closely." },
                // Expansion
                { q: "What does 'peace' look like for you in this season?", sub: "Describe it." },
                { q: "Complete this sentence: 'I am learning to forgive myself for...'", sub: "Say it out loud." }
            ]
        }
    }
];
