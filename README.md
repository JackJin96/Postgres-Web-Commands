# Postgres-Web-Commands
Web platform for SQL queries to pre-populated postGres database.

## DB Schema
```
Users
- user_id TEXT PRIMARY KEY
- name TEXT
- review_count

Reviews
- review_id TEXT PRIMARY KEY
- business_id TEXT
- user_id TEXT
- stars REAL
- review_date TEXT
- review_text TEXT

Businesses
- business_id TEXT PRIMARY KEY
- full_address TEXT
- active BOOLEAN
- categories TEXT
- review_count INT
- business_name TEXT
- stars REAL

Checkins
- business_id TEXT
- Sunday INT
- Monday INT
- Tuesday INT
- Wednesday INT
- Thursday INT
- Friday INT
- Saturday INT
```
