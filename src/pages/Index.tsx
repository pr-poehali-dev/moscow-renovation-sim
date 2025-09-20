import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import ProjectManagement from '@/components/ProjectManagement';
import GameStatistics from '@/components/GameStatistics';

interface RenovationProject {
  id: number;
  name: string;
  district: string;
  status: 'planning' | 'construction' | 'completed';
  progress: number;
  budget: number;
  spent: number;
  residents: number;
  completion: string;
}

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<RenovationProject | null>(null);
  const [activeTab, setActiveTab] = useState("map");
  const [gameStats, setGameStats] = useState({
    totalBudget: 500000000000,
    spentBudget: 125000000000,
    completedProjects: 45,
    totalProjects: 120,
    satisfactionRating: 85
  });

  const projects: RenovationProject[] = [
    {
      id: 1,
      name: "ЖК Новые Горизонты",
      district: "Бутово",
      status: 'construction',
      progress: 65,
      budget: 15000000000,
      spent: 9750000000,
      residents: 2400,
      completion: "2025-06-15"
    },
    {
      id: 2,
      name: "Жилой комплекс Мира",
      district: "Марьино",
      status: 'planning',
      progress: 15,
      budget: 22000000000,
      spent: 3300000000,
      residents: 3200,
      completion: "2026-12-20"
    },
    {
      id: 3,
      name: "Дом на Проспекте",
      district: "Коньково",
      status: 'completed',
      progress: 100,
      budget: 8500000000,
      spent: 8200000000,
      residents: 1800,
      completion: "2024-03-10"
    }
  ];

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-yellow-500';
      case 'construction': return 'bg-primary';
      case 'completed': return 'bg-success';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'planning': return 'Планирование';
      case 'construction': return 'Строительство';
      case 'completed': return 'Завершён';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Icon name="Building2" className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-gray-900">Московская Реновация</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-lg px-4 py-2">
                Бюджет: {formatMoney(gameStats.totalBudget - gameStats.spentBudget)}
              </Badge>
              <Badge className="text-lg px-4 py-2 bg-success">
                Рейтинг: {gameStats.satisfactionRating}%
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="map">Карта и проекты</TabsTrigger>
            <TabsTrigger value="management">Управление</TabsTrigger>
            <TabsTrigger value="statistics">Статистика</TabsTrigger>
          </TabsList>

          <TabsContent value="map">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Map/City View */}
          <div className="lg:col-span-2">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Map" className="h-6 w-6" />
                  Карта реновации Москвы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
                  <img 
                    src="/img/1ae790be-5e88-4920-b1f5-ffc7d32220f4.jpg" 
                    alt="Панорама Москвы" 
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Interactive Districts */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-4 p-8">
                      {projects.map((project, index) => (
                        <Button
                          key={project.id}
                          onClick={() => setSelectedProject(project)}
                          className={`h-16 w-32 relative ${getStatusColor(project.status)} hover:scale-105 transition-transform animate-scale-in`}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="text-center">
                            <div className="text-xs font-semibold text-white">{project.district}</div>
                            <div className="text-xs text-white/90">{project.progress}%</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Details */}
            {selectedProject && (
              <Card className="mt-6 animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{selectedProject.name}</span>
                    <Badge className={getStatusColor(selectedProject.status)}>
                      {getStatusText(selectedProject.status)}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <Icon name="MapPin" className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="text-sm text-gray-600">Район</div>
                      <div className="font-semibold">{selectedProject.district}</div>
                    </div>
                    <div className="text-center">
                      <Icon name="Users" className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="text-sm text-gray-600">Жителей</div>
                      <div className="font-semibold">{selectedProject.residents.toLocaleString()}</div>
                    </div>
                    <div className="text-center">
                      <Icon name="Calendar" className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="text-sm text-gray-600">Завершение</div>
                      <div className="font-semibold">{new Date(selectedProject.completion).toLocaleDateString('ru-RU')}</div>
                    </div>
                    <div className="text-center">
                      <Icon name="DollarSign" className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="text-sm text-gray-600">Бюджет</div>
                      <div className="font-semibold">{formatMoney(selectedProject.budget)}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Прогресс строительства</span>
                        <span>{selectedProject.progress}%</span>
                      </div>
                      <Progress value={selectedProject.progress} className="h-3" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Использование бюджета</span>
                        <span>{Math.round((selectedProject.spent / selectedProject.budget) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(selectedProject.spent / selectedProject.budget) * 100} 
                        className="h-3"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <img 
                      src="/img/8daaf0fb-51e8-41ed-88a8-660b058e7cda.jpg" 
                      alt="Проект реновации" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Game Statistics */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BarChart3" className="h-6 w-6" />
                  Статистика программы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Завершённых проектов</span>
                  <span className="font-semibold">{gameStats.completedProjects}/{gameStats.totalProjects}</span>
                </div>
                <Progress value={(gameStats.completedProjects / gameStats.totalProjects) * 100} />

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Потрачено средств</span>
                  <span className="font-semibold">{formatMoney(gameStats.spentBudget)}</span>
                </div>
                <Progress value={(gameStats.spentBudget / gameStats.totalBudget) * 100} />

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-sm text-gray-600">Удовлетворённость жителей</span>
                  <Badge className="bg-success">{gameStats.satisfactionRating}%</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Zap" className="h-6 w-6" />
                  Быстрые действия
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="Plus" className="h-4 w-4 mr-2" />
                  Новый проект
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="TrendingUp" className="h-4 w-4 mr-2" />
                  Ускорить стройку
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="PieChart" className="h-4 w-4 mr-2" />
                  Аналитика
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="Settings" className="h-4 w-4 mr-2" />
                  Настройки
                </Button>
              </CardContent>
            </Card>

            {/* Projects List */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="List" className="h-6 w-6" />
                  Активные проекты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div 
                      key={project.id}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{project.name}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getStatusColor(project.status)} text-white border-0`}
                        >
                          {project.progress}%
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">{project.district}</div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
            </div>
          </TabsContent>

          <TabsContent value="management">
            <ProjectManagement />
          </TabsContent>

          <TabsContent value="statistics">
            <GameStatistics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;