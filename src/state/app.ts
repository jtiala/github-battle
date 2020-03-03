import { Machine, assign, spawn, Interpreter, send } from "xstate";
import { isBefore } from "date-fns";
import { History } from "history";

import { UserContext, UserSchema, UserEvent, createUserMachine } from "./user";

export interface AppContext {
  history?: History;
  users: {
    [username: string]: Interpreter<UserContext, UserSchema, UserEvent>;
  };
  winners: {
    created_at?: string;
    followers?: string;
    following?: string;
    public_repos?: string;
    total_stars?: string;
  };
  champion: string;
}

export interface AppSchema {
  states: {
    initializing: {};
    idle: {};
  };
}

type AddUserEvent = { type: "ADD_USER"; username: string };
type RemoveUserEvent = { type: "REMOVE_USER"; username: string };
type CalulateWinnersEvent = { type: "CALCULATE_WINNERS" };

export type AppEvent = AddUserEvent | RemoveUserEvent | CalulateWinnersEvent;

export const createAppMachine = () => {
  return Machine<AppContext, AppSchema, AppEvent>(
    {
      id: "app",
      initial: "initializing",
      context: {
        users: {},
        winners: {},
        champion: ""
      },
      states: {
        initializing: {
          entry: assign(context => {
            // Get initial users from URL
            if (context.history) {
              const currentPath = context.history.location.pathname;
              const pathParts = currentPath
                .split("/")
                .filter(path => path !== "");

              return {
                users: pathParts.reduce(
                  (machines: AppContext["users"], username) => ({
                    ...machines,
                    [username]: spawn(createUserMachine(username))
                  }),
                  {}
                )
              };
            }

            return {};
          }),
          on: {
            "": "idle"
          }
        },
        idle: {}
      },
      on: {
        ADD_USER: {
          actions: [
            assign((context, event) => ({
              users: {
                ...context.users,
                [event.username]: spawn(createUserMachine(event.username))
              }
            })),
            "addUsernameToURL"
          ]
        },
        REMOVE_USER: {
          actions: [
            assign((context, event) => {
              delete context.users[event.username];

              return {
                users: context.users
              };
            }),
            "removeUsernameFromURL",
            send("CALCULATE_WINNERS")
          ]
        },
        CALCULATE_WINNERS: {
          actions: assign(context => {
            const winners = {
              created_at: calculateWinner("created_at", context.users),
              followers: calculateWinner("followers", context.users),
              following: calculateWinner("following", context.users),
              public_repos: calculateWinner("public_repos", context.users),
              total_stars: calculateWinner("total_stars", context.users)
            };

            const champion = calculateChampion(winners);

            return {
              winners,
              champion
            };
          })
        }
      }
    },
    {
      actions: {
        addUsernameToURL: (context, event) => {
          if (context.history && (event as AddUserEvent).username) {
            const username = (event as AddUserEvent).username;

            if (username.length > 0) {
              const currentPath = context.history.location.pathname;
              const pathParts = currentPath
                .split("/")
                .filter(path => path !== "");

              if (!pathParts.includes(username)) {
                const newPath = `${
                  currentPath === "/" ? "" : currentPath
                }/${username}`;

                context.history.push(newPath);
              }
            }
          }
        },
        removeUsernameFromURL: (context, event) => {
          if (context.history && (event as RemoveUserEvent).username) {
            const username = (event as RemoveUserEvent).username;

            if (username.length > 0) {
              const currentPath = context.history.location.pathname;
              const newPath = currentPath
                .replace(username, "")
                .replace("//", "/");

              context.history.push(newPath);
            }
          }
        }
      }
    }
  );
};

const calculateWinner = (
  category: keyof AppContext["winners"],
  users: AppContext["users"]
): string => {
  let winner: string = "";
  let winningValue: string | number;

  Object.values(users).forEach(service => {
    if (!service.state.context.user) {
      return;
    }

    const { user, total_stars } = service.state.context;

    switch (category) {
      case "created_at": {
        if (
          !winningValue ||
          isBefore(new Date(user.created_at), new Date(winningValue))
        ) {
          winner = user.login;
          winningValue = user.created_at;
        }
        break;
      }
      case "followers": {
        if (!winningValue || user.followers > winningValue) {
          winner = user.login;
          winningValue = user.followers;
        }
        break;
      }
      case "following": {
        if (!winningValue || user.following > winningValue) {
          winner = user.login;
          winningValue = user.following;
        }
        break;
      }
      case "public_repos": {
        if (!winningValue || user.public_repos > winningValue) {
          winner = user.login;
          winningValue = user.public_repos;
        }
        break;
      }
      case "total_stars": {
        if (total_stars && (!winningValue || total_stars > winningValue)) {
          winner = user.login;
          winningValue = total_stars;
        }
        break;
      }
    }
  });

  return winner;
};

const calculateChampion = (winners: AppContext["winners"]): string => {
  const winnerNames = Object.values(winners).filter(
    v => v !== undefined
  ) as string[];

  // Don't @ me
  return (
    winnerNames
      .sort(
        (a: string, b: string) =>
          winnerNames.filter(v => v === a).length -
          winnerNames.filter(v => v === b).length
      )
      .pop() || ""
  );
};
