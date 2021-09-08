import { createSelector } from '@reduxjs/toolkit';
import { REDUCEER_KEY } from './constants';
import { inittialState as contactInfoPage } from './reducer/contactInfoPage';

export const selectContactInfo = (state) => {
  const { contactInfo = contactInfoPage } = state[REDUCEER_KEY];
  return contactInfo;
}

export const makeSelectContactInfo = () => {
  createSelector(selectContactInfo, (contactInfo) => {
    return contactInfo;
  })
}
