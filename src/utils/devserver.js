function generateRandomDate() {
  const start = new Date(2025, 0, 1);
  const end = new Date();
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return randomDate.getTime();
}

const authors = [
  { id: 1, name: "Ahmet Yılmaz", username: "chaotic_orange" },
  { id: 2, name: "Ayşe Demir", username: "sunny_rose" },
  { id: 3, name: "Murat Kaya", username: "blue_hawk" },
  { id: 4, name: "Fatma Aslan", username: "wild_berry" },
  { id: 5, name: "Mehmet Can", username: "quiet_storm" },
  { id: 6, name: "Elif Yılmaz", username: "soft_moon" },
  { id: 7, name: "Kemal Erdem", username: "green_earth" },
  { id: 8, name: "Zeynep Şahin", username: "silver_wings" },
  { id: 9, name: "Ali Vural", username: "golden_dream" },
  { id: 10, name: "Selin Güler", username: "silent_waves" },
];

function generateRandomAuthors() {
  return authors[Math.floor(Math.random() * authors.length)];
}

function generateRandomContent() {
  const contents = [
    "Hafıza geliştirme kursuna yazıldım. Nerede olduğunu hatırlamıyorum.",
    "Bugün çok güzel bir gün. Her şey yolunda gidiyor.",
    "Geçen hafta tatile gitmiştim. Harika bir deneyimdi.",
    "Yeni bir hobim var. Şimdi her gün fotoğraf çekiyorum.",
    "Çalışma odasında çok fazla kitap var. Hangi birini okuyacağımı bilemiyorum.",
    "Dün akşam sinemaya gittim. Gerçekten çok iyi bir film izledim.",
    "Yürüyüş yapmak gerçekten rahatlatıcı. Her gün yapmaya karar verdim.",
    "Yoga yapmaya başladım. Bedeni ve ruhu dinlendirdiğini düşünüyorum.",
    "Bugün işlerim çok yoğundu. Ama yine de keyif aldım.",
    "Yeni bir dil öğrenmeye başladım. Zor ama bir o kadar eğlenceli.",
  ];
  return contents[Math.floor(Math.random() * contents.length)];
}

function generateObjects(n, fillReplies = false) {
  const objects = [];
  for (let i = 0; i < n; i++) {
    const author = generateRandomAuthors();
    const like = Math.floor(Math.random() * 30);
    objects.push({
      id: window.crypto.randomUUID(),
      authorId: author.id,
      retweets: Math.floor(Math.random() * 10),
      content: generateRandomContent(),
      createDate: generateRandomDate(),
      likes: like,
      replies: fillReplies ? generateObjects(3, false) : [],
      name: author.name,
      username: author.username,
      likedByUser: false,
    });
  }
  return objects;
}

// Dummy data
export let twits = [...generateObjects(50, true)];

// Like işlemi
export function likeTwit(id) {
  const twit = twits.find((t) => t.id === id);
  if (twit && !twit.likedByUser) {
    twit.likes++;
    twit.likedByUser = true;
  }
  return twit;
}

// Unlike işlemi
export function unlikeTwit(id) {
  const twit = twits.find((t) => t.id === id);
  if (twit && twit.likedByUser) {
    twit.likes = Math.max(0, twit.likes - 1);
    twit.likedByUser = false;
  }
  return twit;
}

// Delete işlemi
export function deleteTwit(id) {
  twits = twits.filter((t) => t.id !== id);
  return true;
}

// Reply işlemi
export function replyToTwit(id, reply) {
  const twit = twits.find((t) => t.id === id);
  if (twit) {
    twit.replies.push(reply);
  }
  return twit;
}
