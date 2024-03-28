const redis = require("redis");

// Create a Redis client
const client = redis.createClient({
  host: "127.0.0.1", // Redis server address
  port: 6379, // Redis server port
});

// Connect to Redis
client.on("connect", () => {
  console.log("Connected to Redis...");
});

// Handle errors
client.on("error", (err) => {
  console.error("Error:", err);
});

// Publish messages
function publishMessages() {
  for (let i = 1; i <= 10; i++) {
    const message = `Hello World ${i}`;
    client.publish("MESSAGE", message, (err) => {
      if (err) {
        console.error("Error publishing message:", err);
      } else {
        console.log(`Published: ${message}`);
      }
    });
  }
}

// Subscribe to messages
function subscribeMessages() {
  client.subscribe("MESSAGE", (err) => {
    if (err) {
      console.error("Error subscribing to channel:", err);
    } else {
      console.log("Subscribed to MESSAGE channel...");
    }
  });
}

// Listen for new messages
client.on("message", (channel, message) => {
  if (channel === "MESSAGE") {
    console.log(`Received message: ${message}`);
  }
});

// Publish messages
publishMessages();

// Subscribe to messages and listen for new messages
setTimeout(() => {
  subscribeMessages();
}, 2000); // Wait for 2 seconds before subscribing
