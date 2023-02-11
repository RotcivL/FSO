const Comment = ({ comments }) => {
  return (
    <div>
      <h3>comments</h3>
      <ul>
        {comments.map((comment, index) => {
          return <li key={index}>{comment}</li>
        })}
      </ul>
    </div>
  )
}

export default Comment
