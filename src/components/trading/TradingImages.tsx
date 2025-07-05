import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image, TrendingUp, TrendingDown, AlertTriangle, Target, BarChart } from 'lucide-react';

import breakoutRetestSetup from '@/assets/breakout-retest-setup.jpg';
import swingRejectionSetup from '@/assets/swing-rejection-setup.jpg';
import failedBreakoutTrap from '@/assets/failed-breakout-trap.jpg';
import trendContinuationSetup from '@/assets/trend-continuation-setup.jpg';

interface TradingImage {
  id: string;
  title: string;
  description: string;
  category: 'bullish' | 'bearish' | 'trap' | 'continuation' | 'range';
  imageSrc: string;
  keyPoints: string[];
  setupType: string;
  riskReward: string;
  successRate: string;
}

const tradingImages: TradingImage[] = [
  {
    id: '1',
    title: 'Breakout & Retest Setup',
    description: 'Clean bullish breakout of resistance with pullback confirmation - ideal entry setup',
    category: 'bullish',
    imageSrc: breakoutRetestSetup,
    keyPoints: [
      'Clear breakout above resistance level',
      'Volume confirmation on breakout',
      'Pullback to broken resistance (now support)',
      'Confirmation candle for entry',
      'Stop loss below retested level',
      'Target at next resistance zone'
    ],
    setupType: 'Breakout & Retest',
    riskReward: '1:2.5',
    successRate: '68%'
  },
  {
    id: '2',
    title: 'Swing High Rejection',
    description: 'Bearish rejection at key resistance level with strong selling pressure',
    category: 'bearish',
    imageSrc: swingRejectionSetup,
    keyPoints: [
      'Price approaches key resistance',
      'Rejection candle with long upper wick',
      'Volume increase on rejection',
      'RSI showing overbought conditions',
      'Entry below rejection candle low',
      'Target at previous support level'
    ],
    setupType: 'Swing Rejection',
    riskReward: '1:2.0',
    successRate: '62%'
  },
  {
    id: '3',
    title: 'Failed Breakout Trap',
    description: 'False breakout that immediately reverses - setup to avoid or fade',
    category: 'trap',
    imageSrc: failedBreakoutTrap,
    keyPoints: [
      'Initial breakout above resistance',
      'Lack of volume confirmation',
      'Quick reversal below breakout level',
      'Trap for breakout traders',
      'Fade opportunity for experienced traders',
      'Stop hunt scenario'
    ],
    setupType: 'False Breakout',
    riskReward: 'Avoid or 1:1.5 fade',
    successRate: '45% (for fading)'
  },
  {
    id: '4',
    title: 'Trend Continuation',
    description: 'Clean pullback in uptrend offering continuation opportunity',
    category: 'continuation',
    imageSrc: trendContinuationSetup,
    keyPoints: [
      'Strong uptrend in place',
      'Pullback to key support/MA',
      'Bullish flag pattern formation',
      'Volume drying up on pullback',
      'Entry on break of flag high',
      'Target extension of previous move'
    ],
    setupType: 'Trend Continuation',
    riskReward: '1:3.0',
    successRate: '72%'
  }
];

