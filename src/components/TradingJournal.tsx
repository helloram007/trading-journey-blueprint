import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Target, Brain, Calendar, Image } from 'lucide-react';

import { TradeLog } from './trading/TradeLog';
import { TradingPlan } from './trading/TradingPlan';
import { WeeklyReview } from './trading/WeeklyReview';
import { MonthlyReview } from './trading/MonthlyReview';
import { GoalSetting } from './trading/GoalSetting';
import { PsychologyTracker } from './trading/PsychologyTracker';
import { TradingImages } from './trading/TradingImages';

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

const sampleTrades: Trade[] = [
  {
    id: '1',
    date: '2024-07-05',
    time: '09:30',
    instrument: 'EUR/USD',
    direction: 'Long',
    entryPrice: 1.0845,
    exitPrice: 1.0892,
    quantity: 10000,
    stopLoss: 1.0820,
    target: 1.0895,
    riskReward: '1:2.0',
    result: 47.00,
    resultPips: 47,
    emotion: 'Confident',
    reason: 'Breakout & retest of resistance',
    timeframe: '4H',
    notes: 'Clean setup, followed plan perfectly'
  },
  {
    id: '2',
    date: '2024-07-04',
    time: '14:15',
    instrument: 'GBP/USD',
    direction: 'Short',
    entryPrice: 1.2756,
    exitPrice: 1.2733,
    quantity: 5000,
    stopLoss: 1.2780,
    target: 1.2720,
    riskReward: '1:1.5',
    result: -11.50,
    resultPips: -23,
    emotion: 'FOMO',
    reason: 'Rejection at resistance',
    timeframe: '1H',
    notes: 'Entered too late, emotion-driven trade'
  }
];

const TradingJournal = () => {
  const [activeTab, setActiveTab] = useState('trades');
  const [trades, setTrades] = useState<Trade[]>(sampleTrades);

  // Sample stats for the dashboard
  const stats = {
    totalTrades: 47,
    winRate: 68.1,
    profitLoss: '+$2,847.50',
    riskReward: '1:2.3',
    bestTrade: '+$445.20',
    worstTrade: '-$127.40'
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Trading Journal
          </h1>
          <p className="text-muted-foreground text-lg">
            Professional trading performance tracking and analysis
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Trades</p>
                  <p className="text-2xl font-bold">{stats.totalTrades}</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Win Rate</p>
                  <p className="text-2xl font-bold text-profit">{stats.winRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-profit" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">P&L</p>
                  <p className="text-2xl font-bold text-profit">{stats.profitLoss}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-profit" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Risk:Reward</p>
                  <p className="text-2xl font-bold">{stats.riskReward}</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Best Trade</p>
                  <p className="text-2xl font-bold text-profit">{stats.bestTrade}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-profit" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Worst Trade</p>
                  <p className="text-2xl font-bold text-loss">{stats.worstTrade}</p>
                </div>
                <TrendingDown className="h-8 w-8 text-loss" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 bg-card/50 border border-border/50">
            <TabsTrigger value="trades" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Trade Log
            </TabsTrigger>
            <TabsTrigger value="plan" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Trading Plan
            </TabsTrigger>
            <TabsTrigger value="weekly" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Weekly Review
            </TabsTrigger>
            <TabsTrigger value="monthly" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Monthly Review
            </TabsTrigger>
            <TabsTrigger value="goals" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Goals
            </TabsTrigger>
            <TabsTrigger value="psychology" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Psychology
            </TabsTrigger>
            <TabsTrigger value="images" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Chart Gallery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trades" className="mt-6">
            <TradeLog trades={trades} setTrades={setTrades} />
          </TabsContent>

          <TabsContent value="plan" className="mt-6">
            <TradingPlan />
          </TabsContent>

          <TabsContent value="weekly" className="mt-6">
            <WeeklyReview trades={trades} />
          </TabsContent>

          <TabsContent value="monthly" className="mt-6">
            <MonthlyReview />
          </TabsContent>

          <TabsContent value="goals" className="mt-6">
            <GoalSetting />
          </TabsContent>

          <TabsContent value="psychology" className="mt-6">
            <PsychologyTracker />
          </TabsContent>

          <TabsContent value="images" className="mt-6">
            <TradingImages />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TradingJournal;