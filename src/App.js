import React from 'react'
import Home from './components/Home'
import Provider from './data/Context'
const App = () => {
  return (
    <Provider>
      <Home/>

    </Provider>
  )
}

export default App
