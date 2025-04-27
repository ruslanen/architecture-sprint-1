export const mfConfig = {
  name: "users_mf",
  filename: 'remoteEntry.js',
  exposes: {
    './EditAvatarPopup': './src/components/EditAvatarPopup.js',
    './EditProfilePopup': './src/components/EditProfilePopup.js',
  },
  shared: ["react", "react-dom"],
  remotes: {
    shared_context_mf: "shared_context_mf@http://localhost:8084/remoteEntry.js",
  },
};
