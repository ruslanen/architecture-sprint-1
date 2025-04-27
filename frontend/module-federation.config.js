export const mfConfig = {
  name: "host",
  shared: ["react", "react-dom"],
  remotes: {
    auth_mf: "auth_mf@http://localhost:8082/remoteEntry.js",
    users_mf: "users_mf@http://localhost:8083/remoteEntry.js",
    cards_mf: "cards_mf@http://localhost:8081/remoteEntry.js",
    shared_context_mf: "shared_context_mf@http://localhost:8084/remoteEntry.js"
  }, 
};
