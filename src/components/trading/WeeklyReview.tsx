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

const sampleReviews: WeeklyReviewData[] = [
  {
    weekEnding: '2024-07-05',
    totalTrades: 12,
    winningTrades: 8,
    losingTrades: 4,
    winRate: 66.7,
    netPL: 285.50,
    rulesFollowed: true,
    mistakes: 'Entered one trade without proper confirmation due to FOMO. Need to be more patient.',
    lessons: 'Patience pays off. Best trades came from waiting for perfect setups.',
    bestTrade: 'EUR/USD breakout & retest - followed plan perfectly, 2.5R win',
    worstTrade: 'GBP/USD revenge trade after initial loss - emotional decision',
    emotionalState: 7,
    emotionalNotes: 'Generally disciplined but had one emotional moment after early loss',
    actionSteps: 'Continue current approach. Add meditation before trading sessions.'
  },
  {
    weekEnding: '2024-06-28',
    totalTrades: 8,
    winningTrades: 5,
    losingTrades: 3,
    winRate: 62.5,
    netPL: 147.30,
    rulesFollowed: false,
    mistakes: 'Took trades during news events twice. Risk management was inconsistent.',
    lessons: 'News events create too much volatility. Stick to plan completely.',
    bestTrade: 'USD/JPY trend continuation - patient entry rewarded',
    worstTrade: 'EUR/GBP during ECB announcement - should have stayed out',
    emotionalState: 5,
    emotionalNotes: 'Felt pressured to trade, leading to mistakes',
    actionSteps: 'Review economic calendar daily. Set alerts for news events.'
  }
];

export const WeeklyReview = () => {
  const [reviews, setReviews] = useState<WeeklyReviewData[]>(sampleReviews);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReview, setNewReview] = useState<Partial<WeeklyReviewData>>({
    weekEnding: new Date().toISOString().split('T')[0],
    emotionalState: 5,
    rulesFollowed: true
  });

  const handleAddReview = () => {
    if (newReview.totalTrades && newReview.netPL !== undefined) {
      const winRate = newReview.totalTrades ? 
        ((newReview.winningTrades || 0) / newReview.totalTrades) * 100 : 0;
      
      const review: WeeklyReviewData = {
        weekEnding: newReview.weekEnding || new Date().toISOString().split('T')[0],
        totalTrades: Number(newReview.totalTrades) || 0,
        winningTrades: Number(newReview.winningTrades) || 0,
        losingTrades: (Number(newReview.totalTrades) || 0) - (Number(newReview.winningTrades) || 0),
        winRate: winRate,
        netPL: Number(newReview.netPL) || 0,
        rulesFollowed: newReview.rulesFollowed || true,
        mistakes: newReview.mistakes || '',
        lessons: newReview.lessons || '',
        bestTrade: newReview.bestTrade || '',
        worstTrade: newReview.worstTrade || '',
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
    }
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="week-ending">Week Ending</Label>
                <Input
                  id="week-ending"
                  type="date"
                  value={newReview.weekEnding || ''}
                  onChange={(e) => setNewReview({ ...newReview, weekEnding: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="total-trades">Total Trades</Label>
                <Input
                  id="total-trades"
                  type="number"
                  placeholder="12"
                  value={newReview.totalTrades || ''}
                  onChange={(e) => setNewReview({ ...newReview, totalTrades: Number(e.target.value) })}
                  className="bg-input border-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="winning-trades">Winning Trades</Label>
                <Input
                  id="winning-trades"
                  type="number"
                  placeholder="8"
                  value={newReview.winningTrades || ''}
                  onChange={(e) => setNewReview({ ...newReview, winningTrades: Number(e.target.value) })}
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="net-pl">Net P&L ($)</Label>
                <Input
                  id="net-pl"
                  type="number"
                  step="0.01"
                  placeholder="285.50"
                  value={newReview.netPL || ''}
                  onChange={(e) => setNewReview({ ...newReview, netPL: Number(e.target.value) })}
                  className="bg-input border-border"
                />
              </div>
              
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