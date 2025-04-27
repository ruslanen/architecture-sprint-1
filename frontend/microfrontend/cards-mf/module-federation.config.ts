export const mfConfig = {
  name: "cards_mf",
  filename: 'remoteEntry.js',
  exposes: {
    './AddPlacePopup': './src/components/AddPlacePopup.js',
    './Card': './src/components/Card.js',
    './ImagePopup': './src/components/ImagePopup.js',
  },
  remotes: {
    shared_context_mf: "shared_context_mf@http://localhost:8084/remoteEntry.js",
  },
  shared: ["react", "react-dom"],
};
