import React from 'react';

interface DummyContentProps {
  title: string;
}

const DummyContent: React.FC<DummyContentProps> = ({ title }) => {
  return (
    <div className="p-6 bg-card rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-foreground mb-4">{title}</h2>
      <p className="text-muted-foreground">
        This is a dummy component for the "{title}" section. More content and logic will be added here in the future.
      </p>
    </div>
  );
};

export default DummyContent;
