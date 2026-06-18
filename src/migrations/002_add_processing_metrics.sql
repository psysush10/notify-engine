ALTER TABLE events

ADD COLUMN IF NOT EXISTS
processing_started_at TIMESTAMP;

ALTER TABLE events

ADD COLUMN IF NOT EXISTS
processing_completed_at TIMESTAMP;