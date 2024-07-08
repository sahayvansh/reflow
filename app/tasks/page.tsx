"use client";

import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PomodoroStatus from '@/components/PomodoroStatus';
import AmbientSoundPlayer from '@/components/AmbientSoundPlayer';
import KanbanColumn from '@/components/KanbanColumn';
import KanbanAddCardButton from '@/components/KanbanAddCardButton';
import { Task, Column } from '@/types';

const TaskManagementPage: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'todo', title: 'To Do', tasks: [] },
    { id: 'doing', title: 'Doing', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const storedColumns = localStorage.getItem('taskColumns');
    if (storedColumns) {
      setColumns(JSON.parse(storedColumns));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('taskColumns', JSON.stringify(columns));
  }, [columns]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setColumns((prevColumns) => {
        const oldColumnIndex = prevColumns.findIndex((col) => col.tasks.some((task) => task.id === active.id));
        const newColumnIndex = prevColumns.findIndex((col) => col.id === over.id);

        if (oldColumnIndex === newColumnIndex) {
          const columnTasks = [...prevColumns[oldColumnIndex].tasks];
          const oldIndex = columnTasks.findIndex((task) => task.id === active.id);
          const newIndex = columnTasks.findIndex((task) => task.id === over.id);

          const newTasks = arrayMove(columnTasks, oldIndex, newIndex);
          const newColumns = [...prevColumns];
          newColumns[newColumnIndex] = { ...newColumns[newColumnIndex], tasks: newTasks };
          return newColumns;
        } else {
          const sourceColumn = prevColumns[oldColumnIndex];
          const destColumn = prevColumns[newColumnIndex];
          const taskToMove = sourceColumn.tasks.find((task) => task.id === active.id)!;

          const newSourceTasks = sourceColumn.tasks.filter((task) => task.id !== active.id);
          const newDestTasks = [...destColumn.tasks, taskToMove];

          const newColumns = [...prevColumns];
          newColumns[oldColumnIndex] = { ...sourceColumn, tasks: newSourceTasks };
          newColumns[newColumnIndex] = { ...destColumn, tasks: newDestTasks };
          return newColumns;
        }
      });
    }
  };

  const handleAddCard = (columnId: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: 'New Task',
      description: 'Click to edit',
    };

    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col
      )
    );
  };

  const handleUpdateTask = (columnId: string, taskId: string, updatedTask: Task) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updatedTask } : task
              ),
            }
          : col
      )
    );
  };

  const handleDeleteTask = (columnId: string, taskId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter((task) => task.id !== taskId) }
          : col
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-secondary">Task Management</h1>
        <div className="flex gap-4">
          <div className="w-1/4 space-y-4">
            <PomodoroStatus />
            <AmbientSoundPlayer />
          </div>
          <div className="w-3/4">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <div className="flex gap-4">
                {columns.map((column) => (
                  <KanbanColumn
                    key={column.id}
                    column={column}
                    onUpdateTask={(taskId, updatedTask) => handleUpdateTask(column.id, taskId, updatedTask)}
                    onDeleteTask={(taskId) => handleDeleteTask(column.id, taskId)}
                  >
                    <KanbanAddCardButton onClick={() => handleAddCard(column.id)}>
                      Add new card
                    </KanbanAddCardButton>
                  </KanbanColumn>
                ))}
              </div>
            </DndContext>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TaskManagementPage;