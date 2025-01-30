import React, { useState } from 'react';
import styles from './FilterPanel.module.css';

interface FilterPanelProps {
  sections: Section[];
  onFilterChange: (selectedFilters: string[]) => void; // Dodano
}

const FilterPanel: React.FC<FilterPanelProps> = ({ sections, onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterChange = (filterId: string, isChecked: boolean) => {
    setSelectedFilters((prev) => {
      const updatedFilters = isChecked
        ? [...prev, filterId]
        : prev.filter((id) => id !== filterId);
      onFilterChange(updatedFilters); // Przekazuje zaznaczone filtry
      return updatedFilters;
    });
  };

  return (
    <div className={styles.panel}>
      {sections.map((section) => (
        <div key={section.title} className={styles.section}>
          <div className={styles.header}>
            <h3 className={styles.title}>{section.title}</h3>
          </div>
          <ul className={styles.filters}>
            {section.filters.map((filter) => (
              <li key={filter.id} className={styles.filter}>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => handleFilterChange(filter.id, e.target.checked)}
                    className={styles.checkbox}
                  />
                  {filter.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FilterPanel;
