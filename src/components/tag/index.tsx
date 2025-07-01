import * as d3 from 'd3-scale';
import { schemeTableau10, schemePastel1 } from 'd3-scale-chromatic';
import React from 'react';

const tableauTagColourScale = d3.scaleOrdinal<string, string>()
  .domain([])
  .range(schemeTableau10);

const pastelTagColourScale = d3.scaleOrdinal<string, string>()
  .domain([])
  .range(schemePastel1);


interface TagProps {
  tag: string;
  pastel?: boolean;
}

const Tag: React.FC<TagProps> = ({ tag, pastel }) => {
  const backgroundColor = (pastel ?? false) ? pastelTagColourScale(tag) : tableauTagColourScale(tag);

  return (
    <span style={{ backgroundColor, padding: '0.3em 0.6em', margin: '0.6em 0.3em', borderRadius: '0.25em', color: `${(pastel ?? false) ? "#000" : "#FFF"}` }}>
      {tag}
    </span>
  );
};

export default Tag;
