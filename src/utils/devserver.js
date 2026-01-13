import { createServer, Response } from "miragejs";
import { jwtDecode } from "jwt-decode";

function generateRandomDate() {
  const start = new Date(2025, 0, 1);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
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
  { id: 10, name: "Selin Güler", username: "silent_waves" }
];

function generateRandomAuthors() {
  return authors[Math.floor(Math.random() * authors.length)];
}

function generateRandomContent() {
  const contents = [
    "Bugün çok güzel bir gün.",
    "Yeni bir hobim var.",
    "Dün akşam sinemaya gittim.",
    "Yoga yapmaya başladım.",
    "Yeni bir dil öğreniyorum."
  ];
  return contents[Math.floor(Math.random() * contents.length)];
}

function generateObjects(n) {
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
      replies: [],
      name: author.name,
      username: author.username
    });
  }
  return objects;
}

const twitsLikedByUser = {};
const twits = [...generateObjects(20)];

createServer({
  routes() {
    this.urlPrefix = "https://uppro-0825.workintech.com.tr/";

    // 🔑 Login endpoint – güncellenmiş payload
    this.post("/login", (schema, request) => {
      const { nickname } = JSON.parse(request.requestBody);

      const payload = {
        sub: "6", // kadın avatar id’si (örnek: Elif Yılmaz)
        name: "Sevil Ozdemir",
        nickname: "sozdemir",
        iat: 1516239022
      };

      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
        btoa(JSON.stringify(payload)) +
        ".dummy-signature";

      return { token, username: nickname };
    });

    // Signup
    this.post("/signup", () => {
      return {};
    });

    // Twit listesi
    this.get("/twits", (schema, request) => {
      const token = request.requestHeaders["Authorization"];
      if (token) {
        const decoded = jwtDecode(token);
        const { sub: userId } = decoded;
        return {
          twits: twits.map((twit) => ({
            ...twit,
            likedByUser:
              twitsLikedByUser[userId] && twitsLikedByUser[userId].includes(twit.id)
                ? true
                : false
          }))
        };
      } else {
        return { twits };
      }
    });

    // Twit ekleme
    this.post("/twits", (schema, request) => {
      const { content } = JSON.parse(request.requestBody);
      const token = request.requestHeaders["Authorization"];
      const decoded = jwtDecode(token);
      const { sub: userId } = decoded;

      const newTwit = {
        id: window.crypto.randomUUID(),
        authorId: userId,
        retweets: 0,
        content,
        createDate: Date.now(),
        likes: 0,
        replies: [],
        name: decoded.name,
        username: decoded.nickname
      };

      twits.push(newTwit);
      return { twit: newTwit };
    });

    // Like ekleme
    this.post("/twits/:twitId/like", (schema, request) => {
      const { twitId } = request.params;
      const token = request.requestHeaders["Authorization"];
      const { sub: userId } = jwtDecode(token);
      const twit = twits.find((t) => t.id === twitId);

      if (twitsLikedByUser[userId]) {
        twitsLikedByUser[userId].push(twitId);
      } else {
        twitsLikedByUser[userId] = [twitId];
      }

      twit.likes++;
      return { count: twit.likes };
    });

    // Like silme
    this.delete("/twits/:twitId/like", (schema, request) => {
      const { twitId } = request.params;
      const token = request.requestHeaders["Authorization"];
      const { sub: userId } = jwtDecode(token);
      const twit = twits.find((t) => t.id === twitId);

      if (!twitsLikedByUser[userId]) {
        return new Response(200);
      }

      twitsLikedByUser[userId] = twitsLikedByUser[userId].filter((id) => id !== twitId);
      twit.likes--;
      return { count: twit.likes, likedByUser: false };
    });

    // Kullanıcı bilgisi
    this.get("/users/me", (schema, request) => {
      const token = request.requestHeaders["Authorization"];
      const { sub: id, name, nickname: username } = jwtDecode(token);
      return { id, name, username };
    });

    this.get("/users/:username", (schema, request) => {
      const { username } = request.params;
      const author = authors.find((a) => a.username === username);
      if (author) {
        return { id: author.id, name: author.name, username: author.username };
      }
      return new Response(404);
    });
  }
});
