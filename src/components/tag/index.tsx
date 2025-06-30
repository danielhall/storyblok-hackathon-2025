import * as d3 from 'd3-scale';
import { schemeTableau10 } from 'd3-scale-chromatic';
import React from 'react';

const tagColourScale = d3.scaleOrdinal<string, string>()
  .domain([])
  .range(schemeTableau10);

interface TagProps {
  tag: string;
}

const Tag: React.FC<TagProps> = ({ tag }) => {
  const backgroundColor = tagColourScale(tag);

  return (
    <span style={{ backgroundColor, padding: '0.3em 0.6em', margin: '0.6em 0.3em', borderRadius: '0.25em', color: '#fff' }}>
      {tag}
    </span>
  );
};

export default Tag;
