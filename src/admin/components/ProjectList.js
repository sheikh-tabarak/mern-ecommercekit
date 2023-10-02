import React from 'react';
import { useSelector } from 'react-redux';

const ProjectList = () => {
  const ProjectArchive = useSelector((state) => state.ProjectArchive);

  return (
    <div>
      {ProjectArchive.map((project, index) => (
        <div key={index}>
          <h3>{project.title}</h3>
          {/* Render other project details */}
        </div>
      ))}
    </div>
  );
};

export default ProjectList;