const listHelper = require('../utils/list_helper')

describe('favoriteBlog', () => {
  test('returns null when list is empty', () => {
    expect(listHelper.favoriteBlog([])).toBeNull()
  })

  test('returns the only blog when there is only one blog', () => {
    const blogs = [
      { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 12 }
    ]
    expect(listHelper.favoriteBlog(blogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })

  test('returns the blog with the most likes', () => {
    const blogs = [
      { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 12 },
      { title: 'Hello World', author: 'John Doe', likes: 9 },
      { title: 'React patterns', author: 'Michael Chan', likes: 15 }
    ]
    expect(listHelper.favoriteBlog(blogs)).toEqual({
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 15
    })
  })

  test('returns one of the blogs with the most likes if there are multiple with the same highest number of likes', () => {
    const blogs = [
      { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 12 },
      { title: 'Hello World', author: 'John Doe', likes: 12 },
      { title: 'React patterns', author: 'Michael Chan', likes: 12 }
    ]
    const result = listHelper.favoriteBlog(blogs)
    expect(result.likes).toBe(12)
  })

  test('returns the first value shown when there are no likes', () => {
    const blogs = [
      { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 0 },
      { title: 'Hello World', author: 'John Doe', likes: 0 },
      { title: 'React patterns', author: 'Michael Chan', likes: 0 }
    ]
    expect(listHelper.favoriteBlog(blogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 0
    })
  })
})
