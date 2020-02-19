import { Machine, interpret, assign } from "xstate";
import { User, getUser } from "../api/github";

interface UsersSchema {
  states: {
    idle: {};
    loading: {};
    failure: {};
  };
}

type UsersEvent =
  | { type: "FETCH"; login: string }
  | { type: "REMOVE"; login: string };

interface UsersContext {
  users: User[];
  error?: Error;
}

const initialState: UsersContext = {
  users: []
};

export const usersMachine = Machine<UsersContext, UsersSchema, UsersEvent>({
  id: "users",
  initial: "idle",
  context: initialState,
  states: {
    idle: {
      on: {
        FETCH: "loading",
        REMOVE: {
          actions: assign({
            users: (context, event) =>
              context.users.filter(user => user.login !== event.login)
          })
        }
      }
    },
    loading: {
      invoke: {
        id: "getUser",
        src: (context, event) => getUser(event.login.trim()),
        onDone: {
          target: "idle",
          actions: assign({
            users: (context, event) => [...context.users, event.data]
          })
        },
        onError: {
          target: "failure",
          actions: assign({ error: (context, event) => event.data })
        }
      }
    },
    failure: {
      on: {
        FETCH: "loading"
      }
    }
  }
});

export const usersService = interpret(usersMachine)
  .onTransition(state => console.log("New users state", state))
  .start();
