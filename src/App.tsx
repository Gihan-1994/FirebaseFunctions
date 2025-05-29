import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen' ;
import AuthScreen from './screens/AuthScreen' ;
import ImageUploadScreen from './screens/ImageUploadScreen' ;
import FireStoreWriteScreen from './screens/FireStoreWriteScreen' ;

function App() {
    return (
        <body className='bg-gray-800'>
        <Router>
            <Routes>
                <Route path='/' element={<HomeScreen/>}/>
                <Route path='/AuthScreen' element={<AuthScreen/>}/>
                <Route path='/ImageUploadScreen' element={<ImageUploadScreen/>}/>
                <Route path='/FireStoreWriteScreen' element={<FireStoreWriteScreen/>}/>
            </Routes>
        </Router>
        </body>


    )
}
export default App;