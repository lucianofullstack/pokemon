import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Index    from './components/PageIndex'
import Intro    from './components/PageIntro'
import Home     from './components/PageHome'
import Detail   from './components/PageDetail'
import Create   from './components/PageCreate'
import NotFound from './components/PageNotFound'

function App() { return (
<div className='app'>
  <Router>
    <Routes>
      <Route path = '/'               element = { <Index/>    }/>
      <Route path = '/intro'          element = { <Intro/>    }/>
      <Route path = '/home'           element = { <Home/>     }/>
      <Route path = '/pokemons/:name' element = { <Detail/>   }/>
      <Route path = '/create'         element = { <Create/>   }/>
      <Route path = '/404'            element = { <NotFound/> }/>
      <Route path="*" element={ <Navigate to="/404" replace/> }/>
    </Routes>
  </Router>
</div>)
}
export default App
