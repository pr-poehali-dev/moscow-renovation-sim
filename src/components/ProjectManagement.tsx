import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface ProjectAction {
  id: string;
  name: string;
  cost: number;
  duration: number;
  effect: string;
  icon: string;
}

interface NewProjectData {
  name: string;
  district: string;
  budget: string;
  residents: string;
  description: string;
  type: string;
}

const ProjectManagement = () => {
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<ProjectAction | null>(null);
  const [newProject, setNewProject] = useState<NewProjectData>({
    name: '',
    district: '',
    budget: '',
    residents: '',
    description: '',
    type: ''
  });

  const quickActions: ProjectAction[] = [
    {
      id: 'speed_construction',
      name: 'Ускорить строительство',
      cost: 5000000000,
      duration: 30,
      effect: '+20% скорость на 30 дней',
      icon: 'Zap'
    },
    {
      id: 'improve_quality',
      name: 'Улучшить качество',
      cost: 8000000000,
      duration: 0,
      effect: '+15% удовлетворённость жителей',
      icon: 'Star'
    },
    {
      id: 'add_infrastructure',
      name: 'Доп. инфраструктура',
      cost: 12000000000,
      duration: 60,
      effect: 'Детские сады, школы, поликлиники',
      icon: 'Building'
    },
    {
      id: 'eco_upgrade',
      name: 'Эко-модернизация',
      cost: 6000000000,
      duration: 45,
      effect: 'Солнечные панели, энергоэффективность',
      icon: 'Leaf'
    }
  ];

  const moscowDistricts = [
    'Бутово', 'Марьино', 'Коньково', 'Солнцево', 'Некрасовка',
    'Митино', 'Братеево', 'Выхино-Жулебино', 'Лианозово', 'Капотня'
  ];

  const projectTypes = [
    { value: 'residential', label: 'Жилой комплекс' },
    { value: 'mixed', label: 'Многофункциональный комплекс' },
    { value: 'social', label: 'Социальное жильё' },
    { value: 'premium', label: 'Премиум-класс' }
  ];

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleActionClick = (action: ProjectAction) => {
    setSelectedAction(action);
  };

  const handleCreateProject = () => {
    console.log('Создание нового проекта:', newProject);
    setIsNewProjectOpen(false);
    setNewProject({
      name: '',
      district: '',
      budget: '',
      residents: '',
      description: '',
      type: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Gamepad2" className="h-6 w-6" />
            Игровые действия
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <Card 
                key={action.id}
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary/30"
                onClick={() => handleActionClick(action)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon name={action.icon as any} className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{action.name}</h4>
                        <p className="text-sm text-gray-600">{action.effect}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <Badge variant="outline">{formatMoney(action.cost)}</Badge>
                    {action.duration > 0 && (
                      <Badge variant="secondary">{action.duration} дней</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Confirmation Dialog */}
      {selectedAction && (
        <Dialog open={!!selectedAction} onOpenChange={() => setSelectedAction(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Icon name={selectedAction.icon as any} className="h-6 w-6" />
                {selectedAction.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm mb-2"><strong>Эффект:</strong> {selectedAction.effect}</p>
                <p className="text-sm mb-2"><strong>Стоимость:</strong> {formatMoney(selectedAction.cost)}</p>
                {selectedAction.duration > 0 && (
                  <p className="text-sm"><strong>Длительность:</strong> {selectedAction.duration} дней</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button 
                  className="flex-1"
                  onClick={() => {
                    console.log('Применение действия:', selectedAction);
                    setSelectedAction(null);
                  }}
                >
                  Применить
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setSelectedAction(null)}
                >
                  Отмена
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* New Project Creation */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Plus" className="h-6 w-6" />
              Новый проект реновации
            </div>
            <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Icon name="Plus" className="h-4 w-4 mr-2" />
                  Создать проект
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Новый проект реновации</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Название проекта</Label>
                    <Input
                      id="name"
                      value={newProject.name}
                      onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="ЖК Новые Горизонты"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="district">Район</Label>
                    <Select 
                      value={newProject.district} 
                      onValueChange={(value) => setNewProject(prev => ({ ...prev, district: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите район" />
                      </SelectTrigger>
                      <SelectContent>
                        {moscowDistricts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="type">Тип проекта</Label>
                    <Select 
                      value={newProject.type} 
                      onValueChange={(value) => setNewProject(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="budget">Бюджет (в рублях)</Label>
                    <Input
                      id="budget"
                      value={newProject.budget}
                      onChange={(e) => setNewProject(prev => ({ ...prev, budget: e.target.value }))}
                      placeholder="15000000000"
                      type="number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="residents">Количество жителей</Label>
                    <Input
                      id="residents"
                      value={newProject.residents}
                      onChange={(e) => setNewProject(prev => ({ ...prev, residents: e.target.value }))}
                      placeholder="2400"
                      type="number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      value={newProject.description}
                      onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Современный жилой комплекс с развитой инфраструктурой..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleCreateProject} className="flex-1">
                      Создать проект
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsNewProjectOpen(false)}
                      className="flex-1"
                    >
                      Отмена
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <Icon name="Building2" className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">Выберите участок на карте для начала нового проекта</p>
            </div>
            <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <Icon name="MapPin" className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">Изучите требования района и потребности жителей</p>
            </div>
            <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <Icon name="Calculator" className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">Рассчитайте бюджет и сроки реализации проекта</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Management Tips */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Lightbulb" className="h-6 w-6" />
            Советы по управлению проектами
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Icon name="Info" className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Оптимизация бюджета</p>
                <p className="text-xs text-blue-700">Стройте проекты поэтапно для снижения рисков и равномерного расходования средств</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <Icon name="TrendingUp" className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-900">Удовлетворённость жителей</p>
                <p className="text-xs text-green-700">Добавляйте социальную инфраструктуру для повышения рейтинга проекта</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <Icon name="Clock" className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-900">Сроки строительства</p>
                <p className="text-xs text-yellow-700">Используйте ускорения в критические моменты для соблюдения дедлайнов</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectManagement;