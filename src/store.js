import { createStore ,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import studentReducer from './Reducers/studentReducer';
import { reducer as reduxFormReducer } from 'redux-form';

const reducer = combineReducers({
  form: reduxFormReducer,
  studentReducer
   // mounted under "form"
});

export default function configureStore(initialState={}){
    return createStore(
        reducer,
        initialState,
        applyMiddleware(thunk,logger)
    );
}

