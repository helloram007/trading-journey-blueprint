import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar, TrendingUp, Target, Brain, AlertTriangle, Edit, Save, Plus } from 'lucide-react';

interface MonthlyReviewData {
  month: string;
  year: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  netPL: number;
  largestWin: number;
  largestLoss: number;
  avgWin: number;
  avgLoss: number;
  profitFactor: number;
  rulesFollowedPercentage: number;
  recurringMistakes: string;
  patterns: string;
  goalProgress: string;
  planAdjustments: string;
  emotionalInsights: string;
  nextMonthFocus: string;
}

const sampleReviews: MonthlyReviewData[] = [
  {
    month: 'June',
    year: 2024,
    totalTrades: 42,
    winningTrades: 28,
    losingTrades: 14,
    winRate: 66.7,
    netPL: 1247.80,
    largestWin: 445.20,
    largestLoss: -187.50,
    avgWin: 89.40,
    avgLoss: -65.30,
    profitFactor: 1.37,
    rulesFollowedPercentage: 85,
    recurringMistakes: 'Trading during news events, entering trades without full confirmation, overtrading on Fridays',
    patterns: 'Best performance during London session, struggle with ranging markets, excellent at trend continuation setups',
    goalProgress: 'Target win rate: 65% ✅ (achieved 66.7%), Target profit: $1000 ✅ (achieved $1247.80), Reduce emotional trades: 🔄 (still working on this)',
    planAdjustments: 'Add more filters for ranging market conditions, implement stricter news avoidance rules, reduce position size on Friday trades',
    emotionalInsights: 'Confidence building with consistent profits, but still prone to FOMO after seeing big moves. Need to work on patience and acceptance of missed opportunities.',
    nextMonthFocus: 'Focus on quality over quantity, improve emotional discipline, master ranging market strategies'
  }
];

