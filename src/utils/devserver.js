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
    const obj = {
      id: window.crypto.randomUUID(),
      authorId: author.id,
      retweets: Math.floor(Math.random() * 10),
      content: generateRandomContent(),
      createDate: generateRandomDate(),
      likes: like,
      replies: [],
      name: author.name,
      username: author.username,
      avatarUrl: `https://i.pravatar.cc/150?u=${author.id}`,
      likedBy: []
    };
    objects.push(obj);
    twitLikes[obj.id] = like;
  }
  return objects;
}

const twitLikes = {};
let twits = [...generateObjects(20)];

createServer({
  routes() {
    this.urlPrefix = "https://uppro-0825.workintech.com.tr/";

    // Login
    this.post("/login", (schema, request) => {
      const { nickname } = JSON.parse(request.requestBody);
      const payload = {
        sub: "2001",
        name: "Sevil Ozdemir",
        nickname,
        role: "user",
        iat: Date.now()
      };
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
        btoa(JSON.stringify(payload)) +
        ".dummy-signature";
      return { token, username: nickname };
    });

    // Signup
    this.post("/signup", (schema, request) => {
      const { name, nickname, email } = JSON.parse(request.requestBody);
      const payload = {
        sub: window.crypto.randomUUID(),
        name,
        nickname,
        role: "user",
        iat: Date.now()
      };
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
        btoa(JSON.stringify(payload)) +
        ".dummy-signature";
      return { token, user: { id: payload.sub, name, nickname, email } };
    });

    // Twit listesi (ana akış)
    this.get("/twits", () => {
      return { twits: twits.filter(t => !t.replyTo) };
    });

    // Twit ekleme
    this.post("/twits", (schema, request) => {
      const { content } = JSON.parse(request.requestBody);
      const rawAuth = request.requestHeaders["Authorization"] || "";
      const token = rawAuth.startsWith("Bearer ") ? rawAuth.slice(7) : rawAuth;

      let decoded;
      try {
        decoded = jwtDecode(token);
      } catch {
        decoded = { sub: "2001", name: "Anonim", nickname: "anon" };
      }

      const newTwit = {
        id: window.crypto.randomUUID(),
        authorId: decoded.sub || "2001",
        retweets: 0,
        content,
        createDate: Date.now(),
        likes: 0,
        replies: [],
        name: decoded.name || "Anonim",
        username: decoded.nickname || "anon",
        avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg",
        likedBy: []
      };

      twits = [newTwit, ...twits];
      return { twit: newTwit };
    });

    // Twit beğenme (tek kullanıcı tek beğeni)
    this.post("/twits/:twitId/like", (schema, request) => {
      const { twitId } = request.params;
      const { userId } = JSON.parse(request.requestBody);
      const twit = twits.find(t => t.id === twitId);
      if (!twit) return new Response(404, {}, { error: "Twit bulunamadı" });
      if (twit.likedBy.includes(userId)) {
        return new Response(400, {}, { error: "Zaten beğenildi" });
      }
      twit.likes++;
      twit.likedBy.push(userId);
      return { count: twit.likes };
    });

    // Reply ekleme
    this.post("/twits/:twitId/reply", (schema, request) => {
      const { twitId } = request.params;
      const { content, author } = JSON.parse(request.requestBody);
      const parent = twits.find(t => t.id === twitId);
      if (!parent) return new Response(404, {}, { error: "Twit bulunamadı" });
      if (parent.replyTo) return new Response(400, {}, { error: "Reply'lere reply yok" });

      const reply = {
        id: window.crypto.randomUUID(),
        authorId: author,
        content,
        createDate: Date.now(),
        likes: 0,
        replies: [],
        replyTo: parent.id,
        name: "Reply User",
        username: "reply_user",
        avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg",
        likedBy: []
      };
      twits = [reply, ...twits];
      parent.replies.push(reply.id);
      return { reply };
    });

    // Most liked (24 saat)
    this.get("/twits/most-liked", () => {
      const now = Date.now();
      const last24h = now - 24 * 60 * 60 * 1000;
      return {
        twits: twits
          .filter(t => t.createDate >= last24h && !t.replyTo)
          .sort((a, b) => b.likes - a.likes)
      };
    });

    // Profil twitleri
    this.get("/twits/by/:username", (schema, request) => {
      const { username } = request.params;
      return { twits: twits.filter(t => t.username === username) };
    });

    // Twit silme (kendi twiti veya admin)
    this.delete("/twits/:twitId", (schema, request) => {
      const { twitId } = request.params;
      const { userId, role } = JSON.parse(request.requestBody);
      const twit = twits.find(t => t.id === twitId);
      if (!twit) return new Response(404, {}, { error: "Twit bulunamadı" });
      if (role === "admin" || twit.authorId === userId) {
        twits = twits.filter(t => t.id !== twitId);
        return { success: true };
      }
      return new Response(403, {}, { error: "Yetkisiz silme" });
    });
  }
});
