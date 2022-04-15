INSERT INTO users (name, email, password) VALUES ('Bob Alan', 'bobAlan@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Judy Apro', 'judyapro@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Andrei Beri', 'andreiberi@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Guest1 Guest1', 'guest1@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Guest2 Guest2', 'guest2@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code) VALUES (1, 'Bob house', 'description', 'photo1.url', 'photo2.url', 200, 2, 3, 3, 'Canada', '131 Whistling Hills Dr', 'Scarborough', 'ON', 'L4E 4Y1');
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code) VALUES (2, 'Judy house', 'description', 'photo3.url', 'photo4.url', 300, 2, 3, 4, 'Canada', '132 Whistling Hills Dr', 'Scarborough', 'ON', 'L4E 4Y2');
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code) VALUES (3, 'Andrei house', 'description', 'photo5.url', 'photo6.url', 400, 1, 4, 5, 'Canada', '133 Whistling Hills Dr', 'Scarborough', 'ON', 'L4E 4Y3');

INSERT INTO reservations (property_id, guest_id, start_date, end_date) VALUES (1, 4, '2018-09-11', '2018-09-26'), (2, 4, '2019-09-11', '2019-09-26'), (3, 5, '2018-07-11', '2018-07-26'); 

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (4, 1, 1, 3, 'message'), (4, 2, 2, 5, 'message'), (5, 3, 3, 1, 'message');

