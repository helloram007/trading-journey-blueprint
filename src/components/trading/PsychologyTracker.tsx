import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Brain, Heart, Plus, TrendingUp, TrendingDown, AlertTriangle, Lightbulb } from 'lucide-react';

interface EmotionalEntry {
  id: string;
  date: string;
  time: string;
  sessionType: 'before' | 'during' | 'after';
  emotionalState: number;
  dominantEmotion: string;
  fear: number;
  greed: number;
  fomo: number;
  revenge: number;
  confidence: number;
  patience: number;
  notes: string;
  triggers: string;
  copingStrategies: string;
}

interface Affirmation {
  id: string;
  text: string;
  category: 'discipline' | 'confidence' | 'patience' | 'acceptance';
  isActive: boolean;
}

const sampleEntries: EmotionalEntry[] = [
  {
    id: '1',
    date: '2024-07-05',
    time: '09:00',
    sessionType: 'before',
    emotionalState: 8,
    dominantEmotion: 'Confident',
    fear: 2,
    greed: 3,
    fomo: 1,
    revenge: 0,
    confidence: 8,
    patience: 7,
    notes: 'Feeling prepared and focused. Market analysis completed.',
    triggers: 'None identified',
    copingStrategies: '10 minutes of meditation, reviewed trading plan'
  },
  {
    id: '2',
    date: '2024-07-05',
    time: '15:30',
    sessionType: 'after',
    emotionalState: 6,
    dominantEmotion: 'Frustrated',
    fear: 4,
    greed: 6,
    fomo: 7,
    revenge: 3,
    confidence: 5,
    patience: 4,
    notes: 'Missed a big move on EUR/USD. Feeling like I should have been more aggressive.',
    triggers: 'Seeing unrealized profits, comparing to what could have been',
    copingStrategies: 'Reminded myself that consistency matters more than single trades'
  }
];

const sampleAffirmations: Affirmation[] = [
  {
    id: '1',
    text: 'I trade with discipline and patience',
    category: 'discipline',
    isActive: true
  },
  {
    id: '2',
    text: 'Losses are part of the game and I accept them',
    category: 'acceptance',
    isActive: true
  },
  {
    id: '3',
    text: 'I trust my analysis and stick to my plan',
    category: 'confidence',
    isActive: true
  },
  {
    id: '4',
    text: 'Missing trades is better than taking bad trades',
    category: 'patience',
    isActive: true
  }
];

