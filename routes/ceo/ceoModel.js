
const connection = require('../../config_files/configPG');

const models = {
    cityDb,
    cinemaDb,
    movieDb,
    seatDb,
    top10Db,
    releaseDateDb,
    wealthyUserDb,
    bookingDb,
    booked_usersDb,
    who_bookedDb

}

module.exports = models;

async function cityDb(city){
    let query = `select distinct movie.name from city as c
    inner join cinema on cinema.city_id = c.id
    inner join cinema_hall as hall on hall.cinema_id = cinema.id
    inner join show on show.cinema_hall_id = hall.id
    inner join movie on show.movie_id = movie.id
    where c.name = $1;`;
 return connection.query(query , [city]);
}

async function cinemaDb(cinemaHall){
    let query = `
    select distinct movie.name from cinema
    inner join cinema_hall as hall on  cinema.id = hall.cinema_id
    inner join cinema.show as sh on hall.id = sh.cinema_hall_id
    inner join movie on movie.id = sh.movie_id
    where cinema.name like "%${cinemaHall}%";
    `;
  return connection.query(query);
}

async function movieDb(movie){
    let query = `
    select * from movie where name = "${movie}";`;
  return connection.execute(query);
}

async function seatDb({city,movie,cinema,hall,time}){
    
  let query = `select distinct plan.id , plan.booking_id , plan.seat_id , plan.show_section_id , plan.status from city 
  inner join cinema on cinema.city_id = city.id
  inner join cinema_hall hall on hall.cinema_id = cinema.id
  inner join cinema.show sh on sh.cinema_hall_id = hall.id
  inner join movie on sh.movie_id = movie.id
  inner join show_section sec on sec.show_id = sh.id
  inner join show_seating_plan plan on plan.show_section_id = sec.id
  where city.id = (select id from city where name = "${city}") and movie.name like "${movie}" and cinema.name like "${cinema}%" and hall.name like "${hall}" and sh.time like "${time}%" ;`;

    return connection.query(query);
}

async function top10Db(){
    let query = `select actor.name , COUNT(movie.id) from movie 
    inner join movie_cast c on c.movie_id = movie.id
    inner join actor on actor.id = c.actor_id
    group by actor.name
    order by count(movie.id) desc
    limit 10;`;
  return connection.query(query);
}

async function releaseDateDb(year){
    let query = `select name,release_date from movie where release_date = '${year}';`;
    return connection.query(query);
}

async function wealthyUserDb(){
    let query = `select c.name , sum(sec.price) from customer c 
    inner join booking on booking.customer_id = c.id
    inner join show_seating_plan plan on plan.booking_id = booking.id
    inner join show_section sec on sec.id = plan.show_section_id
    group by c.id 
    order by sum(sec.price) desc
    limit 10;`;
 return connection.query(query);
}

async function bookingDb(){
    let query = `
    select cinema.name , count(booking.booking_id) from cinema
    inner join cinema_hall hall on hall.cinema_id = cinema.id
    inner join cinema.show sh on sh.cinema_hall_id = hall.id
    inner join show_section sec on sec.show_id = sh.id
    inner join show_seating_plan plan on plan.show_section_id = sec.id
    inner join booking on booking.id = plan.id
    group by cinema.name;`;
    return connection.query(query);
}

async function booked_usersDb(){
    let query = `
    select distinct c.name from show_seating_plan plan
    inner join booking on booking.id = plan.booking_id
    inner join customer c on c.id = booking.customer_id;`;
  return connection.query(query);
}

async function who_bookedDb({cinema,movie}){
    let query = `
    select distinct cinema.name cinema ,  c.name customer , movie.name movie, plan.status from cinema
    inner join cinema_hall hall on hall.cinema_id = cinema.id
    inner join cinema.show sh on sh.cinema_hall_id = hall.id
    inner join movie on  movie.id = sh.movie_id
    inner join show_section sec on sec.show_id = sh.id
    inner join show_seating_plan plan on plan.show_section_id = sec.id
    inner join booking on booking.id = plan.id
    inner join customer c on c.id = booking.customer_id
    where plan.status = "Booked" and movie.name like "${cinema}" and cinema.name like "%${movie}%";`;
 return connection.execute(query);
}