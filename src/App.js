import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Chair from './pages/Chair/Chair';
import './App.scss';
import SpinningMesh from './pages/SpinningMesh/SpinningMesh';

export default function App() {
  return (
    <Switch>
      <Route exact path='/' component={SpinningMesh} />
      <Route exact path='/chair' component={Chair} />
    </Switch>
  );
}
