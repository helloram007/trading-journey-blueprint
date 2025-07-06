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
  strategyName: "Multi-Timeframe Trend Following",
  description: "Trading in alignment with higher timeframe trend direction using lower timeframe entries",
  analysisTimeframes: ["Daily", "4H"],
  entryTimeframes: ["1H", "15M"],
  keyLevels: "• Daily trend direction (uptrend/downtrend/sideways)\n• 4H trend direction and market structure\n• Key Daily S/R levels\n• Weekly swing highs/lows\n• Major round numbers (00, 50 levels)",
  setupCriteria: "• Daily timeframe shows clear trend direction\n• 4H confirms the Daily trend direction\n• Lower timeframe (1H) shows pullback/retracement\n• Wait for continuation signal in trend direction\n• Volume confirms the move",
  entryRules: "• Only trade in direction of Daily trend\n• Wait for 1H pullback against Daily trend\n• Enter on 15M confirmation candle\n• Entry: Break of 15M structure in trend direction\n• Stop loss: Beyond recent swing (1H timeframe)\n• Target: Next significant level on 4H/Daily",
  exitRules: "• Take partial profit at 1:1 R/R\n• Move stop to breakeven after 1:1\n• Trail remaining position using 1H swing levels\n• Exit completely if Daily trend changes\n• Exit if 4H shows reversal signals",
  riskManagement: "• Maximum 1.5% risk per trade\n• Maximum 4% total portfolio risk\n• No more than 2 open positions\n• Daily loss limit: 3%\n• Weekly loss limit: 8%\n• Never trade against Daily trend",
  avoidConditions: "• Trading against Daily trend direction\n• Unclear/choppy Daily trend\n• Major news events (30min before/after)\n• Low volume sessions\n• Friday afternoon/Sunday evening\n• When multiple timeframes conflict",
  checklist: [
    "Daily trend direction identified",
    "4H confirms Daily trend", 
    "1H shows pullback opportunity",
    "15M entry signal present",
    "Risk calculated (1.5% max)",
    "Stop loss and targets set",
    "No major news pending",
    "All timeframes aligned",
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