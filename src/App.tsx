import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import QuizGame, { loader as QuizGameLoader, action as QuizGameAction} from './pages/QuizGame'
import Loading from './pages/Loading'

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Layout />}>
    <Route 
      path='/'
      element={<Home />}
    />
    <Route 
      path='/quiz'
      element={<QuizGame />}
      loader={QuizGameLoader}
      action={QuizGameAction}
      shouldRevalidate={() => {
        return false;
      }}
    />
    <Route 
      path='/loading'
      element={<Loading />}
    />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
