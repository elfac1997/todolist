import * as serviceWorker from './serviceWorker';
import {observe, observable, action, computed} from 'mobx';
import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {observer, PropTypes as ObservablePropTypes} from 'mobx-react';
import PropTypes from 'prop-types';
import TodoList from './TodoList'

ReactDOM.render(<TodoList />, document.getElementById('root'));

serviceWorker.unregister();