export const TradingImages = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<TradingImage | null>(null);

  const filteredImages = selectedCategory === 'all' 
    ? tradingImages 
    : tradingImages.filter(img => img.category === selectedCategory);

  const getCategoryIcon = (category: TradingImage['category']) => {
    switch (category) {
      case 'bullish': return <TrendingUp className="h-4 w-4 text-profit" />;
      case 'bearish': return <TrendingDown className="h-4 w-4 text-loss" />;
      case 'trap': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'continuation': return <BarChart className="h-4 w-4 text-primary" />;
      case 'range': return <Target className="h-4 w-4 text-neutral" />;
      default: return <Image className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: TradingImage['category']) => {
    switch (category) {
      case 'bullish': return 'border-profit/50 bg-profit/10 text-profit';
      case 'bearish': return 'border-loss/50 bg-loss/10 text-loss';
      case 'trap': return 'border-destructive/50 bg-destructive/10 text-destructive';
      case 'continuation': return 'border-primary/50 bg-primary/10 text-primary';
      case 'range': return 'border-neutral/50 bg-neutral/10 text-neutral';
      default: return 'border-muted/50 bg-muted/10 text-muted-foreground';
    }
  };

  const getSuccessRateColor = (rate: string) => {
    const percentage = parseInt(rate);
    if (percentage >= 70) return 'text-profit';
    if (percentage >= 60) return 'text-neutral';
    return 'text-loss';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Image className="h-6 w-6 text-primary" />
                Trading Chart Gallery
              </CardTitle>
              <CardDescription>
                Reference collection of trading setups, patterns, and examples
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Category Filter Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-card/50 border border-border/50">
          <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            All Setups
          </TabsTrigger>
          <TabsTrigger value="bullish" className="data-[state=active]:bg-profit data-[state=active]:text-profit-foreground">
            Bullish
          </TabsTrigger>
          <TabsTrigger value="bearish" className="data-[state=active]:bg-loss data-[state=active]:text-loss-foreground">
            Bearish
          </TabsTrigger>
          <TabsTrigger value="continuation" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Continuation
          </TabsTrigger>
          <TabsTrigger value="trap" className="data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground">
            Traps/Avoid
          </TabsTrigger>
          <TabsTrigger value="range" className="data-[state=active]:bg-neutral data-[state=active]:text-neutral-foreground">
            Range Bound
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          {/* Image Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Card 
                key={image.id} 
                className="bg-gradient-card border-border/50 cursor-pointer hover:shadow-elegant transition-all duration-300 group"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={image.imageSrc} 
                    alt={image.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className={getCategoryColor(image.category)}>
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(image.category)}
                        {image.category}
                      </div>
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                      {image.setupType}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{image.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {image.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">R:R </span>
                      <span className="font-semibold">{image.riskReward}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Success: </span>
                      <span className={`font-semibold ${getSuccessRateColor(image.successRate)}`}>
                        {image.successRate}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-12 text-center">
                <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Images Found</h3>
                <p className="text-muted-foreground">
                  No trading images found for the selected category.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Detailed Image Modal/View */}
      {selectedImage && (
        <Card className="bg-gradient-card border-primary/20">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-xl">{selectedImage.title}</CardTitle>
                  <Badge className={getCategoryColor(selectedImage.category)}>
                    <div className="flex items-center gap-1">
                      {getCategoryIcon(selectedImage.category)}
                      {selectedImage.category}
                    </div>
                  </Badge>
                </div>
                <CardDescription className="text-base">
                  {selectedImage.description}
                </CardDescription>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => setSelectedImage(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Large Image Display */}
            <div className="relative rounded-lg overflow-hidden border border-border/50">
              <img 
                src={selectedImage.imageSrc} 
                alt={selectedImage.title}
                className="w-full h-64 md:h-80 lg:h-96 object-cover"
              />
            </div>

            {/* Setup Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-card/30 border-border/30">
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold">{selectedImage.setupType}</div>
                  <div className="text-sm text-muted-foreground">Setup Type</div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/30 border-border/30">
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-primary">{selectedImage.riskReward}</div>
                  <div className="text-sm text-muted-foreground">Risk:Reward</div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/30 border-border/30">
                <CardContent className="p-4 text-center">
                  <div className={`text-lg font-bold ${getSuccessRateColor(selectedImage.successRate)}`}>
                    {selectedImage.successRate}
                  </div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </CardContent>
              </Card>
            </div>

            {/* Key Points */}
            <div>
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Key Setup Points
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedImage.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-muted/20 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trading Notes */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Trading Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {selectedImage.category === 'trap' ? (
                    "⚠️ This is an example of what to avoid or potentially fade if you're experienced. False breakouts can be profitable to trade against, but require strict risk management and experience reading market context."
                  ) : selectedImage.category === 'bullish' ? (
                    "✅ This represents a high-probability bullish setup. Wait for all confirmation criteria before entering. Always use proper risk management and position sizing."
                  ) : selectedImage.category === 'bearish' ? (
                    "📉 This shows a quality bearish setup with good risk:reward potential. Ensure you have proper confirmation before entering short positions."
                  ) : (
                    "📈 Trend continuation setups often offer the best risk:reward ratios. The key is patience and waiting for the right pullback levels."
                  )}
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}
    </div>
  );
};