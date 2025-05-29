import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen' ;
import AuthScreen from './screens/AuthScreen' ;
import ImageUploadScreen from './screens/ImageUploadScreen' ;
import FireStoreWriteScreen from './screens/FireStoreWriteScreen' ;



function App() {

  return (

      <section >
          <Router>
              <Routes>
                  <Route path='/' element={<HomeScreen/>}/>
                  <Route path='/AuthScreen' element={<AuthScreen/>}/>
                  <Route path='/ImageUploadScreen' element={<ImageUploadScreen/>}/>
                  <Route path='/FireStoreWriteScreen' element={<FireStoreWriteScreen/>}/>
              </Routes>
          </Router>
      </section>



  )
}
export default App;