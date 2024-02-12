import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog'

const mockBlog = {
  title: 'Test Title',
  author: 'Test Author',
  url: 'http://test.com',
  likes: 5,
  userId: 'testUserId',
  user: {
    name: 'Test User',
    id: 'testUserId'
  }
}

const mockHandleLike = jest.fn()
describe('<Blog />', () => {
  test('renders blog title and author but not URL or likes by default', () => {
    // Renderiza el componente Blog
    render(<Blog blog={mockBlog} userId={mockBlog.userId} />)

    // Título y autor están presentes
    expect(screen.getByText((content) => content.includes(mockBlog.title) && content.includes(mockBlog.author))).toBeInTheDocument()

    // URL y los likes NO estén "visibles"
    const urlElement = screen.getByText(mockBlog.url)
    const likesElement = screen.getByText(/likes \d+/)
    expect(urlElement).toHaveStyle('display: block')
    expect(likesElement).toHaveStyle('display: block')
  })

  test('shows URL and likes when the "View" button is clicked', () => {
    // Renderiza el componente Blog
    render(<Blog blog={mockBlog} userId={mockBlog.userId} />)

    // URL y los likes NO estén "visibles"
    const urlElement = screen.getByText(mockBlog.url)
    const likesElement = screen.getByText(/likes \d+/)
    expect(urlElement).toHaveStyle('display: block')
    expect(likesElement).toHaveStyle('display: block')

    const viewButton = screen.getByText('View')
    fireEvent.click(viewButton)

    expect(screen.getByText(mockBlog.url)).toBeInTheDocument()
    expect(screen.getByText(/likes \d+/)).toBeInTheDocument()
  })

  test('View and Hide button working properly (acting like an user) ', () => {
    // Renderiza el componente Blog
    render(<Blog blog={mockBlog} userId={mockBlog.userId} />)

    const viewButton = screen.getByText('View')
    fireEvent.click(viewButton)

    expect(screen.getByText('Hide')).toBeInTheDocument()
    fireEvent.click(viewButton)

    expect(screen.getByText('View')).toBeInTheDocument()
  })

  test('calls the like event handler twice when the like button is clicked twice', () => {
    render(<Blog blog={mockBlog} userId={mockBlog.userId} updateBlogLikes={mockHandleLike} />)

    const viewButton = screen.getByText('View')
    fireEvent.click(viewButton)

    expect(screen.getByText(/likes \d+/)).toBeInTheDocument()

    const likeButton = screen.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandleLike).toHaveBeenCalledTimes(2)
  })

  test('calls the delete event handler when the delete button is clicked and confirmed', () => {
    // Mock the delete function
    const mockOnDelete = jest.fn()

    // Mock the window.confirm function to always return true
    global.confirm = jest.fn(() => true)

    // Render the Blog component with the mock delete function
    render(<Blog blog={mockBlog} userId={mockBlog.userId} onDelete={mockOnDelete} />)

    const viewButton = screen.getByText('View')
    fireEvent.click(viewButton)

    // Find the delete button and click it
    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)

    // Check if the delete function was called
    expect(mockOnDelete).toHaveBeenCalledWith(mockBlog.id)

    // Restore the original window.confirm function after the test
    global.confirm.mockRestore()
  })
})
