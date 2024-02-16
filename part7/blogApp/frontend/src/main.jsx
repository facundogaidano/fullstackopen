import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationProvider } from './reducers/notificationReducer'
import { BlogProvider } from './reducers/blogReducer'
import { UserProvider } from './reducers/userReducer'

const queryClient = new QueryClient()

export const CombinedProvider = ({ children }) => (
  <BrowserRouter>
    <NotificationProvider>
      <UserProvider>
        <BlogProvider>
          {children}
        </BlogProvider>
      </UserProvider>
    </NotificationProvider>
  </BrowserRouter>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <CombinedProvider>
      <App />
    </CombinedProvider>
  </QueryClientProvider>
)
