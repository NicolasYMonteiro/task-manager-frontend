'use client';

import { useEffect, useState } from 'react';
import TaskCard from '@components/card/task-card';
import type { Task } from "@sharedTypes/task";
import { getTasks } from '@actions/task/task.actions';
import CreateTaskModal from '@components/modal/create-task-modal';

const Page = () => {
  const [selectedFilter, setSelectedFilter] = useState('today');
  const [selectedOrder, setSelectedOrder] = useState<'asc' | 'desc'>('asc');

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const filters = [
    { value: 'today', label: 'Hoje' },
    { value: 'week', label: 'Semana' },
    { value: 'month', label: 'Mês' },
    { value: 'completed', label: 'Concluídas' },
    { value: 'all', label: 'Todas' },
  ];

  useEffect(() => {
    const fetchTasks = async (filter = selectedFilter, order = selectedOrder) => {
      setLoading(true);
      const data = await getTasks(filter, order);
      setTasks(data);
      setLoading(false);
    };

    fetchTasks();
  }, [selectedFilter, selectedOrder]);

  return (
    <div className="relative min-h-screen px-4 py-8 bg-white">
      {/* Fundo com imagem suavizada */}
      <div className="md:absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none md:bg-[url('/greciaFundo.png')]" />

      {/* Camada de gradiente em cima da imagem */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/60 z-0 pointer-events-none" />

      {/* Conteúdo principal */}
      <div className={`relative z-10 ${tasks.length === 0 ? 'md:h-screen' : 'md:h-auto'} md:w-5/6 p-6 md:rounded-xl mx-auto`}>

        <h1 className="text-4xl font-serif font-bold text-blue-900 text-center mb-8 tracking-wide">
          Tarefas
        </h1>
        {/* Filtros */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 px-4">
          {/* Filtros por período */}
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { value: 'today', label: 'Hoje' },
              { value: 'week', label: 'Semana' },
              { value: 'month', label: 'Mês' },
              { value: 'completed', label: 'Concluídas' },
              { value: 'all', label: 'Todas' },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setSelectedFilter(value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border shadow-sm transition-colors duration-200 ${selectedFilter === value
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-100'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Ordem de exibição */}
          <div className="flex gap-2 justify-center">
            {[
              { value: 'desc', label: 'Mais recentes' },
              { value: 'asc', label: 'Mais antigas' },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setSelectedOrder(value as 'asc' | 'desc')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border shadow-sm transition-colors duration-200 ${selectedOrder === value
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-green-600 border-green-300 hover:bg-green-100'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Botão de abertura do modal*/}
        <div className="flex justify-center mb-8">
          <CreateTaskModal />
        </div>

        {/* Cards */}
        <div className={`grid gap-6 ${tasks.length === 0 ? 'md:h-2/5' : 'md:h-auto'} grid-cols-1 ${tasks.length === 0 ? 'md:grid-cols-none xl:grid-cols-none' : 'md:grid-cols-2'} ${tasks.length >= 7 ? 'md:grid-cols-2 xl:grid-cols-3' : 'md:grid-cols-2'}`}>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <div className="col-span-full text-center mt-4 text-gray-500 italic">
              Nenhuma tarefa encontrada. Adicione uma tarefa para começar!
            </div>
          )}
        </div>
      </div>
    </div>
  );


};

export default Page;
