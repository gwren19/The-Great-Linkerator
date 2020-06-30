import React from 'react';

const Link = ({
  name,
  comments,
  click_count,
}) => {
  console.log(name)
  return (
    <div className="Link">
      Website: <a href={name} target="_blank" rel="noopener noreferrer nofollow">{name}</a> <br />
      Comments: { comments } <br />
      {/* Amount of times clicked: { click_count } <br /> */}
    </div>
  );
}

export default Link;
