// import React, { useState, useEffect } from 'react';
// import styles from './FilterPanel.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

// interface Filter {
//   id: string;
//   label: string;
// }

// interface Section {
//   title: string;
//   filters: Filter[];
// }

// interface FilterPanelProps {
//   sections: Section[];
// }

// const FilterPanel: React.FC<FilterPanelProps> = ({ sections }) => {
//   const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
//   const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);

//   const handleResize = () => {
//     const desktop = window.innerWidth >= 992;
//     setIsDesktop(desktop);

//     setOpenSections(
//       sections.reduce((acc, section) => {
//         acc[section.title] = desktop; 
//         return acc;
//       }, {} as { [key: string]: boolean })
//     );
//   };

//   useEffect(() => {
//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [sections]);

//   const toggleSection = (title: string) => {
//     setOpenSections((prev) => ({
//       ...prev,
//       [title]: !prev[title],
//     }));
//   };

//   return (
//     <div className={styles.panel}>
//       {sections.map((section) => (
//         <div key={section.title} className={styles.section}>
//           <div className={styles.header} onClick={() => toggleSection(section.title)}>
//             <h3 className={styles.title}>{section.title}</h3>
//             <FontAwesomeIcon
//               icon={openSections[section.title] ? faChevronUp : faChevronDown}
//               className={styles.icon}
//             />
//           </div>
//           {openSections[section.title] && (
//             <ul className={styles.filters}>
//               {section.filters.map((filter) => (
//                 <li key={filter.id} className={styles.filter}>
//                   <label>
//                     <input type="checkbox" className={styles.checkbox} />
//                     {filter.label}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FilterPanel;

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
