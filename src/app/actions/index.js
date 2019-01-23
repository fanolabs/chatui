import { actionCreators as authActionCreators } from "./auth";
import { actionCreators as audioActionCreators } from "./audio";
import { actionCreators as chatActionCreators } from "./chat";

export const actionCreators = {
  ...authActionCreators,
  ...audioActionCreators,
  ...chatActionCreators
}