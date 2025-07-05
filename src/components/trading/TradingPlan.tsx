import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, CheckCircle } from 'lucide-react';

interface TradingPlanData {
  strategyName: string;
  description: string;
  analysisTimeframes: string[];
  entryTimeframes: string[];
  keyLevels: string;
  setupCriteria: string;
  entryRules: string;
  exitRules: string;
  riskManagement: string;
  avoidConditions: string;
  checklist: string[];
}

const defaultPlan: TradingPlanData = {
  strategyName: "Breakout & Retest Strategy",
  description: "Trading confirmed breakouts of key levels with pullback confirmation",
  analysisTimeframes: ["Daily", "4H"],
  entryTimeframes: ["4H", "1H"],
  keyLevels: "• Major S/R levels from Daily timeframe\n• Previous swing highs/lows\n• Round numbers (psychological levels)\n• Fibonacci retracement levels",
  setupCriteria: "• Clear breakout of key level with volume\n• Pullback to broken level (retest)\n• Confirmation candle pattern\n• RSI not in extreme territory",
  entryRules: "• Enter on confirmation candle after retest\n• Entry above/below retest candle high/low\n• Stop loss below/above the retested level\n• Target at next major level",
  exitRules: "• Take profit at predetermined target\n• Move stop to breakeven after 1:1 R/R\n• Trail stop if trend continues strong\n• Exit if setup invalidated",
  riskManagement: "• Maximum 2% risk per trade\n• Maximum 6% total portfolio risk\n• No more than 3 open positions\n• Daily loss limit: 4%\n• Weekly loss limit: 10%",
  avoidConditions: "• Low volume breakouts\n• News events within 30 minutes\n• Major economic releases\n• End of week/month volatility\n• Choppy, ranging markets",
  checklist: [
    "Market structure analysis completed",
    "Key levels identified and marked", 
    "Risk calculated (2% max)",
    "Entry and exit plan defined",
    "No conflicting news events",
    "Emotional state is neutral/positive",
    "Setup meets all criteria",
    "R:R ratio minimum 1:2"
  ]
};

export const TradingPlan = () => {
  const [plan, setPlan] = useState<TradingPlanData>(defaultPlan);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlan, setEditedPlan] = useState<TradingPlanData>(plan);

  const handleSave = () => {
    setPlan(editedPlan);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPlan(plan);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Mechanical Trading Plan</CardTitle>
              <CardDescription>
                Your systematic approach to trading with clear rules and criteria
              </CardDescription>
            </div>
            <Button 
              variant={isEditing ? "profit" : "trading"} 
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className="gap-2"
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4" />
                  Save Plan
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4" />
                  Edit Plan
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Strategy Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="strategy-name">Strategy Name</Label>
              {isEditing ? (
                <Input
                  id="strategy-name"
                  value={editedPlan.strategyName}
                  onChange={(e) => setEditedPlan({ ...editedPlan, strategyName: e.target.value })}
                  className="bg-input border-border"
                />
              ) : (
                <div className="p-3 bg-muted/20 rounded-lg border border-border/50">
                  <h3 className="font-semibold text-lg text-primary">{plan.strategyName}</h3>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeframes">Timeframes</Label>
              <div className="p-3 bg-muted/20 rounded-lg border border-border/50">
                <div className="flex flex-wrap gap-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Analysis: </span>
                    {plan.analysisTimeframes.map((tf) => (
                      <Badge key={tf} variant="outline" className="mr-1">{tf}</Badge>
                    ))}
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Entry: </span>
                    {plan.entryTimeframes.map((tf) => (
                      <Badge key={tf} variant="secondary" className="mr-1">{tf}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Strategy Description</Label>
            {isEditing ? (
              <Textarea
                id="description"
                value={editedPlan.description}
                onChange={(e) => setEditedPlan({ ...editedPlan, description: e.target.value })}
                className="bg-input border-border"
                rows={3}
              />
            ) : (
              <div className="p-4 bg-muted/20 rounded-lg border border-border/50">
                <p>{plan.description}</p>
              </div>
            )}
          </div>

          {/* Trading Rules Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card/50 border-border/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Key Levels Definition</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editedPlan.keyLevels}
                    onChange={(e) => setEditedPlan({ ...editedPlan, keyLevels: e.target.value })}
                    className="bg-input border-border"
                    rows={6}
                  />
                ) : (
                  <div className="whitespace-pre-line text-sm">
                    {plan.keyLevels}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Setup Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editedPlan.setupCriteria}
                    onChange={(e) => setEditedPlan({ ...editedPlan, setupCriteria: e.target.value })}
                    className="bg-input border-border"
                    rows={6}
                  />
                ) : (
                  <div className="whitespace-pre-line text-sm">
                    {plan.setupCriteria}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Entry Rules</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editedPlan.entryRules}
                    onChange={(e) => setEditedPlan({ ...editedPlan, entryRules: e.target.value })}
                    className="bg-input border-border"
                    rows={6}
                  />
                ) : (
                  <div className="whitespace-pre-line text-sm">
                    {plan.entryRules}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Exit Rules</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editedPlan.exitRules}
                    onChange={(e) => setEditedPlan({ ...editedPlan, exitRules: e.target.value })}
                    className="bg-input border-border"
                    rows={6}
                  />
                ) : (
                  <div className="whitespace-pre-line text-sm">
                    {plan.exitRules}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Risk Management</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editedPlan.riskManagement}
                    onChange={(e) => setEditedPlan({ ...editedPlan, riskManagement: e.target.value })}
                    className="bg-input border-border"
                    rows={6}
                  />
                ) : (
                  <div className="whitespace-pre-line text-sm text-profit">
                    {plan.riskManagement}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Conditions to Avoid</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editedPlan.avoidConditions}
                    onChange={(e) => setEditedPlan({ ...editedPlan, avoidConditions: e.target.value })}
                    className="bg-input border-border"
                    rows={6}
                  />
                ) : (
                  <div className="whitespace-pre-line text-sm text-loss">
                    {plan.avoidConditions}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Pre-Trade Checklist */}
          <Card className="bg-gradient-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Pre-Trade Checklist
              </CardTitle>
              <CardDescription>
                Confirm all criteria before placing any trade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {plan.checklist.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox id={`checklist-${index}`} />
                    <Label htmlFor={`checklist-${index}`} className="text-sm">
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {isEditing && (
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="trading" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};