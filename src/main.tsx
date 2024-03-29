import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { Root } from './Root.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.Fragment>,
)
