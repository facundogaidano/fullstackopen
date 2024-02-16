import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationProvider } from './reducers/notificationReducer'
import { BlogProvider } from './reducers/blogReducer'
import { UserProvider } from './reducers/userReducer'

const queryClient = new QueryClient()

export const CombinedProvider = ({ children }) => (
  <NotificationProvider>
    <UserProvider>
      <BlogProvider>
        {children}
      </BlogProvider>
    </UserProvider>
  </NotificationProvider>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <CombinedProvider>
      <App />
    </CombinedProvider>
  </QueryClientProvider>
)
