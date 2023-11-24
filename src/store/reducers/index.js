import { SET_ALL_CONTACTS, SET_ALL_GROUPS, SET_CONTACT_ACTION } from "../const/index";

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALL_CONTACTS:
      return { ...state, allContacts: payload };

    case SET_ALL_GROUPS:
      return { ...state, groups: payload };

    case SET_CONTACT_ACTION:
      return { ...state, contactAction: payload };

    default:
      return state;
  }
};
