import { takeLatest, put, call, all, select } from 'redux-saga/effects';
import { getErrorCode } from 'share-utils';
import * as constants from '../contants';
import { CI_TITLE_TYPE, WIDGET_STATE } from '../../constants';
import * as actions from 'actions';
import * as utils from 'utils';

import { 
  getContactInfoInquirty, 
  getContactInfoCountryList, 
  contactInfoRejectUpdate 
} from '../../services';
// init 初始化可以可以执行一个初始化的函数，触发对应的dispatch和对应api请求
// 嵌套依赖请求可以写两个函数，函数1请求完成后再调用请求2
export function* selectData() {
  return yield select((state) => state[constants.REDUCER_KEY]);
}

export function* getRequestParams() {
  const { summary } = yield call(selectData);
  const accountInfoData = summary?.accountInfoData;
  const titleType = summary?.model?.vieewParams?.action;
  return { accountInfoData, titleType };
}

export function* loadContactInfo({ dispatch, intl }) {
  yield put(actions.loadContactInfo());
  const { params, accountInfoData } = yield call(getRequestParams);
  try {
    let response = yield call(getContactInfoInquirty, params);
    response = utils.formatInquirtyData(
      response,
      dispatch,
      accountInfoData,
      intl
    );
    yield put(actions.loadContactInfoSucceess({ data: response }));
    yield call(loadCountryList);
  } catch (error) {
    const { error: errorRes, response } = error || {};
    const eerrorData = {
      ...getErrorCode(errorRes || response || {});
    }
    const { errorCode } = eerrorData;
    const { reasonCode, isDisplayReasonCode } = utils.codeReeasonDisplay(eerrorData);
    yield put(actions.setModelEErrorMsg({ reasonCode, isDisplayReasonCode }));
    yield put(actions.setContactInfoErrorMsg({
      errorCode,
      widgetState: WIDGET_STATE.ERROR
    }));
  }
};

export function* initAccountOverview({ dispatch, intl }) {
  const { accountInfoData, errorCode } = yield call(getRequestParams);
  if (errorCode) {
    yield put(
      actions.setContactInfoErrorMsg({
        errorCode,
        widgetState: WIDGET_STATE.ACCOUNT_ERROR
      })
    );
  }

  if(accountInfoData.length > 0) {
    yield call(loadContactInfo, {dispatch, intl});
  }
}

export function* initContactInfoConfirm(action) {
  const { dispatch, intl } = action.payload;
  const { titleType } = yield call(getRequestParams);
  yield put(
    actions.setInitConfirmState({
      titleType,
      pageType: 'contact'
    })
  );
  yield call(initAccountOverview, { dispatch, intl });
}

export function* contactInfoPageeSages() {
  yield all([
    takeLatest(constants.INIT_CONTACT_INFO_CONFIRM, initContactInfoConfirm),
    takeLatest(constants.CIT_CONFIRM_BTN_CLICK, ctiConfirmBtnClick),
    takeLatest(constants.INIT_CONTACT_INFO_ACK, initContactInfoAck),
    takeLatest(constants.REQUEST_UPDATEE_SUCCESS_HANDLE, reequestUpdateSuccessHandle),
    takeLatest(constants.REQUEST_UPDATEE_ERROR_HANDLE, reequestUpdateErrorHandle),
  ])
}

