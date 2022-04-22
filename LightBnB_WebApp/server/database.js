const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

// configuration to connect to local database
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {

  // compare lowercase of email from database and lowercase of email entered by user
  const queryString = `
  SELECT *
  FROM users
  WHERE LOWER(email) = $1
  `;

  return pool.query(queryString, [email.toLowerCase()])
    .then((result) => {
      // return null if email is not found
      if (result.rows.length === 0) {
        return null;
      }
      // return a user object that matches the provided email
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {

  // query database with provided user id
  const queryString = `
  SELECT *
  FROM users
  WHERE id = $1
  `;

  return pool.query(queryString, [id])
    .then((result) => {
      // return null if user id is not found
      if (result.rows.length === 0) {
        return null;
      }
      // return a user object that matches the provided user id
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {

  // Insert a new user to the database and return the user object
  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;

  const values = [
    user.name,
    user.email,
    user.password
  ];

  return pool.query(queryString, values)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });

}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {

  // query database to find all reservation for a user
  const queryString = `
  SELECT reservations.*, properties.*, avg(property_reviews.rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  GROUP BY properties.id,
    reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;
  `;

  const values = [
    guest_id,
    limit
  ];

  return pool.query(queryString, values)
    .then((result) => {
      // return all reservations for provided user
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });

}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */



const getAllProperties = (options, limit = 10) => {

  const queryParams = [];

  // query database to find all properties and their average rating that match the search criteria
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // if the login user wants to review his/her own listing, query database using the provided user id
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `WHERE owner_id = $${queryParams.length} `;
  }

  // city is entered as part of the search criteria
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    // use ILIKE to compare city but case-insensitive
    queryString += `WHERE city ILIKE $${queryParams.length} `;
  }

  // minimum price is entered as part of the search criteria
  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night * 100}`);
    queryString += `AND cost_per_night > $${queryParams.length} `;
  }

  // maximum price is entered as part of the search criteria
  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night * 100}`);
    queryString += `AND cost_per_night < $${queryParams.length} `;
  }

  queryString += `
  GROUP BY properties.id `

  // return properties that have higher average rating than the entered rating
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
    `;

  return pool.query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });

};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {

  // insert a new property to the database using info entered by user
  const queryString = `
  INSERT INTO properties (
    owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
    country,
    street,
    city,
    province,
    post_code)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
  `;

  const values = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
    property.country,
    property.street,
    property.city,
    property.province,
    property.post_code
  ];

  return pool.query(queryString, values)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });

}
exports.addProperty = addProperty;
