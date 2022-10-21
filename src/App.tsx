import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from './hooks/redux-settings';
import { userSlice } from './store/reducers/UserSlice';
import { RootState } from './store/store';
import { useEffect } from 'react';
import "./styles/styles.css";
import { fetchUsers, loadUsers } from './store/reducers/ActionCreators';
import PostContainer from './components/PostContainer';
import PostContainer2 from './components/PostContainer2';

// This project uses /typicode/json-server for a work with fake JSON server data
// npm install -g json-server
// create file db.json in the root of the project
// Start JSON-server with command:
// json-server --watch db.json --port 5000

function App() {
  
  const { users, isLoading, error, counter } = useAppSelector(state => state.userReducer);
  // or so (alternative way):
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
      <h1 className='centered'>Using of simple dispatch</h1>
      <p className="margined">Counter: {counter}</p>
      <button className="margined" onClick={() => dispatch(increment(4))}>Add 4</button>
      <hr />
      { isLoading
        ? <p>Loading ...</p>
        : <div>
            <h2 style={{textAlign:"center", padding:12}}>Users List</h2>
            { error && <div>{error}</div> }
            <div>{users.map(user => <div key={user.id} className="margined">{user.id}. {user.name} / {user.email}</div>)}</div>
          </div>
      }
      <br /><hr />
      <div className='displayFlex'>
        <PostContainer />
        <PostContainer2 />
      </div>
    </div>
  );
}

export default App;
