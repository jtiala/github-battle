import { User } from "../state/user";
import { Repository } from "../state/repositories";

const API_URL = "https://api.github.com";

const getUserURL = (username: string): string =>
  new URL(`users/${username}`, API_URL).href;

export const getUser = async (username: string): Promise<User> =>
  fetch(getUserURL(username), {
    method: "GET",
    headers: {
      Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
    }
  }).then(async response => {
    console.log(`Fetched ${response.url}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  });

const getRepositoriesURL = (username: string): string =>
  new URL(`users/${username}/repos`, API_URL).href;

export const getRepositories = async (
  usernameOrURL: string,
  repositories?: Repository[]
): Promise<Repository[]> =>
  fetch(
    usernameOrURL.indexOf("://") > -1
      ? usernameOrURL
      : getRepositoriesURL(usernameOrURL),
    {
      method: "GET",
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
      }
    }
  ).then(async response => {
    console.log(`Fetched ${response.url}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const linkHeader = response.headers.get("Link");
    let nextLink = "";

    if (linkHeader) {
      const links = linkHeader.split(",");

      links.forEach(link => {
        if (link.indexOf('rel="next"') > -1) {
          const matches = link.match(/<(.*?)>/);

          if (matches) {
            nextLink = matches[1];
          }
        }
      });
    }

    if (nextLink) {
      return await getRepositories(nextLink, await response.json());
    }

    return [...(await response.json()), ...(repositories || [])];
  });
