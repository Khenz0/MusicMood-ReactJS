const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "0aafb87d351c47df80aeab0306fa4bc2";
const redirectUri = "http://localhost:3000";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;