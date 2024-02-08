const listHelper = require('../utils/list_helper')

describe('mostBlogs', () => {
  test('returns an empty object when list is empty', () => {
    expect(listHelper.mostBlogs([])).toEqual({
      author: '',
      blogs: 0
    })
  })

  test('returns the author with one blog when there is only one blog', () => {
    const blogs = [
      { author: 'Edsger W. Dijkstra', title: 'Canonical string reduction' }
    ]
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('returns the author with the most blogs', () => {
    const blogs = [
      { author: 'Edsger W. Dijkstra', title: 'Canonical string reduction' },
      { author: 'Robert C. Martin', title: 'Clean Code' },
      { author: 'Robert C. Martin', title: 'Agile Software Development' },
      { author: 'Robert C. Martin', title: 'Refactoring' }
    ]
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })

  test('returns one of the authors with the most blogs if there are multiple with the same highest number of blogs', () => {
    const blogs = [
      { author: 'Martin Fowler', title: 'Canonical string reduction' },
      { author: 'Robert C. Martin', title: 'Clean Code' },
      { author: 'Robert C. Martin', title: 'Agile Software Development' },
      { author: 'Robert C. Martin', title: 'Refactoring' },
      { author: 'Martin Fowler', title: 'Refactoring' },
      { author: 'Martin Fowler', title: 'Patterns of Enterprise Application Architecture' }
    ]
    const result = listHelper.mostBlogs(blogs)
    expect(result.blogs).toBeGreaterThanOrEqual(3)
  })
})
