-- Create profiles table
create table if not exists profiles (
    id uuid references auth.users on delete cascade primary key,
    username text,
    created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create buddies table
create table if not exists buddies (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references profiles(id) on delete cascade,
    name text,
    image_url text,
    hp integer default 100,
    energy integer default 100,
    steps integer default 0,
    last_updated timestamp with time zone default timezone('utc'::text, now()),
    last_fed timestamp with time zone,
    last_drank timestamp with time zone,
    is_sleeping boolean default false,
    sleep_start_time timestamp with time zone,
    total_sleep_hours numeric(5,2) default 0,
    last_sleep_date text,
    water_consumed integer default 0
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;
alter table buddies enable row level security;

-- Create policies
create policy "Users can view own profile"
    on profiles for select
    using (auth.uid() = id);

create policy "Users can update own profile"
    on profiles for update
    using (auth.uid() = id);

create policy "Users can view own buddy"
    on buddies for select
    using (auth.uid() = user_id);

create policy "Users can update own buddy"
    on buddies for update
    using (auth.uid() = user_id);

create policy "Users can insert own buddy"
    on buddies for insert
    with check (auth.uid() = user_id);

-- Function to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id)
    values (new.id);
    return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
create or replace trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user(); 