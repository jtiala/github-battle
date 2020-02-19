const API_URL = "https://api.github.com";

export interface User {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: Date;
}

const getUserURL = (username: string): string =>
  new URL(`users/${username}`, API_URL).href;

export const getUser = async (username: string): Promise<User> =>
  fetch(getUserURL(username), {
    method: "GET",
    headers: {
      Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
    }
  }).then(async response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  });
