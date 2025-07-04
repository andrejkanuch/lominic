# Strava API Types

This package contains TypeScript type definitions for the Strava API v3, based on the [official Strava API documentation](https://developers.strava.com/docs/reference/#api-Activities-getActivityById).

## ✅ Implemented Types

### Core Types

- `LatLng` - Latitude/Longitude coordinates
- `MetaAthlete` - Basic athlete reference
- `MetaActivity` - Basic activity reference
- `MetaClub` - Basic club reference

### Map & Location Types

- `PolylineMap` - Activity map data
- `Waypoint` - Route waypoint data

### Gear Types

- `SummaryGear` - Basic gear information
- `DetailedGear` - Complete gear information with brand/model details

### Photo Types

- `PhotoSummary` - Individual photo data
- `PhotosSummary` - Collection of photos for an activity

### Segment Types

- `SummarySegment` - Basic segment information
- `DetailedSegment` - Complete segment information
- `SummarySegmentEffort` - Basic segment effort data
- `DetailedSegmentEffort` - Complete segment effort data

### Activity Types

- `SummaryActivity` - Basic activity information
- `DetailedActivity` - Complete activity information
- `UpdatableActivity` - Fields that can be updated on an activity

### Athlete Types

- `SummaryAthlete` - Basic athlete information
- `DetailedAthlete` - Complete athlete information

### Club Types

- `SummaryClub` - Basic club information
- `DetailedClub` - Complete club information
- `ClubActivity` - Activity within a club context
- `ClubAthlete` - Athlete within a club context

### Route Types

- `Route` - Complete route information

### Lap & Split Types

- `Lap` - Activity lap data
- `Split` - Activity split data

### Zone Types

- `ZoneBucket` - Zone distribution bucket
- `ZoneRange` - Zone range definition
- `HeartRateZoneRanges` - Heart rate zone ranges
- `PowerZoneRanges` - Power zone ranges
- `ActivityZone` - Activity zone data
- `HeartRateZone` - Heart rate zone
- `PowerZone` - Power zone
- `Zones` - Combined zones data
- `TimedZoneRange` - Zone range with time
- `TimedZoneDistribution` - Timed zone distribution

### Stream Types

- `BaseStream` - Base stream interface
- `AltitudeStream` - Altitude data stream
- `CadenceStream` - Cadence data stream
- `DistanceStream` - Distance data stream
- `HeartrateStream` - Heart rate data stream
- `LatLngStream` - Location data stream
- `MovingStream` - Movement data stream
- `PowerStream` - Power data stream
- `SmoothGradeStream` - Smooth grade data stream
- `SmoothVelocityStream` - Smooth velocity data stream
- `TemperatureStream` - Temperature data stream
- `TimeStream` - Time data stream
- `StreamSet` - Collection of activity streams

### Comment & Kudo Types

- `CommentAthlete` - Athlete in comment context
- `Comment` - Activity comment
- `Kudoer` - Athlete who gave kudos
- `HighlightedKudosers` - Featured kudos givers

### Upload Types

- `Upload` - Activity upload information

### Stats & Totals Types

- `ActivityTotal` - Activity totals
- `ActivityStats` - Athlete activity statistics

### Enum Types

- `ActivityType` - Activity type definition
- `SportType` - Sport type definition

### Error Types

- `Error` - API error details
- `Fault` - API fault response

### Explorer Types

- `ExplorerSegment` - Segment from explorer
- `ExplorerResponse` - Explorer response

### Legacy Aliases

- `Activity` - Alias for `DetailedActivity`
- `SummarySegmentEffort` - Alias for `DetailedSegmentEffort`

## 📊 Coverage Status

Based on the [Strava API Reference](https://developers.strava.com/docs/reference/#api-Activities-getActivityById), this package now includes **ALL** the core types mentioned in the documentation:

### ✅ Complete Coverage

- **Activities** - All activity-related types implemented
- **Athletes** - All athlete-related types implemented
- **Segments** - All segment-related types implemented
- **Clubs** - All club-related types implemented
- **Routes** - All route-related types implemented
- **Streams** - All stream-related types implemented
- **Zones** - All zone-related types implemented
- **Comments & Kudos** - All social interaction types implemented
- **Uploads** - All upload-related types implemented
- **Gear** - All gear-related types implemented
- **Photos** - All photo-related types implemented
- **Maps** - All map-related types implemented
- **Stats** - All statistics types implemented
- **Errors** - All error handling types implemented

### 🎯 API Endpoints Covered

This type package supports all major Strava API endpoints:

- Activities (Create, Get, List, Update, Zones, Comments, Kudoers, Laps)
- Athletes (Get, Stats, Zones, Update)
- Clubs (List, Get, Members, Administrators)
- Routes (Get, List, Export)
- Segments (Get, List, Explore, Star)
- Segment Efforts (Get, List)
- Streams (Activity, Route, Segment, Segment Effort)
- Uploads (Upload, Get)
- Gears (Get Equipment)

## 🚀 Usage

```typescript
import {
  DetailedActivity,
  SummaryAthlete,
  ActivityStats,
  StreamSet,
} from '@your-org/strava-api-types'

// Use types in your Strava API integration
const activity: DetailedActivity = await stravaApi.getActivity(id)
const athlete: SummaryAthlete = await stravaApi.getAthlete()
const stats: ActivityStats = await stravaApi.getAthleteStats()
const streams: StreamSet = await stravaApi.getActivityStreams(id)
```

## 📝 Notes

- All types are based on the official Strava API v3 documentation
- Types include proper nullability where the API allows it
- Legacy aliases are maintained for backward compatibility
- The package is fully typed and ready for production use
