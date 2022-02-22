import {BrowserRouter,Routes, Route} from 'react-router-dom';
import { NewRoom } from './pages/NewRoom';
import { Home } from './pages/Home';
import {AuthContextProvider} from './context/AuthContext'
import { Room } from './pages/Room';


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/"  element = {<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
          <Route path="/rooms/:id" element={<Room />} />
          
        </Routes>
    </AuthContextProvider>
    </BrowserRouter>

  );
}

export default App;
