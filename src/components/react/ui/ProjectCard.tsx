import React from 'react';
import { ArrowRight, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  slug: string;
  featured?: boolean;
  github?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  slug,
  featured,
  github,
}) => {
  return (
    <div className="group bg-surface-primary border border-border-primary rounded-2xl p-6 hover:border-accent-blue transition-all duration-300 hover:shadow-lg">
      {featured && (
        <span className="inline-block px-3 py-1 bg-accent-blue/10 text-accent-blue text-xs font-semibold rounded-full mb-4">
          Featured
        </span>
      )}

      <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent-blue transition-colors duration-200">
        {title}
      </h3>

      <p className="text-text-secondary mb-4 line-clamp-2">
        {description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 bg-surface-secondary text-text-tertiary text-xs rounded-md"
          >
            {tech}
          </span>
        ))}
        {technologies.length > 4 && (
          <span className="px-2 py-1 bg-surface-secondary text-text-tertiary text-xs rounded-md">
            +{technologies.length - 4}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-border-primary">
        <a
          href={`/projects/${slug}`}
          className="flex items-center gap-2 text-accent-blue hover:text-accent-blueHover font-medium text-sm group/link"
        >
          View Details
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
        </a>

        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto p-2 rounded-lg bg-surface-secondary hover:bg-accent-blue/10 text-text-secondary hover:text-accent-blue transition-all duration-200"
            aria-label="View on GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
};
