import { Machine, assign, sendParent } from "xstate";

import { getRepositories } from "../api/github";

export interface Repository {
  // From GitHub
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  forks: number;
  watchers: number;
  stargazers_count: number;
  open_issues: number;
  created_at: string;
}

export interface RepositoriesContext {
  username: string;
  repositories: Repository[];
  error?: Error;
}

export interface RepositoriesSchema {
  states: {
    loading: {};
    loaded: {};
    failure: {};
  };
}

export type RepositoriesEvent = { type: "RETRY" };

export const createRepositoriesMachine = (username: string) => {
  return Machine<RepositoriesContext, RepositoriesSchema, RepositoriesEvent>({
    id: "repositories",
    initial: "loading",
    context: {
      username,
      repositories: []
    },
    states: {
      loading: {
        invoke: {
          id: "getRepositories",
          src: context => getRepositories(context.username),
          onDone: {
            target: "loaded",
            actions: [
              assign({
                repositories: (context, event) =>
                  event.data.sort((a: Repository, b: Repository) =>
                    a.stargazers_count > b.stargazers_count ? -1 : 1
                  )
              }),
              sendParent((context: RepositoriesContext) => ({
                type: "UPDATE_STARS",
                stars: context.repositories.reduce(
                  (total, repo) => (total += repo.stargazers_count),
                  0
                )
              }))
            ]
          },
          onError: {
            target: "failure",
            actions: assign({ error: (context, event) => event.data })
          }
        }
      },
      loaded: {},
      failure: {
        on: {
          RETRY: "loading"
        }
      }
    }
  });
};
