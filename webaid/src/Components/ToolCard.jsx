import React from 'react';
import { Link } from 'react-router-dom';

const ToolCard = ({ name, path, description }) => {
  return (
    <Link
      to={path}
      className="block bg-[#1A1F2E] hover:bg-[#2C3245] border border-[#2C2F40] p-4 rounded-lg shadow hover:shadow-md transition duration-200"
    >
      <h2 className="text-lg font-semibold text-accent">{name}</h2>
      <p className="text-sm text-gray-400 mt-1">{description}</p>
    </Link>
  );
};

export default ToolCard;
