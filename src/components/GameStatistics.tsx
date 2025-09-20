import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
  color: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  reward: string;
  icon: string;
  unlocked: boolean;
}

const GameStatistics = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const mainStats: StatCard[] = [
    {
      title: "Всего проектов",
      value: "120",
      change: "+8 за месяц",
      trend: "up",
      icon: "Building2",
      color: "text-blue-600"
    },
    {
      title: "Завершено",
      value: "45",
      change: "+3 за месяц",
      trend: "up",
      icon: "CheckCircle",
      color: "text-green-600"
    },
    {
      title: "В строительстве",
      value: "52",
      change: "+5 за месяц",
      trend: "up",
      icon: "Hammer",
      color: "text-orange-600"
    },
    {
      title: "В планировании",
      value: "23",
      change: "без изменений",
      trend: "neutral",
      icon: "FileText",
      color: "text-gray-600"
    }
  ];

  const financialStats = [
    {
      title: "Общий бюджет",
      value: "500 млрд ₽",
      description: "Выделено правительством Москвы"
    },
    {
      title: "Потрачено",
      value: "125 млрд ₽",
      description: "25% от общего бюджета"
    },
    {
      title: "Средняя стоимость проекта",
      value: "15.5 млрд ₽",
      description: "На основе завершённых проектов"
    },
    {
      title: "Экономия бюджета",
      value: "8.2 млрд ₽",
      description: "Благодаря оптимизации процессов"
    }
  ];

  const socialStats = [
    {
      title: "Переселено семей",
      value: "45,670",
      progress: 75,
      icon: "Users"
    },
    {
      title: "Новых квартир",
      value: "78,240",
      progress: 68,
      icon: "Home"
    },
    {
      title: "Удовлетворённость",
      value: "85%",
      progress: 85,
      icon: "Heart"
    },
    {
      title: "Жалоб решено",
      value: "92%",
      progress: 92,
      icon: "MessageSquare"
    }
  ];

  const achievements: Achievement[] = [
    {
      id: "first_project",
      title: "Первый проект",
      description: "Завершите свой первый проект реновации",
      progress: 45,
      target: 1,
      reward: "+5% к скорости строительства",
      icon: "Trophy",
      unlocked: true
    },
    {
      id: "budget_master",
      title: "Мастер бюджета",
      description: "Сэкономьте 10 млрд рублей на проектах",
      progress: 8200000000,
      target: 10000000000,
      reward: "+3% к эффективности",
      icon: "DollarSign",
      unlocked: false
    },
    {
      id: "happiness_guru",
      title: "Гуру счастья",
      description: "Достигните 90% удовлетворённости жителей",
      progress: 85,
      target: 90,
      reward: "Новые типы зданий",
      icon: "Smile",
      unlocked: false
    },
    {
      id: "speed_builder",
      title: "Скоростной строитель",
      description: "Завершите 10 проектов досрочно",
      progress: 3,
      target: 10,
      reward: "+10% к скорости",
      icon: "Zap",
      unlocked: false
    }
  ];

  const districtProgress = [
    { name: "Бутово", completed: 8, total: 12, satisfaction: 88 },
    { name: "Марьино", completed: 6, total: 10, satisfaction: 82 },
    { name: "Коньково", completed: 12, total: 15, satisfaction: 91 },
    { name: "Солнцево", completed: 5, total: 8, satisfaction: 86 },
    { name: "Митино", completed: 7, total: 11, satisfaction: 79 },
  ];

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="financial">Финансы</TabsTrigger>
          <TabsTrigger value="social">Социальная сфера</TabsTrigger>
          <TabsTrigger value="achievements">Достижения</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Main Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mainStats.map((stat, index) => (
              <Card key={stat.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <Icon name={stat.icon as any} className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="flex items-center mt-2">
                    <Icon 
                      name={getTrendIcon(stat.trend) as any} 
                      className={`h-4 w-4 mr-1 ${getTrendColor(stat.trend)}`} 
                    />
                    <span className={`text-sm ${getTrendColor(stat.trend)}`}>
                      {stat.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* District Progress */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="MapPin" className="h-6 w-6" />
                Прогресс по районам
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {districtProgress.map((district) => (
                  <div key={district.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{district.name}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                          {district.completed}/{district.total} проектов
                        </span>
                        <Badge 
                          variant="secondary"
                          className={district.satisfaction >= 85 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                        >
                          {district.satisfaction}% довольны
                        </Badge>
                      </div>
                    </div>
                    <Progress 
                      value={(district.completed / district.total) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {financialStats.map((stat, index) => (
              <Card key={stat.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{stat.title}</h3>
                  <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Budget Usage Chart */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="PieChart" className="h-6 w-6" />
                Использование бюджета
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Потрачено</span>
                    <span>125 млрд ₽ (25%)</span>
                  </div>
                  <Progress value={25} className="h-3 mb-4" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Icon name="Building" className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm font-medium">Строительство</p>
                    <p className="text-lg font-bold text-blue-600">85 млрд ₽</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Icon name="Wrench" className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <p className="text-sm font-medium">Инфраструктура</p>
                    <p className="text-lg font-bold text-green-600">25 млрд ₽</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Icon name="Users" className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                    <p className="text-sm font-medium">Социальные нужды</p>
                    <p className="text-lg font-bold text-orange-600">15 млрд ₽</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialStats.map((stat, index) => (
              <Card key={stat.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{stat.title}</h3>
                      <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    </div>
                    <Icon name={stat.icon as any} className="h-8 w-8 text-primary" />
                  </div>
                  <Progress value={stat.progress} className="h-3" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Satisfaction Details */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="BarChart3" className="h-6 w-6" />
                Детализация удовлетворённости
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: "Качество жилья", score: 89, color: "bg-green-500" },
                  { category: "Инфраструктура", score: 82, color: "bg-blue-500" },
                  { category: "Сроки переселения", score: 78, color: "bg-yellow-500" },
                  { category: "Коммуникация", score: 91, color: "bg-purple-500" }
                ].map((item) => (
                  <div key={item.category} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{item.category}</span>
                      <span className="text-sm font-semibold">{item.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card 
                key={achievement.id} 
                className={`animate-fade-in ${achievement.unlocked ? 'border-yellow-400 bg-yellow-50' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${achievement.unlocked ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                        <Icon 
                          name={achievement.icon as any} 
                          className={`h-6 w-6 ${achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'}`} 
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                    {achievement.unlocked && (
                      <Badge className="bg-yellow-500">Получено!</Badge>
                    )}
                  </div>
                  
                  {!achievement.unlocked && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Прогресс</span>
                        <span>
                          {achievement.id === 'budget_master' 
                            ? formatMoney(achievement.progress) 
                            : achievement.progress
                          } / {achievement.id === 'budget_master' 
                            ? formatMoney(achievement.target) 
                            : achievement.target
                          }
                        </span>
                      </div>
                      <Progress 
                        value={(achievement.progress / achievement.target) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}
                  
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">Награда: {achievement.reward}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GameStatistics;