import { Machine, assign, spawn, Interpreter, interpret, send } from "xstate";
import { isBefore } from "date-fns";

import { UserContext, UserSchema, UserEvent, createUserMachine } from "./user";

export interface AppContext {
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
    idle: {};
  };
}

export type AppEvent =
  | { type: "ADD_USER"; username: string }
  | { type: "REMOVE_USER"; username: string }
  | { type: "CALCULATE_WINNERS" };

export const createAppMachine = () => {
  return Machine<AppContext, AppSchema, AppEvent>({
    id: "app",
    initial: "idle",
    context: {
      users: {},
      winners: {},
      champion: ""
    },
    states: {
      idle: {}
    },
    on: {
      ADD_USER: {
        actions: assign((context, event) => ({
          users: {
            ...context.users,
            [event.username]: spawn(createUserMachine(event.username))
          }
        }))
      },
      REMOVE_USER: {
        actions: [
          assign((context, event) => {
            delete context.users[event.username];

            return {
              users: context.users
            };
          }),
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
  });
};

export const appService = interpret(createAppMachine())
  .onTransition(state => console.log("New app state", state))
  .start();

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
