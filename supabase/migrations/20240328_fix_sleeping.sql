-- First, ensure the column exists
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'buddies' 
        AND column_name = 'is_sleeping'
    ) THEN
        ALTER TABLE buddies ADD COLUMN is_sleeping boolean default false;
    END IF;
END $$;

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';

-- Add an index to improve query performance
CREATE INDEX IF NOT EXISTS idx_buddies_is_sleeping ON buddies(is_sleeping);

-- Grant necessary permissions
GRANT ALL ON buddies TO authenticated;
GRANT ALL ON buddies TO service_role; 