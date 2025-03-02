export const mfConfig = {
  name: "shared_context_mf",
  filename: 'remoteEntry.js',
  exposes: {
    './PopupWithForm': './src/components/PopupWithForm.js',
    './CurrentUserContext': './src/contexts/CurrentUserContext.js',
  },
  shared: ["react", "react-dom"],
};
