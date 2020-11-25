export const selectAllUserIds = (state) => state.users.allIds;

export const selectUserById = (id) => (state) => state.users.byId[id];
