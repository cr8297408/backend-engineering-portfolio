import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  slug: string;
  featured?: boolean;
  github?: string;
  image?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  slug,
  image,
}) => {
  // Generate a gradient based on the title for projects without images
  const getGradient = (str: string) => {
    const gradients = [
      'from-blue-600 via-purple-600 to-pink-500',
      'from-emerald-500 via-teal-500 to-cyan-500',
      'from-orange-500 via-red-500 to-pink-500',
      'from-violet-600 via-purple-600 to-indigo-600',
      'from-amber-500 via-orange-500 to-yellow-500',
      'from-cyan-500 via-blue-500 to-indigo-500',
    ];
    const index = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % gradients.length;
    return gradients[index];
  };

  return (
    <a
      href={`/projects/${slug}`}
      className="group block"
    >
      {/* Image/Thumbnail Container */}
      <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-neutral-900">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${getGradient(title)} opacity-80`}>
            {/* Tech icons overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white/20 text-6xl font-bold">
                {title.charAt(0)}
              </div>
            </div>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>

      {/* Title */}
      <h3 className="text-sm font-medium text-white/80 text-center tracking-wide uppercase group-hover:text-white transition-colors duration-200">
        {title}
      </h3>
    </a>
  );
};
