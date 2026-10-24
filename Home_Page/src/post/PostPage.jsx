import { useState } from 'react';
import './PostPage.css';

function PostPage() {
  
  const [postType, setPostType] = useState('question');

 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [abstract, setAbstract] = useState('');
  const [articleText, setArticleText] = useState('');

 
function handlePost(event) {
  event.preventDefault();

  if (title.trim() === "" || tags.trim() === "") {
    alert("Please fill out all required fields!");
    return;
  }

  if (postType === "question" && description.trim() === "") {
    alert("Please describe your question!");
    return;
  }

  if (
    postType === "article" &&
    (abstract.trim() === "" || articleText.trim() === "")
  ) {
    alert("Please complete the abstract and article text!");
    return;
  }

  
const tagList = tags
  .split(',')
  .map(tag => tag.trim())
  .filter(Boolean);

if (tagList.length > 3) {
  alert("Please enter no more than 3 tags!");
  return;
}


  alert("Your post has been successfully sent!");
}

  return (
    <div className="post-container">
      <h2>New Post</h2>

      <div className="post-type-selector">
        <label>Select Post Type:</label>
        <div>
          <label>
            <input 
              type="radio" 
              name="postType" 
              checked={postType === 'question'} 
              onChange={() => setPostType('question')} 
            />
            Question
          </label>
          <label style={{ marginLeft: '20px' }}>
            <input 
              type="radio" 
              name="postType" 
              checked={postType === 'article'} 
              onChange={() => setPostType('article')} 
            />
            Article
          </label>
        </div>
      </div>

      <form onSubmit={handlePost}>
        <h3>What do you want to ask or share</h3>

    
        {postType === 'question' ? (
          <div className="form-section">
            <label>Title</label>
            <input 
              type="text" 
              placeholder="Start your question with how, what, why, etc." 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label>Describe your problem</label>
            <textarea 
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        ) : (
          <div className="form-section">
            <label>Title</label>
            <input 
              type="text" 
              placeholder="Enter a descriptive title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label>Abstract</label>
            <textarea 
              rows="3"
              placeholder="Enter a 1-paragraph abstract"
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
            />

            <label>Article Text</label>
            <textarea 
              rows="6"
              placeholder="Enter the main article text"
              value={articleText}
              onChange={(e) => setArticleText(e.target.value)}
            />
          </div>
        )}

      
        <div className="form-section">
          <label>Tags</label>
          <input 
            type="text" 
            placeholder="Please add up to 3 tags e.g., Java" 
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <button type="submit" className="post-submit-btn">Post</button>
      </form>
    </div>
  );
}

export default PostPage;