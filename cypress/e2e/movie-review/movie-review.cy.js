import { initialData } from '../../../src/data'
import { setLocalStorageItem, sortMovies } from '../../../src/utils';

const LOCAL_STORAGE_KEY = 'movie-reviews';
const movies = initialData;

describe('Movie review app', () => {
  beforeEach(() => {
    setLocalStorageItem(LOCAL_STORAGE_KEY, movies);
    cy.visit('/');
  });

  it('should add a new movie review', () => {
    const newMovieTitle = 'The Shawshank Redemption';
    const newMovieComment = 'Classic movie, highly recommended';
    const newMovieScore = '4';
  
    cy.get('input[placeholder="Title of movie"]').type(newMovieTitle);
    cy.get('input[placeholder="Review of movie"]').type(newMovieComment);
    cy.get('[data-testid="dropdown-selected"]').click()
    cy.get('[data-testid="dropdown-menu"]').contains(newMovieScore).click()
    cy.contains('Submit').click();
  
    cy.get('[data-testid="review-card"]').should('have.length', movies.length + 1)
  
    cy.contains('[data-testid="review-card"] h4', newMovieTitle)
      .parent('[data-testid="review-card"]')
      .as('newReviewCard')
  
    cy.get('@newReviewCard').within(() => {
      cy.contains(newMovieTitle)
      cy.contains(newMovieComment);
      cy.get('[data-testid="circle"]').should('have.length', newMovieScore);
    });
     
    // Check if the new movie review still exists from local storage after page refresh
    cy.visit('/');
    cy.get('[data-testid="review-card"]').should('have.length', movies.length + 1);
  });
  
  it.only('should sort movies by score and then alphabetically', () => {
    const sortedMovies = sortMovies(movies)

    cy.get('[data-testid="review-card-wrap"]')
      .children('[data-testid="review-card"]')
      .each(($el, index) => {
        const movie = sortedMovies[index]
        cy.wrap($el).within(() => {
          cy.get('h4').should('contain', movie.title)
          cy.get('p').should('contain', movie.comment)
          cy.get('[data-testid="circle"]').should('have.length', movie.score)
        })
      })

    const compareTitles = (title1, title2) => {
      return title1.localeCompare(title2) < 0
    }

    // check if the movies are sorted properly
    for (let i = 0; i < sortedMovies.length - 1; i++) {
      const currentMovie = sortedMovies[i]
      const nextMovie = sortedMovies[i + 1]

      if (nextMovie.score === currentMovie.score) {
        expect(compareTitles(currentMovie.title, nextMovie.title)).to.be.true
      } else {
        expect(nextMovie.score).to.be.lessThan(currentMovie.score)
      }
    }
  })

  it('should search for a movie by title', () => {
    const searchTerm = 'Shrek';
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    cy.get('input[placeholder="Search movie title"]').type(searchTerm);

    cy.get('.movie-card')
      .should('have.length', filteredMovies.length)
      .each(($card, index) => {
        cy.wrap($card).within(() => {
          cy.contains(filteredMovies[index].title);
          cy.contains(filteredMovies[index].comment);
          cy.contains(filteredMovies[index].score.toString());
        });
      });
  });
});
