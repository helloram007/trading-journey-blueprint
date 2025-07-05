import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Target, Plus, Edit, CheckCircle, Calendar, TrendingUp } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'skill' | 'discipline' | 'psychology' | 'financial';
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
  deadline: string;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  obstacles: string;
  achievements: string;
  nextSteps: string;
}

const sampleGoals: Goal[] = [
  {
    id: '1',
    title: 'Improve Win Rate',
    description: 'Increase trading win rate from 45% to 60% through better setup selection',
    category: 'skill',
    specific: 'Achieve 60% win rate by being more selective with trade entries',
    measurable: 'Track win rate weekly, target 60% over 2-month period',
    achievable: 'Currently at 45%, improvement possible with stricter criteria',
    relevant: 'Higher win rate reduces emotional stress and improves profitability',
    timeBound: 'Achieve by end of August 2024',
    deadline: '2024-08-31',
    progress: 65,
    status: 'active',
    obstacles: 'FOMO trades still happening, need more patience',
    achievements: 'Win rate improved from 45% to 52% in first month',
    nextSteps: 'Implement 5-minute rule before entering trades, create setup scoring system'
  },
  {
    id: '2',
    title: 'Eliminate Revenge Trading',
    description: 'Completely eliminate emotional revenge trades after losses',
    category: 'psychology',
    specific: 'Zero revenge trades after experiencing a loss',
    measurable: 'Track emotional state and trades taken after losses',
    achievable: 'With proper protocols and mindfulness, this is achievable',
    relevant: 'Revenge trades are major cause of account damage',
    timeBound: 'Achieve by July 31, 2024',
    deadline: '2024-07-31',
    progress: 80,
    status: 'active',
    obstacles: 'Strong emotional reactions after unexpected losses',
    achievements: 'Reduced revenge trades by 70% using breathing techniques',
    nextSteps: 'Implement mandatory 15-minute break after any loss, practice meditation'
  }
];

