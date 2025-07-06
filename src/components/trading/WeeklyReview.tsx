import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, TrendingUp, TrendingDown, Target, Brain, Plus } from 'lucide-react';

interface Trade {
  id: string;
  date: string;
  time: string;
  instrument: string;
  direction: 'Long' | 'Short';
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  stopLoss: number;
  target: number;
  riskReward: string;
  result: number;
  resultPips: number;
  emotion: string;
  reason: string;
  timeframe: string;
  notes: string;
  chartImage?: string;
}

interface WeeklyReviewData {
  weekEnding: string;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  netPL: number;
  rulesFollowed: boolean;
  mistakes: string;
  lessons: string;
  bestTrade: string;
  worstTrade: string;
  emotionalState: number;
  emotionalNotes: string;
  actionSteps: string;
}

interface WeeklyReviewProps {
  trades: Trade[];
}

export const WeeklyReview = ({ trades }: WeeklyReviewProps) => {
  const [reviews, setReviews] = useState<WeeklyReviewData[]>([]);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReview, setNewReview] = useState<Partial<WeeklyReviewData>>({
    weekEnding: new Date().toISOString().split('T')[0],
    emotionalState: 5,
    rulesFollowed: true
  });

  const getWeekTrades = (weekEndingDate: string) => {
    const endDate = new Date(weekEndingDate);
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6); // Get 7 days (week)
    
    return trades.filter(trade => {
      const tradeDate = new Date(trade.date);
      return tradeDate >= startDate && tradeDate <= endDate;
    });
  };

  const calculateWeekMetrics = (weekEndingDate: string) => {
    const weekTrades = getWeekTrades(weekEndingDate);
    const winningTrades = weekTrades.filter(trade => trade.result > 0);
    const losingTrades = weekTrades.filter(trade => trade.result < 0);
    const totalPL = weekTrades.reduce((sum, trade) => sum + trade.result, 0);
    const winRate = weekTrades.length > 0 ? (winningTrades.length / weekTrades.length) * 100 : 0;
    
    const bestTrade = weekTrades.reduce((best, trade) => 
      trade.result > (best?.result || -Infinity) ? trade : best, null as Trade | null);
    const worstTrade = weekTrades.reduce((worst, trade) => 
      trade.result < (worst?.result || Infinity) ? trade : worst, null as Trade | null);

    return {
      totalTrades: weekTrades.length,
      winningTrades: winningTrades.length,
      losingTrades: losingTrades.length,
      winRate,
      netPL: totalPL,
      bestTradeDesc: bestTrade ? `${bestTrade.instrument} ${bestTrade.direction} - ${bestTrade.reason}` : '',
      worstTradeDesc: worstTrade ? `${worstTrade.instrument} ${worstTrade.direction} - ${worstTrade.reason}` : ''
    };
  };

  const handleAddReview = () => {
    const weekEnding = newReview.weekEnding || new Date().toISOString().split('T')[0];
    const metrics = calculateWeekMetrics(weekEnding);
    
    const review: WeeklyReviewData = {
      weekEnding,
      totalTrades: metrics.totalTrades,
      winningTrades: metrics.winningTrades,
      losingTrades: metrics.losingTrades,
      winRate: metrics.winRate,
      netPL: metrics.netPL,
      rulesFollowed: newReview.rulesFollowed || true,
      mistakes: newReview.mistakes || '',
      lessons: newReview.lessons || '',
      bestTrade: newReview.bestTrade || metrics.bestTradeDesc,
      worstTrade: newReview.worstTrade || metrics.worstTradeDesc,
      emotionalState: Number(newReview.emotionalState) || 5,
      emotionalNotes: newReview.emotionalNotes || '',
      actionSteps: newReview.actionSteps || ''
    };
    
    setReviews([review, ...reviews]);
    setNewReview({
      weekEnding: new Date().toISOString().split('T')[0],
      emotionalState: 5,
      rulesFollowed: true
    });
    setIsAddingReview(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getEmotionalStateColor = (state: number) => {
    if (state >= 8) return 'text-profit';
    if (state >= 6) return 'text-neutral';
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
                Weekly Review
              </CardTitle>
              <CardDescription>
                Analyze your weekly trading performance and emotional state
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
            <CardTitle>New Weekly Review</CardTitle>
            <CardDescription>Review your trading performance for the week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="week-ending">Week Ending</Label>
                <Input
                  id="week-ending"
                  type="date"
                  value={newReview.weekEnding || ''}
                  onChange={(e) => setNewReview({ ...newReview, weekEnding: e.target.value })}
                  className="bg-input border-border"
                />
                {newReview.weekEnding && (
                  <div className="mt-2 p-3 bg-muted/20 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-2">Calculated from your trades:</div>
                    {(() => {
                      const metrics = calculateWeekMetrics(newReview.weekEnding);
                      return (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
                          <div>
                            <div className="font-bold">{metrics.totalTrades}</div>
                            <div className="text-xs text-muted-foreground">Total</div>
                          </div>
                          <div>
                            <div className="font-bold text-profit">{metrics.winningTrades}</div>
                            <div className="text-xs text-muted-foreground">Winners</div>
                          </div>
                          <div>
                            <div className="font-bold">{metrics.winRate.toFixed(1)}%</div>
                            <div className="text-xs text-muted-foreground">Win Rate</div>
                          </div>
                          <div>
                            <div className={`font-bold ${metrics.netPL > 0 ? 'text-profit' : 'text-loss'}`}>
                              {formatCurrency(metrics.netPL)}
                            </div>
                            <div className="text-xs text-muted-foreground">Net P&L</div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rules-followed">Rules Followed?</Label>
                <Select 
                  value={newReview.rulesFollowed ? 'true' : 'false'} 
                  onValueChange={(value) => setNewReview({ ...newReview, rulesFollowed: value === 'true' })}
                >
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mistakes">Mistakes Made</Label>
              <Textarea
                id="mistakes"
                placeholder="What mistakes were made this week?"
                value={newReview.mistakes || ''}
                onChange={(e) => setNewReview({ ...newReview, mistakes: e.target.value })}
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lessons">Lessons Learned</Label>
              <Textarea
                id="lessons"
                placeholder="What did you learn this week?"
                value={newReview.lessons || ''}
                onChange={(e) => setNewReview({ ...newReview, lessons: e.target.value })}
                className="bg-input border-border"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="best-trade">Best Trade</Label>
                <Input
                  id="best-trade"
                  placeholder="Description of best trade"
                  value={newReview.bestTrade || ''}
                  onChange={(e) => setNewReview({ ...newReview, bestTrade: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="worst-trade">Worst Trade</Label>
                <Input
                  id="worst-trade"
                  placeholder="Description of worst trade"
                  value={newReview.worstTrade || ''}
                  onChange={(e) => setNewReview({ ...newReview, worstTrade: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emotional-state">Emotional State (1-10)</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="emotional-state"
                  type="range"
                  min="1"
                  max="10"
                  value={newReview.emotionalState || 5}
                  onChange={(e) => setNewReview({ ...newReview, emotionalState: Number(e.target.value) })}
                  className="flex-1"
                />
                <Badge variant="outline" className="min-w-[3rem]">
                  {newReview.emotionalState || 5}/10
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="action-steps">Action Steps for Next Week</Label>
              <Textarea
                id="action-steps"
                placeholder="What will you do differently next week?"
                value={newReview.actionSteps || ''}
                onChange={(e) => setNewReview({ ...newReview, actionSteps: e.target.value })}
                className="bg-input border-border"
              />
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

      {/* Review Cards */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <Card key={index} className="bg-gradient-card border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  Week Ending: {new Date(review.weekEnding).toLocaleDateString()}
                  {review.rulesFollowed ? (
                    <Badge variant="default" className="bg-profit text-profit-foreground">Rules Followed</Badge>
                  ) : (
                    <Badge variant="destructive">Rules Broken</Badge>
                  )}
                </CardTitle>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Net P&L</div>
                    <div className={`text-lg font-bold ${review.netPL > 0 ? 'text-profit' : 'text-loss'}`}>
                      {formatCurrency(review.netPL)}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Performance Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <div className="text-2xl font-bold">{review.totalTrades}</div>
                  <div className="text-sm text-muted-foreground">Total Trades</div>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <div className="text-2xl font-bold text-profit">{review.winningTrades}</div>
                  <div className="text-sm text-muted-foreground">Winners</div>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <div className="text-2xl font-bold text-loss">{review.losingTrades}</div>
                  <div className="text-sm text-muted-foreground">Losers</div>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <div className="text-2xl font-bold">{review.winRate.toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">Win Rate</div>
                </div>
              </div>

              {/* Emotional State */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Emotional State</Label>
                  <Badge variant="outline" className={getEmotionalStateColor(review.emotionalState)}>
                    {review.emotionalState}/10
                  </Badge>
                </div>
                <Progress value={review.emotionalState * 10} className="h-2" />
                {review.emotionalNotes && (
                  <p className="text-sm text-muted-foreground">{review.emotionalNotes}</p>
                )}
              </div>

              {/* Best & Worst Trades */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-profit flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    Best Trade
                  </Label>
                  <div className="p-3 bg-profit/10 border border-profit/20 rounded-lg">
                    <p className="text-sm">{review.bestTrade}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-loss flex items-center gap-1">
                    <TrendingDown className="h-4 w-4" />
                    Worst Trade
                  </Label>
                  <div className="p-3 bg-loss/10 border border-loss/20 rounded-lg">
                    <p className="text-sm">{review.worstTrade}</p>
                  </div>
                </div>
              </div>

              {/* Mistakes & Lessons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Mistakes Made</Label>
                  <div className="p-3 bg-muted/20 rounded-lg border border-border/50">
                    <p className="text-sm">{review.mistakes || 'No mistakes noted'}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Lessons Learned</Label>
                  <div className="p-3 bg-muted/20 rounded-lg border border-border/50">
                    <p className="text-sm">{review.lessons || 'No lessons noted'}</p>
                  </div>
                </div>
              </div>

              {/* Action Steps */}
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <Target className="h-4 w-4 text-primary" />
                  Action Steps for Next Week
                </Label>
                <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm">{review.actionSteps || 'No action steps defined'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};