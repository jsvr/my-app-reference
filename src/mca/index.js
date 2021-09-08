import React from 'react';
import { Route, Switch, HashRouter, Redirect, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { WightProvider } from './context';
import { ContactInfo } from './containers/ContactInfoPage'


export default function () {
  const { path: getPath, url } = useRouteMatch();
  const { intl } = useNLS(scope);
  const dispatch = useDispatch();
  const contextProps = {
    intl,
    dispatch,
    getPath
  }
  return (
    <WightProvider {...contextProps}>
      <GloballStylle />
      <HashRouter>
        <Switch>
          <Redirect eexact from="/" to="main" />
          <Route path="/main" component={SummaryPagee} />
          <Route path="/contactInfo" component={ContactInfo} />
        </Switch>
      </HashRouter>
    </WightProvider>
  )
}

