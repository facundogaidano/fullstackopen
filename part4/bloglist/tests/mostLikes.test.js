const listHelper = require('../utils/list_helper')

describe('mostLikes', () => {
  test('returns an empty object when list is empty', () => {
    expect(listHelper.mostLikes([])).toEqual({
      author: '',
      likes: 0
    })
  })

  test('returns the author with the most likes when there is only one blog', () => {
    const blogs = [
      { author: 'Edsger W. Dijkstra', likes: 17 }
    ]
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })

  test('returns the author with the most likes', () => {
    const blogs = [
      { author: 'Edsger W. Dijkstra', likes: 17 },
      { author: 'Robert C. Martin', likes: 12 },
      { author: 'Robert C. Martin', likes: 15 },
      { author: 'Robert C. Martin', likes: 10 }
    ]
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: 'Robert C. Martin',
      likes: 37
    })
  })

  test('returns one of the authors with the most likes if there are multiple with the same highest number of likes', () => {
    const blogs = [
      { author: 'Martin Fowler', likes: 12 },
      { author: 'Robert C. Martin', likes: 12 },
      { author: 'Robert C. Martin', likes: 15 },
      { author: 'Robert C. Martin', likes: 10 },
      { author: 'Martin Fowler', likes: 15 },
      { author: 'Martin Fowler', likes: 10 }
    ]
    // We don't care which one is returned, just that it has the highest number of likes
    const result = listHelper.mostLikes(blogs)
    expect(result.likes).toBeGreaterThanOrEqual(37)
  })
})
