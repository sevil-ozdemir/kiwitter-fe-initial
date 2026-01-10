import { createServer, Model } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,

    models: {
      user: Model,
      twit: Model,
      reply: Model,
      like: Model,
    },

    seeds(server) {
      server.create("user", { id: "1", email: "test@test.com", password: "123456" });
      server.create("twit", { id: "1", userId: "1", text: "Merhaba Kiwitter!", createdAt: new Date() });
    },

    routes() {
      this.namespace = "api";

      // User register
      this.post("/users", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.users.create(attrs);
      });

      // Login
      this.post("/login", (schema, request) => {
        let { email, password } = JSON.parse(request.requestBody);
        let user = schema.users.findBy({ email, password });
        if (user) {
          return { token: "fake-jwt-token", user };
        } else {
          return new Response(401, {}, { error: "Invalid credentials" });
        }
      });

      // Twit oluşturma
      this.post("/twits", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.twits.create({ ...attrs, createdAt: new Date() });
      });

      // Twit listesi
      this.get("/twits", (schema) => {
        return schema.twits.all();
      });

      // Twit detay
      this.get("/twits/:id", (schema, request) => {
        let id = request.params.id;
        return schema.twits.find(id);
      });

      // Like
      this.post("/twits/:id/likes", (schema, request) => {
        let twit = schema.twits.find(request.params.id);
        if (twit) {
          return { success: true };
        }
        return new Response(404, {}, { error: "Twit not found" });
      });
    },
  });
}
