import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import Home from './components/home/Home';
import PrivateRoute from './components/auth/PrivateRoute';
import Feedback from './components/feedback/Feedback';
import Settings from './components/settings/Settings';
import Accounts from './components/accounts/Accounts';
import Requests from './components/requests/Requests';
import OpeningPage from './components/auth/OpeningPage';
import AddBookMain from './components/books/AddBookMain';
import ViewBookMain from './components/books/ViewBookMain';
import SignUp from './components/auth/SignUp';
import SearchBookMain from './components/books/SearchBookMain';
import WantToReadMain from './components/lists/WantToReadMain';
import CurrentlyReadingMain from './components/lists/CurrentlyReadingMain';
import ReadMain from './components/lists/ReadMain';
import DidNotFinishMain from './components/lists/DidNotFinishMain';
import EditBookMain from './components/books/EditBookMain';

function App() {
  return (
      <Router>
        <Routes>
            <Route exact path="/" element={
                <PrivateRoute>
                  <Home/>
                </PrivateRoute>
              } />
            <Route path='/start' element={<OpeningPage/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/sign-up' element={<SignUp/>} />
            <Route path='/feedback' element={
              <PrivateRoute>
                <Feedback/>
              </PrivateRoute>
            } />
            <Route path='/settings' element={
              <PrivateRoute>
                <Settings/>
              </PrivateRoute>
            } />
            <Route path='/accounts' element={
              <PrivateRoute>
                <Accounts/>
              </PrivateRoute>
            } />
            <Route path='/requests' element={
              <PrivateRoute>
                <Requests/>
              </PrivateRoute>
            } />
            <Route path='/addBook' element={
              <PrivateRoute>
                <AddBookMain/>
              </PrivateRoute>
            } />
            <Route path='/search' element={
              <PrivateRoute>
                <SearchBookMain/>
              </PrivateRoute>
            } />
            <Route path='/wantToRead' element={
              <PrivateRoute>
                <WantToReadMain/>
              </PrivateRoute>
            } />
            <Route path='/currentlyReading' element={
              <PrivateRoute>
                <CurrentlyReadingMain/>
              </PrivateRoute>
            } />
            <Route path='/read' element={
              <PrivateRoute>
                <ReadMain/>
              </PrivateRoute>
            } />
            <Route path='/didNotFinish' element={
              <PrivateRoute>
                <DidNotFinishMain/>
              </PrivateRoute>
            } />
            <Route path='/viewBook/:bookId' element={
              <PrivateRoute>
                <ViewBookMain/>
              </PrivateRoute>
            } />
            <Route path='/editBook/:bookId' element={
              <PrivateRoute>
                <EditBookMain/>
              </PrivateRoute>
            } />
        </Routes>
      </Router>
  );
}

export default App;
