import React from "react";
import Attraction, { AttractionProps } from "../Attraction/Attraction";

interface AttractionListProps {
  attractions: AttractionProps[];
}

const AttractionList: React.FC<AttractionListProps> = ({ attractions }) => {
  return (
    <div>
      {attractions.map((attraction, index) => (
        <Attraction key={index} {...attraction} />
      ))}
    </div>
  );
};

export default AttractionList;
