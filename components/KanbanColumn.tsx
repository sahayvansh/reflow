import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import KanbanCard from './KanbanCard';
import { Column, Task } from '@/types';

interface Props {
  column: Column;
  onUpdateTask: (taskId: string, updatedTask: Task) => void;
  onDeleteTask: (taskId: string) => void;
  children?: React.ReactNode;
}

const KanbanColumn: React.FC<Props> = ({ column, onUpdateTask, onDeleteTask, children }) => {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div className="flex-1 bg-accent/10 backdrop-blur-sm p-4 rounded-md">
      <h2 className="font-serif text-2xl mb-4 ml-28 text-secondary">{column.title}</h2>
      <div ref={setNodeRef}>
        <SortableContext items={column.tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
          {column.tasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              onUpdate={(updatedTask) => onUpdateTask(task.id, updatedTask)}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))}
        </SortableContext>
      </div>
      {children}
    </div>
  );
};

export default KanbanColumn;