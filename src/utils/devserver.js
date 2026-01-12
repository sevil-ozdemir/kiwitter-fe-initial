import { createServer, Response } from "miragejs";
import { jwtDecode } from "jwt-decode";

function generateRandomDate() {
  const start = new Date(2025, 0, 1);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate.getTime();
}

function generateRandomAuthors() {
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
    { id: 10, name: "Selin Güler", username: "silent_waves" }
  ];
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
    "Yeni bir dil öğrenmeye başladım. Zor ama bir o kadar eğlenceli."
  ];
  return contents[Math.floor(Math.random() * contents.length)];
}

function generateObjects(n) {
  const objects = [];
  for (let i = 0; i < n; i++) {
    const author = generateRandomAuthors();
    const like = Math.floor(Math.random() * 30);
    const obj = {
      id: window.crypto.randomUUID(),
      authorId: author.id,
      retweets: Math.floor(Math.random() * 10),
      content: generateRandomContent(),
      createDate: generateRandomDate(),
      likes: like,
      replies: Math.floor(Math.random() * 20),
      name: author.name,
      username: author.username
    };
    objects.push(obj);
    twitLikes[obj.id] = like;
  }
  return objects;
}

const twitLikes = {};
const twits = [...generateObjects(100)];

createServer({
  routes() {
    this.urlPrefix = "https://uppro-0825.workintech.com.tr/";

    // Login: sabit JWT token (Sevil Ozdemir / sevozdemir)
    this.post("/login", (schema, request) => {
      const { nickname } = JSON.parse(request.requestBody);

      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
        "eyJzdWIiOiIxMDAwIiwibmFtZSI6IlNldmlsIE96ZGVtaXIiLCJuaWNrbmFtZSI6InNldm96ZGVtaXIiLCJpYXQiOjE2OTQ5MDAwMDB9." +
        "dummy-signature";

      return { token, username: nickname };
    });

    this.post("/signup", () => {
      return {};
    });

    this.get("/twits", () => {
      return { twits };
    });

    this.post("/twits", (schema, request) => {
      const { content } = JSON.parse(request.requestBody);
      const rawAuth = request.requestHeaders["Authorization"] || "";
      const token = rawAuth.startsWith("Bearer ") ? rawAuth.slice(7) : rawAuth;

      let decoded;
      try {
        decoded = jwtDecode(token);
      } catch (e) {
        decoded = { sub: "1000", name: "Anonim", nickname: "anon" };
      }

      const newTwit = {
        id: window.crypto.randomUUID(),
        authorId: decoded.sub || "1000",
        retweets: 0,
        content,
        createDate: Date.now(),
        likes: 0,
        replies: 0,
        name: decoded.name || "Anonim",
        username: decoded.nickname || "anon"
      };

      twits.push(newTwit);

      return { twit: newTwit };
    });

    this.post("/twits/:twitId/like", (schema, request) => {
      const { twitId } = request.params;

      if (twitLikes[twitId]) {
        twitLikes[twitId]++;
      } else {
        twitLikes[twitId] = 1;
      }

      return { count: twitLikes[twitId] };
    });
  }
});
