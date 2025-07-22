# Insights Module Documentation

This document provides a detailed explanation of the functionality within the Insights module. It outlines the calculated metrics, their formulas, and examples to ensure clarity for future development and for any LLM that might interact with this code.

## Overview

The Insights module is responsible for analyzing athletic activity data from Strava to provide users with meaningful insights into their performance, training load, and potential injury risk. The primary entry points are `InsightsResolver`, which exposes GraphQL queries, and `InsightsService`, which contains the core logic for calculating the various metrics.

## Core Concepts & Data Flow

1.  **Data Fetching:** The `InsightsResolver` receives requests for insights on a specific activity. It then uses the `StravaService` to fetch:
    *   The activity details (`DetailedActivity`).
    *   The activity streams (`StreamSet`), which include time-series data like heart rate, power, and velocity.
    *   The user's heart rate zones (`HeartRateZoneRanges`).
    *   A list of recent historical activities to provide context for training load calculations.

2.  **Insight Generation:** The fetched data is passed to the `InsightsService`. This service contains a series of methods, each responsible for calculating a specific metric or a group of related metrics.

3.  **Response:** The calculated insights are returned as an array of strings or as a detailed object, depending on the GraphQL query.

## Calculated Metrics

Below is a comprehensive list of the metrics calculated by the `InsightsService`.

### 1. Basic Performance Metrics

*   **Average Speed:**
    *   **Description:** The average speed during the activity.
    *   **Equation:** `Average Speed (km/h) = (Total Distance / Moving Time) * 3.6`
    *   **Example:** If an activity has a distance of 10,000 meters and a moving time of 3600 seconds, the average speed is `(10000 / 3600) * 3.6 = 10 km/h`.

*   **Power-to-Weight Ratio (Cycling):**
    *   **Description:** A common metric in cycling that measures the amount of power a cyclist can produce per kilogram of body weight.
    *   **Equation:** `Power-to-Weight Ratio (W/kg) = Average Power / Athlete Weight`
    *   **Example:** If a cyclist with a weight of 70kg has an average power of 210W, their power-to-weight ratio is `210 / 70 = 3.0 W/kg`.

### 2. Heart Rate Zone Analysis

*   **Description:** Calculates the distribution of time spent in different heart rate zones during an activity. This helps athletes understand the intensity of their workout.
*   **Method:** The Karvonen method is used to calculate the target heart rate for each zone based on the Heart Rate Reserve (HRR).
*   **Equations:**
    *   `Heart Rate Reserve (HRR) = Maximum Heart Rate - Resting Heart Rate`
    *   `Target Heart Rate = (HRR * %intensity) + Resting Heart Rate`
*   **Example:**
    *   Max HR: 190 bpm, Resting HR: 55 bpm => HRR = 135 bpm
    *   Zone 2 (60-70%):
        *   Lower bound: `(135 * 0.6) + 55 = 136 bpm`
        *   Upper bound: `(135 * 0.7) + 55 = 149.5 bpm`
    *   The service then calculates the percentage of time spent in each of the 5 zones.

### 3. Power Analysis (Cycling)

*   **Normalized Power (NP):**
    *   **Description:** An estimate of the power an athlete could have maintained for the same physiological cost if their power output had been perfectly constant. It accounts for the variability of power output.
    *   **Equation:** `Normalized Power = (Sum of (30-second rolling average of power)^4 / number of samples)^(1/4)`
    *   **Example:** This is a complex calculation, but conceptually, if an athlete's power fluctuates significantly, their NP will be higher than their average power.

*   **Intensity Factor (IF):**
    *   **Description:** The ratio of Normalized Power to the athlete's Functional Threshold Power (FTP). It indicates the intensity of the workout relative to the athlete's threshold.
    *   **Equation:** `Intensity Factor = Normalized Power / FTP`
    *   **Example:** If an athlete's NP is 250W and their FTP is 280W, their IF is `250 / 280 = 0.89`.

### 4. Training Load Analysis

