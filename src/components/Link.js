import React from 'react';

const Link = ({
  name,
  comments,
  click_count,
}) => {
  return (
    <div className="Link">
      Website: { name } <br />
      Comments: { comments } <br />
      {/* Amount of times clicked: { click_count } <br /> */}
    </div>
  );
}

export default Link;
