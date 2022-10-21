import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from './hooks/redux-settings';
import { userSlice } from './store/reducers/UserSlice';
import { RootState } from './store/store';
import { useEffect } from 'react';
import "./styles/styles.css";
import { fetchUsers, loadUsers } from './store/reducers/ActionCreators';


function App() {
  
  const { users, isLoading, error, counter } = useAppSelector(state => state.userReducer);
  // or so:
  // const { users, isLoading, error } = useSelector((state: RootState) => state.userReducer);

  const { increment } = userSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      dispatch(loadUsers()); // using with Redux Toolkit
      // dispatch(fetchUsers()); // standard using - without using of Redux Toolkit
    },
    []
  );

  return (
    <div>
      <h1>HI-HI</h1>
      <p>Counter: {counter}</p>
      <button onClick={() => dispatch(increment(4))}>Add 4</button>
      { isLoading
        ? <p>Loading ...</p>
        : <div>
            <h2 style={{textAlign:"center", padding:12}}>Users List</h2>
            { error && <div>{error}</div> }
            <div>{users.map(user => <div key={user.id}>{user.id}. {user.name} / {user.email}</div>)}</div>
          </div>
      }
    </div>
  );
}

export default App;
