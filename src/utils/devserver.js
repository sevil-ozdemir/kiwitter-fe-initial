import { createServer, Response } from "miragejs"

function generateRandomDate() {
    const start = new Date(2025, 0, 1); // Start date: Jan 1, 2025
    const end = new Date(); // End date: current date
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.getTime()
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
        const like = Math.floor(Math.random() * 100);
        objects.push({
            "id": i + 1,
            "authorId": author.id,
            "content": generateRandomContent(),
            "createDate": generateRandomDate(),
            "likes": like,
            "replies": Math.floor(Math.random() * 100),
            "name": author.name,
            "username": author.username
        });
        twitLikes[i+1] = like;
    }
    
    return objects;
}

const twitLikes = {

}

createServer({

    routes() {

        this.urlPrefix = 'https://uppro-0825.workintech.com.tr/';

        this.post("/login", (schema, request) => {

            const { nickname } = JSON.parse(request.requestBody);

            return {
                token: "token123",
                username: nickname,
            }
            // return new Response(401);
        });

        this.post("/signup", () => {

            return {};
        })

        this.get("/twits", () => {

            return {
                twits: generateObjects(100)
            }
        })

        this.post("/twits", () => {

            return {
                id: window.crypto.randomUUID(),
                createDate: Date.now()
            }
        });

        this.post("/twits/:twitId/like", (schema, request) => {

            const { twitId } = request.params; 

            if (twitLikes[twitId]) {

                twitLikes[twitId]++;

            } else {
                
                twitLikes[twitId] = 1;
            }

            return {
                count: twitLikes[twitId]
            }
        });
    },
});