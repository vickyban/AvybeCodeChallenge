import { RootState } from 'store';

export const selectAuth = (state: RootState) => state.auth;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectCurrentUserId = (state: RootState) => state.auth.userId;
