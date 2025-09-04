import { Category } from './types';

export const GAME_DATA: Category[] = [
  {
    title: "Passwords & Access",
    questions: [
      { points: 100, question: "What is the most important factor for a strong password?", options: ["Using your pet's name", "Making it long and complex", "Writing it on a sticky note", "Reusing your email password"], correctAnswerIndex: 1, answered: false, difficulty: 'easy' },
      { points: 200, question: "Two-Factor Authentication (2FA) adds a second layer of security. What does it typically require?", options: ["Two different passwords", "Something you know (password) and something you have (phone)", "A security question", "Your manager's approval"], correctAnswerIndex: 1, answered: false, difficulty: 'easy' },
      { points: 300, question: "What is the primary function of a password manager?", options: ["To automatically generate weak passwords", "To securely store and manage your unique passwords", "To share passwords with coworkers", "To remember just one password for everything"], correctAnswerIndex: 1, answered: false, difficulty: 'medium' },
      { points: 400, question: "If you receive a password reset email you didn't request, what should you do?", options: ["Click the link to be safe", "Ignore it and report it to IT", "Forward it to a friend", "Reply with your current password"], correctAnswerIndex: 1, answered: false, difficulty: 'medium' },
      { points: 500, question: "What is 'credential stuffing'?", options: ["An attack where IT staff 'stuffs' temporary credentials into a system.", "Overloading a login page with too many password attempts to crash it.", "An automated attack using leaked usernames and passwords to gain access to other unrelated services.", "A method for securely storing password hashes in a database."], correctAnswerIndex: 2, answered: false, isWager: true, difficulty: 'hard' },
    ],
  },
  {
    title: "Protecting Data",
    questions: [
      { points: 100, question: "How should you dispose of printed documents containing sensitive customer information?", options: ["In the regular trash bin", "In the recycling bin", "Using a cross-cut shredder", "Leaving them on your desk"], correctAnswerIndex: 2, answered: false, difficulty: 'easy' },
      { points: 200, question: "You see a visitor without a badge wandering the office. What is the most appropriate action?", options: ["Ignore them", "Ask them who they are and offer to walk them to reception", "Shout 'Intruder!'", "Offer them a cup of coffee"], correctAnswerIndex: 1, answered: false, difficulty: 'easy' },
      { points: 300, question: "What does a 'clean desk' policy help prevent?", options: ["Clutter and disorganization", "Theft of sensitive information from unattended desks", "Dust allergies", "Spilling coffee on your keyboard"], correctAnswerIndex: 1, answered: false, difficulty: 'medium' },
      { points: 400, question: "When discussing confidential work matters, where is the safest place to do so?", options: ["In a crowded coffee shop", "On a public train", "In a private meeting room at the office", "Over a personal, unencrypted messaging app"], correctAnswerIndex: 2, answered: false, difficulty: 'medium' },
      { points: 500, question: "Which of the following is the BEST way to protect 'data at rest' on a company laptop that has been stolen?", options: ["A strong user password for the login screen.", "Full-disk encryption (like BitLocker or FileVault).", "A remote-wipe capability initiated by IT.", "A cable lock physically securing the laptop to a desk."], correctAnswerIndex: 1, answered: false, isWager: true, difficulty: 'hard' },
    ],
  },
  {
    title: "Email & Phishing",
    questions: [
      { points: 100, question: "What is 'phishing'?", options: ["A weekend hobby involving a rod and reel", "A type of computer virus", "Fraudulent emails trying to trick you into revealing personal info", "A feature in Microsoft Outlook"], correctAnswerIndex: 2, answered: false, difficulty: 'easy' },
      { points: 200, question: "An email from the 'CEO' asks you to urgently buy gift cards for a client. What is this a classic sign of?", options: ["A generous new company policy", "A surprise bonus", "A phishing scam", "A team-building exercise"], correctAnswerIndex: 2, answered: false, difficulty: 'easy' },
      { points: 300, question: "What is a major red flag in a suspicious email?", options: ["Perfect grammar and spelling", "A generic greeting like 'Dear User'", "An email from your direct manager", "A link to the company's official website"], correctAnswerIndex: 1, answered: false, difficulty: 'medium' },
      { points: 400, question: "You find a USB stick in the office parking lot. What is the safest thing to do with it?", options: ["Plug it into your computer to find the owner", "Plug it into a colleague's computer", "Give it to the IT/Security department", "Keep it, free USB!"], correctAnswerIndex: 2, answered: false, isDoubleJeopardy: true, difficulty: 'medium' },
      { points: 500, question: "An email appears to be from a known vendor, but the email domain is slightly misspelled (e.g., 'vendor.com' vs 'vend0r.com'). What is this attack technique called?", options: ["Spear Phishing", "Whaling", "Typosquatting", "Pharming"], correctAnswerIndex: 2, answered: false, isWager: true, difficulty: 'hard' },
    ],
  },
  {
    title: "Workstation & Mobile",
    questions: [
      { points: 100, question: "What should you do with your computer when you leave your desk, even for a minute?", options: ["Turn the monitor off", "Leave it logged in for quick access", "Lock your screen (e.g., Windows + L)", "Ask your neighbor to watch it"], correctAnswerIndex: 2, answered: false, difficulty: 'easy' },
      { points: 200, question: "Is it safe to use public Wi-Fi (like at a cafe) to access confidential work documents?", options: ["Yes, it's very secure", "Only if you're quick", "No, attackers can easily spy on public networks", "Yes, but only for reading, not editing"], correctAnswerIndex: 2, answered: false, difficulty: 'easy' },
      { points: 300, question: "What is the primary risk of installing unapproved software on your work computer?", options: ["It might use up too much disk space", "It could contain malware or create security holes", "Your boss might not like the icon", "It could be against company policy for fun"], correctAnswerIndex: 1, answered: false, difficulty: 'medium' },
      { points: 400, question: "A text message from an unknown number says 'Your account is locked. Click here to fix.' This is likely...", options: ["A helpful alert from your bank", "A wrong number", "A smishing (SMS phishing) attack", "A new customer service feature"], correctAnswerIndex: 2, answered: false, isDoubleJeopardy: true, difficulty: 'medium' },
      { points: 500, question: "What does the term 'zero-day vulnerability' refer to?", options: ["A security flaw that is discovered on the same day a product is released.", "A vulnerability that has been discovered by attackers but is not yet known to the vendor or the public.", "A policy that gives IT zero days to patch a critical system.", "A type of malware that deletes all data after 24 hours (zero days left)."], correctAnswerIndex: 1, answered: false, isWager: true, difficulty: 'hard' },
    ],
  },
];

export const ROUND_SUMMARIES = {
  1: "Your defenses are holding strong, but phishing attempts are increasing.",
  2: "Hackers breached one employee account — can you stop lateral movement?",
  3: "Final showdown: ransomware detected! Answer wisely to save the company.",
};