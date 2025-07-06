import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, TrendingUp, TrendingDown, Edit, Image, Upload } from 'lucide-react';

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

interface TradeLogProps {
  trades: Trade[];
  setTrades: React.Dispatch<React.SetStateAction<Trade[]>>;
}

export const TradeLog = ({ trades, setTrades }: TradeLogProps) => {
  const [isAddingTrade, setIsAddingTrade] = useState(false);
  const [newTrade, setNewTrade] = useState<Partial<Trade>>({
    direction: 'Long',
    timeframe: '4H',
    emotion: 'Neutral'
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setNewTrade({ ...newTrade, chartImage: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (url: string) => {
    setNewTrade({ ...newTrade, chartImage: url });
  };

  const handleAddTrade = () => {
    if (newTrade.instrument && newTrade.entryPrice && newTrade.exitPrice) {
      const trade: Trade = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        instrument: newTrade.instrument || '',
        direction: newTrade.direction as 'Long' | 'Short' || 'Long',
        entryPrice: Number(newTrade.entryPrice) || 0,
        exitPrice: Number(newTrade.exitPrice) || 0,
        quantity: Number(newTrade.quantity) || 10000,
        stopLoss: Number(newTrade.stopLoss) || 0,
        target: Number(newTrade.target) || 0,
        riskReward: newTrade.riskReward || '1:1',
        result: ((Number(newTrade.exitPrice) - Number(newTrade.entryPrice)) * (Number(newTrade.quantity) || 10000)) * (newTrade.direction === 'Short' ? -1 : 1),
        resultPips: ((Number(newTrade.exitPrice) - Number(newTrade.entryPrice)) * 10000) * (newTrade.direction === 'Short' ? -1 : 1),
        emotion: newTrade.emotion || 'Neutral',
        reason: newTrade.reason || '',
        timeframe: newTrade.timeframe || '4H',
        notes: newTrade.notes || '',
        chartImage: newTrade.chartImage || ''
      };
      
      setTrades([trade, ...trades]);
      setNewTrade({ direction: 'Long', timeframe: '4H', emotion: 'Neutral' });
      setIsAddingTrade(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Trade Log</CardTitle>
              <CardDescription>
                Record and analyze every trade with detailed metrics and emotions
              </CardDescription>
            </div>
            <Dialog open={isAddingTrade} onOpenChange={setIsAddingTrade}>
              <DialogTrigger asChild>
                <Button variant="trading" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Trade
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-card border-border">
                <DialogHeader>
                  <DialogTitle>Add New Trade</DialogTitle>
                  <DialogDescription>
                    Record the details of your trade for analysis
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="instrument">Instrument</Label>
                    <Input
                      id="instrument"
                      placeholder="EUR/USD"
                      value={newTrade.instrument || ''}
                      onChange={(e) => setNewTrade({ ...newTrade, instrument: e.target.value })}
                      className="bg-input border-border"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="direction">Direction</Label>
                    <Select value={newTrade.direction} onValueChange={(value) => setNewTrade({ ...newTrade, direction: value as 'Long' | 'Short' })}>
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Long">Long</SelectItem>
                        <SelectItem value="Short">Short</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="entryPrice">Entry Price</Label>
                    <Input
                      id="entryPrice"
                      type="number"
                      step="0.0001"
                      placeholder="1.0845"
                      value={newTrade.entryPrice || ''}
                      onChange={(e) => setNewTrade({ ...newTrade, entryPrice: Number(e.target.value) })}
                      className="bg-input border-border"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="exitPrice">Exit Price</Label>
                    <Input
                      id="exitPrice"
                      type="number"
                      step="0.0001"
                      placeholder="1.0892"
                      value={newTrade.exitPrice || ''}
                      onChange={(e) => setNewTrade({ ...newTrade, exitPrice: Number(e.target.value) })}
                      className="bg-input border-border"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="stopLoss">Stop Loss</Label>
                    <Input
                      id="stopLoss"
                      type="number"
                      step="0.0001"
                      placeholder="1.0820"
                      value={newTrade.stopLoss || ''}
                      onChange={(e) => setNewTrade({ ...newTrade, stopLoss: Number(e.target.value) })}
                      className="bg-input border-border"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="target">Target</Label>
                    <Input
                      id="target"
                      type="number"
                      step="0.0001"
                      placeholder="1.0895"
                      value={newTrade.target || ''}
                      onChange={(e) => setNewTrade({ ...newTrade, target: Number(e.target.value) })}
                      className="bg-input border-border"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeframe">Timeframe</Label>
                    <Select value={newTrade.timeframe} onValueChange={(value) => setNewTrade({ ...newTrade, timeframe: value })}>
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1M">1 Minute</SelectItem>
                        <SelectItem value="5M">5 Minutes</SelectItem>
                        <SelectItem value="15M">15 Minutes</SelectItem>
                        <SelectItem value="1H">1 Hour</SelectItem>
                        <SelectItem value="4H">4 Hours</SelectItem>
                        <SelectItem value="1D">Daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="emotion">Emotional State</Label>
                    <Select value={newTrade.emotion} onValueChange={(value) => setNewTrade({ ...newTrade, emotion: value })}>
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Confident">Confident</SelectItem>
                        <SelectItem value="Neutral">Neutral</SelectItem>
                        <SelectItem value="Anxious">Anxious</SelectItem>
                        <SelectItem value="FOMO">FOMO</SelectItem>
                        <SelectItem value="Revenge">Revenge</SelectItem>
                        <SelectItem value="Greedy">Greedy</SelectItem>
                        <SelectItem value="Fearful">Fearful</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="reason">Entry Reason</Label>
                    <Input
                      id="reason"
                      placeholder="Breakout & retest of resistance"
                      value={newTrade.reason || ''}
                      onChange={(e) => setNewTrade({ ...newTrade, reason: e.target.value })}
                      className="bg-input border-border"
                    />
                  </div>
                  
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="What went well, what can improve..."
                      value={newTrade.notes || ''}
                      onChange={(e) => setNewTrade({ ...newTrade, notes: e.target.value })}
                      className="bg-input border-border"
                    />
                  </div>
                  
                  <div className="col-span-2 space-y-4">
                    <div className="flex items-center gap-2">
                      <Image className="h-4 w-4" />
                      <Label>Chart Image</Label>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="chartUrl">Image URL</Label>
                        <Input
                          id="chartUrl"
                          placeholder="https://example.com/chart.png"
                          value={newTrade.chartImage?.startsWith('http') ? newTrade.chartImage : ''}
                          onChange={(e) => handleImageUrlChange(e.target.value)}
                          className="bg-input border-border"
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="h-px bg-border flex-1" />
                        <span className="text-xs text-muted-foreground">or</span>
                        <div className="h-px bg-border flex-1" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="chartFile">Upload Image</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="chartFile"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="bg-input border-border"
                          />
                          <Upload className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      
                      {newTrade.chartImage && (
                        <div className="mt-3">
                          <img
                            src={newTrade.chartImage}
                            alt="Chart preview"
                            className="max-w-full h-32 object-cover rounded border border-border"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddingTrade(false)}>
                    Cancel
                  </Button>
                  <Button variant="trading" onClick={handleAddTrade}>
                    Add Trade
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Date/Time</TableHead>
                  <TableHead>Instrument</TableHead>
                  <TableHead>Direction</TableHead>
                  <TableHead>Entry</TableHead>
                  <TableHead>Exit</TableHead>
                  <TableHead>R:R</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Pips</TableHead>
                  <TableHead>Emotion</TableHead>
                  <TableHead>Chart</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trades.map((trade) => (
                  <TableRow key={trade.id} className="hover:bg-muted/20">
                    <TableCell>
                      <div className="text-sm">
                        <div>{trade.date}</div>
                        <div className="text-muted-foreground">{trade.time}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{trade.instrument}</TableCell>
                    <TableCell>
                      <Badge variant={trade.direction === 'Long' ? 'default' : 'secondary'} className="gap-1">
                        {trade.direction === 'Long' ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {trade.direction}
                      </Badge>
                    </TableCell>
                    <TableCell>{trade.entryPrice.toFixed(4)}</TableCell>
                    <TableCell>{trade.exitPrice.toFixed(4)}</TableCell>
                    <TableCell>{trade.riskReward}</TableCell>
                    <TableCell>
                      <span className={trade.result > 0 ? 'text-profit font-semibold' : 'text-loss font-semibold'}>
                        {formatCurrency(trade.result)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={trade.resultPips > 0 ? 'text-profit' : 'text-loss'}>
                        {trade.resultPips > 0 ? '+' : ''}{trade.resultPips}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {trade.emotion}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {trade.chartImage ? (
                        <img
                          src={trade.chartImage}
                          alt="Chart"
                          className="w-8 h-8 object-cover rounded cursor-pointer hover:scale-150 transition-transform"
                          onClick={() => window.open(trade.chartImage, '_blank')}
                        />
                      ) : (
                        <Image className="h-4 w-4 text-muted-foreground" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};