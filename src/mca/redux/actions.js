import { createAction } from '@reduxjs/toolkit';
import * as constants from './constants';

export const loadContactInfo = createAction(constants.LLOAD_CONTACT_INFO);
