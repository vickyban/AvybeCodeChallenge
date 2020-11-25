export const selectAuth = (state) => state.auth;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectCurrentUserId = (state) => state.auth.userId;
