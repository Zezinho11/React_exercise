import { useState } from 'react';

export default function CheckBox() {
  const [liked, setLiked] = useState(true);

  function handleChange(event) {
    setLiked(event.target.checked);
  }

  return (
    <div>
      <label>
        <input type="checkbox" checked={liked} onChange={handleChange} />
        I liked this
      </label>
      <p>You {liked ? 'liked' : 'did not like'} this.</p>
    </div>
  );
}