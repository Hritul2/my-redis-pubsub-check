import { Redis } from "ioredis";

const pub = new Redis({ host: "localhost", port: 6379 });
const sub = new Redis({ host: "localhost", port: 6379 });

// Handle connection errors
pub.on("error", (error) => {
  console.error("Error connecting to Redis for publishing:", error);
});

sub.on("error", (error) => {
  console.error("Error connecting to Redis for subscribing:", error);
});

// Subscribe to a channel
sub.subscribe("MESSAGE", (err, count) => {
  if (err) {
    console.error("Error subscribing to channel:", err);
    return;
  }
  console.log(`Subscribed to ${count} channel.`);
});

// Handle incoming messages
sub.on("message", (channel, message) => {
  console.log(`Received message from ${channel}: ${message}`);
});

// Publish messages
const messages = [
  "Hello World 1",
  "Hello World 2",
  "Hello World 3",
  "Hello World 4",
  "Hello World 5",
];
let currentIndex = 0;

setInterval(() => {
  pub.publish("MESSAGE", messages[currentIndex]);
  console.log(`Published: ${messages[currentIndex]}`);
  currentIndex = (currentIndex + 1) % messages.length;
}, 1000); // Publish messages every 1 second

// Keep the subscription active
(async () => {
  while (true) {
    // Keep the event loop alive
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
})();
