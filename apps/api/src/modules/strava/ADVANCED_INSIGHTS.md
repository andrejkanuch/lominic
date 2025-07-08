# Advanced Strava Insights & Calculations

This document describes the sophisticated analytics and insights implemented in the `InsightsService` for analyzing Strava activities.

## Overview

The insights service provides advanced physiological and performance analysis using multiple data streams from Strava activities. These calculations help athletes understand their training load, efficiency, and performance patterns.

## 1. Heart Rate Zone Analysis

### HR Zone Calculation

```typescript
calculateHRZones(hrData: number[], hrMax: number): Record<string, number>
```

**Purpose**: Categorizes heart rate data into training zones based on percentage of max HR.

**Zones**:

- **Z1 (Recovery)**: < 60% of max HR
- **Z2 (Aerobic)**: 60-70% of max HR
- **Z3 (Tempo)**: 70-80% of max HR
- **Z4 (Threshold)**: 80-90% of max HR
- **Z5 (Anaerobic)**: > 90% of max HR

**Insight**: Training zone distribution helps understand workout intensity and training load.

### TRIMP Score (Training Load)

```typescript
calculateTRIMP(hrAvg: number, durationMin: number, hrRest: number, hrMax: number): number
```

**Purpose**: Calculates total physiological load using the TRaining IMPulse model.

**Formula**: `duration × HR ratio × gender coefficient`

Where:

- HR ratio = (HR_avg - HR_rest) / (HR_max - HR_rest)
- Gender coefficient = 0.64 × e^(1.92 × HR_ratio) [for men]

**Interpretation**:

- < 50: Very light training load
- 50-100: Light training load
- 100-150: Moderate training load
- 150-200: Hard training load
- > 200: Very hard training load

## 2. Elevation Analysis

### Elevation Gain Calculation

```typescript
calculateElevationGain(altitudeData: number[]): number
```

**Purpose**: Calculates total elevation gain by summing positive altitude changes.

**Method**: Iterates through altitude data, adding only positive changes (> 1m threshold).

### Climb Stress Score

```typescript
calculateClimbStress(hrChange: number, elevationGain: number, avgPaceMps: number): number
```

**Purpose**: Measures cardiovascular stress relative to elevation gain and pace.

**Formula**: `(HR_change / elevation_gain) × (1 / avg_pace_mps)`

**Interpretation**:

- < 0.1: Low climb stress
- 0.1-0.3: Moderate climb stress
- 0.3-0.5: High climb stress
- > 0.5: Very high climb stress

## 3. Pacing Analysis

### Pace Segmentation

```typescript
segmentPace(distance: number[], time: number[], segments = 4): number[]
```

**Purpose**: Divides activity into segments and calculates average pace for each.

**Method**: Splits activity into equal time segments and calculates pace (m/s) for each.

**Insights**:

- **Even pacing**: All segments have similar pace
- **Negative split**: Later segments faster than earlier ones
- **Positive split**: Earlier segments faster than later ones

### Pace Consistency

Calculates standard deviation of pace to measure consistency:

- < 0.5 min/km: Excellent consistency
- 0.5-1.5 min/km: Good consistency
- > 1.5 min/km: High variability

## 4. Efficiency Analysis

### Efficiency Index

```typescript
efficiency(speed: number, hr: number): number
```

**Purpose**: Measures aerobic efficiency (speed per heart rate).

**Formula**: `speed (m/s) / heart_rate (bpm)`

**Unit**: m/s per beat

**Insight**: Higher values indicate better aerobic economy. Can track improvements over time.

## 5. Cadence Analysis

### Cadence Fatigue Detection

```typescript
detectCadenceDrop(cadence: number[]): boolean
```

**Purpose**: Detects if cadence decreases significantly in the second half of activity.

**Method**: Compares average cadence of first half vs second half.

**Threshold**: 5% drop indicates potential fatigue.

**Insight**: Cadence drop may indicate:

- Form fatigue
- Overtraining
- Inadequate recovery
- Pacing issues

## 6. Grade-Effort Correlation

### Pearson Correlation

```typescript
gradeEffortCorrelation(grade: number[], hr: number[]): number
```

**Purpose**: Measures correlation between elevation grade and heart rate response.

**Formula**: Pearson correlation coefficient between grade and HR data.

**Interpretation**:

- 0.0-0.1: No correlation
- 0.1-0.3: Weak correlation
- 0.3-0.5: Moderate correlation
- 0.5-0.7: Strong correlation
- 0.7-1.0: Very strong correlation

**Insight**: High correlation indicates athlete is sensitive to elevation changes.

## 7. Power Analysis (Cycling)

### Power Metrics

- **Average Power**: Mean power output during activity
- **Max Power**: Peak power output
- **Power-to-Weight Ratio**: `avg_power / athlete_weight` (W/kg)

**Insight**: Power metrics are key indicators of cycling performance and fitness.

## 8. Historical Comparison

### Performance Trends

Compares current activity with similar historical activities:

- **Pace comparison**: Current vs average pace
- **HR comparison**: Current vs average heart rate
- **Efficiency trends**: Efficiency index over time

### Fatigue Assessment

Identifies potential overtraining by analyzing:

- Recent hard sessions (suffer score > 100)
- Training frequency in last 7 days
- Performance decline patterns

## 9. Weather Impact

### Temperature Analysis

- **Hot conditions** (> 25°C): Performance may be affected
- **Cold conditions** (< 5°C): Consider warm-up adjustments

## Usage Examples

### Basic Usage

```typescript
const insights = insightsService.generateInsights(
  activity,
  streams,
  zones,
  historicalActivities
)
```

### Example Output

```
[
  "Average HR: 145 bpm, Max HR: 175 bpm.",
  "HR Zone Distribution: Recovery: 5 data points, Aerobic: 15 data points, Tempo: 25 data points, Threshold: 10 data points, Anaerobic: 5 data points",
  "Training Load (TRIMP): 125.3 - Moderate training load",
  "Total elevation gain: 450m",
  "Climb stress score: 0.25 - Moderate climb stress",
  "Pacing segments: Segment 1: 5:30 min/km, Segment 2: 5:25 min/km, Segment 3: 5:35 min/km, Segment 4: 5:20 min/km",
  "Strong negative split - excellent pacing strategy",
  "Efficiency index: 0.0221 m/s per BPM",
  "High cadence run: 182 spm - excellent form",
  "Grade-HR correlation: 0.456 - Moderate correlation",
  "Average power: 245W, Max power: 450W",
  "Power-to-weight ratio: 3.27 W/kg"
]
```

## Testing

Run the test suite to validate calculations:

```bash
npm test insights-calculations.test.ts
```

## Future Enhancements

1. **FTP Estimation**: Automatic FTP calculation from power data
2. **Recovery Metrics**: Recovery time estimation based on TRIMP
3. **Race Predictions**: Performance predictions based on training data
4. **Injury Risk Assessment**: Risk factors based on training patterns
5. **Seasonal Analysis**: Performance trends across seasons
6. **Equipment Impact**: Performance changes with different gear

## References

- [TRIMP Training Load Model](https://pubmed.ncbi.nlm.nih.gov/1999705/)
- [Heart Rate Training Zones](https://www.polar.com/blog/running-heart-rate-zones-basics/)
- [Power Training for Cyclists](https://www.trainingpeaks.com/blog/power-training-for-cyclists/)
- [Running Cadence and Performance](https://www.runnersworld.com/advanced/a20824143/the-180-steps-per-minute-running-cadence-myth/)
