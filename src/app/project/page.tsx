import React from "react";

const Projects = async ({ searchParams  }) => {
    const prompt = (await searchParams).prompt
  return <div>{prompt}</div>;
};

export default Projects;