export const GoalSetting = () => {
  const [goals, setGoals] = useState<Goal[]>(sampleGoals);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    category: 'skill',
    status: 'active',
    progress: 0
  });

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.deadline) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title || '',
        description: newGoal.description || '',
        category: newGoal.category as Goal['category'] || 'skill',
        specific: newGoal.specific || '',
        measurable: newGoal.measurable || '',
        achievable: newGoal.achievable || '',
        relevant: newGoal.relevant || '',
        timeBound: newGoal.timeBound || '',
        deadline: newGoal.deadline || '',
        progress: 0,
        status: 'active',
        obstacles: '',
        achievements: '',
        nextSteps: newGoal.nextSteps || ''
      };
      
      setGoals([goal, ...goals]);
      setNewGoal({
        category: 'skill',
        status: 'active',
        progress: 0
      });
      setIsAddingGoal(false);
    }
  };

  const updateGoalProgress = (goalId: string, progress: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, progress, status: progress >= 100 ? 'completed' : goal.status }
        : goal
    ));
  };

  const getCategoryColor = (category: Goal['category']) => {
    switch (category) {
      case 'skill': return 'bg-primary text-primary-foreground';
      case 'discipline': return 'bg-profit text-profit-foreground';
      case 'psychology': return 'bg-neutral text-neutral-foreground';
      case 'financial': return 'bg-loss text-loss-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: Goal['status']) => {
    switch (status) {
      case 'completed': return 'text-profit';
      case 'active': return 'text-primary';
      case 'paused': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date() && deadline !== '';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                SMART Goals & Bi-Monthly Review
              </CardTitle>
              <CardDescription>
                Set specific, measurable, achievable, relevant, and time-bound trading goals
              </CardDescription>
            </div>
            <Button 
              variant="trading" 
              onClick={() => setIsAddingGoal(true)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Goal
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Goal Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Goals</p>
                <p className="text-2xl font-bold">{goals.length}</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-profit">
                  {goals.filter(g => g.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-profit" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-primary">
                  {goals.filter(g => g.status === 'active').length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
                <p className="text-2xl font-bold">
                  {Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length || 0)}%
                </p>
              </div>
              <Target className="h-8 w-8 text-neutral" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Goal Form */}
      {isAddingGoal && (
        <Card className="bg-gradient-card border-primary/20">
          <CardHeader>
            <CardTitle>Set New SMART Goal</CardTitle>
            <CardDescription>
              Create a specific, measurable, achievable, relevant, and time-bound goal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Goal Title</Label>
                <Input
                  id="title"
                  placeholder="Improve Win Rate to 60%"
                  value={newGoal.title || ''}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newGoal.category} onValueChange={(value) => setNewGoal({ ...newGoal, category: value as Goal['category'] })}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="skill">Trading Skill</SelectItem>
                    <SelectItem value="discipline">Discipline & Process</SelectItem>
                    <SelectItem value="psychology">Psychology & Emotions</SelectItem>
                    <SelectItem value="financial">Financial Target</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of what you want to achieve..."
                value={newGoal.description || ''}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                className="bg-input border-border"
              />
            </div>

            {/* SMART Criteria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="specific">Specific</Label>
                <Textarea
                  id="specific"
                  placeholder="What exactly will you accomplish?"
                  value={newGoal.specific || ''}
                  onChange={(e) => setNewGoal({ ...newGoal, specific: e.target.value })}
                  className="bg-input border-border"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="measurable">Measurable</Label>
                <Textarea
                  id="measurable"
                  placeholder="How will you measure progress?"
                  value={newGoal.measurable || ''}
                  onChange={(e) => setNewGoal({ ...newGoal, measurable: e.target.value })}
                  className="bg-input border-border"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="achievable">Achievable</Label>
                <Textarea
                  id="achievable"
                  placeholder="Is this goal realistic and attainable?"
                  value={newGoal.achievable || ''}
                  onChange={(e) => setNewGoal({ ...newGoal, achievable: e.target.value })}
                  className="bg-input border-border"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="relevant">Relevant</Label>
                <Textarea
                  id="relevant"
                  placeholder="Why is this goal important?"
                  value={newGoal.relevant || ''}
                  onChange={(e) => setNewGoal({ ...newGoal, relevant: e.target.value })}
                  className="bg-input border-border"
                  rows={3}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeBound">Time-Bound</Label>
                <Textarea
                  id="timeBound"
                  placeholder="What is the deadline and timeline?"
                  value={newGoal.timeBound || ''}
                  onChange={(e) => setNewGoal({ ...newGoal, timeBound: e.target.value })}
                  className="bg-input border-border"
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newGoal.deadline || ''}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddingGoal(false)}>
                Cancel
              </Button>
              <Button variant="trading" onClick={handleAddGoal}>
                Create Goal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <Card key={goal.id} className="bg-gradient-card border-border/50">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{goal.title}</CardTitle>
                    <Badge className={getCategoryColor(goal.category)}>
                      {goal.category}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(goal.status)}>
                      {goal.status}
                    </Badge>
                    {isOverdue(goal.deadline) && goal.status !== 'completed' && (
                      <Badge variant="destructive">Overdue</Badge>
                    )}
                  </div>
                  <CardDescription>{goal.description}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(goal.deadline)}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Progress</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{goal.progress}%</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        const newProgress = prompt('Enter new progress (0-100):', goal.progress.toString());
                        if (newProgress !== null) {
                          const progress = Math.max(0, Math.min(100, parseInt(newProgress) || 0));
                          updateGoalProgress(goal.id, progress);
                        }
                      }}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>

              {/* SMART Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">SPECIFIC</Label>
                  <p className="text-sm">{goal.specific || 'Not defined'}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">MEASURABLE</Label>
                  <p className="text-sm">{goal.measurable || 'Not defined'}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">TIME-BOUND</Label>
                  <p className="text-sm">{goal.timeBound || 'Not defined'}</p>
                </div>
              </div>

              {/* Progress Tracking */}
              {(goal.achievements || goal.obstacles || goal.nextSteps) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border/50">
                  {goal.achievements && (
                    <div className="space-y-1">
                      <Label className="text-xs text-profit">ACHIEVEMENTS</Label>
                      <p className="text-sm">{goal.achievements}</p>
                    </div>
                  )}
                  {goal.obstacles && (
                    <div className="space-y-1">
                      <Label className="text-xs text-loss">OBSTACLES</Label>
                      <p className="text-sm">{goal.obstacles}</p>
                    </div>
                  )}
                  {goal.nextSteps && (
                    <div className="space-y-1">
                      <Label className="text-xs text-primary">NEXT STEPS</Label>
                      <p className="text-sm">{goal.nextSteps}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};