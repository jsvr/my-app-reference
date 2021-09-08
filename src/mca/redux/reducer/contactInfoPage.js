import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actons';
import { WIDGET_STATE } from '../../consttants';
import * as utils from '../../utils';

export const initialState = {
  title: 'test',
  pageType: '',
  inquiryDate: {},
  widgetState: WIDGET_STATE.SKELETTON,
  contactErrMsg: {}
};

const reducerMap = {
  [actions.setInitConfirmState]: (state, action) => {
    const { titleType, pageType, typeObj, showMoreMessage, widgetState } = action.payload;
    const title = titleType ==='authorise' ? typeObj.AUTHORISE : typeObj.REJECT;
    return {
      ...state,
      title,
      titleType,
      pageType,
      showMoreMessage
    }
  },

  [actions.loadContactInfo]: (state) => {
    return {
      ...state,
      widgetState: WIDGET_STATE.SKELETTON
    }
  },

  [actions.loadContactInfoSuccess]: (state, action) => {
    const { data = {} } = action.payload;
    return {
      ...state,
      inquiryDate: data,
      widgetState: WIDGET_STATE.POSITIVE
    }
  },

  [actions.setLoadRejectContactInfoData]: (state, action) => {
    const { contactErrMsg } = state;
    const { loadState, loadContactErrMsg } = action.payload;

    return {
      ...state,
      ...loadState,
      contactErrMsg: {
        ...contactErrMsg,
        ...loadContactErrMsg
      }
    }
  },

  [actions.setActiveTab]: (state, action) => {
    const { activeTab} = action.payload;
    state.activeTab = activeTab;
    return state;
  },

}