export const MonthlyReview = () => {
  const [reviews, setReviews] = useState<MonthlyReviewData[]>(sampleReviews);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newReview, setNewReview] = useState<Partial<MonthlyReviewData>>({
    month: new Date().toLocaleString('default', { month: 'long' }),
    year: new Date().getFullYear()
  });

  const calculateMetrics = (review: Partial<MonthlyReviewData>) => {
    const totalTrades = review.totalTrades || 0;
    const winningTrades = review.winningTrades || 0;
    const losingTrades = totalTrades - winningTrades;
    const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
    const avgWin = winningTrades > 0 ? (review.netPL || 0) / winningTrades : 0;
    const avgLoss = losingTrades > 0 ? Math.abs((review.netPL || 0) - (avgWin * winningTrades)) / losingTrades : 0;
    const profitFactor = avgLoss > 0 ? (avgWin * winningTrades) / (avgLoss * losingTrades) : 0;

    return {
      losingTrades,
      winRate,
      avgWin,
      avgLoss,
      profitFactor
    };
  };

  const handleAddReview = () => {
    if (newReview.totalTrades && newReview.netPL !== undefined) {
      const metrics = calculateMetrics(newReview);
      
      const review: MonthlyReviewData = {
        month: newReview.month || new Date().toLocaleString('default', { month: 'long' }),
        year: newReview.year || new Date().getFullYear(),
        totalTrades: Number(newReview.totalTrades) || 0,
        winningTrades: Number(newReview.winningTrades) || 0,
        losingTrades: metrics.losingTrades,
        winRate: metrics.winRate,
        netPL: Number(newReview.netPL) || 0,
        largestWin: Number(newReview.largestWin) || 0,
        largestLoss: Number(newReview.largestLoss) || 0,
        avgWin: metrics.avgWin,
        avgLoss: metrics.avgLoss,
        profitFactor: metrics.profitFactor,
        rulesFollowedPercentage: Number(newReview.rulesFollowedPercentage) || 80,
        recurringMistakes: newReview.recurringMistakes || '',
        patterns: newReview.patterns || '',
        goalProgress: newReview.goalProgress || '',
        planAdjustments: newReview.planAdjustments || '',
        emotionalInsights: newReview.emotionalInsights || '',
        nextMonthFocus: newReview.nextMonthFocus || ''
      };
      
      setReviews([review, ...reviews]);
      setNewReview({
        month: new Date().toLocaleString('default', { month: 'long' }),
        year: new Date().getFullYear()
      });
      setIsAddingReview(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getProfitFactorColor = (pf: number) => {
    if (pf >= 1.5) return 'text-profit';
    if (pf >= 1.0) return 'text-neutral';
    return 'text-loss';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                Monthly Review
              </CardTitle>
              <CardDescription>
                Comprehensive monthly performance analysis and strategic planning
              </CardDescription>
            </div>
            <Button 
              variant="trading" 
              onClick={() => setIsAddingReview(true)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Review
            </Button>
          </div>
        </CardHeader>
      </Card>

      {isAddingReview && (
        <Card className="bg-gradient-card border-primary/20">
          <CardHeader>
            <CardTitle>New Monthly Review</CardTitle>
            <CardDescription>Analyze your complete monthly trading performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Month</Label>
                <Input
                  value={newReview.month || ''}
                  onChange={(e) => setNewReview({ ...newReview, month: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>Year</Label>
                <Input
                  type="number"
                  value={newReview.year || ''}
                  onChange={(e) => setNewReview({ ...newReview, year: Number(e.target.value) })}
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Total Trades</Label>
                <Input
                  type="number"
                  value={newReview.totalTrades || ''}
                  onChange={(e) => setNewReview({ ...newReview, totalTrades: Number(e.target.value) })}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>Winning Trades</Label>
                <Input
                  type="number"
                  value={newReview.winningTrades || ''}
                  onChange={(e) => setNewReview({ ...newReview, winningTrades: Number(e.target.value) })}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>Net P&L ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={newReview.netPL || ''}
                  onChange={(e) => setNewReview({ ...newReview, netPL: Number(e.target.value) })}
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Largest Win ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={newReview.largestWin || ''}
                  onChange={(e) => setNewReview({ ...newReview, largestWin: Number(e.target.value) })}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>Largest Loss ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={newReview.largestLoss || ''}
                  onChange={(e) => setNewReview({ ...newReview, largestLoss: Number(e.target.value) })}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>Rules Followed (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={newReview.rulesFollowedPercentage || ''}
                  onChange={(e) => setNewReview({ ...newReview, rulesFollowedPercentage: Number(e.target.value) })}
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Recurring Mistakes</Label>
                <Textarea
                  placeholder="What mistakes keep happening?"
                  value={newReview.recurringMistakes || ''}
                  onChange={(e) => setNewReview({ ...newReview, recurringMistakes: e.target.value })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>Trading Patterns Identified</Label>
                <Textarea
                  placeholder="What patterns did you notice in your trading?"
                  value={newReview.patterns || ''}
                  onChange={(e) => setNewReview({ ...newReview, patterns: e.target.value })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>Goal Progress Review</Label>
                <Textarea
                  placeholder="How did you progress toward your goals?"
                  value={newReview.goalProgress || ''}
                  onChange={(e) => setNewReview({ ...newReview, goalProgress: e.target.value })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>Trading Plan Adjustments</Label>
                <Textarea
                  placeholder="What adjustments need to be made to your plan?"
                  value={newReview.planAdjustments || ''}
                  onChange={(e) => setNewReview({ ...newReview, planAdjustments: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddingReview(false)}>
                Cancel
              </Button>
              <Button variant="trading" onClick={handleAddReview}>
                Save Review
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Monthly Review Cards */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <Card key={index} className="bg-gradient-card border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {review.month} {review.year} Review
                </CardTitle>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className={review.netPL > 0 ? 'text-profit border-profit' : 'text-loss border-loss'}>
                    {formatCurrency(review.netPL)}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Performance Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <div className="text-xl font-bold">{review.totalTrades}</div>
                  <div className="text-xs text-muted-foreground">Total Trades</div>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <div className="text-xl font-bold text-profit">{review.winningTrades}</div>
                  <div className="text-xs text-muted-foreground">Winners</div>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <div className="text-xl font-bold">{review.winRate.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Win Rate</div>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <div className="text-xl font-bold text-profit">{formatCurrency(review.largestWin)}</div>
                  <div className="text-xs text-muted-foreground">Best Trade</div>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <div className="text-xl font-bold text-loss">{formatCurrency(review.largestLoss)}</div>
                  <div className="text-xs text-muted-foreground">Worst Trade</div>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <div className={`text-xl font-bold ${getProfitFactorColor(review.profitFactor)}`}>
                    {review.profitFactor.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground">Profit Factor</div>
                </div>
              </div>

              {/* Rules Adherence */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Rules Adherence</Label>
                  <Badge variant="outline" className={review.rulesFollowedPercentage >= 80 ? 'text-profit' : 'text-loss'}>
                    {review.rulesFollowedPercentage}%
                  </Badge>
                </div>
                <Progress value={review.rulesFollowedPercentage} className="h-2" />
              </div>

              {/* Analysis Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card/30 border-border/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-loss" />
                      Recurring Mistakes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {review.recurringMistakes || 'No recurring mistakes identified'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card/30 border-border/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" />
                      Trading Patterns
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {review.patterns || 'No patterns identified'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card/30 border-border/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5 text-profit" />
                      Goal Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {review.goalProgress || 'No goal progress noted'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card/30 border-border/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Edit className="h-5 w-5 text-neutral" />
                      Plan Adjustments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {review.planAdjustments || 'No plan adjustments needed'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Emotional Insights */}
              {review.emotionalInsights && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" />
                      Emotional Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm whitespace-pre-line">
                      {review.emotionalInsights}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Next Month Focus */}
              {review.nextMonthFocus && (
                <Card className="bg-gradient-primary/10 border-primary/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Next Month Focus
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm whitespace-pre-line font-medium">
                      {review.nextMonthFocus}
                    </p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};