export const PsychologyTracker = () => {
  const [entries, setEntries] = useState<EmotionalEntry[]>(sampleEntries);
  const [affirmations, setAffirmations] = useState<Affirmation[]>(sampleAffirmations);
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [isAddingAffirmation, setIsAddingAffirmation] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<EmotionalEntry>>({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    sessionType: 'before',
    emotionalState: 5,
    fear: 5,
    greed: 5,
    fomo: 5,
    revenge: 5,
    confidence: 5,
    patience: 5
  });
  const [newAffirmation, setNewAffirmation] = useState<Partial<Affirmation>>({
    category: 'discipline',
    isActive: true
  });

  const handleAddEntry = () => {
    if (newEntry.dominantEmotion) {
      const entry: EmotionalEntry = {
        id: Date.now().toString(),
        date: newEntry.date || new Date().toISOString().split('T')[0],
        time: newEntry.time || new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        sessionType: newEntry.sessionType as EmotionalEntry['sessionType'] || 'before',
        emotionalState: Number(newEntry.emotionalState) || 5,
        dominantEmotion: newEntry.dominantEmotion || '',
        fear: Number(newEntry.fear) || 5,
        greed: Number(newEntry.greed) || 5,
        fomo: Number(newEntry.fomo) || 5,
        revenge: Number(newEntry.revenge) || 5,
        confidence: Number(newEntry.confidence) || 5,
        patience: Number(newEntry.patience) || 5,
        notes: newEntry.notes || '',
        triggers: newEntry.triggers || '',
        copingStrategies: newEntry.copingStrategies || ''
      };
      
      setEntries([entry, ...entries]);
      setNewEntry({
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        sessionType: 'before',
        emotionalState: 5,
        fear: 5,
        greed: 5,
        fomo: 5,
        revenge: 5,
        confidence: 5,
        patience: 5
      });
      setIsAddingEntry(false);
    }
  };

  const handleAddAffirmation = () => {
    if (newAffirmation.text) {
      const affirmation: Affirmation = {
        id: Date.now().toString(),
        text: newAffirmation.text || '',
        category: newAffirmation.category as Affirmation['category'] || 'discipline',
        isActive: true
      };
      
      setAffirmations([...affirmations, affirmation]);
      setNewAffirmation({
        category: 'discipline',
        isActive: true
      });
      setIsAddingAffirmation(false);
    }
  };

  const toggleAffirmation = (id: string) => {
    setAffirmations(affirmations.map(aff => 
      aff.id === id ? { ...aff, isActive: !aff.isActive } : aff
    ));
  };

  const getEmotionColor = (value: number) => {
    if (value <= 3) return 'text-profit';
    if (value <= 6) return 'text-neutral';
    return 'text-loss';
  };

  const getSessionTypeColor = (type: EmotionalEntry['sessionType']) => {
    switch (type) {
      case 'before': return 'bg-primary text-primary-foreground';
      case 'during': return 'bg-neutral text-neutral-foreground';
      case 'after': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryColor = (category: Affirmation['category']) => {
    switch (category) {
      case 'discipline': return 'border-primary/50 bg-primary/10';
      case 'confidence': return 'border-profit/50 bg-profit/10';
      case 'patience': return 'border-neutral/50 bg-neutral/10';
      case 'acceptance': return 'border-secondary/50 bg-secondary/10';
      default: return 'border-muted/50 bg-muted/10';
    }
  };

  // Calculate average emotional metrics
  const avgMetrics = entries.length > 0 ? {
    emotionalState: entries.reduce((acc, e) => acc + e.emotionalState, 0) / entries.length,
    fear: entries.reduce((acc, e) => acc + e.fear, 0) / entries.length,
    greed: entries.reduce((acc, e) => acc + e.greed, 0) / entries.length,
    fomo: entries.reduce((acc, e) => acc + e.fomo, 0) / entries.length,
    revenge: entries.reduce((acc, e) => acc + e.revenge, 0) / entries.length,
    confidence: entries.reduce((acc, e) => acc + e.confidence, 0) / entries.length,
    patience: entries.reduce((acc, e) => acc + e.patience, 0) / entries.length
  } : null;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                Psychology Tracker
              </CardTitle>
              <CardDescription>
                Track and improve your trading psychology and emotional state
              </CardDescription>
            </div>
            <Button 
              variant="trading" 
              onClick={() => setIsAddingEntry(true)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Log Emotion
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Emotional Metrics Overview */}
      {avgMetrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-3">
              <div className="text-center">
                <div className="text-lg font-bold">{avgMetrics.emotionalState.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">Overall State</div>
                <Progress value={avgMetrics.emotionalState * 10} className="h-1 mt-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-3">
              <div className="text-center">
                <div className={`text-lg font-bold ${getEmotionColor(avgMetrics.fear)}`}>
                  {avgMetrics.fear.toFixed(1)}
                </div>
                <div className="text-xs text-muted-foreground">Fear</div>
                <Progress value={avgMetrics.fear * 10} className="h-1 mt-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-3">
              <div className="text-center">
                <div className={`text-lg font-bold ${getEmotionColor(avgMetrics.greed)}`}>
                  {avgMetrics.greed.toFixed(1)}
                </div>
                <div className="text-xs text-muted-foreground">Greed</div>
                <Progress value={avgMetrics.greed * 10} className="h-1 mt-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-3">
              <div className="text-center">
                <div className={`text-lg font-bold ${getEmotionColor(avgMetrics.fomo)}`}>
                  {avgMetrics.fomo.toFixed(1)}
                </div>
                <div className="text-xs text-muted-foreground">FOMO</div>
                <Progress value={avgMetrics.fomo * 10} className="h-1 mt-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-3">
              <div className="text-center">
                <div className={`text-lg font-bold ${getEmotionColor(avgMetrics.revenge)}`}>
                  {avgMetrics.revenge.toFixed(1)}
                </div>
                <div className="text-xs text-muted-foreground">Revenge</div>
                <Progress value={avgMetrics.revenge * 10} className="h-1 mt-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-3">
              <div className="text-center">
                <div className="text-lg font-bold text-profit">{avgMetrics.confidence.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">Confidence</div>
                <Progress value={avgMetrics.confidence * 10} className="h-1 mt-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-3">
              <div className="text-center">
                <div className="text-lg font-bold text-profit">{avgMetrics.patience.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">Patience</div>
                <Progress value={avgMetrics.patience * 10} className="h-1 mt-1" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Affirmations Section */}
      <Card className="bg-gradient-primary/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Trading Affirmations
              </CardTitle>
              <CardDescription>
                Positive affirmations to maintain the right mindset
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsAddingAffirmation(true)}
              className="gap-2"
            >
              <Plus className="h-3 w-3" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {affirmations.filter(aff => aff.isActive).map((affirmation) => (
              <div 
                key={affirmation.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${getCategoryColor(affirmation.category)}`}
                onClick={() => toggleAffirmation(affirmation.id)}
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium flex-1">{affirmation.text}</p>
                  <Badge variant="outline" className="text-xs ml-2">
                    {affirmation.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add New Entry Form */}
      {isAddingEntry && (
        <Card className="bg-gradient-card border-primary/20">
          <CardHeader>
            <CardTitle>Log Emotional State</CardTitle>
            <CardDescription>Record your emotions before, during, or after trading</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={newEntry.date || ''}
                  onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Time</Label>
                <Input
                  type="time"
                  value={newEntry.time || ''}
                  onChange={(e) => setNewEntry({ ...newEntry, time: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Session Type</Label>
                <Select value={newEntry.sessionType} onValueChange={(value) => setNewEntry({ ...newEntry, sessionType: value as EmotionalEntry['sessionType'] })}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="before">Before Trading</SelectItem>
                    <SelectItem value="during">During Trading</SelectItem>
                    <SelectItem value="after">After Trading</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Dominant Emotion</Label>
              <Input
                placeholder="Confident, Anxious, Frustrated, Excited..."
                value={newEntry.dominantEmotion || ''}
                onChange={(e) => setNewEntry({ ...newEntry, dominantEmotion: e.target.value })}
                className="bg-input border-border"
              />
            </div>

            {/* Emotion Scales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Overall Emotional State (1-10)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="range"
                    min="1"
                    max="10"
                    value={newEntry.emotionalState || 5}
                    onChange={(e) => setNewEntry({ ...newEntry, emotionalState: Number(e.target.value) })}
                    className="flex-1"
                  />
                  <Badge variant="outline">{newEntry.emotionalState || 5}</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Fear Level (1-10)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="range"
                    min="1"
                    max="10"
                    value={newEntry.fear || 5}
                    onChange={(e) => setNewEntry({ ...newEntry, fear: Number(e.target.value) })}
                    className="flex-1"
                  />
                  <Badge variant="outline">{newEntry.fear || 5}</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Greed Level (1-10)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="range"
                    min="1"
                    max="10"
                    value={newEntry.greed || 5}
                    onChange={(e) => setNewEntry({ ...newEntry, greed: Number(e.target.value) })}
                    className="flex-1"
                  />
                  <Badge variant="outline">{newEntry.greed || 5}</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label>FOMO Level (1-10)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="range"
                    min="1"
                    max="10"
                    value={newEntry.fomo || 5}
                    onChange={(e) => setNewEntry({ ...newEntry, fomo: Number(e.target.value) })}
                    className="flex-1"
                  />
                  <Badge variant="outline">{newEntry.fomo || 5}</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Confidence Level (1-10)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="range"
                    min="1"
                    max="10"
                    value={newEntry.confidence || 5}
                    onChange={(e) => setNewEntry({ ...newEntry, confidence: Number(e.target.value) })}
                    className="flex-1"
                  />
                  <Badge variant="outline">{newEntry.confidence || 5}</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Patience Level (1-10)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="range"
                    min="1"
                    max="10"
                    value={newEntry.patience || 5}
                    onChange={(e) => setNewEntry({ ...newEntry, patience: Number(e.target.value) })}
                    className="flex-1"
                  />
                  <Badge variant="outline">{newEntry.patience || 5}</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  placeholder="How are you feeling? What's on your mind?"
                  value={newEntry.notes || ''}
                  onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>Emotional Triggers</Label>
                <Textarea
                  placeholder="What triggered these emotions?"
                  value={newEntry.triggers || ''}
                  onChange={(e) => setNewEntry({ ...newEntry, triggers: e.target.value })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>Coping Strategies Used</Label>
                <Textarea
                  placeholder="What did you do to manage your emotions?"
                  value={newEntry.copingStrategies || ''}
                  onChange={(e) => setNewEntry({ ...newEntry, copingStrategies: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddingEntry(false)}>
                Cancel
              </Button>
              <Button variant="trading" onClick={handleAddEntry}>
                Save Entry
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add New Affirmation Form */}
      {isAddingAffirmation && (
        <Card className="bg-gradient-card border-primary/20">
          <CardHeader>
            <CardTitle>Add New Affirmation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Affirmation Text</Label>
                <Input
                  placeholder="I am a disciplined trader..."
                  value={newAffirmation.text || ''}
                  onChange={(e) => setNewAffirmation({ ...newAffirmation, text: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={newAffirmation.category} onValueChange={(value) => setNewAffirmation({ ...newAffirmation, category: value as Affirmation['category'] })}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discipline">Discipline</SelectItem>
                    <SelectItem value="confidence">Confidence</SelectItem>
                    <SelectItem value="patience">Patience</SelectItem>
                    <SelectItem value="acceptance">Acceptance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddingAffirmation(false)}>
                Cancel
              </Button>
              <Button variant="trading" onClick={handleAddAffirmation}>
                Add Affirmation
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Emotional Entries */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Emotional Entries</h3>
        {entries.map((entry) => (
          <Card key={entry.id} className="bg-gradient-card border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={getSessionTypeColor(entry.sessionType)}>
                    {entry.sessionType}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {entry.date} at {entry.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-semibold">
                    {entry.dominantEmotion}
                  </Badge>
                  <Badge variant="secondary">
                    {entry.emotionalState}/10
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Emotion Metrics */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                <div className="text-center">
                  <div className={`text-lg font-bold ${getEmotionColor(entry.fear)}`}>{entry.fear}</div>
                  <div className="text-xs text-muted-foreground">Fear</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold ${getEmotionColor(entry.greed)}`}>{entry.greed}</div>
                  <div className="text-xs text-muted-foreground">Greed</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold ${getEmotionColor(entry.fomo)}`}>{entry.fomo}</div>
                  <div className="text-xs text-muted-foreground">FOMO</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold ${getEmotionColor(entry.revenge)}`}>{entry.revenge}</div>
                  <div className="text-xs text-muted-foreground">Revenge</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-profit">{entry.confidence}</div>
                  <div className="text-xs text-muted-foreground">Confidence</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-profit">{entry.patience}</div>
                  <div className="text-xs text-muted-foreground">Patience</div>
                </div>
              </div>

              {/* Notes and Insights */}
              {(entry.notes || entry.triggers || entry.copingStrategies) && (
                <>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {entry.notes && (
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground flex items-center gap-1">
                          <Brain className="h-3 w-3" />
                          NOTES
                        </Label>
                        <p className="text-sm">{entry.notes}</p>
                      </div>
                    )}
                    {entry.triggers && (
                      <div className="space-y-1">
                        <Label className="text-xs text-loss flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          TRIGGERS
                        </Label>
                        <p className="text-sm">{entry.triggers}</p>
                      </div>
                    )}
                    {entry.copingStrategies && (
                      <div className="space-y-1">
                        <Label className="text-xs text-profit flex items-center gap-1">
                          <Lightbulb className="h-3 w-3" />
                          COPING STRATEGIES
                        </Label>
                        <p className="text-sm">{entry.copingStrategies}</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};