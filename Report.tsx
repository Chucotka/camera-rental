import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Share2, Printer } from "lucide-react";
import { Link } from "wouter";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// Симулированные данные для визуализации
const seasonalData = [
  { month: 'Янв', cameras: 40, lighting: 24, drones: 10 },
  { month: 'Фев', cameras: 30, lighting: 13, drones: 15 },
  { month: 'Мар', cameras: 20, lighting: 58, drones: 20 },
  { month: 'Апр', cameras: 27, lighting: 39, drones: 35 },
  { month: 'Май', cameras: 18, lighting: 48, drones: 50 },
  { month: 'Июн', cameras: 23, lighting: 38, drones: 65 },
  { month: 'Июл', cameras: 34, lighting: 43, drones: 70 },
];

const categoryData = [
  { name: 'Камеры', value: 35 },
  { name: 'Объективы', value: 25 },
  { name: 'Свет', value: 20 },
  { name: 'Звук', value: 10 },
  { name: 'Дроны', value: 5 },
  { name: 'Грип', value: 5 },
];

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7'];

export default function Report() {
  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Ссылка скопирована в буфер обмена!");
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 font-mono">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
          <div>
            <Link href="/">
              <Button variant="link" className="pl-0 text-muted-foreground hover:text-primary mb-2">
                <ArrowLeft className="mr-2 w-4 h-4" /> На главную
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Аналитика рынка проката</h1>
            <p className="text-muted-foreground mt-1">
              Интерактивный анализ производительности оборудования и сезонных тенденций.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 w-4 h-4" /> Печать PDF
            </Button>
            <Button onClick={handleShare}>
              <Share2 className="mr-2 w-4 h-4" /> Поделиться
            </Button>
          </div>
        </div>

        {/* Key Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card/50 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg text-primary">Исследуйте интуитивно</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Визуализируйте сложные данные инвентаря через интерактивные диаграммы. Наведите на точки данных для просмотра конкретных метрик каждой категории оборудования.
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg text-primary">Поймите тенденции</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Анализируйте сезонные закономерности спроса для оптимизации уровня запасов. Посмотрите, как спрос на свет растёт зимой, а дроны популярны летом.
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg text-primary">Сохраняйте и делитесь</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Экспортируйте эти данные мгновенно. Создавайте PDF-отчёты для заинтересованных лиц или делитесь интерактивными панелями с командой.
            </CardContent>
          </Card>
        </div>

        {/* Interactive Charts */}
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="bg-card border border-border p-1">
            <TabsTrigger value="trends">Сезонные тенденции</TabsTrigger>
            <TabsTrigger value="inventory">Распределение инвентаря</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Прогноз спроса на оборудование</CardTitle>
                <CardDescription>
                  Прогнозируемый объём проката на основе исторических данных и сезонных факторов.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={seasonalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                      itemStyle={{ color: 'var(--foreground)' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="cameras" name="Камеры" stroke="var(--primary)" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="lighting" name="Свет" stroke="#eab308" strokeWidth={2} />
                    <Line type="monotone" dataKey="drones" name="Дроны" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Разбор по категориям</CardTitle>
                  <CardDescription>Текущее распределение активов по типам оборудования.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                        itemStyle={{ color: 'var(--foreground)' }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Доля доходов</CardTitle>
                  <CardDescription>Процент от общего дохода по категориям.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                      <YAxis stroke="var(--muted-foreground)" />
                      <Tooltip 
                        cursor={{ fill: 'var(--muted)' }}
                        contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                        itemStyle={{ color: 'var(--foreground)' }}
                      />
                      <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}
