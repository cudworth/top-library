import React from 'react';
import './InputForm.css';

function InputForm(props) {
  /*
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');
  const [read, setRead] = useState(false);
  */

  const { title, author, pages, read } = props.data;

  return (
    <div className="InputForm">
      <form>
        <div>
          <div>
            <label htmlFor="title">Book Title</label>
          </div>
          <input
            className="input-text"
            placeholder="A River Runs Through It"
            name="title"
            type="text"
            value={title}
            onChange={(e) => props.handleChange(e)}
          ></input>
        </div>

        <div>
          <div>
            <label htmlFor="author">Author</label>
          </div>
          <input
            className="input-text"
            placeholder="Norman Maclean"
            name="author"
            type="text"
            value={author}
            onChange={(e) => props.handleChange(e)}
          ></input>
        </div>

        <div>
          <div>
            <label htmlFor="pages">Page Count</label>
          </div>
          <input
            className="input-text"
            placeholder="238"
            name="pages"
            type="number"
            value={pages}
            onChange={(e) => props.handleChange(e)}
          ></input>
        </div>

        <div>
          <span>
            <label htmlFor="read">Read</label>
            <input
              name="read"
              type="radio"
              value="read"
              checked={read === 'read'}
              onChange={(e) => props.handleChange(e)}
            ></input>
          </span>

          <span>
            <label htmlFor="read">Unread</label>
            <input
              name="read"
              type="radio"
              value="unread"
              checked={read === 'unread'}
              onChange={(e) => props.handleChange(e)}
            ></input>
          </span>
        </div>

        <div>
          <input
            className="button"
            type="submit"
            value="Add Book"
            onClick={(e) => {
              e.preventDefault();
              props.onSubmit();
            }}
          ></input>
        </div>
      </form>
    </div>
  );
}

export default InputForm;
