import React, { useState } from 'react';
import styles from './FilterPanel.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface Filter {
  id: string;
  label: string;
}

interface Section {
  title: string;
  filters: Filter[];
}

interface FilterPanelProps {
  sections: Section[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({ sections }) => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className={styles.panel}>
      {sections.map((section) => (
        <div key={section.title} className={styles.section}>
          <div className={styles.header} onClick={() => toggleSection(section.title)}>
            <h3 className={styles.title}>{section.title}</h3>
            <FontAwesomeIcon
              icon={openSections[section.title] ? faChevronUp : faChevronDown}
              className={styles.icon}
            />
          </div>
          {openSections[section.title] && (
            <ul className={styles.filters}>
              {section.filters.map((filter) => (
                <li key={filter.id} className={styles.filter}>
                  <label>
                    <input type="checkbox" className={styles.checkbox} />
                    {filter.label}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterPanel;
