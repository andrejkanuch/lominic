# Strava API Types

This package contains TypeScript type definitions for the Strava API.

## Implemented Types

- **Activities**: `Activity`, `SummaryActivity`, `ActivityStats`, `ActivityTotal`, `ActivityZone`, `Lap`, `Split`
- **Athletes**: `DetailedAthlete`, `SummaryAthlete`, `MetaAthlete`
- **Segments**: `DetailedSegmentEffort`, `SummarySegment`
- **Comments**: `Comment`, `CommentAthlete`
- **Kudos**: `Kudoer`, `HighlightedKudosers`
- **Gear**: `SummaryGear`
- **Photos**: `PhotosSummary`, `PhotoSummary`
- **Maps**: `PolylineMap`, `LatLng`
- **Zones**: `Zones`, `HeartRateZone`, `PowerZone`, `ZoneBucket`

## Pending Types

Based on the Strava API Reference (https://developers.strava.com/docs/reference):

### Gears
- `DetailedGear`

### Routes
- `Route`

### Segments
- `DetailedSegment`
- `ExplorerSegment`

### Streams
- `StreamSet`
- `DetailedStream`

### Uploads
- `Upload`

### Clubs
- `SummaryClub`
- `DetailedClub`

### Other Common Types
- `Fault`
- `Error`
- `RunningRace`
- `TimedZoneRange`
- `ZoneRange`
- `ZoneRanges`
