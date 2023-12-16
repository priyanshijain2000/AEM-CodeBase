import React from 'react'
import ReactDOM from 'react-dom/client'
import { SchedulingWizard } from './App.tsx'
import './calendar.scss'
// import './client-lib.min.css'
// import './client-deps.min.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div id="page-container">
        <SchedulingWizard />
      </div>
    </QueryClientProvider>
    {/* Google Maps PlaceService throws a fit if we don't pass it a div, even though it doesn't get used for anything. */}
    <div id="place-data-container" />
  </React.StrictMode>,
)
