# Strava API Types

This package contains TypeScript type definitions for the Strava API.

## Implemented Types

- `Activity` (from `GET /activities/{id}`)
- `SummaryActivity`
- `PolylineMap`

## Pending Types

Based on the Strava API Reference (https://developers.strava.com/docs/reference):

### Activities
- `DetailedActivity` (already covered by `Activity` interface)
- `ActivityStats`
- `ActivityTotal`

### Athletes
- `SummaryAthlete`
- `DetailedAthlete`
- `AthleteStats`

### Gears
- `SummaryGear` (already covered by `SummaryGear` interface)
- `DetailedGear`

### Routes
- `Route`

### Segments
- `SummarySegment` (already covered by `SummarySegment` interface)
- `DetailedSegment`
- `ExplorerSegment`
- `SegmentEffort`
- `DetailedSegmentEffort` (already covered by `DetailedSegmentEffort` interface)

### Streams
- `StreamSet`
- `DetailedStream`

### Uploads
- `Upload`

### Clubs
- `SummaryClub`
- `DetailedClub`

### Efforts
- `DetailedSegmentEffort` (already covered)

### Laps
- `Lap` (already covered)

### Photos
- `PhotoSummary` (already covered)

### Splits
- `Split` (already covered)

### Other Common Types
- `LatLng` (already covered)
- `MetaAthlete` (already covered)
- `Fault`
- `Error`
- `Zone`
- `HeartRateZone`
- `PowerZone`
- `RunningRace`
- `TimedZoneRange`
- `ZoneRange`
- `ZoneRanges`