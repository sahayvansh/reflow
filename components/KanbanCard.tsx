import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Edit, Check, GripVertical } from 'lucide-react';
import { Task } from '@/types';

interface Props {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
  onDelete: () => void;
}

const KanbanCard: React.FC<Props> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTitle(''); // Clear the input when editing starts
  };

  const handleSave = () => {
    if (editedTitle.trim() !== '') {
      onUpdate({ ...task, title: editedTitle.trim() });
    }
    setIsEditing(false);
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="mb-2 cursor-grab active:cursor-grabbing"
    >
      <CardContent className="p-4 flex items-center">
        <div {...listeners} className="mr-2 cursor-grab">
          <GripVertical className="h-5 w-5 text-gray-900" />
        </div>
        {isEditing ? (
          <div className="flex items-center gap-2 flex-grow">
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="flex-grow text-gray-950"
              placeholder="Enter task title"
              autoFocus
            />
            <Button size="icon" onClick={handleSave}>
              <Check className="h-4 w-4 bg-slate-600" />
            </Button>
          </div>
        ) : (
          <div className="flex justify-between items-center flex-grow">
            <div className="flex gap-2 items-center">
              <Button variant="ghost" size="icon" onClick={handleEdit}>
                <Edit className="h-4 w-4 bg-slate-700" />
              </Button>
              <span className="text-gray-950">{task.title}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <X className="h-4 w-4" />
            </Button> 
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KanbanCard;