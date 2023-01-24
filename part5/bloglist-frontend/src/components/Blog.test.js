import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const userObject = {
  id: 123123123123,
  username: 'username',
  name: 'name'
}
const blog = {
  title: 'title',
  author: 'author',
  url: 'url',
  likes: 2,
  user: userObject
}

test('renders title and author but not url or likes by default', () => {
  const { container } = render(<Blog blog={blog} user={userObject} />)

  const titleAuthor = container.querySelector('.blogTitleAuthor')
  expect(titleAuthor).toBeDefined()
  expect(titleAuthor).toHaveTextContent(`${blog.title} ${blog.author}`)
  expect(titleAuthor).not.toHaveStyle('display: none')

  const other = container.querySelector('.blogOther')
  expect(other).toHaveStyle('display: none')
})

test('renders url and likes when button is clicked', async () => {
  const user = userEvent.setup()

  const { container } = render(<Blog blog={blog} user={userObject}  />)

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const other = container.querySelector('.blogOther')
  expect(other).not.toHaveStyle('display: none')
  expect(other).toHaveTextContent(`${blog.url}`)
  expect(other).toHaveTextContent(`likes ${blog.likes}`)
})

test('event handler for likes is called twice for two clicks', async () => {
  const mockHandler = jest.fn()
  const user = userEvent.setup()

  render(<Blog blog={blog} user={userObject} updateLikes={mockHandler} />)

  const likeButton = screen.getByText('like')

  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})