*   **Acute:Chronic Workload Ratio (ACWR):**
    *   **Description:** A metric used to monitor training load and manage injury risk. It compares the recent training load (acute) to the longer-term training load (chronic).
    *   **Equations:**
        *   `Acute Load = Sum of suffer scores from the last 7 days`
        *   `Chronic Load = Average weekly suffer score from the last 28 days`
        *   `ACWR = Acute Load / Chronic Load`
    *   **Interpretation:**
        *   `< 0.8`: Detraining risk
        *   `0.8 - 1.3`: Low injury risk (the "sweet spot")
        *   `1.3 - 1.5`: Moderate injury risk
        *   `> 1.5`: High injury risk
    *   **Example:** If the acute load is 400 and the chronic load is 300, the ACWR is `400 / 300 = 1.33`, indicating a moderate injury risk.

### 5. Efficiency Metrics

*   **Efficiency Factor (EF):**
    *   **Description:** Measures how efficiently an athlete can produce power for a given heart rate. An increasing EF over time can indicate improved fitness.
    *   **Equation:** `Efficiency Factor = Average Power / Average Heart Rate`
    *   **Example:** If a cyclist's average power is 200W and their average heart rate is 150 bpm, their EF is `200 / 150 = 1.33 W/bpm`.

### 6. Aerobic Decoupling

*   **Description:** Measures the percentage of increase in the ratio of heart rate to power (or pace) between the first and second halves of a workout. It helps to assess aerobic endurance.
*   **Equation:** `Aerobic Decoupling = ((First Half (Power/HR)) - (Second Half (Power/HR))) / (First Half (Power/HR)) * 100`
*   **Interpretation:**
    *   `< 5%`: Good aerobic fitness
    *   `5% - 12%`: Moderate cardiovascular drift
    *   `> 12%`: Significant cardiovascular drift
*   **Example:** If the Power/HR ratio is 1.5 in the first half and 1.4 in the second half, the decoupling is `((1.5 - 1.4) / 1.5) * 100 = 6.67%`.

### 7. Running-Specific Analysis

*   **Critical Velocity Model:**
    *   **Description:**  A model used to predict sustainable running velocity based on the athlete's critical velocity (the highest speed they can maintain for a long duration) and their D' (the amount of work they can do above their critical velocity).
    *   **Equation:** `Sustainable Velocity = Critical Velocity + (D' / Moving Time)`
    *   **Example:** If an athlete's critical velocity is 4.2 m/s and their D' is 200m, for a 10-minute (600s) run, their sustainable velocity is `4.2 + (200 / 600) = 4.53 m/s`.

### 8. Advanced Correlation Analysis

*   **Pearson Correlation:**
    *   **Description:** The service calculates the Pearson correlation coefficient between different data streams (e.g., Power vs. Speed, HR vs. Power). This helps to understand the relationships between different aspects of performance.
    *   **Equation:** The standard Pearson correlation formula is used.
    *   **Interpretation:** The correlation coefficient ranges from -1 to 1, where 1 is a perfect positive correlation, -1 is a perfect negative correlation, and 0 is no correlation.

### 9. Performance Modeling

*   **Critical Power Model (Cycling):**
    *   **Description:** Similar to the Critical Velocity Model for running, this model predicts sustainable power output for cycling.
    *   **Equation:** `Sustainable Power = Critical Power + (W' / Moving Time)`
    *   **Example:** If a cyclist's critical power is 240W and their W' is 20000 joules, for a 20-minute (1200s) effort, their sustainable power is `240 + (20000 / 1200) = 256.67W`.

### 10. Injury Risk Assessment

*   **Description:**  Provides a direct assessment of injury risk based on the ACWR.
*   **Interpretation:**
    *   `ACWR > 1.5`: High injury risk
    *   `ACWR > 1.3`: Moderate injury risk

## Displaying the Insights

The insights are designed to be displayed in a clear and concise manner. The string-based insights can be presented as a list of key takeaways from the activity. The detailed insights object allows for more complex visualizations, such as:

*   **Heart Rate Zone Distribution:** A bar or pie chart showing the percentage of time spent in each zone.
*   **ACWR:** A gauge or a line chart showing the trend of the ACWR over time.
*   **Correlations:** Scatter plots to visualize the relationship between different data streams.

By providing both high-level summaries and detailed data, the Insights module empowers users to understand their performance and make informed decisions about their training.
