import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url or likes by default', () => {
  const user = {
    id: 123123123123,
    username: 'username',
    name: 'name'
  }
  const blog = {
    title: 'title rendered',
    author: 'author rendered',
    url: 'url not rendered',
    likes: 2,
    user: user
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const titleAuthor = container.querySelector('.blogTitleAuthor')
  expect(titleAuthor).toBeDefined()
  expect(titleAuthor).toHaveTextContent('title rendered author rendered')
  expect(titleAuthor).not.toHaveStyle('display: none')

  const other = container.querySelector('.blogOther')
  expect(other).toHaveStyle('display: none')
})