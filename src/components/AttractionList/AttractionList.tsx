import React from "react";
import Attraction, { AttractionProps } from "../Attraction/Attraction";

interface AttractionListProps {
  attractions: AttractionProps[];
  onSelect: (attraction: any) => void;
  selectedAttractions: AttractionProps[];
  showAddButton?: boolean;
}

const AttractionList: React.FC<AttractionListProps> = ({ attractions, onSelect, selectedAttractions, showAddButton = true }) => {
  return (
    <div>
      {attractions.map((attraction, index) => (
        <Attraction
          key={index}
          {...attraction}
          onSelect={onSelect}
          isSelected={selectedAttractions.some((a) => a.title === attraction.title)}
          showAddButton={showAddButton}
        />
      ))}
    </div>
  );
};

export default AttractionList;
