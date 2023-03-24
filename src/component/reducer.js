export const reducer = (state, action) => {
  if (action.type === "ADD_EXPENSE") {
    return {
      ...state,
      showForm: true,
    };
  }

  if (action.type === "CLOSE_FORM") {
    return {
      ...state,
      showForm: false,
    };
  }

  if (action.type === "UPDATE_FORM") {
    return {
      ...state,
      showUpdateForm: true,
    };
  }

  if (action.type === "CLOSE_UPDATE_FORM") {
    return {
      ...state,
      showUpdateForm: false,
    };
  }
};
