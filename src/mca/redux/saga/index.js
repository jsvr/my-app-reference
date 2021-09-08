import { fork, all } from 'redux-saga/effects';
import { contactInfoPage } from './contactInfoPage';

export default function* rootSagas() {
  yield all([
    fork(contactInfoPage)
  ])
}