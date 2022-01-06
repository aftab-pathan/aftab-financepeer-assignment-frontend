// Write your code here
import './index.css'

const BlogCard = props => {
  const {postDetails} = props
  const {title, body} = postDetails
  console.log(title)
  return (
    <li className="blog-list">
      <h1 className="blog-title">{title}</h1>
      <p className="blog-body">{body}</p>
    </li>
  )
}

export default BlogCard
