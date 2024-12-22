import React from "react";
import Attraction, { AttractionProps } from "../Attraction/Attraction";

interface AttractionListProps {
  attractions: AttractionProps[];
  onSelect: (attraction: any) => void;
  selectedAttractions: AttractionProps[];
}

const AttractionList: React.FC<AttractionListProps> = ({ attractions, onSelect, selectedAttractions }) => {
  return (
    <div>
      {attractions.map((attraction, index) => (
        <Attraction
          key={index}
          {...attraction}
          onSelect={onSelect}
          isSelected={selectedAttractions.some((a) => a.title === attraction.title)}
        />
      ))}
    </div>
  );
};

export default AttractionList;
