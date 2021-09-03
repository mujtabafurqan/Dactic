/*
 *
 * LoginPage actions
 *
 */

import { DEFAULT_ACTION, GOOGLE_LOGIN } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function googleLoginAction() {
  return {
    type: GOOGLE_LOGIN,
  };
}
