export const mfConfig = {
  name: "auth_mf",
  filename: 'remoteEntry.js',
  exposes: {
    './Login': './src/components/Login.js',
    './Register': './src/components/Register.js',
    './ProtectedRoute': './src/components/ProtectedRoute.js',
  },
  shared: ["react", "react-dom"],
};
