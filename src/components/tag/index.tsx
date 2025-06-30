import * as d3 from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import React from 'react';

const tagColourScale = d3.scaleOrdinal<string, string>()
  .domain([])
  .range(schemeCategory10);

interface TagProps {
  tag: string;
}

const Tag: React.FC<TagProps> = ({ tag }) => {
  const backgroundColor = tagColourScale(tag);

  return (
    <span style={{ backgroundColor, padding: '0.3em 0.6em', borderRadius: '0.25em', color: '#fff' }}>
      {tag}
    </span>
  );
};

export default Tag;
