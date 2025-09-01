# Tinybird Analytics Configuration

This directory contains the Tinybird configuration for real-time analytics processing.

## Structure

- `datasources/` - Data source definitions for ingesting raw data
- `pipes/` - Data transformation and aggregation pipes
- `materializations/` - Materialized views for optimized queries
- `fixtures/` - Sample data for testing and development

## Setup

1. Install Tinybird CLI:
```bash
pip install tinybird-cli
```

2. Login to Tinybird:
```bash
tb login
```

3. Initialize workspace (first time only):
```bash
tb workspace init
```

4. Push all resources:
```bash
tb push datasources/*.datasource
tb push pipes/*.pipe
tb push materializations/*.pipe
```

## Data Sources

### link_clicks.datasource
Raw click tracking data containing:
- `timestamp` - When the click occurred
- `profileUserId` - User who owns the profile
- `linkId` - Unique link identifier
- `linkTitle` - Display title of the link
- `linkUrl` - Target URL
- `userAgent` - Browser/device information
- `country` - Geographic location
- `referrer` - Where the click came from

## Pipes

### fast_link_analytics.pipe
Provides fast analytics using materialized daily performance data.

**Parameters:**
- `profileUserId` (required) - User ID to filter analytics
- `start_date` (optional) - Start date for analytics range
- `end_date` (optional) - End date for analytics range
- `linkId` (optional) - Specific link to analyze

### link_analytics.pipe
Detailed link performance analytics with historical data.

### link_country_analytics.pipe
Geographic breakdown of link performance by country.

### profile_summary.pipe
Overall profile performance summary and metrics.

## Materializations

### daily_link_performance.pipe
Pre-aggregated daily performance metrics for faster queries.

## Development

### Testing with Fixtures
Use the sample data in `fixtures/` for local development:

```bash
tb datasource append link_clicks fixtures/link_clicks.ndjson
```

### Updating Pipes
After modifying pipes, push changes:

```bash
tb push pipes/your_pipe.pipe
```

### Monitoring
Check pipe status and performance:

```bash
tb pipe status
tb pipe logs your_pipe_name
```

## API Endpoints

After deployment, pipes are available as API endpoints:

```
GET https://api.tinybird.co/v0/pipes/fast_link_analytics.json?profileUserId=USER_ID
```

## Security

- Never commit `.tinyb` file (contains API tokens)
- Use environment variables for sensitive data
- Rotate API tokens regularly
- Limit API token permissions to necessary scopes
