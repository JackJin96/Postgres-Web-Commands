# Postgres-Web-Commands
Web platform for SQL queries to pre-populated PostgreSQL database.

## Pre-programmed Queries

* SELECT * FROM Users WHERE Users.review_count >= 1
* SELECT Users.name FROM Users WHERE Users.review_count <= 2
* SELECT * FROM Businesses WHERE Businesses.active = FALSE
* SELECT B.business_name FROM Businesses B WHERE B.categories = 'Pizza Restaurants' AND B.stars >= 4
* SELECT COUNT(Checkins.business_id) FROM Checkins WHERE Checkins.Friday >= 1
* SELECT R.review_text FROM Reviews R, Businesses B WHERE R.business_id = B.business_id AND B.business_name = 'Arcadia Tavern'
* SELECT DISTINCT B.business_name FROM Reviews R, Businesses B WHERE R.business_id = B.business_id AND B.categories LIKE '%Restaurants%' AND R.stars <= 2
* SELECT AVG(Businesses.stars) AS average_rating, SUM(Businesses.review_count) as total_number_of_reviews FROM Businesses WHERE Businesses.business_name = 'Kfc'
* SELECT Businesses.business_id FROM Businesses ORDER BY Businesses.review_count DESC LIMIT 10
* SELECT U.name FROM Users U ORDER BY U.review_count DESC limit 1

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
