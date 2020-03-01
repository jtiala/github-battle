import { Machine, assign, spawn, Interpreter, sendParent } from "xstate";

import { getUser } from "../api/github";
import {
  createRepositoriesMachine,
  RepositoriesContext,
  RepositoriesEvent,
  RepositoriesSchema
} from "./repositories";

export interface User {
  // From GitHub
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
  created_at: string;
}

export interface UserContext {
  username: string;
  user?: User;
  repositories?: Interpreter<
    RepositoriesContext,
    RepositoriesSchema,
    RepositoriesEvent
  >;
  total_stars?: number;
  error?: Error;
}

export interface UserSchema {
  states: {
    loading: {};
    loaded: {};
    failure: {};
  };
}

export type UserEvent =
  | { type: "RETRY" }
  | { type: "UPDATE_STARS"; stars: number };

export const createUserMachine = (username: string) => {
  return Machine<UserContext, UserSchema, UserEvent>({
    id: "users",
    initial: "loading",
    context: {
      username
    },
    on: {
      UPDATE_STARS: {
        actions: [
          assign((context, event) => ({
            total_stars: event.stars
          })),
          sendParent("CALCULATE_WINNERS")
        ]
      }
    },
    states: {
      loading: {
        invoke: {
          id: "getUser",
          src: context => getUser(context.username),
          onDone: {
            target: "loaded",
            actions: assign({
              user: (context, event) => event.data
            })
          },
          onError: {
            target: "failure",
            actions: assign({ error: (context, event) => event.data })
          }
        }
      },
      loaded: {
        entry: [
          sendParent("CALCULATE_WINNERS"),
          assign(context => ({
            repositories: spawn(createRepositoriesMachine(context.username))
          }))
        ]
      },
      failure: {
        on: {
          RETRY: "loading"
        }
      }
    }
  });
};
