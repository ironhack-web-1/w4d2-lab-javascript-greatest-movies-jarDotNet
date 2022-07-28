// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {

    return moviesArray
        .filter((movie, pos, self) => self.findIndex(mov => mov.director === movie.director) === pos)
        .map(movie => movie.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {

    return moviesArray
        .filter(movie => movie.director === 'Steven Spielberg' && movie.genre.includes('Drama'))
        .length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {

    var total = moviesArray
        .reduce((sum, movie) => sum + (movie.score || 0), 0);

    return calculateAverage(total, moviesArray.length);
}

function calculateAverage(total, numOfItems) {

    var average = total === 0
    ? 0
    : (total / numOfItems).toFixed(2);

    return Number(average);
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {

    var dramaMovies = moviesArray
        .filter(movie => movie.genre.includes('Drama'));

    var total = dramaMovies
        .reduce((sum, movie) => sum + (movie.score || 0), 0);

    return calculateAverage(total, dramaMovies.length);     
}

// Iteration 5: Ordering by year - Order by year and then by title, ascending (in growing order)
function orderByYear(moviesArray) {

    return [...moviesArray] 
        .sort((movie1, movie2) => movie1.year - movie2.year || movie1.title.localeCompare(movie2.title));
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {

    return [...moviesArray] 
        .sort((movie1, movie2) => movie1.title.localeCompare(movie2.title))
        .map(movie => movie.title)
        .slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {

    return moviesArray
        .map(
            movie => ({ ...movie, duration: textDurationToMinutes(movie.duration) })
        );
    }

function textDurationToMinutes(duration) {

    var dateTime = duration.split(' ');

    var hours = parseInt(dateTime[0] || 0);
    var minutes = parseInt(dateTime[1] || 0);

    return (hours * 60) + minutes;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {

    if (moviesArray === null || moviesArray.length === 0)
        return null;

    const scoresByYear = moviesArray
        .reduce(
            (movies, movie) => { 
                const { year, score } = movie;

                let item = movies.find(item => item.year === year) || { year: year, scores: []};
                item.scores.push(score);
                item.average = averageNumbers(item.scores)

                return item.scores.length == 1
                    ? [...movies, item]
                    : movies;
            }
            , []
        );

        const max = scoresByYear.reduce(
            (prev, current) => (prev.average > current.average) ? prev : current
        );

    return `The best year was ${max.year} with an average score of ${max.average}`;
}

function sumNumbers(arrayOfNumbers) {
  
    if (arrayOfNumbers === null)
      return 0;
  
    return arrayOfNumbers.reduce((sum, num) => sum + num, 0);
}

function averageNumbers(arrayOfNumbers) {

    if (arrayOfNumbers === null || arrayOfNumbers.length === 0)
      return null;
  
    let sum = sumNumbers(arrayOfNumbers);
  
    return sum / arrayOfNumbers.length;
}
