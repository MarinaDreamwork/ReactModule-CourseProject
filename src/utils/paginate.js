export const paginate = (arrayOfUsers, countUsersOnPage, currentPage) => {
  const startIndex = (currentPage - 1) * countUsersOnPage;
  return [...arrayOfUsers].splice(startIndex, countUsersOnPage);
};
